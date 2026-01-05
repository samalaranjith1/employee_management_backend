const router = require('express').Router();
const Designation = require('../models/core/Designation');
const verify = require('../middleware/auth');

// Get All
router.get('/', verify, async (req, res) => {
    try {
        const designations = await Designation.find()
            .populate('department', 'name')
            .sort({ level: 1 }); // Sort by hierarchy level
        res.json(designations);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Create
router.post('/', verify, async (req, res) => {
    try {
        const newDesig = new Designation(req.body);
        const savedDesig = await newDesig.save();
        res.json(savedDesig);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update
router.put('/:id', verify, async (req, res) => {
    try {
        const updates = { ...req.body };
        delete updates._id;

        const updatedDesig = await Designation.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        );
        res.json(updatedDesig);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete
router.delete('/:id', verify, async (req, res) => {
    try {
        await Designation.findByIdAndDelete(req.params.id);
        res.json({ message: 'Designation deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
