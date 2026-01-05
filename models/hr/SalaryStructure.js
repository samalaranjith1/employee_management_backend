const mongoose = require('mongoose');

const salaryStructureSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true, unique: true },

    // Earnings
    basic: { type: Number, required: true },
    hra: { type: Number, default: 0 },
    da: { type: Number, default: 0 }, // Dearness Allowance
    specialAllowance: { type: Number, default: 0 },

    // Deductions
    pf: { type: Number, default: 0 }, // Provident Fund
    tax: { type: Number, default: 0 }, // TDS

    // Totals (Cached for ease)
    grossSalary: { type: Number },
    netSalary: { type: Number },

    effectiveDate: { type: Date, default: Date.now }
}, { timestamps: true });

// Pre-save hook removed to prevent middleware issues. Calculation moved to route/controller.

salaryStructureSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('SalaryStructure', salaryStructureSchema);
