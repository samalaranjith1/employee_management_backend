const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const departmentRoutes = require('./routes/departments');
const designationRoutes = require('./routes/designations');
const attendanceRoutes = require('./routes/attendance');
const leaveRoutes = require('./routes/leave');
const payrollRoutes = require('./routes/payroll');
const performanceRoutes = require('./routes/performance');
const documentRoutes = require('./routes/documents');
const recruitmentRoutes = require('./routes/recruitment');
const eventRoutes = require('./routes/events');
// NEW
const dashboardRoutes = require('./routes/dashboard');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Logging Middleware
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
app.use('/api/departments', departmentRoutes);
app.use('/api/designations', designationRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/recruitment', recruitmentRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/dashboard', dashboardRoutes); // Register Dashboard

// 404 Handler - Catch any route that doesn't match
app.use((req, res) => {
    console.log(`[404] Route not found: ${req.method} ${req.url}`);
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.url}`,
        availableRoutes: [
            '/api/auth',
            '/api/employees',
            '/api/departments',
            '/api/designations',
            '/api/attendance',
            '/api/leave',
            '/api/payroll',
            '/api/performance',
            '/api/documents',
            '/api/recruitment',
            '/api/events',
            '/api/dashboard'
        ]
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('[ERROR]', err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5001;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
