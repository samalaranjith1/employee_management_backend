import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import toast from 'react-hot-toast';

export interface AttendanceRecord {
    id: string;
    date: string;
    punchIn: string;
    punchOut?: string;
    status: string;
    totalHours: number;
    workMode: string;
}

interface AttendanceContextType {
    todayRecord: AttendanceRecord | null;
    history: AttendanceRecord[];
    isLoading: boolean;
    punchIn: (workMode?: string) => Promise<void>;
    punchOut: () => Promise<void>;
    refreshAttendance: () => Promise<void>;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

const API_URL = `${import.meta.env.VITE_API_URL}/attendance`;

export function AttendanceProvider({ children }: { children: ReactNode }) {
    const [todayRecord, setTodayRecord] = useState<AttendanceRecord | null>(null);
    const [history, setHistory] = useState<AttendanceRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getToken = () => localStorage.getItem('ems_token');
    const headers = () => ({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
    });

    const refreshAttendance = async () => {
        setIsLoading(true);
        try {
            // Fetch Today
            const todayRes = await fetch(`${API_URL}/today`, { headers: headers() });
            if (todayRes.ok) {
                const data = await todayRes.json();
                setTodayRecord(data);
            }

            // Fetch History
            const histRes = await fetch(`${API_URL}/my-attendance`, { headers: headers() });
            if (histRes.ok) {
                const data = await histRes.json();
                setHistory(data);
            }
        } catch (error) {
            console.error('Failed to fetch attendance', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshAttendance();
    }, []);

    const punchIn = async (workMode = 'Office') => {
        try {
            const res = await fetch(`${API_URL}/punch-in`, {
                method: 'POST',
                headers: headers(),
                body: JSON.stringify({ workMode })
            });

            if (!res.ok) throw new Error(await res.text());

            const data = await res.json();
            setTodayRecord(data);
            toast.success('Punched In Successfully');
            refreshAttendance();
        } catch (error: any) {
            toast.error(error.message || 'Punch in failed');
        }
    };

    const punchOut = async () => {
        try {
            const res = await fetch(`${API_URL}/punch-out`, {
                method: 'POST',
                headers: headers()
            });

            if (!res.ok) throw new Error(await res.text());

            const data = await res.json();
            setTodayRecord(data);
            toast.success('Punched Out Successfully');
            refreshAttendance();
        } catch (error: any) {
            toast.error(error.message || 'Punch out failed');
        }
    };

    return (
        <AttendanceContext.Provider value={{ todayRecord, history, isLoading, punchIn, punchOut, refreshAttendance }}>
            {children}
        </AttendanceContext.Provider>
    );
}

export function useAttendance() {
    const context = useContext(AttendanceContext);
    if (context === undefined) {
        throw new Error('useAttendance must be used within an AttendanceProvider');
    }
    return context;
}
