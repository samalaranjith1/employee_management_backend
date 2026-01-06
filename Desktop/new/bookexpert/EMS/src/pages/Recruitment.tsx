import { useState } from 'react';
import { useRecruitment } from '../context/RecruitmentContext';
import type { Job } from '../context/RecruitmentContext';
import { Briefcase, UserPlus, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Recruitment() {
    const { jobs, candidates, postJob, addCandidate, updateCandidateStatus, scheduleInterview } = useRecruitment();
    const [activeTab, setActiveTab] = useState<'jobs' | 'candidates'>('jobs');
    const [isJobModalOpen, setJobModalOpen] = useState(false);
    const [isCandModalOpen, setCandModalOpen] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
    const [showInterviewModal, setShowInterviewModal] = useState(false);
    const [interviewForm, setInterviewForm] = useState({ date: '', time: '', type: 'Video Call', link: '' });

    // Forms
    const [jobForm, setJobForm] = useState<Partial<Job>>({
        title: '', department: '', type: 'Full-time', description: '', location: 'Remote',
        remotePolicy: 'Remote', experienceLevel: 'Mid', skills: [], salaryRange: { min: 0, max: 0, currency: 'USD' },
        screeningQuestions: []
    });
    const [candForm, setCandForm] = useState({ fullName: '', email: '', phone: '', job: '', resumeUrl: '' });

    const handleJobSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await postJob(jobForm);
        setJobModalOpen(false);
        setJobForm({
            title: '', department: '', type: 'Full-time', description: '', location: 'Remote',
            remotePolicy: 'Remote', experienceLevel: 'Mid', skills: [], salaryRange: { min: 0, max: 0, currency: 'USD' },
            screeningQuestions: []
        });
    };

    const handleCandSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addCandidate(candForm);
        setCandModalOpen(false);
        setCandForm({ fullName: '', email: '', phone: '', job: '', resumeUrl: '' });
    };

    // Simple KanBan status columns
    const statuses = ['New', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'];

    return (
        <div>
            <div className="glass-panel" style={{ marginBottom: '1.5rem', padding: '1rem', display: 'flex', gap: '1rem' }}>
                <button
                    className={`btn-secondary ${activeTab === 'jobs' ? 'active-tab' : ''}`}
                    style={{ background: activeTab === 'jobs' ? 'rgba(59, 130, 246, 0.2)' : 'transparent' }}
                    onClick={() => setActiveTab('jobs')}
                >
                    <Briefcase size={18} style={{ display: 'inline', marginRight: '8px' }} />
                    Job Postings
                </button>
                <button
                    className={`btn-secondary ${activeTab === 'candidates' ? 'active-tab' : ''}`}
                    style={{ background: activeTab === 'candidates' ? 'rgba(59, 130, 246, 0.2)' : 'transparent' }}
                    onClick={() => setActiveTab('candidates')}
                >
                    <Users size={18} style={{ display: 'inline', marginRight: '8px' }} />
                    Candidates Pipeline
                </button>
            </div>

            {/* --- JOBS TAB --- */}
            {activeTab === 'jobs' && (
                <div className="glass-panel" style={{ padding: 0 }}>
                    <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>Active Openings</h3>
                        <button className="btn-primary" onClick={() => setJobModalOpen(true)}>
                            <Briefcase size={18} style={{ marginRight: '6px' }} /> Post Job
                        </button>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Role</th>
                                    <th>Department</th>
                                    <th>Location</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Posted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map(job => (
                                    <tr key={job.id}>
                                        <td style={{ fontWeight: 600 }}>{job.title}</td>
                                        <td>{job.department}</td>
                                        <td>{job.location}</td>
                                        <td>{job.type}</td>
                                        <td><span className="badge badge-success">{job.status}</span></td>
                                        <td>{new Date(job.postedDate).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                                {jobs.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No active job postings.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* --- CANDIDATES TAB (KANBAN PREVIEW) --- */}
            {activeTab === 'candidates' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                        <button className="btn-primary" onClick={() => setCandModalOpen(true)}>
                            <UserPlus size={18} style={{ marginRight: '6px' }} /> Add Candidate
                        </button>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                        {statuses.map(status => (
                            <div key={status} className="glass-panel" style={{ minWidth: '250px', padding: '1rem', background: 'rgba(30, 41, 59, 0.5)' }}>
                                <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                    {status}
                                    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{candidates.filter(c => c.status === status).length}</span>
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {candidates.filter(c => c.status === status).map(c => (
                                        <div
                                            key={c.id}
                                            className="glass-panel"
                                            style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'transform 0.1s' }}
                                            onClick={() => setSelectedCandidate(c)}
                                        >
                                            <div style={{ fontWeight: 600 }}>{c.fullName}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'gray', marginBottom: '0.25rem' }}>{typeof c.job === 'object' ? c.job.title : 'Unknown Role'}</div>

                                            {/* AI Match Score */}
                                            {c.aiScore > 0 && (
                                                <div style={{
                                                    display: 'inline-flex', alignItems: 'center', fontSize: '0.7rem',
                                                    background: c.aiScore > 75 ? 'rgba(16, 185, 129, 0.2)' : c.aiScore > 50 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                                    color: c.aiScore > 75 ? '#34d399' : c.aiScore > 50 ? '#fbbf24' : '#f87171',
                                                    padding: '2px 6px', borderRadius: '4px', marginBottom: '0.5rem'
                                                }}>
                                                    AI Match: {c.aiScore}%
                                                </div>
                                            )}

                                            {/* Quick Actions */}
                                            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }} onClick={e => e.stopPropagation()}>
                                                {status !== 'Hired' && status !== 'Rejected' && (
                                                    <button
                                                        style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', border: 'none', background: '#3b82f6', color: 'white', cursor: 'pointer' }}
                                                        onClick={() => {
                                                            const next = statuses[statuses.indexOf(status) + 1];
                                                            if (next) updateCandidateStatus(c.id, next);
                                                        }}
                                                    >
                                                        Next &gt;
                                                    </button>
                                                )}
                                                {status !== 'Rejected' && status !== 'Hired' && (
                                                    <button
                                                        style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', border: 'none', background: '#ef4444', color: 'white', cursor: 'pointer' }}
                                                        onClick={() => updateCandidateStatus(c.id, 'Rejected')}
                                                    >
                                                        Reject
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* JOB MODAL */}
            {isJobModalOpen && (
                <div className="modal-overlay">
                    <div className="glass-panel modal-content">
                        <h3>Post New Job</h3>
                        <form onSubmit={handleJobSubmit} className="modal-body">
                            <div className="form-group">
                                <label className="form-label">Job Title</label>
                                <input className="form-input" required value={jobForm.title} onChange={e => setJobForm({ ...jobForm, title: e.target.value })} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Department</label>
                                    <input className="form-input" required value={jobForm.department} onChange={e => setJobForm({ ...jobForm, department: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Type</label>
                                    <select className="form-input" value={jobForm.type} onChange={e => setJobForm({ ...jobForm, type: e.target.value })}>
                                        <option>Full-time</option>
                                        <option>Part-time</option>
                                        <option>Contract</option>
                                        <option>Internship</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Remote Policy</label>
                                    <select className="form-input" value={jobForm.remotePolicy} onChange={e => setJobForm({ ...jobForm, remotePolicy: e.target.value as any })}>
                                        <option>Remote</option>
                                        <option>Hybrid</option>
                                        <option>On-site</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Experience Level</label>
                                    <select className="form-input" value={jobForm.experienceLevel} onChange={e => setJobForm({ ...jobForm, experienceLevel: e.target.value })}>
                                        <option>Entry</option>
                                        <option>Mid</option>
                                        <option>Senior</option>
                                        <option>Lead</option>
                                        <option>Executive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Location (City/Country)</label>
                                <input className="form-input" value={jobForm.location} onChange={e => setJobForm({ ...jobForm, location: e.target.value })} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Min Salary</label>
                                    <input type="number" className="form-input" value={jobForm.salaryRange?.min || ''}
                                        onChange={e => setJobForm({ ...jobForm, salaryRange: { ...jobForm.salaryRange!, min: Number(e.target.value) } })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Max Salary</label>
                                    <input type="number" className="form-input" value={jobForm.salaryRange?.max || ''}
                                        onChange={e => setJobForm({ ...jobForm, salaryRange: { ...jobForm.salaryRange!, max: Number(e.target.value) } })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Required Skills (Comma separated)</label>
                                <input className="form-input" placeholder="e.g. React, Node.js, Leadership" value={jobForm.skills?.join(', ')}
                                    onChange={e => setJobForm({ ...jobForm, skills: e.target.value.split(',').map(s => s.trim()) })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Required Skills (Comma separated)</label>
                                <input className="form-input" placeholder="e.g. React, Node.js, Leadership" value={jobForm.skills?.join(', ')}
                                    onChange={e => setJobForm({ ...jobForm, skills: e.target.value.split(',').map(s => s.trim()) })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Screening Questions (Comma separated)</label>
                                <input className="form-input" placeholder="e.g. Years of React exp?, Can you relocate?, Expected CTC?"
                                    value={jobForm.screeningQuestions?.join(', ')}
                                    onChange={e => setJobForm({ ...jobForm, screeningQuestions: e.target.value.split(',').map(s => s.trim()) })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea className="form-input" rows={4} required value={jobForm.description} onChange={e => setJobForm({ ...jobForm, description: e.target.value })} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setJobModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Post Job</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* CANDIDATE MODAL (Add New) */}
            {isCandModalOpen && (
                <div className="modal-overlay">
                    <div className="glass-panel modal-content">
                        <h3>Add Candidate</h3>
                        <form onSubmit={handleCandSubmit} className="modal-body">
                            {/* ... existing form fields ... */}
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input className="form-input" required value={candForm.fullName} onChange={e => setCandForm({ ...candForm, fullName: e.target.value })} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-input" required value={candForm.email} onChange={e => setCandForm({ ...candForm, email: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone</label>
                                    <input className="form-input" value={candForm.phone} onChange={e => setCandForm({ ...candForm, phone: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Apply For</label>
                                <select className="form-input" required value={candForm.job} onChange={e => setCandForm({ ...candForm, job: e.target.value })}>
                                    <option value="">-- Select Job --</option>
                                    {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setCandModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Add Candidate</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* CANDIDATE DETAIL DRAWER/MODAL */}
            {selectedCandidate && (
                <div className="modal-overlay" onClick={() => setSelectedCandidate(null)}>
                    <div className="glass-panel modal-content" style={{ maxWidth: '800px', width: '90%' }} onClick={e => e.stopPropagation()}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{selectedCandidate.fullName}</h2>
                                <p style={{ color: '#94a3b8', margin: '0.5rem 0 0 0' }}>
                                    Applied for <span style={{ color: '#60a5fa' }}>{typeof selectedCandidate.job === 'object' ? selectedCandidate.job.title : 'Unknown Role'}</span>
                                </p>
                            </div>
                            <span className="badge badge-success" style={{ fontSize: '0.9rem' }}>{selectedCandidate.status}</span>
                        </div>

                        <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto', padding: '1.5rem', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                            {/* Left Col: Details */}
                            <div>
                                <h4 style={{ color: '#a78bfa', marginBottom: '1rem', borderBottom: '1px solid rgba(167, 139, 250, 0.2)', paddingBottom: '0.5rem' }}>Screening & Skills</h4>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>AI Match Score</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{
                                                width: `${selectedCandidate.aiScore}%`, height: '100%',
                                                background: selectedCandidate.aiScore > 70 ? '#10b981' : selectedCandidate.aiScore > 40 ? '#f59e0b' : '#ef4444'
                                            }} />
                                        </div>
                                        <span style={{ fontWeight: 'bold' }}>{selectedCandidate.aiScore}%</span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '0.5rem', fontStyle: 'italic' }}>"{selectedCandidate.aiInsights}"</p>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Provided Skills</label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {selectedCandidate.skills?.map((s: string) => (
                                            <span key={s} style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem' }}>{s}</span>
                                        ))}
                                    </div>
                                </div>

                                {selectedCandidate.screeningAnswers && selectedCandidate.screeningAnswers.length > 0 && (
                                    <div>
                                        <label style={{ color: '#a78bfa', fontSize: '0.9rem', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>Screening Responses</label>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {selectedCandidate.screeningAnswers.map((item: any, idx: number) => (
                                                <div key={idx} style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                                                    <p style={{ margin: '0 0 0.5rem 0', color: '#94a3b8', fontSize: '0.85rem' }}>{item.question}</p>
                                                    <p style={{ margin: 0, color: 'white' }}>{item.answer}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right Col: Contact & Meta */}
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', height: 'fit-content' }}>
                                <h4 style={{ margin: '0 0 1rem 0', color: '#94a3b8' }}>Contact Info</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                                    <div>
                                        <label style={{ display: 'block', color: '#64748b', fontSize: '0.8rem' }}>Email</label>
                                        <a href={`mailto:${selectedCandidate.email}`} style={{ color: '#60a5fa', textDecoration: 'none' }}>{selectedCandidate.email}</a>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: '#64748b', fontSize: '0.8rem' }}>Phone</label>
                                        <span>{selectedCandidate.phone || 'N/A'}</span>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: '#64748b', fontSize: '0.8rem' }}>Experience</label>
                                        <span>{selectedCandidate.experience || 0} Years</span>
                                    </div>

                                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '0.5rem 0' }} />

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {selectedCandidate.portfolio?.linkedin && (
                                            <a href={selectedCandidate.portfolio.linkedin} target="_blank" rel="noreferrer" style={{ color: '#0a66c2', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                LinkedIn Profile ↗
                                            </a>
                                        )}
                                        {selectedCandidate.portfolio?.github && (
                                            <a href={selectedCandidate.portfolio.github} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                GitHub Profile ↗
                                            </a>
                                        )}
                                    </div>

                                    {selectedCandidate.status === 'Offer' ? (
                                        <button
                                            onClick={() => toast('Displaying Offer Letter Template...', { icon: '📄' })}
                                            style={{ marginTop: '1rem', width: '100%', padding: '0.75rem', background: '#10b981', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', fontWeight: 600 }}>
                                            Generate Offer Letter
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setShowInterviewModal(true)}
                                            style={{ marginTop: '1rem', width: '100%', padding: '0.75rem', background: '#3b82f6', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', fontWeight: 600 }}>
                                            Schedule Interview
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* INTERVIEW SCHEDULER MODAL */}
            {showInterviewModal && selectedCandidate && (
                <div className="modal-overlay">
                    <div className="glass-panel modal-content" style={{ maxWidth: '500px' }}>
                        <h3>Schedule Interview</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            scheduleInterview(selectedCandidate.id, interviewForm);
                            setShowInterviewModal(false);
                            setSelectedCandidate(null); // Close drawer too
                        }} className="modal-body">
                            <div className="form-group">
                                <label className="form-label">Date</label>
                                <input type="date" className="form-input" required
                                    onChange={e => setInterviewForm({ ...interviewForm, date: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Time</label>
                                <input type="time" className="form-input" required
                                    onChange={e => setInterviewForm({ ...interviewForm, time: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Type</label>
                                <select className="form-input" onChange={e => setInterviewForm({ ...interviewForm, type: e.target.value })}>
                                    <option>Video Call (Google Meet)</option>
                                    <option>Phone Call</option>
                                    <option>In-Person</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Meeting Link / Location</label>
                                <input className="form-input" placeholder="https://meet.google.com/..." required
                                    onChange={e => setInterviewForm({ ...interviewForm, link: e.target.value })} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setShowInterviewModal(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Send Invite</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
