import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

export interface LeaveRequest {
    id: string;
    employee: string | { id: string; fullName: string; email: string };
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    createdAt: string;
}

interface LeaveContextType {
    myLeaves: LeaveRequest[];
    pendingLeaves: LeaveRequest[];
    applyForLeave: (data: any) => Promise<void>;
    fetchPendingLeaves: () => Promise<void>;
    updateLeaveStatus: (id: string, status: 'Approved' | 'Rejected') => Promise<void>;
}

const LeaveContext = createContext<LeaveContextType | undefined>(undefined);

const API_URL = `${import.meta.env.VITE_API_URL}/leave`;

export function LeaveProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [myLeaves, setMyLeaves] = useState<LeaveRequest[]>([]);
    const [pendingLeaves, setPendingLeaves] = useState<LeaveRequest[]>([]);

    const getToken = () => localStorage.getItem('ems_token');
    const headers = () => ({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
    });

    const fetchMyLeaves = async () => {
        try {
            const res = await fetch(`${API_URL}/my-leaves`, { headers: headers() });
            if (res.ok) setMyLeaves(await res.json());
        } catch (error) {
            console.error('Fetch my leaves failed', error);
        }
    };

    const fetchPendingLeaves = async () => {
        // Only fetch if user has role to approve (simple logic: not just Employee)
        // Ideally checking user.role here, but backend also protects it.
        try {
            const res = await fetch(`${API_URL}/pending`, { headers: headers() });
            if (res.ok) setPendingLeaves(await res.json());
        } catch (error) {
            console.error('Fetch pending leaves failed', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchMyLeaves();
            // Try fetching pending too, backend will block if not allowed, simpler for now
            fetchPendingLeaves();
        }
    }, [user]);

    const applyForLeave = async (data: any) => {
        try {
            const res = await fetch(`${API_URL}/apply`, {
                method: 'POST',
                headers: headers(),
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error(await res.text());

            toast.success('Leave applied successfully');
            fetchMyLeaves();
        } catch (error: any) {
            toast.error(error.message || 'Failed to apply');
        }
    };

    const updateLeaveStatus = async (id: string, status: 'Approved' | 'Rejected') => {
        try {
            const res = await fetch(`${API_URL}/${id}/status`, {
                method: 'PUT',
                headers: headers(),
                body: JSON.stringify({ status })
            });
            if (!res.ok) throw new Error(await res.text());

            toast.success(`Leave ${status}`);
            setPendingLeaves(prev => prev.filter(l => l.id !== id));
        } catch (error: any) {
            toast.error(error.message || 'Failed to update status');
        }
    };

    return (
        <LeaveContext.Provider value={{ myLeaves, pendingLeaves, applyForLeave, fetchPendingLeaves, updateLeaveStatus }}>
            {children}
        </LeaveContext.Provider>
    );
}

export function useLeave() {
    const context = useContext(LeaveContext);
    if (context === undefined) {
        throw new Error('useLeave must be used within a LeaveProvider');
    }
    return context;
}
