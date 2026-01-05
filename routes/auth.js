const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register (Helper to create admin)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const emailExist = await User.findOne({ email });
        if (emailExist) return res.status(400).send('Email already exists');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.send({ message: 'User registered' });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Email not found');

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).send('Invalid password');

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '24h' });

        // Return same structure as mock
        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar }
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
