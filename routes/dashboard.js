const router = require('express').Router();
const Employee = require('../models/Employee');
const Attendance = require('../models/hr/Attendance');
const Leave = require('../models/hr/Leave');
const Job = require('../models/recruitment/Job');
const Event = require('../models/core/Event');
const verify = require('../middleware/auth');

router.get('/stats', verify, async (req, res) => {
    try {
        // 1. Employee Count
        const activeEmployees = await Employee.countDocuments({ isActive: true });
        const inactiveEmployees = await Employee.countDocuments({ isActive: false });
        const totalEmployees = activeEmployees + inactiveEmployees;

        // 2. Attendance Today
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const presentToday = await Attendance.countDocuments({
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        // 3. Pending Leaves
        const pendingLeaves = await Leave.countDocuments({ status: 'Pending' });

        // 4. Open Jobs
        const openJobs = await Job.countDocuments({ status: 'Open' });

        // 5. Recent Events
        const recentEvents = await Event.find().sort({ createdAt: -1 }).limit(3);

        res.json({
            totalEmployees,
            activeEmployees,
            inactiveEmployees,
            presentToday,
            pendingLeaves,
            openJobs,
            recentEvents
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
