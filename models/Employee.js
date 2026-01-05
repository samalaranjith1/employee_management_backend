const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    // --- Personal ---
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional, if they can login
    gender: { type: String },
    dateOfBirth: { type: Date },
    avatar: { type: String },
    phone: { type: String },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String
    },
    state: { type: String }, // Added to match frontend form

    // --- Official ---
    employeeId: { type: String, unique: true, sparse: true }, // Custom ID e.g., EMS001
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    designation: { type: mongoose.Schema.Types.ObjectId, ref: 'Designation' },
    reportingManager: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    dateOfJoining: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['Active', 'Probation', 'Notice Period', 'Terminated', 'Resigned', 'Inactive'],
        default: 'Active'
    },
    workMode: { type: String, enum: ['Office', 'Remote', 'Hybrid'], default: 'Office' },

    // --- System ---
    isActive: { type: Boolean, default: true },
    role: { type: String, enum: ['Admin', 'HR', 'Manager', 'Employee'], default: 'Employee' }

}, { timestamps: true });

// Virtual for ID
employeeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
    }
});

module.exports = mongoose.model('Employee', employeeSchema);
