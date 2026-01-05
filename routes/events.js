const router = require('express').Router();
const Event = require('../models/core/Event');
const verify = require('../middleware/auth');

// Create Event/Announcement (Admin/Manager only ideally, but unrestricted for demo)
router.post('/', verify, async (req, res) => {
    try {
        const newEvent = new Event({
            ...req.body,
            createdBy: req.user._id
        });
        await newEvent.save();
        res.json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get Active Events (Future events + Recent announcements)
router.get('/', verify, async (req, res) => {
    try {
        // Simple logic: Get all for now, sort by date desc
        const events = await Event.find().sort({ date: -1 }).limit(50);
        res.json(events);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete Event
router.delete('/:id', verify, async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
