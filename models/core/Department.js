const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true }, // e.g., ENG, HR
    head: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }, // Department Head
    description: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

departmentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Department', departmentSchema);
