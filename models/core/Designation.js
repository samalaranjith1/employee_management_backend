const mongoose = require('mongoose');

const designationSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }, // e.g., Senior Engineer
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    level: { type: Number }, // Hierarchy level (1=Junior, 5=Director)
    description: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

designationSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Designation', designationSchema);
