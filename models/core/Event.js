const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['Announcement', 'Event', 'Holiday', 'Meeting'], default: 'Announcement' },
    date: { type: Date, default: Date.now }, // For events, this is the event date. For announcements, it's the post date.
    audience: { type: String, enum: ['All', 'Department', 'Management'], default: 'All' },
    targetDepartment: { type: String }, // Optional, if audience is Department
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
}, { timestamps: true });

eventSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Event', eventSchema);
