const router = require('express').Router();
const Document = require('../models/core/Document');
const verify = require('../middleware/auth');

// Upload Document
router.post('/upload', verify, async (req, res) => {
    try {
        const { title, type, fileData, fileName } = req.body;

        const newDoc = new Document({
            employee: req.user._id, // Uploading for self for now, or could be param
            title,
            type,
            fileData, // Base64
            fileName,
            uploadedBy: req.user._id
        });

        await newDoc.save();
        res.json(newDoc);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get My Documents
router.get('/my-documents', verify, async (req, res) => {
    try {
        const docs = await Document.find({ employee: req.user._id }).sort({ createdAt: -1 });
        res.json(docs);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete Document
router.delete('/:id', verify, async (req, res) => {
    try {
        const doc = await Document.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Document not found' });

        // Check permission (Self or Admin) - simplified to self here
        if (doc.employee.toString() !== req.user._id && req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        await Document.findByIdAndDelete(req.params.id);
        res.json({ message: 'Document deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
