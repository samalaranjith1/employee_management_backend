import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

export default function DashboardLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="dashboard-main">
                <header className="dashboard-header glass-header">
                    <h2 className="header-title">Overview</h2>
                    <div className="user-profile">
                        <span className="user-name">{user?.name}</span>
                        <img
                            src={user?.avatar || "https://ui-avatars.com/api/?name=User"}
                            alt="Profile"
                            className="user-avatar"
                        />
                        <button
                            onClick={handleLogout}
                            className="action-btn"
                            title="Logout"
                            style={{ marginLeft: '1rem', color: 'var(--danger)' }}
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </header>
                <div className="dashboard-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
