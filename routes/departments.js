const router = require('express').Router();
const Department = require('../models/core/Department');
const verify = require('../middleware/auth');

// Get All
router.get('/', verify, async (req, res) => {
    try {
        const departments = await Department.find().sort({ name: 1 }).populate('head', 'fullName');
        res.json(departments);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Create
router.post('/', verify, async (req, res) => {
    try {
        const data = { ...req.body };
        delete data._id;
        delete data.id;

        const newDept = new Department(data);
        const savedDept = await newDept.save();
        res.json(savedDept);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update
router.put('/:id', verify, async (req, res) => {
    try {
        const updates = { ...req.body };
        delete updates._id; // Prevent updating immutable field
        delete updates.id;

        const updatedDept = await Department.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        );
        res.json(updatedDept);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete
router.delete('/:id', verify, async (req, res) => {
    try {
        await Department.findByIdAndDelete(req.params.id);
        res.json({ message: 'Department deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
