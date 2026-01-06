import { useState } from 'react';
import { useDocuments } from '../context/DocumentContext';
import { FileText, Upload, Trash2, Download } from 'lucide-react';

export default function Documents() {
    const { documents, uploadDocument, deleteDocument } = useDocuments();
    const [isModalOpen, setModalOpen] = useState(false);
    const [uploadForm, setUploadForm] = useState({
        title: '',
        type: 'Resume',
        fileData: '',
        fileName: ''
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadForm(prev => ({
                    ...prev,
                    fileData: reader.result as string,
                    fileName: file.name
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await uploadDocument(uploadForm);
        setModalOpen(false);
        setUploadForm({ title: '', type: 'Resume', fileData: '', fileName: '' });
    };

    const downloadFile = (dataUrl: string, fileName: string) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = fileName || 'document';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <div className="glass-panel" style={{ padding: 0 }}>
                <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>My Documents</h3>
                    <button className="btn-primary" onClick={() => setModalOpen(true)}>
                        <Upload size={18} style={{ marginRight: '6px' }} /> Upload New
                    </button>
                </div>

                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Uploaded On</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map(doc => (
                                <tr key={doc._id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.5rem', borderRadius: '0.5rem', color: '#60a5fa' }}>
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 500 }}>{doc.title}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{doc.fileName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span className="badge badge-secondary">{doc.type}</span></td>
                                    <td>{new Date(doc.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                className="action-btn"
                                                title="Download"
                                                onClick={() => downloadFile(doc.fileData, doc.fileName || 'download')}
                                            >
                                                <Download size={18} />
                                            </button>
                                            <button
                                                className="action-btn delete"
                                                title="Delete"
                                                onClick={() => deleteDocument(doc._id)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {documents.length === 0 && (
                                <tr><td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>No documents uploaded.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* UPLOAD MODAL */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="glass-panel modal-content" style={{ maxWidth: '400px' }}>
                        <div className="modal-header">
                            <h3>Upload Document</h3>
                            <button className="close-btn" onClick={() => setModalOpen(false)}>✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-body">
                            <div className="form-group">
                                <label className="form-label">Document Title</label>
                                <input
                                    className="form-input"
                                    required
                                    value={uploadForm.title}
                                    onChange={e => setUploadForm({ ...uploadForm, title: e.target.value })}
                                    placeholder="e.g. My Resume"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Type</label>
                                <select
                                    className="form-input"
                                    value={uploadForm.type}
                                    onChange={e => setUploadForm({ ...uploadForm, type: e.target.value })}
                                >
                                    <option>Resume</option>
                                    <option>Contract</option>
                                    <option>ID Proof</option>
                                    <option>Offer Letter</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">File</label>
                                <div style={{ border: '1px dashed var(--border-glass)', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center', position: 'relative' }}>
                                    <input
                                        type="file"
                                        required
                                        onChange={handleFileChange}
                                        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                                    />
                                    <Upload size={24} style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }} />
                                    <div style={{ fontSize: '0.9rem' }}>
                                        {uploadForm.fileName ? (
                                            <span style={{ color: '#10b981' }}>{uploadForm.fileName}</span>
                                        ) : (
                                            <span style={{ color: 'var(--text-secondary)' }}>Click or Drag file here</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-primary" disabled={!uploadForm.fileData}>Upload</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
