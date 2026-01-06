import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

export interface KPI {
    title: string;
    description: string;
    selfRating?: number;
    selfComment?: string;
    managerRating?: number;
    managerComment?: string;
    _id?: string;
}

export interface Appraisal {
    _id: string; // Use _id as returned by mongo
    id?: string; // or id alias
    employee: string | { fullName: string; designation: any; department: any };
    reviewer: string | { fullName: string };
    cycle: string;
    kpis: KPI[];
    finalRating?: number;
    finalFeedback?: string;
    status: 'GoalSetting' | 'SelfReview' | 'ManagerReview' | 'Completed';
    createdAt: string;
}

interface PerformanceContextType {
    myAppraisals: Appraisal[];
    pendingReviews: Appraisal[];
    fetchMyAppraisals: () => Promise<void>;
    fetchPendingReviews: () => Promise<void>;
    createAppraisal: (data: { cycle: string; kpis: Partial<KPI>[] }) => Promise<void>;
    updateAppraisal: (id: string, data: Partial<Appraisal>) => Promise<void>;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

const API_URL = `${import.meta.env.VITE_API_URL}/performance`;

export function PerformanceProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [myAppraisals, setMyAppraisals] = useState<Appraisal[]>([]);
    const [pendingReviews, setPendingReviews] = useState<Appraisal[]>([]);

    const getToken = () => localStorage.getItem('ems_token');
    const headers = () => ({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
    });

    const fetchMyAppraisals = async () => {
        try {
            const res = await fetch(`${API_URL}/my-appraisals`, { headers: headers() });
            if (res.ok) setMyAppraisals(await res.json());
        } catch (error) {
            console.error('Fetch my appraisals failed', error);
        }
    };

    const fetchPendingReviews = async () => {
        try {
            const res = await fetch(`${API_URL}/pending-reviews`, { headers: headers() });
            if (res.ok) setPendingReviews(await res.json());
        } catch (error) {
            // Silently fail if not manager
        }
    };

    const createAppraisal = async (data: any) => {
        try {
            const res = await fetch(`${API_URL}/create`, {
                method: 'POST',
                headers: headers(),
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error(await res.text());
            toast.success('Goals set successfully');
            fetchMyAppraisals();
        } catch (error: any) {
            toast.error(error.message || 'Failed to set goals');
        }
    };

    const updateAppraisal = async (id: string, data: any) => {
        try {
            const res = await fetch(`${API_URL}/${id}/update`, {
                method: 'PUT',
                headers: headers(),
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error(await res.text());
            toast.success('Appraisal updated');

            // Refresh
            fetchMyAppraisals();
            fetchPendingReviews();
        } catch (error: any) {
            toast.error(error.message || 'Update failed');
        }
    };

    useEffect(() => {
        if (user) {
            fetchMyAppraisals();
            fetchPendingReviews();
        }
    }, [user]);

    return (
        <PerformanceContext.Provider value={{ myAppraisals, pendingReviews, fetchMyAppraisals, fetchPendingReviews, createAppraisal, updateAppraisal }}>
            {children}
        </PerformanceContext.Provider>
    );
}

export function usePerformance() {
    const context = useContext(PerformanceContext);
    if (context === undefined) {
        throw new Error('usePerformance must be used within a PerformanceProvider');
    }
    return context;
}
