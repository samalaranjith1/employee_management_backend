import { useState, useEffect } from 'react';
import { X, Upload, Save } from 'lucide-react';
import type { Employee } from '../types/employee';

interface EmployeeFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<Employee, 'id'>) => void;
    initialData?: Employee;
}

const INDIA_STATES = [
    'Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Karnataka',
    'Kerala', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu',
    'Telangana', 'Uttar Pradesh', 'West Bengal'
];

export default function EmployeeFormModal({ isOpen, onClose, onSubmit, initialData }: EmployeeFormModalProps) {
    const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
        fullName: '',
        email: '',
        gender: 'Male',
        dateOfBirth: '',
        state: '',
        isActive: true,
        avatar: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            // Reset form
            setFormData({
                fullName: '',
                email: '',
                gender: 'Male',
                dateOfBirth: '',
                state: '',
                isActive: true,
                avatar: ''
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="glass-panel modal-content">
                <div className="modal-header">
                    <h2 style={{ fontSize: '1.25rem' }}>
                        {initialData ? 'Edit Employee' : 'Add New Employee'}
                    </h2>
                    <button onClick={onClose} className="close-btn">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-body">
                    <div className="form-grid">
                        {/* Image Upload Section */}
                        <div className="image-upload-section">
                            <div className="image-preview">
                                {formData.avatar ? (
                                    <img src={formData.avatar} alt="Preview" />
                                ) : (
                                    <div className="placeholder">
                                        <Upload size={24} />
                                    </div>
                                )}
                            </div>
                            <label className="btn-secondary upload-btn">
                                Upload Photo
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>

                        {/* Form Fields - 2 Column Grid */}
                        <div className="fields-section">
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    required
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Gender</label>
                                    <select
                                        className="form-input"
                                        value={formData.gender}
                                        onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Date of Birth</label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        required
                                        value={formData.dateOfBirth}
                                        onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">State</label>
                                <select
                                    className="form-input"
                                    required
                                    value={formData.state}
                                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                                >
                                    <option value="">Select State</option>
                                    {INDIA_STATES.map(state => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                                    />
                                    <span style={{ marginLeft: '0.5rem' }}>Active Employee</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
                        <button type="submit" className="btn-primary" style={{ display: 'flex', gap: '0.5rem' }}>
                            <Save size={18} />
                            Save Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
