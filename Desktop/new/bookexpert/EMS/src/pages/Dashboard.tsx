import { useEffect, useState } from 'react';
import { Users, UserPlus, Clock, Bell, Calendar, Briefcase, ChevronRight, UserCheck, UserMinus } from 'lucide-react';
// @ts-ignore
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    // @ts-ignore
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalEmployees: 0,
        activeEmployees: 0,
        inactiveEmployees: 0,
        presentToday: 0,
        pendingLeaves: 0,
        openJobs: 0,
        recentEvents: []
    });

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('ems_token');
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) setStats(await res.json());
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
    }, []);

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, background: 'linear-gradient(to right, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
                    {greeting()}, {user?.name || 'Admin'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Here's what's happening in your organization today.</p>
            </div>

            {/* Stats Grid */}
            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                    <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '1rem', borderRadius: '12px', color: '#60a5fa', marginRight: '1rem' }}>
                        <Users size={32} />
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: 700 }}>{stats.totalEmployees}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Employees</div>
                    </div>
                </div>

                <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                    <div style={{ background: 'rgba(45, 212, 191, 0.15)', padding: '1rem', borderRadius: '12px', color: '#2dd4bf', marginRight: '1rem' }}>
                        <UserCheck size={32} />
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: 700 }}>{stats.activeEmployees}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Active Employees</div>
                    </div>
                </div>

                <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                    <div style={{ background: 'rgba(248, 113, 113, 0.15)', padding: '1rem', borderRadius: '12px', color: '#f87171', marginRight: '1rem' }}>
                        <UserMinus size={32} />
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: 700 }}>{stats.inactiveEmployees}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Inactive Employees</div>
                    </div>
                </div>

                <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '1rem', borderRadius: '12px', color: '#34d399', marginRight: '1rem' }}>
                        <Clock size={32} />
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: 700 }}>{stats.presentToday}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Present Today</div>
                    </div>
                </div>

                <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                    <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '1rem', borderRadius: '12px', color: '#fbbf24', marginRight: '1rem' }}>
                        <Calendar size={32} />
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: 700 }}>{stats.pendingLeaves}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Pending Leaves</div>
                    </div>
                </div>

                <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                    <div style={{ background: 'rgba(167, 139, 250, 0.15)', padding: '1rem', borderRadius: '12px', color: '#a78bfa', marginRight: '1rem' }}>
                        <Briefcase size={32} />
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: 700 }}>{stats.openJobs}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Open Positions</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>

                {/* Recent Announcements */}
                <div className="glass-panel">
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Bell size={20} /> Recent Announcements
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {stats.recentEvents.map((event: any) => (
                            <div key={event._id} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                <div style={{
                                    minWidth: '60px', textAlign: 'center',
                                    background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.5rem',
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center'
                                }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)' }}>{new Date(event.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{new Date(event.date).getDate()}</span>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{event.title}</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.4' }}>
                                        {event.description.length > 80 ? event.description.substring(0, 80) + '...' : event.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {stats.recentEvents.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>No announcements yet.</div>
                        )}
                    </div>
                </div>

                {/* Quick Actions / Shortcuts */}
                <div className="glass-panel">
                    <h3 style={{ marginBottom: '1.5rem' }}>Quick Actions</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <a href="/employees" className="quick-link-card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <UserPlus size={18} color="#60a5fa" />
                                <span>Add New Employee</span>
                            </div>
                            <ChevronRight size={16} color="var(--text-secondary)" />
                        </a>
                        <a href="/leave" className="quick-link-card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Calendar size={18} color="#34d399" />
                                <span>Apply for Leave</span>
                            </div>
                            <ChevronRight size={16} color="var(--text-secondary)" />
                        </a>
                        <a href="/recruitment" className="quick-link-card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Briefcase size={18} color="#a78bfa" />
                                <span>Post a Job</span>
                            </div>
                            <ChevronRight size={16} color="var(--text-secondary)" />
                        </a>
                    </div>
                </div>

            </div>

            <style>{`
                .quick-link-card {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem;
                    background: rgba(255,255,255,0.03);
                    border-radius: 8px;
                    transition: all 0.2s;
                    text-decoration: none;
                    color: white;
                }
                .quick-link-card:hover {
                    background: rgba(255,255,255,0.08);
                    transform: translateX(4px);
                }
            `}</style>
        </div>
    );
}
