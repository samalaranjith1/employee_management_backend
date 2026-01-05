const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },

    // Profile & Resume
    resumeUrl: { type: String }, // Link to stored file
    portfolio: {
        linkedin: String,
        github: String,
        website: String
    },
    experience: { type: Number, default: 0 }, // Years
    skills: [String], // Extracted or manual tags
    screeningAnswers: [{
        question: String,
        answer: String
    }],

    // AI & ATS
    aiScore: { type: Number, default: 0 }, // 0-100 match score
    aiInsights: String, // Reason for score

    status: {
        type: String,
        enum: ['New', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'],
        default: 'New'
    },
    notes: [String]
}, { timestamps: true });

candidateSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Candidate', candidateSchema);
