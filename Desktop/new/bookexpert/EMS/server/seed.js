const mongoose = require('mongoose');
const User = require('./models/User');
const Employee = require('./models/Employee');
const bcrypt = require('bcryptjs');

const DUMMY_EMPLOYEES = [
    {
        fullName: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        gender: 'Male',
        dateOfBirth: '1990-05-15',
        state: 'Maharashtra',
        isActive: true,
        avatar: ''
    },
    {
        fullName: 'Priya Patel',
        email: 'priya.patel@example.com',
        gender: 'Female',
        dateOfBirth: '1992-08-22',
        state: 'Gujarat',
        isActive: true,
        avatar: ''
    },
    {
        fullName: 'Amit Kumar',
        email: 'amit.kumar@example.com',
        gender: 'Male',
        dateOfBirth: '1988-11-30',
        state: 'Delhi',
        isActive: false,
        avatar: ''
    },
    {
        fullName: 'Sneha Reddy',
        email: 'sneha.reddy@example.com',
        gender: 'Female',
        dateOfBirth: '1995-02-10',
        state: 'Telangana',
        isActive: true,
        avatar: ''
    },
    {
        fullName: 'Vikram Singh',
        email: 'vikram.singh@example.com',
        gender: 'Male',
        dateOfBirth: '1985-07-05',
        state: 'Punjab',
        isActive: true,
        avatar: ''
    },
    {
        fullName: 'Anjali Gupta',
        email: 'anjali.gupta@example.com',
        gender: 'Female',
        dateOfBirth: '1993-12-18',
        state: 'Uttar Pradesh',
        isActive: true,
        avatar: ''
    },
    {
        fullName: 'Mohammed Khan',
        email: 'mohammed.khan@example.com',
        gender: 'Male',
        dateOfBirth: '1991-09-25',
        state: 'Karnataka',
        isActive: false,
        avatar: ''
    }
];

mongoose.connect('mongodb://localhost:27017/ems_db')
    .then(async () => {
        console.log('Connected to DB');

        // --- Seed Admin ---
        const admin = await User.findOne({ email: 'admin@example.com' });
        if (!admin) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('password', salt);
            const newAdmin = new User({
                name: 'Admin User',
                email: 'admin@example.com',
                password: hashedPassword,
                avatar: ''
            });
            await newAdmin.save();
            console.log('Admin User Created: admin@example.com / password');
        } else {
            console.log('Admin already exists');
        }

        // --- Seed Employees ---
        // Optional: clear existing employees to avoid duplicates if running multiple times, 
        // or check existence. For simplicity in this "seed", let's clear and re-seed 
        // OR just add if not present. Let's clear for a clean slate.
        await Employee.deleteMany({});
        console.log('Cleared existing employees');

        await Employee.insertMany(DUMMY_EMPLOYEES);
        console.log(`Seeded ${DUMMY_EMPLOYEES.length} employees`);

        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
