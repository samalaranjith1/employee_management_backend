const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    date: { type: Date, required: true }, // Normalised to start of day
    punchIn: { type: Date },
    punchOut: { type: Date },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Half Day', 'Leave', 'Holiday'],
        default: 'Absent'
    },
    workMode: { type: String, enum: ['Office', 'WFH', 'Hybrid'], default: 'Office' },
    totalHours: { type: Number, default: 0 },
    isLate: { type: Boolean, default: false }
}, { timestamps: true });

// Compound index to ensure one record per employee per day
attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

attendanceSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
