const router = require('express').Router();
const Employee = require('../models/Employee');
const verify = require('../middleware/auth');

// Get All
router.get('/', verify, async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.json(employees);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Create
router.post('/', verify, async (req, res) => {
    try {
        const emailExist = await Employee.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).send({ message: 'Email already exists' });

        const employee = new Employee(req.body);
        const savedEmployee = await employee.save();
        res.json(savedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update
router.put('/:id', verify, async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete
router.delete('/:id', verify, async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
