import { useState } from 'react';
import { useLeave } from '../context/LeaveContext';
import { CalendarDays, Plus, CheckCircle, XCircle } from 'lucide-react';
// @ts-ignore
import { useAuth } from '../context/AuthContext';


export default function Leave() {
    const { myLeaves, pendingLeaves, applyForLeave, updateLeaveStatus } = useLeave();
    // @ts-ignore
    const { user } = useAuth(); // To check if manager

    const [activeTab, setActiveTab] = useState<'my-leaves' | 'approvals'>('my-leaves');
    const [isApplyModalOpen, setApplyModalOpen] = useState(false);
    const [applyForm, setApplyForm] = useState({
        leaveType: 'Casual Leave',
        startDate: '',
        endDate: '',
        reason: ''
    });

    const handleApply = async (e: React.FormEvent) => {
        e.preventDefault();
        await applyForLeave(applyForm);
        setApplyModalOpen(false);
        setApplyForm({ leaveType: 'Casual Leave', startDate: '', endDate: '', reason: '' });
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString();
    };

    // Calculate duration helper
    const getDays = (start: string, end: string) => {
        const s = new Date(start);
        const e = new Date(end);
        const diffTime = Math.abs(e.getTime() - s.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays;
    };

    return (
        <div>
            <div className="glass-panel" style={{ marginBottom: '1.5rem', padding: '1rem', display: 'flex', gap: '1rem' }}>
                <button
                    className={`btn-secondary ${activeTab === 'my-leaves' ? 'active-tab' : ''}`}
                    style={{ background: activeTab === 'my-leaves' ? 'rgba(59, 130, 246, 0.2)' : 'transparent' }}
                    onClick={() => setActiveTab('my-leaves')}
                >
                    <CalendarDays size={18} style={{ display: 'inline', marginRight: '8px' }} />
                    My Leaves
                </button>

                {/* Only show Approvals if user is likely a manager/admin - logic implicit by if pendingLeaves is empty or api error, but let's show anyway and let empty state handle it */}
                <button
                    className={`btn-secondary ${activeTab === 'approvals' ? 'active-tab' : ''}`}
                    style={{ background: activeTab === 'approvals' ? 'rgba(59, 130, 246, 0.2)' : 'transparent' }}
                    onClick={() => setActiveTab('approvals')}
                >
                    <CheckCircle size={18} style={{ display: 'inline', marginRight: '8px' }} />
                    Approvals
                    {pendingLeaves.length > 0 && (
                        <span style={{ marginLeft: '8px', background: 'var(--danger)', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '10px' }}>
                            {pendingLeaves.length}
                        </span>
                    )}
                </button>
            </div>

            {activeTab === 'my-leaves' && (
                <div className="glass-panel" style={{ padding: 0 }}>
                    <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn-primary" onClick={() => setApplyModalOpen(true)}>
                            <Plus size={18} style={{ marginRight: '8px' }} /> Apply Leave
                        </button>
                    </div>

                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Duration</th>
                                    <th>Days</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myLeaves.map(leave => (
                                    <tr key={leave.id}>
                                        <td style={{ fontWeight: 500 }}>{leave.leaveType}</td>
                                        <td style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                            {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                                        </td>
                                        <td>{getDays(leave.startDate, leave.endDate)}</td>
                                        <td>{leave.reason}</td>
                                        <td>
                                            <span className={`badge ${leave.status === 'Approved' ? 'badge-success' :
                                                    leave.status === 'Rejected' ? 'badge-danger' : 'badge-secondary'
                                                }`} style={{
                                                    // Quick hack for red badge since not standard in css yet
                                                    backgroundColor: leave.status === 'Rejected' ? 'rgba(239, 68, 68, 0.2)' : undefined,
                                                    color: leave.status === 'Rejected' ? '#f87171' : undefined
                                                }}>
                                                {leave.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {myLeaves.length === 0 && (
                                    <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No leave history.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'approvals' && (
                <div className="glass-panel" style={{ padding: 0 }}>
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>Pending Requests</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Review requests from your team.</p>
                    </div>

                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Type</th>
                                    <th>Dates</th>
                                    <th>Reason</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingLeaves.map(leave => (
                                    <tr key={leave.id}>
                                        <td>
                                            <div style={{ fontWeight: 600 }}>{typeof leave.employee === 'object' ? leave.employee.fullName : 'Unknown'}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                                {typeof leave.employee === 'object' ? leave.employee.email : ''}
                                            </div>
                                        </td>
                                        <td>{leave.leaveType}</td>
                                        <td>{formatDate(leave.startDate)} <br /> to {formatDate(leave.endDate)}</td>
                                        <td>{leave.reason}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    className="action-btn"
                                                    style={{ color: '#34d399', background: 'rgba(52, 211, 153, 0.1)' }}
                                                    onClick={() => updateLeaveStatus(leave.id, 'Approved')}
                                                    title="Approve"
                                                >
                                                    <CheckCircle size={20} />
                                                </button>
                                                <button
                                                    className="action-btn"
                                                    style={{ color: '#f87171', background: 'rgba(248, 113, 113, 0.1)' }}
                                                    onClick={() => updateLeaveStatus(leave.id, 'Rejected')}
                                                    title="Reject"
                                                >
                                                    <XCircle size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {pendingLeaves.length === 0 && (
                                    <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No pending approvals.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* APPLY MODAL */}
            {isApplyModalOpen && (
                <div className="modal-overlay">
                    <div className="glass-panel modal-content" style={{ maxWidth: '500px' }}>
                        <div className="modal-header">
                            <h3>Apply for Leave</h3>
                            <button className="close-btn" onClick={() => setApplyModalOpen(false)}>✕</button>
                        </div>
                        <form onSubmit={handleApply} className="modal-body">
                            <div className="form-group">
                                <label className="form-label">Leave Type</label>
                                <select
                                    className="form-input"
                                    value={applyForm.leaveType}
                                    onChange={e => setApplyForm({ ...applyForm, leaveType: e.target.value })}
                                >
                                    <option>Casual Leave</option>
                                    <option>Sick Leave</option>
                                    <option>Earned Leave</option>
                                    <option>Unpaid Leave</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Start Date</label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        required
                                        value={applyForm.startDate}
                                        onChange={e => setApplyForm({ ...applyForm, startDate: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">End Date</label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        required
                                        value={applyForm.endDate}
                                        onChange={e => setApplyForm({ ...applyForm, endDate: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Reason</label>
                                <textarea
                                    className="form-input"
                                    rows={3}
                                    required
                                    value={applyForm.reason}
                                    onChange={e => setApplyForm({ ...applyForm, reason: e.target.value })}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setApplyModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Submit Application</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
