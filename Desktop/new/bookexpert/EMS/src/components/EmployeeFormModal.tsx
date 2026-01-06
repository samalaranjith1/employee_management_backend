import { useState, useEffect } from 'react';
import { X, Upload, Save } from 'lucide-react';
import type { Employee } from '../types/employee';
import { useOrganization } from '../context/OrganizationContext'; // Hook to fetch Depts/Desigs
import { useEmployee } from '../context/EmployeeContext'; // To fetch Managers

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
    const { departments, designations } = useOrganization();
    const { employees } = useEmployee(); // Get all employees to populate Reporting Manager

    // Filter out the current employee from potential managers list to avoid self-reporting loops
    // (Simple check for now)
    const potentialManagers = employees.filter(e => !initialData || e.id !== initialData.id);

    // Initial Form State
    const defaultState: Omit<Employee, 'id'> = {
        fullName: '',
        email: '',
        gender: 'Male',
        dateOfBirth: '',
        state: '',
        isActive: true,
        avatar: '',
        status: 'Active',
        workMode: 'Office',
        department: '',
        designation: '',
        reportingManager: '',
        dateOfJoining: new Date().toISOString().split('T')[0]
    };

    const [formData, setFormData] = useState<Omit<Employee, 'id'>>(defaultState);

    useEffect(() => {
        if (initialData) {
            // Populate form with existing data
            setFormData({
                ...initialData,
                // Ensure dates are formatted for input[type="date"]
                dateOfBirth: initialData.dateOfBirth ? new Date(initialData.dateOfBirth).toISOString().split('T')[0] : '',
                dateOfJoining: initialData.dateOfJoining ? new Date(initialData.dateOfJoining).toISOString().split('T')[0] : '',
                // Ensure IDs are strings
                department: (initialData.department && typeof initialData.department === 'object') ? (initialData.department as any).id : initialData.department || '',
                designation: (initialData.designation && typeof initialData.designation === 'object') ? (initialData.designation as any).id : initialData.designation || '',
                reportingManager: (initialData.reportingManager && typeof initialData.reportingManager === 'object') ? (initialData.reportingManager as any).id : initialData.reportingManager || ''
            });
        } else {
            setFormData(defaultState);
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose(); // Optional: let parent close it on success
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
                        {/* LEFT COLUMN: Image & Personal */}
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

                            <div className="form-group" style={{ width: '100%', marginTop: '1rem' }}>
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    required
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>

                            <div className="form-group" style={{ width: '100%' }}>
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Official & Logistics */}
                        <div className="fields-section">
                            <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Professional Details</h4>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Department</label>
                                    <select
                                        className="form-input"
                                        value={formData.department as string}
                                        onChange={e => setFormData({ ...formData, department: e.target.value })}
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map(d => (
                                            <option key={d.id} value={d.id}>{d.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Designation</label>
                                    <select
                                        className="form-input"
                                        value={formData.designation as string}
                                        onChange={e => setFormData({ ...formData, designation: e.target.value })}
                                    >
                                        <option value="">Select Designation</option>
                                        {designations.map(d => (
                                            <option key={d.id} value={d.id}>{d.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Reporting Manager</label>
                                    <select
                                        className="form-input"
                                        value={formData.reportingManager as string}
                                        onChange={e => setFormData({ ...formData, reportingManager: e.target.value })}
                                    >
                                        <option value="">Select Manager</option>
                                        {potentialManagers.map(m => (
                                            <option key={m.id} value={m.id}>{m.fullName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Status</label>
                                    <div
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '1rem',
                                            background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-glass)'
                                        }}>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, status: 'Active', isActive: true })}
                                            style={{
                                                flex: 1, padding: '0.5rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
                                                background: formData.status === 'Active' ? '#10b981' : 'transparent',
                                                color: formData.status === 'Active' ? 'white' : 'var(--text-secondary)',
                                                fontWeight: formData.status === 'Active' ? 600 : 400,
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            Active
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, status: 'Inactive', isActive: false })}
                                            style={{
                                                flex: 1, padding: '0.5rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
                                                background: formData.status === 'Inactive' ? '#ef4444' : 'transparent',
                                                color: formData.status === 'Inactive' ? 'white' : 'var(--text-secondary)',
                                                fontWeight: formData.status === 'Inactive' ? 600 : 400,
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            Inactive
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Date of Joining</label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        value={formData.dateOfJoining}
                                        onChange={e => setFormData({ ...formData, dateOfJoining: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Work Mode</label>
                                    <select
                                        className="form-input"
                                        value={formData.workMode}
                                        onChange={e => setFormData({ ...formData, workMode: e.target.value as any })}
                                    >
                                        <option value="Office">Office</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="Remote">Remote</option>
                                    </select>
                                </div>
                            </div>

                            <h4 style={{ marginBottom: '1rem', marginTop: '1rem', color: 'var(--primary)' }}>Personal Details</h4>

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
