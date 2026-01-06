import { useState } from 'react';
import { usePerformance } from '../context/PerformanceContext';
import type { Appraisal, KPI } from '../context/PerformanceContext';
import { Target, Star, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Performance() {
    const { myAppraisals, pendingReviews, createAppraisal, updateAppraisal } = usePerformance();

    const [activeTab, setActiveTab] = useState<'my-goals' | 'team-reviews'>('my-goals');

    // Create/Edit Modal
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingAppraisal, setEditingAppraisal] = useState<Appraisal | null>(null);

    // Form State
    const [cycle, setCycle] = useState('2026-Q1');
    const [kpis, setKpis] = useState<KPI[]>([{ title: '', description: '' }]);

    const openForGoalSetting = () => {
        setEditingAppraisal(null);
        setKpis([{ title: '', description: '' }]);
        setModalOpen(true);
    };

    const openForSelfReview = (appraisal: Appraisal) => {
        setEditingAppraisal(appraisal);
        setCycle(appraisal.cycle);
        setKpis(appraisal.kpis.map(k => ({ ...k }))); // Copy
        setModalOpen(true);
    };

    const openForManagerReview = (appraisal: Appraisal) => {
        setEditingAppraisal(appraisal);
        setCycle(appraisal.cycle);
        setKpis(appraisal.kpis.map(k => ({ ...k })));
        setModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!cycle.trim()) {
            toast.error('Please specify a review cycle (e.g., 2026-Q1)');
            return;
        }

        if (kpis.some(k => !k.title.trim())) {
            toast.error('All goals must have a title');
            return;
        }

        if (editingAppraisal) {
            // Update
            // Logic is complex for a single submit, so I'll simplify:
            // "Save" just saves. A separate "Submit" button could be better, but let's do it implicitly for now.

            if (activeTab === 'team-reviews') {
                // Manager Saving
                await updateAppraisal(editingAppraisal._id, { kpis, status: 'Completed' });
            } else {
                // Employee Saving
                if (editingAppraisal.status === 'GoalSetting') {
                    // Let's say we are "Starting" the cycle.
                    await updateAppraisal(editingAppraisal._id, { kpis, status: 'SelfReview' });
                } else if (editingAppraisal.status === 'SelfReview') {
                    await updateAppraisal(editingAppraisal._id, { kpis, status: 'ManagerReview' });
                }
            }
        } else {
            // Create
            await createAppraisal({ cycle, kpis });
        }
        setModalOpen(false);
    };

    const addKpiRow = () => {
        setKpis([...kpis, { title: '', description: '' }]);
    };

    const updateKpi = (index: number, field: keyof KPI, value: any) => {
        const newKpis = [...kpis];
        newKpis[index] = { ...newKpis[index], [field]: value };
        setKpis(newKpis);
    };

    return (
        <div>
            <div className="glass-panel" style={{ marginBottom: '1.5rem', padding: '1rem', display: 'flex', gap: '1rem' }}>
                <button
                    className={`btn-secondary ${activeTab === 'my-goals' ? 'active-tab' : ''}`}
                    style={{ background: activeTab === 'my-goals' ? 'rgba(59, 130, 246, 0.2)' : 'transparent' }}
                    onClick={() => setActiveTab('my-goals')}
                >
                    <Target size={18} style={{ display: 'inline', marginRight: '8px' }} />
                    My Appraisals
                </button>
                <button
                    className={`btn-secondary ${activeTab === 'team-reviews' ? 'active-tab' : ''}`}
                    style={{ background: activeTab === 'team-reviews' ? 'rgba(59, 130, 246, 0.2)' : 'transparent' }}
                    onClick={() => setActiveTab('team-reviews')}
                >
                    <Users size={18} style={{ display: 'inline', marginRight: '8px' }} />
                    Team Reviews
                </button>
            </div>

            {/* --- MY APPRAISALS --- */}
            {activeTab === 'my-goals' && (
                <div className="glass-panel" style={{ padding: 0 }}>
                    <div style={{ padding: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn-primary" onClick={openForGoalSetting}>
                            <Target size={18} style={{ marginRight: '6px' }} /> Set New Goals
                        </button>
                    </div>

                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Cycle</th>
                                    <th>Goals</th>
                                    <th>Status</th>
                                    <th>Rating</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myAppraisals.map(app => (
                                    <tr key={app._id}>
                                        <td style={{ fontWeight: 600 }}>{app.cycle}</td>
                                        <td>{app.kpis.length} KPIs</td>
                                        <td>
                                            <span className="badge badge-secondary">{app.status}</span>
                                        </td>
                                        <td style={{ fontWeight: 700, color: '#f59e0b' }}>
                                            {app.finalRating ? <><Star size={14} style={{ display: 'inline', marginRight: 2 }} fill="#f59e0b" /> {app.finalRating}</> : '-'}
                                        </td>
                                        <td>
                                            {app.status === 'GoalSetting' && (
                                                <button className="btn-primary" style={{ fontSize: '0.8rem' }} onClick={() => openForSelfReview(app)}>
                                                    Edits Goals
                                                </button>
                                            )}
                                            {app.status === 'SelfReview' && (
                                                <button className="btn-primary" style={{ fontSize: '0.8rem' }} onClick={() => openForSelfReview(app)}>
                                                    Submit Review
                                                </button>
                                            )}
                                            {app.status === 'Completed' && (
                                                <button className="btn-secondary" style={{ fontSize: '0.8rem' }}>View</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {myAppraisals.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No appraisal records.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* --- TEAM REVIEWS --- */}
            {activeTab === 'team-reviews' && (
                <div className="glass-panel" style={{ padding: 0 }}>
                    <div style={{ padding: '1rem' }}>
                        <h3>Pending Reviews</h3>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Cycle</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingReviews.map(app => (
                                    <tr key={app._id}>
                                        <td>
                                            <div style={{ fontWeight: 600 }}>{typeof app.employee === 'object' ? app.employee.fullName : 'Unknown'}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'gray' }}>{typeof app.employee === 'object' ? app.employee.designation?.title || '' : ''}</div>
                                        </td>
                                        <td>{app.cycle}</td>
                                        <td><span className="badge badge-warning">{app.status}</span></td>
                                        <td>
                                            <button className="btn-primary" style={{ fontSize: '0.8rem' }} onClick={() => openForManagerReview(app)}>
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {pendingReviews.length === 0 && <tr><td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>No pending reviews.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* --- MODAL --- */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="glass-panel modal-content" style={{ maxWidth: '800px' }}>
                        <div className="modal-header">
                            <h3>{editingAppraisal ? 'Appraisal Form' : 'Set Cycle Goals'}</h3>
                            <button className="close-btn" onClick={() => setModalOpen(false)}>✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-body">
                            {!editingAppraisal && (
                                <div className="form-group" style={{ maxWidth: '200px' }}>
                                    <label className="form-label">Review Cycle</label>
                                    <input className="form-input" value={cycle} onChange={e => setCycle(e.target.value)} placeholder="e.g. 2026-Q1" />
                                </div>
                            )}

                            <h4 style={{ margin: '1rem 0' }}>Key Performance Indicators (KPIs)</h4>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {kpis.map((kpi, index) => (
                                    <div key={index} className="glass-panel" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
                                        <div className="form-row">
                                            <div className="form-group" style={{ flex: 2 }}>
                                                <label className="form-label">Goal Title</label>
                                                <input
                                                    className="form-input"
                                                    value={kpi.title}
                                                    onChange={e => updateKpi(index, 'title', e.target.value)}
                                                    disabled={editingAppraisal?.status === 'ManagerReview' || editingAppraisal?.status === 'Completed'}
                                                />
                                            </div>
                                            <div className="form-group" style={{ flex: 3 }}>
                                                <label className="form-label">Description</label>
                                                <input
                                                    className="form-input"
                                                    value={kpi.description}
                                                    onChange={e => updateKpi(index, 'description', e.target.value)}
                                                    disabled={editingAppraisal?.status === 'ManagerReview' || editingAppraisal?.status === 'Completed'}
                                                />
                                            </div>
                                        </div>

                                        {/* Ratings Section */}
                                        {editingAppraisal && (
                                            <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1rem' }}>
                                                {/* Self Review */}
                                                {(editingAppraisal.status === 'SelfReview' || editingAppraisal.status === 'ManagerReview' || editingAppraisal.status === 'Completed') && (
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label className="form-label" style={{ color: '#60a5fa' }}>Self Rating (1-5)</label>
                                                            <input
                                                                type="number"
                                                                min="1" max="5"
                                                                className="form-input"
                                                                value={kpi.selfRating || ''}
                                                                onChange={e => updateKpi(index, 'selfRating', parseInt(e.target.value))}
                                                                disabled={editingAppraisal.status !== 'SelfReview'}
                                                            />
                                                        </div>
                                                        <div className="form-group" style={{ flex: 2 }}>
                                                            <label className="form-label" style={{ color: '#60a5fa' }}>Self Comments</label>
                                                            <input
                                                                className="form-input"
                                                                value={kpi.selfComment || ''}
                                                                onChange={e => updateKpi(index, 'selfComment', e.target.value)}
                                                                disabled={editingAppraisal.status !== 'SelfReview'}
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Manager Review */}
                                                {(editingAppraisal.status === 'ManagerReview' || editingAppraisal.status === 'Completed') && (
                                                    <div className="form-row" style={{ marginTop: '0.5rem' }}>
                                                        <div className="form-group">
                                                            <label className="form-label" style={{ color: '#f59e0b' }}>Manager Rating (1-5)</label>
                                                            <input
                                                                type="number"
                                                                min="1" max="5"
                                                                className="form-input"
                                                                value={kpi.managerRating || ''}
                                                                onChange={e => updateKpi(index, 'managerRating', parseInt(e.target.value))}
                                                                disabled={activeTab !== 'team-reviews'}
                                                            />
                                                        </div>
                                                        <div className="form-group" style={{ flex: 2 }}>
                                                            <label className="form-label" style={{ color: '#f59e0b' }}>Manager Comments</label>
                                                            <input
                                                                className="form-input"
                                                                value={kpi.managerComment || ''}
                                                                onChange={e => updateKpi(index, 'managerComment', e.target.value)}
                                                                disabled={activeTab !== 'team-reviews'}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {(!editingAppraisal || editingAppraisal.status === 'GoalSetting') && (
                                <button type="button" className="btn-secondary" style={{ marginTop: '1rem' }} onClick={addKpiRow}>
                                    + Add Goal
                                </button>
                            )}

                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">
                                    {editingAppraisal ? (activeTab === 'team-reviews' ? 'Complete Review' : 'Submit Updates') : 'Initialize Cycle'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
