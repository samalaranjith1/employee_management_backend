const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Logging Middleware - Log every request
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);
    next();
});

// Root Route
app.get('/', (req, res) => {
    res.send('EMS Backend API is Running');
});

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ems_db')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// 404 Handler - Catch any route that doesn't match
app.use((req, res) => {
    console.log(`[404] Route not found: ${req.method} ${req.url}`);
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.url}`,
        availableRoutes: ['/api/auth', '/api/employees']
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('[ERROR]', err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

const PORT = 5001; // CHANGED PORT TO AVOID CONFLICTS
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Registered Routes:');
    console.log('- /api/auth');
    console.log('- /api/employees');
});
