const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },

    // ATS Enhancements
    department: { type: String, required: true },
    location: { type: String, default: 'Remote' },
    type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], default: 'Full-time' },
    remotePolicy: { type: String, enum: ['Remote', 'Hybrid', 'On-site'], default: 'Remote' },
    experienceLevel: { type: String, enum: ['Entry', 'Mid', 'Senior', 'Lead', 'Executive'], default: 'Mid' },
    skills: [String], // Required skills for AI matching
    salaryRange: {
        min: Number,
        max: Number,
        currency: { type: String, default: 'USD' }
    },
    screeningQuestions: [String],

    status: { type: String, enum: ['Open', 'Closed', 'Draft'], default: 'Open' },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    postedDate: { type: Date, default: Date.now }
}, { timestamps: true });

jobSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Job', jobSchema);
