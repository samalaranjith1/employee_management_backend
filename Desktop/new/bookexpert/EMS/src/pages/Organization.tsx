import { useState } from 'react';
import { useOrganization } from '../context/OrganizationContext';
import type { Department, Designation } from '../context/OrganizationContext';
import { Building2, Plus, Edit2, Trash2, Briefcase } from 'lucide-react';

export default function Organization() {
    const {
        departments, designations,
        addDepartment, updateDepartment, deleteDepartment,
        addDesignation, updateDesignation, deleteDesignation
    } = useOrganization();

    const [activeTab, setActiveTab] = useState<'departments' | 'designations'>('departments');

    // Modal states (simplified for speed - ideally separate components)
    const [isDeptModalOpen, setDeptModalOpen] = useState(false);
    const [deptForm, setDeptForm] = useState<Partial<Department>>({ name: '', code: '', description: '' });
    const [editingDeptId, setEditingDeptId] = useState<string | null>(null);

    const [isDesigModalOpen, setDesigModalOpen] = useState(false);
    const [desigForm, setDesigForm] = useState<Partial<Designation>>({ title: '', level: 1, description: '', department: '' });
    const [editingDesigId, setEditingDesigId] = useState<string | null>(null);

    // --- Department Handlers ---
    const handleDeptSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingDeptId) {
            await updateDepartment(editingDeptId, deptForm);
        } else {
            await addDepartment(deptForm);
        }
        setDeptModalOpen(false);
        setDeptForm({ name: '', code: '', description: '' });
        setEditingDeptId(null);
    };

    const openDeptEdit = (dept: Department) => {
        setDeptForm(dept);
        setEditingDeptId(dept.id);
        setDeptModalOpen(true);
    };

    const openDeptAdd = () => {
        setDeptForm({ name: '', code: '', description: '' });
        setEditingDeptId(null);
        setDeptModalOpen(true);
    };

    // --- Designation Handlers ---
    const handleDesigSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingDesigId) {
            await updateDesignation(editingDesigId, desigForm);
        } else {
            await addDesignation(desigForm);
        }
        setDesigModalOpen(false);
        setDesigForm({ title: '', level: 1, description: '', department: '' });
        setEditingDesigId(null);
    };

    const openDesigEdit = (desig: Designation) => {
        setDesigForm({
            ...desig,
            department: typeof desig.department === 'object' ? desig.department?.id : desig.department
        });
        setEditingDesigId(desig.id);
        setDesigModalOpen(true);
    };

    const openDesigAdd = () => {
        setDesigForm({ title: '', level: 1, description: '', department: '' });
        setEditingDesigId(null);
        setDesigModalOpen(true);
    };

    return (
        <div>
            <div className="glass-panel" style={{ marginBottom: '1.5rem', padding: '1rem', display: 'flex', gap: '1rem' }}>
                <button
                    className={`btn-secondary ${activeTab === 'departments' ? 'active-tab' : ''}`}
                    style={{ background: activeTab === 'departments' ? 'rgba(59, 130, 246, 0.2)' : 'transparent', color: activeTab === 'departments' ? '#60a5fa' : 'inherit' }}
                    onClick={() => setActiveTab('departments')}
                >
                    <Building2 size={18} style={{ display: 'inline', marginRight: '8px' }} />
                    Departments
                </button>
                <button
                    className={`btn-secondary ${activeTab === 'designations' ? 'active-tab' : ''}`}
                    style={{ background: activeTab === 'designations' ? 'rgba(59, 130, 246, 0.2)' : 'transparent', color: activeTab === 'designations' ? '#60a5fa' : 'inherit' }}
                    onClick={() => setActiveTab('designations')}
                >
                    <Briefcase size={18} style={{ display: 'inline', marginRight: '8px' }} />
                    Designations
                </button>
            </div>

            {/* --- DEPARTMENTS TAB --- */}
            {activeTab === 'departments' && (
                <div className="glass-panel" style={{ padding: '0' }}>
                    <div style={{ padding: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn-primary" onClick={openDeptAdd}>
                            <Plus size={18} style={{ marginRight: '6px' }} /> Add Department
                        </button>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th>Description</th>
                                    <th>Head</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departments.map(dept => (
                                    <tr key={dept.id}>
                                        <td style={{ fontWeight: 500 }}>{dept.name}</td>
                                        <td><span className="badge badge-secondary">{dept.code}</span></td>
                                        <td>{dept.description || '-'}</td>
                                        <td>{dept.head || '-'}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button className="action-btn" onClick={() => openDeptEdit(dept)}><Edit2 size={18} /></button>
                                                <button className="action-btn delete" onClick={() => deleteDepartment(dept.id)}><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {departments.length === 0 && (
                                    <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No departments found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* --- DESIGNATIONS TAB --- */}
            {activeTab === 'designations' && (
                <div className="glass-panel" style={{ padding: '0' }}>
                    <div style={{ padding: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn-primary" onClick={openDesigAdd}>
                            <Plus size={18} style={{ marginRight: '6px' }} /> Add Designation
                        </button>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Level</th>
                                    <th>Department</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {designations.map(desig => (
                                    <tr key={desig.id}>
                                        <td style={{ fontWeight: 500 }}>{desig.title}</td>
                                        <td>Level {desig.level}</td>
                                        <td>{(desig.department as Department)?.name || '-'}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button className="action-btn" onClick={() => openDesigEdit(desig)}><Edit2 size={18} /></button>
                                                <button className="action-btn delete" onClick={() => deleteDesignation(desig.id)}><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {designations.length === 0 && (
                                    <tr><td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>No designations found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* --- DEPARTMENT MODAL --- */}
            {isDeptModalOpen && (
                <div className="modal-overlay">
                    <div className="glass-panel modal-content" style={{ maxWidth: '400px' }}>
                        <div className="modal-header">
                            <h3>{editingDeptId ? 'Edit Department' : 'Add Department'}</h3>
                            <button className="close-btn" onClick={() => setDeptModalOpen(false)}>✕</button>
                        </div>
                        <form onSubmit={handleDeptSubmit} className="modal-body">
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input className="form-input" required value={deptForm.name} onChange={e => setDeptForm({ ...deptForm, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Code (e.g. ENG)</label>
                                <input className="form-input" required value={deptForm.code} onChange={e => setDeptForm({ ...deptForm, code: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea className="form-input" rows={3} value={deptForm.description} onChange={e => setDeptForm({ ...deptForm, description: e.target.value })} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setDeptModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- DESIGNATION MODAL --- */}
            {isDesigModalOpen && (
                <div className="modal-overlay">
                    <div className="glass-panel modal-content" style={{ maxWidth: '400px' }}>
                        <div className="modal-header">
                            <h3>{editingDesigId ? 'Edit Designation' : 'Add Designation'}</h3>
                            <button className="close-btn" onClick={() => setDesigModalOpen(false)}>✕</button>
                        </div>
                        <form onSubmit={handleDesigSubmit} className="modal-body">
                            <div className="form-group">
                                <label className="form-label">Job Title</label>
                                <input className="form-input" required value={desigForm.title} onChange={e => setDesigForm({ ...desigForm, title: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Department</label>
                                <select
                                    className="form-input"
                                    value={desigForm.department as string}
                                    onChange={e => setDesigForm({ ...desigForm, department: e.target.value })}
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Hierarchy Level (1=Junior, 5=Head)</label>
                                <input type="number" min="1" max="10" className="form-input" value={desigForm.level} onChange={e => setDesigForm({ ...desigForm, level: parseInt(e.target.value) })} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setDesigModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
