import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout() {
    const { user } = useAuth();

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
                    </div>
                </header>
                <div className="dashboard-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
