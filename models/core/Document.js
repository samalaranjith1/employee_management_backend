const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ['Resume', 'Contract', 'ID Proof', 'Offer Letter', 'Other'], default: 'Other' },
    fileData: { type: String, required: true }, // Base64 string
    fileName: { type: String }, // Original file name
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // HR or Self
}, { timestamps: true });

documentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        // Don't send fileData down always? It might be huge. But frontend needs it to display/download.
        // For now keep it.
    }
});

module.exports = mongoose.model('Document', documentSchema);
