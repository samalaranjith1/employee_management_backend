import { useState, useEffect } from 'react';
import { MapPin, DollarSign, Clock, Send, Search, Building2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface PublicJob {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    remotePolicy: string;
    experienceLevel: string;
    skills: string[];
    screeningQuestions?: string[];
    salaryRange?: { min: number; max: number; currency: string };
    description: string;
    postedDate: string;
}

export default function Careers() {
    const [jobs, setJobs] = useState<PublicJob[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<PublicJob[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<PublicJob | null>(null);

    // Apply Form
    const [applyForm, setApplyForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        skillsInput: '', // Comma separated
        linkedin: '',
        github: '',
        experience: 0,
        resumeUrl: '' // Mock
    });

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/recruitment/public/jobs`);
                if (res.ok) {
                    const data = await res.json();
                    setJobs(data);
                    setFilteredJobs(data);
                }
            } catch (error) {
                console.error('Failed to fetch jobs', error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setFilteredJobs(jobs.filter(job =>
            job.title.toLowerCase().includes(query) ||
            job.department.toLowerCase().includes(query) ||
            job.skills.some(s => s.toLowerCase().includes(query))
        ));
    };

    const handleApply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedJob) return;

        try {
            const payload = {
                jobId: selectedJob.id,
                fullName: applyForm.fullName,
                email: applyForm.email,
                phone: applyForm.phone,
                experience: Number(applyForm.experience),
                skills: applyForm.skillsInput.split(',').map(s => s.trim()).filter(s => s),
                portfolio: {
                    linkedin: applyForm.linkedin,
                    github: applyForm.github
                },
                screeningAnswers: (selectedJob as any).answers || [],
                resumeUrl: 'https://example.com/mock-resume.pdf' // hardcoded for MVP
            };

            const res = await fetch(`${import.meta.env.VITE_API_URL}/recruitment/public/apply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error(await res.text());

            toast.success('Application Submitted Successfully!');
            setSelectedJob(null);
            setApplyForm({ fullName: '', email: '', phone: '', skillsInput: '', linkedin: '', github: '', experience: 0, resumeUrl: '' });
        } catch (error: any) {
            toast.error(error.message || 'Application failed');
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #0f172a, #1e293b)', color: 'white', fontFamily: 'Inter, sans-serif' }}>
            <Toaster position="top-center" />

            {/* Header */}
            <header style={{ padding: '2rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Building2 size={24} color="white" />
                    </div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, background: 'linear-gradient(to right, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        BookExpert Careers
                    </h1>
                </div>
                <nav>
                    <a href="/" style={{ color: '#94a3b8', textDecoration: 'none', marginRight: '2rem' }}>Home</a>
                    <a href="#" style={{ color: 'white', fontWeight: 600 }}>Open Roles</a>
                </nav>
            </header>

            {/* Hero */}
            <div style={{ padding: '4rem 5%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Join Our Mission</h2>
                <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    We are looking for passionate individuals to help us revolutionize the industry. Browse our open positions below.
                </p>
                <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                    <input
                        type="text"
                        placeholder="Search by role, department, or skill..."
                        style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none' }}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {/* Jobs Grid */}
            <div style={{ padding: '2rem 5%', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
                {loading ? <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>Loading open roles...</p> :
                    filteredJobs.map(job => (
                        <div key={job.id} style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1.5rem', transition: 'transform 0.2s', cursor: 'pointer' }}
                            onClick={() => setSelectedJob(job)}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: '#60a5fa' }}>{job.title}</h3>
                            <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)' }}>{job.department}</span>
                                <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd' }}>{job.type}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> {job.location} ({job.remotePolicy})</div>
                                {job.salaryRange && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><DollarSign size={16} /> {job.salaryRange.currency} {job.salaryRange.min.toLocaleString()} - {job.salaryRange.max.toLocaleString()}</div>}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> {job.experienceLevel} Level</div>
                            </div>
                            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'flex-end' }}>
                                <span style={{ color: '#a78bfa', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>View Details <Send size={14} /></span>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Apply Modal */}
            {selectedJob && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem' }}>
                    <div style={{ background: '#1e293b', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
                        {/* Modal Header */}
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a' }}>
                            <div>
                                <h2 style={{ margin: 0 }}>{selectedJob.title}</h2>
                                <p style={{ margin: '0.25rem 0 0 0', opacity: 0.7 }}>{selectedJob.department} • {selectedJob.location}</p>
                            </div>
                            <button onClick={() => setSelectedJob(null)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
                        </div>

                        <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {/* Left: Job Details */}
                            <div>
                                <h4 style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>About the Role</h4>
                                <p style={{ lineHeight: 1.6, fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>{selectedJob.description}</p>

                                <h4 style={{ color: '#94a3b8', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Required Skills</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {selectedJob.skills.map(skill => (
                                        <span key={skill} style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd', borderRadius: '20px' }}>{skill}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Apply Form */}
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px' }}>
                                <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Apply Now <Send size={18} color="#60a5fa" /></h3>

                                {/* Resume Upload */}
                                <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '8px', textAlign: 'center' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>Auto-fill with Resume (PDF)</label>
                                    <input type="file" accept=".pdf"
                                        onChange={async (e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                const file = e.target.files[0];
                                                const formData = new FormData();
                                                formData.append('resume', file);

                                                const toastId = toast.loading('Parsing resume...');
                                                try {
                                                    const res = await fetch(`${import.meta.env.VITE_API_URL}/recruitment/public/upload-resume`, {
                                                        method: 'POST',
                                                        body: formData
                                                    });
                                                    const data = await res.json();
                                                    if (res.ok) {
                                                        setApplyForm(prev => ({
                                                            ...prev,
                                                            email: data.extractedData.email || prev.email,
                                                            phone: data.extractedData.phone || prev.phone,
                                                            skillsInput: data.extractedData.skills.join(', ') || prev.skillsInput
                                                        }));
                                                        toast.success('Resume parsed & form filled!', { id: toastId });
                                                    } else {
                                                        throw new Error(data.message);
                                                    }
                                                } catch (err: any) {
                                                    toast.error('Parsing failed: ' + err.message, { id: toastId });
                                                }
                                            }
                                        }}
                                        style={{ color: 'white' }}
                                    />
                                </div>

                                <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Full Name *</label>
                                        <input required className="public-input" value={applyForm.fullName} onChange={e => setApplyForm({ ...applyForm, fullName: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#0f172a', color: 'white' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email *</label>
                                        <input required type="email" value={applyForm.email} onChange={e => setApplyForm({ ...applyForm, email: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#0f172a', color: 'white' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Phone</label>
                                        <input value={applyForm.phone} onChange={e => setApplyForm({ ...applyForm, phone: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#0f172a', color: 'white' }} />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Exp (Yrs)</label>
                                            <input type="number" min="0" value={applyForm.experience} onChange={e => setApplyForm({ ...applyForm, experience: Number(e.target.value) })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#0f172a', color: 'white' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>LinkedIn</label>
                                            <input value={applyForm.linkedin} onChange={e => setApplyForm({ ...applyForm, linkedin: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#0f172a', color: 'white' }} />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Your Skills (comma separated)</label>
                                        <input placeholder="React, Node.js, Design..." value={applyForm.skillsInput} onChange={e => setApplyForm({ ...applyForm, skillsInput: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#0f172a', color: 'white' }} />
                                    </div>

                                    {/* Dynamic Screening Questions */}
                                    {selectedJob.screeningQuestions && selectedJob.screeningQuestions.length > 0 && (
                                        <div style={{ marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                                            <h4 style={{ margin: '0 0 1rem 0', color: '#94a3b8' }}>Screening Questions</h4>
                                            {selectedJob.screeningQuestions.map((q, idx) => (
                                                <div key={idx} style={{ marginBottom: '1rem' }}>
                                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{q}</label>
                                                    <input
                                                        required
                                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#0f172a', color: 'white' }}
                                                        onChange={e => {
                                                            const newAnswers = [...(selectedJob as any).answers || []];
                                                            newAnswers[idx] = { question: q, answer: e.target.value };
                                                            (selectedJob as any).answers = newAnswers;
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <button type="submit" style={{ marginTop: '1rem', padding: '1rem', background: 'linear-gradient(to right, #3b82f6, #2563eb)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                                        Submit Application
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
