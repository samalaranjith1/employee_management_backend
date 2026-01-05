const router = require('express').Router();
const Attendance = require('../models/hr/Attendance');
const verify = require('../middleware/auth');

// Get My Attendance (For logged in user)
router.get('/my-attendance', verify, async (req, res) => {
    try {
        const attendance = await Attendance.find({ employee: req.user._id })
            .sort({ date: -1 })
            .limit(30); // Last 30 days
        res.json(attendance);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get Today's Status
router.get('/today', verify, async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const attendance = await Attendance.findOne({
            employee: req.user._id,
            date: { $gte: startOfDay, $lte: endOfDay }
        });
        res.json(attendance);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Punch In
router.post('/punch-in', verify, async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const existing = await Attendance.findOne({
            employee: req.user._id,
            date: { $gte: startOfDay }
        });

        if (existing) {
            return res.status(400).json({ message: 'Already punched in today' });
        }

        const newAttendance = new Attendance({
            employee: req.user._id,
            date: new Date(),
            punchIn: new Date(),
            status: 'Present',
            workMode: req.body.workMode || 'Office' // Optional from body
        });

        await newAttendance.save();
        res.json(newAttendance);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Punch Out
router.post('/punch-out', verify, async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const attendance = await Attendance.findOne({
            employee: req.user._id,
            date: { $gte: startOfDay }
        });

        if (!attendance) {
            return res.status(400).json({ message: 'No attendance record found for today' });
        }

        if (attendance.punchOut) {
            return res.status(400).json({ message: 'Already punched out today' });
        }

        attendance.punchOut = new Date();

        // Calculate Total Hours
        const diffMs = attendance.punchOut - attendance.punchIn;
        const diffHrs = diffMs / (1000 * 60 * 60);
        attendance.totalHours = parseFloat(diffHrs.toFixed(2));

        await attendance.save();
        res.json(attendance);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
