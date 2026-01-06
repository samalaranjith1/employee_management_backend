import { useState, useEffect } from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { Clock, LogIn, LogOut, Calendar } from 'lucide-react';

export default function Attendance() {
    const { todayRecord, history, punchIn, punchOut } = useAttendance();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (dateStr?: string) => {
        if (!dateStr) return '--:--';
        return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <div>
            {/* Top Section: Clock & Actions */}
            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>

                {/* Clock */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1.5rem', borderRadius: '50%', color: 'var(--primary)' }}>
                        <Clock size={40} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>
                            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </h2>
                        <div style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '1.1rem' }}>
                            {currentTime.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                    </div>
                </div>

                {/* Status Card */}
                <div style={{ flex: 1, maxWidth: '400px', background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-glass)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Status Today</span>
                        <span className={`badge ${todayRecord ? 'badge-success' : 'badge-secondary'}`}>
                            {todayRecord?.status || 'Not Punched In'}
                        </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Punch In</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{formatTime(todayRecord?.punchIn)}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Punch Out</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{formatTime(todayRecord?.punchOut)}</div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '200px' }}>
                    {!todayRecord ? (
                        <button
                            className="btn-primary"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: '50px', fontSize: '1.1rem' }}
                            onClick={() => punchIn()}
                        >
                            <LogIn size={20} /> Punch In
                        </button>
                    ) : !todayRecord.punchOut ? (
                        <button
                            className="btn-primary"
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: '50px', fontSize: '1.1rem',
                                background: 'linear-gradient(135deg, #ef4444, #dc2626)', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
                            }}
                            onClick={() => punchOut()}
                        >
                            <LogOut size={20} /> Punch Out
                        </button>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', borderRadius: '0.5rem' }}>
                            Shift Completed
                        </div>
                    )}
                </div>
            </div>

            {/* History Table */}
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={20} className="text-blue-500" /> Recent Activity
            </h3>

            <div className="glass-panel" style={{ padding: 0 }}>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Punch In</th>
                                <th>Punch Out</th>
                                <th>Total Hours</th>
                                <th>Work Mode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.length > 0 ? (
                                history.map(record => (
                                    <tr key={record.id}>
                                        <td>{formatDate(record.date)}</td>
                                        <td>
                                            <span className={`badge ${record.status === 'Present' ? 'badge-success' : 'badge-secondary'}`}>
                                                {record.status}
                                            </span>
                                        </td>
                                        <td>{formatTime(record.punchIn)}</td>
                                        <td>{formatTime(record.punchOut)}</td>
                                        <td style={{ fontWeight: 600 }}>{record.totalHours || '-'} hrs</td>
                                        <td>{record.workMode}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                        No attendance history found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
