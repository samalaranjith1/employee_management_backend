const router = require('express').Router();
const Appraisal = require('../models/performance/Appraisal');
const Employee = require('../models/Employee');
const verify = require('../middleware/auth');

// Initialize Appraisal Cycle (or Create for Self)
router.post('/create', verify, async (req, res) => {
    try {
        const { cycle, kpis } = req.body;

        // Find Reporting Manager
        const me = await Employee.findById(req.user._id);
        if (!me) return res.status(404).json({ message: 'User not found' });

        const appraisal = new Appraisal({
            employee: req.user._id,
            reviewer: me.reportingManager, // Can be null if CEO
            cycle,
            kpis: kpis || [],
            status: 'GoalSetting'
        });

        await appraisal.save();
        res.json(appraisal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get My Appraisals
router.get('/my-appraisals', verify, async (req, res) => {
    try {
        const list = await Appraisal.find({ employee: req.user._id })
            .populate('reviewer', 'fullName')
            .sort({ createdAt: -1 });
        res.json(list);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get Pending Reviews (For Managers)
router.get('/pending-reviews', verify, async (req, res) => {
    try {
        // Find appraisals where current user is the reviewer
        const list = await Appraisal.find({ reviewer: req.user._id, status: { $ne: 'GoalSetting' } })
            .populate('employee', 'fullName department designation')
            .sort({ createdAt: 1 });
        res.json(list);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update Appraisal (Goals / Self Review / Manager Review)
router.put('/:id/update', verify, async (req, res) => {
    try {
        const { kpis, status, finalFeedback } = req.body;
        const appraisal = await Appraisal.findById(req.params.id);

        if (!appraisal) return res.status(404).json({ message: 'Not found' });

        // Permission check could be added here (is it my appraisal or am I the reviewer?)

        if (kpis) appraisal.kpis = kpis;
        if (status) appraisal.status = status;
        if (finalFeedback !== undefined) appraisal.finalFeedback = finalFeedback;

        // Auto-calc final rating if completing
        if (status === 'Completed' && kpis) {
            const sum = kpis.reduce((acc, item) => acc + (item.managerRating || 0), 0);
            appraisal.finalRating = kpis.length > 0 ? (sum / kpis.length).toFixed(1) : 0;
        }

        await appraisal.save();
        res.json(appraisal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
