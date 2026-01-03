import { Users, UserCheck, UserMinus } from 'lucide-react';

export default function Dashboard() {
    // Mock data for now - will be replaced by real data context later
    const stats = [
        {
            label: 'Total Employees',
            value: 124,
            icon: Users,
            color: 'var(--primary)',
            bg: 'rgba(59, 130, 246, 0.1)'
        },
        {
            label: 'Active Employees',
            value: 112,
            icon: UserCheck,
            color: 'var(--success)',
            bg: 'rgba(16, 185, 129, 0.1)'
        },
        {
            label: 'Inactive Employees',
            value: 12,
            icon: UserMinus,
            color: 'var(--text-secondary)', // Using grey/secondary for inactive
            bg: 'rgba(148, 163, 184, 0.1)'
        }
    ];

    return (
        <div>
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="glass-panel stat-card">
                        <div className="stat-header">
                            <div
                                className="stat-icon"
                                style={{ backgroundColor: stat.bg, color: stat.color }}
                            >
                                <stat.icon size={24} />
                            </div>
                            {/* Optional: Add percentage change here if desired */}
                        </div>
                        <div>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                    Welcome to the Employee Management System
                </h3>
                <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}>
                    Select "Employees" from the sidebar to manage your workforce.
                </p>
            </div>
        </div>
    );
}
