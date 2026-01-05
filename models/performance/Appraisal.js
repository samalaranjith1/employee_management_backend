const mongoose = require('mongoose');

const appraisalSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }, // Reporting Manager
    cycle: { type: String, required: true }, // e.g., "2026-Q1"

    // Goals & Ratings
    kpis: [{
        title: { type: String, required: true },
        description: String,

        // Self
        selfRating: { type: Number, min: 1, max: 5 },
        selfComment: String,

        // Manager
        managerRating: { type: Number, min: 1, max: 5 },
        managerComment: String
    }],

    finalRating: { type: Number }, // Average or overridden
    finalFeedback: { type: String },

    status: {
        type: String,
        enum: ['GoalSetting', 'SelfReview', 'ManagerReview', 'Completed'],
        default: 'GoalSetting'
    }
}, { timestamps: true });

appraisalSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Appraisal', appraisalSchema);
