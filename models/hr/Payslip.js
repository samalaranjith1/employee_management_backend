const mongoose = require('mongoose');

const payslipSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    month: { type: Number, required: true }, // 1-12
    year: { type: Number, required: true },

    // Snapshot of structure at generation time
    basic: Number,
    hra: Number,
    da: Number,
    specialAllowance: Number,

    // Variable Components
    bonus: { type: Number, default: 0 },
    overtime: { type: Number, default: 0 },
    lossOfPay: { type: Number, default: 0 }, // Deduction for unpaid leaves

    // Final Calculations
    totalEarnings: Number,
    totalDeductions: Number,
    netPay: Number,

    status: { type: String, enum: ['Draft', 'Published', 'Paid'], default: 'Draft' },
    paymentDate: Date,
    transactionId: String

}, { timestamps: true });

payslipSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Payslip', payslipSchema);
