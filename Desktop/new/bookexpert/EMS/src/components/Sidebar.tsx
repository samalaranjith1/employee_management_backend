import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    Users,
    UserPlus,
    LogOut,
    Briefcase,
    Building2,
    Clock,
    CalendarDays,
    Banknote,
    Zap,
    FileText,
    Megaphone
} from 'lucide-react';

export default function Sidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Users, label: 'Employees', path: '/employees' },
        { icon: Building2, label: 'Organization', path: '/organization' },
        { icon: Clock, label: 'Attendance', path: '/attendance' },
        { icon: CalendarDays, label: 'Leave', path: '/leave' },
        { icon: Banknote, label: 'Payroll', path: '/payroll' },
        { icon: Zap, label: 'Performance', path: '/performance' },
        { icon: FileText, label: 'Documents', path: '/documents' },
        { icon: UserPlus, label: 'Recruitment', path: '/recruitment' },
        { icon: Megaphone, label: 'Announcements', path: '/events' },
    ];

    return (
        <aside className="sidebar glass-panel">
            <div className="sidebar-header">
                <Briefcase className="text-blue-500" size={28} style={{ color: 'var(--primary)' }} />
                <h1 className="sidebar-title">BookExpert EMS</h1>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button onClick={handleLogout} className="nav-item logout-btn">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
