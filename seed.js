const mongoose = require('mongoose');
const User = require('./models/User');
const Employee = require('./models/Employee');
const Department = require('./models/core/Department');
const Designation = require('./models/core/Designation');
const bcrypt = require('bcryptjs');

const DUMMY_DEPARTMENTS = [
    { name: 'Engineering', code: 'ENG', description: 'Software Development' },
    { name: 'Human Resources', code: 'HR', description: 'Employee Relations' },
    { name: 'Sales', code: 'SAL', description: 'Client Acquisition' }
];

const DUMMY_DESIGNATIONS = [
    { title: 'Software Engineer', level: 2, dept: 'Engineering' },
    { title: 'Senior Developer', level: 3, dept: 'Engineering' },
    { title: 'HR Executive', level: 2, dept: 'Human Resources' },
    { title: 'Sales Manager', level: 4, dept: 'Sales' }
];

const DUMMY_EMPLOYEES = [
    {
        fullName: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        gender: 'Male',
        dateOfBirth: '1990-05-15',
        state: 'Maharashtra',
        status: 'Active',
        role: 'Manager',
        workMode: 'Hybrid'
    },
    {
        fullName: 'Priya Patel',
        email: 'priya.patel@example.com',
        gender: 'Female',
        dateOfBirth: '1992-08-22',
        state: 'Gujarat',
        status: 'Active',
        role: 'Employee',
        workMode: 'Office'
    },
    {
        fullName: 'Amit Kumar',
        email: 'amit.kumar@example.com',
        gender: 'Male',
        dateOfBirth: '1988-11-30',
        state: 'Delhi',
        status: 'Terminated',
        role: 'Employee',
        workMode: 'Remote'
    },
    {
        fullName: 'Sneha Reddy',
        email: 'sneha.reddy@example.com',
        gender: 'Female',
        dateOfBirth: '1995-02-10',
        state: 'Telangana',
        status: 'Active',
        role: 'Employee',
        workMode: 'Office'
    },
    {
        fullName: 'Vikram Singh',
        email: 'vikram.singh@example.com',
        gender: 'Male',
        dateOfBirth: '1985-07-05',
        state: 'Punjab',
        status: 'Active',
        role: 'Manager',
        workMode: 'Hybrid'
    }
];

mongoose.connect('mongodb://localhost:27017/ems_db')
    .then(async () => {
        console.log('Connected to DB');

        // --- Clear Data ---
        await Department.deleteMany({});
        await Designation.deleteMany({});
        await Employee.deleteMany({});
        console.log('Cleared existing data');

        // --- Seed Departments ---
        const deptMap = {};
        for (const d of DUMMY_DEPARTMENTS) {
            const newDept = new Department(d);
            await newDept.save();
            deptMap[d.name] = newDept._id;
            console.log(`Created Department: ${d.name}`);
        }

        // --- Seed Designations ---
        const desigMap = {};
        for (const d of DUMMY_DESIGNATIONS) {
            const newDesig = new Designation({
                title: d.title,
                level: d.level,
                department: deptMap[d.dept]
            });
            await newDesig.save();
            desigMap[d.title] = newDesig._id;
            console.log(`Created Designation: ${d.title}`);
        }

        // --- Seed Employees ---
        // Manually assigning for demo
        const employees = [];

        // Rahul - Senior Dev
        employees.push({
            ...DUMMY_EMPLOYEES[0],
            department: deptMap['Engineering'],
            designation: desigMap['Senior Developer']
        });

        // Priya - HR Exec
        employees.push({
            ...DUMMY_EMPLOYEES[1],
            department: deptMap['Human Resources'],
            designation: desigMap['HR Executive']
        });

        // Amit - Software Engineer
        employees.push({
            ...DUMMY_EMPLOYEES[2],
            department: deptMap['Engineering'],
            designation: desigMap['Software Engineer']
        });

        // Others generic
        employees.push({ ...DUMMY_EMPLOYEES[3], department: deptMap['Engineering'], designation: desigMap['Software Engineer'] });
        employees.push({ ...DUMMY_EMPLOYEES[4], department: deptMap['Sales'], designation: desigMap['Sales Manager'] });


        await Employee.insertMany(employees);
        console.log(`Seeded ${employees.length} employees`);

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
            console.log('Admin User Created');
        }

        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
