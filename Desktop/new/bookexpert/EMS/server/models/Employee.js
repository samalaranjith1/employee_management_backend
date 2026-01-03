const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    state: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    avatar: { type: String }
}, { timestamps: true });

// Convert _id to id for frontend compatibility
employeeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Employee', employeeSchema);
