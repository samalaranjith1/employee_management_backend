const router = require('express').Router();
const Job = require('../models/recruitment/Job');
const Candidate = require('../models/recruitment/Candidate');
const verify = require('../middleware/auth');

// --- JOBS ---

// Post a Job
router.post('/jobs', verify, async (req, res) => {
    try {
        const newJob = new Job({
            ...req.body,
            postedBy: req.user._id
        });
        await newJob.save();
        res.json(newJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get All Jobs
router.get('/jobs', verify, async (req, res) => {
    try {
        const jobs = await Job.find().sort({ postedDate: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// --- CANDIDATES ---

// Add Candidate (Manual or "Apply")
router.post('/candidates', verify, async (req, res) => {
    try {
        const newCandidate = new Candidate(req.body);
        await newCandidate.save();
        res.json(newCandidate);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get Candidates (Optional filter by Job)
router.get('/candidates', verify, async (req, res) => {
    try {
        const { jobId } = req.query;
        const query = jobId ? { job: jobId } : {};
        const candidates = await Candidate.find(query).populate('job', 'title');
        res.json(candidates);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update Candidate Status
router.put('/candidates/:id/status', verify, async (req, res) => {
    try {
        const { status } = req.body;
        const candidate = await Candidate.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(candidate);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Schedule Interview (Mock Email)
router.post('/candidates/:id/schedule', verify, async (req, res) => {
    try {
        const { date, time, type, link } = req.body;
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

        // Mock Email Sending Logic
        console.log(`[EMAIL MOCK] Sending Interview Invite to ${candidate.email}`);
        console.log(`Subject: Interview Invitation for ${candidate.job}`);
        console.log(`Body: Hi ${candidate.fullName}, your interview is scheduled for ${date} at ${time}. Link: ${link}`);

        // Update status and add note
        candidate.status = 'Interview';
        candidate.notes.push(`Interview scheduled for ${date} at ${time} (${type})`);
        await candidate.save();

        res.json({ message: 'Interview scheduled and email sent', candidate });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// --- PUBLIC CAREERS API (No Auth) ---

// Get Open Jobs public
router.get('/public/jobs', async (req, res) => {
    try {
        const jobs = await Job.find({ status: 'Open' }).select('-postedBy').sort({ postedDate: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Apply for a job (Public)
router.post('/public/apply', async (req, res) => {
    try {
        const { jobId, skills, screeningAnswers, ...candidateData } = req.body;

        // 1. Fetch Job for AI Scoring
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        // 2. Simple "AI" Scoring (Intersection of Job Skills & Candidate Skills)
        let score = 0;
        let insights = 'No skills provided.';
        if (job.skills && job.skills.length > 0 && skills && skills.length > 0) {
            const jobSkills = job.skills.map(s => s.toLowerCase());
            const candSkills = skills.map(s => s.toLowerCase());
            const matches = jobSkills.filter(s => candSkills.includes(s));

            score = Math.round((matches.length / jobSkills.length) * 100);
            insights = `Matched ${matches.length}/${jobSkills.length} skills: ${matches.join(', ')}`;
        } else if (job.skills && job.skills.length === 0) {
            score = 50;
            insights = 'No specific skills required.';
        }

        // 3. Create Candidate
        const newCandidate = new Candidate({
            ...candidateData,
            job: jobId,
            skills: skills,
            screeningAnswers: screeningAnswers || [],
            aiScore: score,
            aiInsights: insights,
            status: 'New'
        });

        await newCandidate.save();
        res.json({ message: 'Application submitted successfully', candidateId: newCandidate._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// --- RESUME PARSING ---
const multer = require('multer');
const pdf = require('pdf-parse');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

router.post('/public/upload-resume', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const dataBuffer = fs.readFileSync(req.file.path);
        const data = await pdf(dataBuffer);
        const text = data.text;

        // Simple Regex Extraction (Mock AI Parsing)
        const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/);
        const phoneMatch = text.match(/(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}/);

        // Mock Skill Extraction (looking for common keywords)
        const possibleSkills = ['React', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'Java', 'AWS', 'Docker', 'Design', 'Figma'];
        const extractedSkills = possibleSkills.filter(skill => new RegExp(skill, 'i').test(text));

        // Clean up file
        fs.unlinkSync(req.file.path);

        res.json({
            message: 'Resume parsed successfully',
            extractedData: {
                fullName: '', // Hard to extract name reliably with regex
                email: emailMatch ? emailMatch[0] : '',
                phone: phoneMatch ? phoneMatch[0] : '',
                skills: extractedSkills,
                summary: text.substring(0, 200).replace(/\n/g, ' ') + '...'
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to parse resume: ' + err.message });
    }
});

module.exports = router;
