import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

export interface Job {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    remotePolicy: 'Remote' | 'Hybrid' | 'On-site';
    experienceLevel: string;
    skills: string[];
    salaryRange?: { min: number; max: number; currency: string };
    screeningQuestions?: string[];
    description: string;
    status: 'Open' | 'Closed' | 'Draft';
    postedDate: string;
}

export interface Candidate {
    id: string;
    job: Job | string;
    fullName: string;
    email: string;
    phone: string;
    portfolio?: { linkedin?: string; github?: string; website?: string };
    skills: string[];
    screeningAnswers?: { question: string; answer: string }[];
    experience: number;
    aiScore: number;
    aiInsights?: string;
    status: 'New' | 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
    resumeUrl?: string; // Base64 in our simple case
}

interface RecruitmentContextType {
    jobs: Job[];
    candidates: Candidate[];
    fetchJobs: () => Promise<void>;
    fetchCandidates: () => Promise<void>;
    postJob: (data: Partial<Job>) => Promise<void>;
    addCandidate: (data: Partial<Candidate>) => Promise<void>;
    updateCandidateStatus: (id: string, status: string) => Promise<void>;
    scheduleInterview: (id: string, details: any) => Promise<void>;
}

const RecruitmentContext = createContext<RecruitmentContextType | undefined>(undefined);

const API_URL = `${import.meta.env.VITE_API_URL}/recruitment`;

export function RecruitmentProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    const getToken = () => localStorage.getItem('ems_token');
    const headers = () => ({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
    });

    const fetchJobs = async () => {
        try {
            const res = await fetch(`${API_URL}/jobs`, { headers: headers() });
            if (res.ok) setJobs(await res.json());
        } catch (error) {
            console.error('Fetch jobs failed', error);
        }
    };

    const fetchCandidates = async () => {
        try {
            const res = await fetch(`${API_URL}/candidates`, { headers: headers() });
            if (res.ok) setCandidates(await res.json());
        } catch (error) {
            console.error('Fetch candidates failed', error);
        }
    };

    const postJob = async (data: any) => {
        try {
            const res = await fetch(`${API_URL}/jobs`, {
                method: 'POST',
                headers: headers(),
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error(await res.text());
            toast.success('Job posted successfully');
            fetchJobs();
        } catch (error: any) {
            toast.error(error.message || 'Failed to post job');
        }
    };

    const addCandidate = async (data: any) => {
        try {
            const res = await fetch(`${API_URL}/candidates`, {
                method: 'POST',
                headers: headers(),
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error(await res.text());
            toast.success('Candidate added');
            fetchCandidates();
        } catch (error: any) {
            toast.error(error.message || 'Failed to add candidate');
        }
    };

    const updateCandidateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`${API_URL}/candidates/${id}/status`, {
                method: 'PUT',
                headers: headers(),
                body: JSON.stringify({ status })
            });
            if (!res.ok) throw new Error(await res.text());
            toast.success(`Candidate moved to ${status}`);
            setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: status as any } : c));
        } catch (error: any) {
            toast.error(error.message || 'Status update failed');
        }
    };

    const scheduleInterview = async (id: string, details: { date: string; time: string; type: string; link: string }) => {
        try {
            const res = await fetch(`${API_URL}/candidates/${id}/schedule`, {
                method: 'POST',
                headers: headers(),
                body: JSON.stringify(details)
            });
            if (!res.ok) throw new Error(await res.text());
            toast.success('Interview scheduled & Email sent!');
            fetchCandidates(); // Refresh to show new status/notes
        } catch (error: any) {
            toast.error(error.message || 'Scheduling failed');
        }
    };

    useEffect(() => {
        if (user) {
            fetchJobs();
            fetchCandidates();
        }
    }, [user]);

    return (
        <RecruitmentContext.Provider value={{ jobs, candidates, fetchJobs, fetchCandidates, postJob, addCandidate, updateCandidateStatus, scheduleInterview }}>
            {children}
        </RecruitmentContext.Provider>
    );
}

export function useRecruitment() {
    const context = useContext(RecruitmentContext);
    if (context === undefined) {
        throw new Error('useRecruitment must be used within a RecruitmentProvider');
    }
    return context;
}
