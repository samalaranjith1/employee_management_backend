const router = require('express').Router();
const Leave = require('../models/hr/Leave');
const verify = require('../middleware/auth');
const Employee = require('../models/Employee');

// Apply for Leave
router.post('/apply', verify, async (req, res) => {
    try {
        const newLeave = new Leave({
            employee: req.user._id,
            leaveType: req.body.leaveType,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            reason: req.body.reason
        });

        const savedLeave = await newLeave.save();
        res.json(savedLeave);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get My Leaves
router.get('/my-leaves', verify, async (req, res) => {
    try {
        const leaves = await Leave.find({ employee: req.user._id }).sort({ createdAt: -1 });
        res.json(leaves);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get Pending Approvals (For Manager/Admin)
// Logic: If I am a manager, get leaves where I am the reporting manager? 
// For simplicity in this version: Logic = If user is Manager/Admin, show ALL pending leaves.
router.get('/pending', verify, async (req, res) => {
    try {
        // Check role
        const user = await Employee.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.role === 'Employee') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const leaves = await Leave.find({ status: 'Pending' })
            .populate('employee', 'fullName email') // Show who asked
            .sort({ createdAt: 1 });

        res.json(leaves);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Approve/Reject Leave
router.put('/:id/status', verify, async (req, res) => {
    try {
        const { status } = req.body; // 'Approved' or 'Rejected'
        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const leave = await Leave.findByIdAndUpdate(
            req.params.id,
            {
                status: status,
                approvedBy: req.user._id
            },
            { new: true }
        );
        res.json(leave);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
