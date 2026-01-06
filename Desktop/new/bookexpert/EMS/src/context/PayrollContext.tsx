import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

export interface SalaryStructure {
    basic: number;
    hra: number;
    da: number;
    specialAllowance: number;
    pf: number;
    tax: number;
    grossSalary?: number; // Calculated
    netSalary?: number;   // Calculated
}

export interface Payslip {
    id: string;
    employee: string | { fullName: string; employeeId: string };
    month: number;
    year: number;
    basic: number;
    hra: number;
    da: number;
    specialAllowance: number;
    lossOfPay: number;
    totalEarnings: number;
    totalDeductions: number;
    netPay: number;
    status: 'Draft' | 'Published' | 'Paid';
    createdAt: string;
}

interface PayrollContextType {
    myPayslips: Payslip[];
    allPayslips: Payslip[]; // For Admin
    fetchMyPayslips: () => Promise<void>;
    fetchSalaryStructure: (empId: string) => Promise<SalaryStructure | null>;
    saveSalaryStructure: (empId: string, data: SalaryStructure) => Promise<void>;
    generatePayslip: (empId: string, month: number, year: number, lossOfPay: number) => Promise<void>;
    fetchAllPayslips: (month?: number, year?: number) => Promise<void>;
    updatePayslipStatus: (id: string, status: string) => Promise<void>;
}

const PayrollContext = createContext<PayrollContextType | undefined>(undefined);

const API_URL = `${import.meta.env.VITE_API_URL}/payroll`;

export function PayrollProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [myPayslips, setMyPayslips] = useState<Payslip[]>([]);
    const [allPayslips, setAllPayslips] = useState<Payslip[]>([]);

    const getToken = () => localStorage.getItem('ems_token');
    const headers = () => ({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
    });

    const fetchMyPayslips = async () => {
        try {
            const res = await fetch(`${API_URL}/my-payslips`, { headers: headers() });
            if (res.ok) setMyPayslips(await res.json());
        } catch (error) {
            console.error('Fetch my payslips failed', error);
        }
    };

    const fetchAllPayslips = async (month?: number, year?: number) => {
        try {
            let url = `${API_URL}/all`;
            if (month && year) url += `?month=${month}&year=${year}`;

            const res = await fetch(url, { headers: headers() });
            if (res.ok) setAllPayslips(await res.json());
        } catch (error) {
            console.error('Fetch all payslips failed', error);
        }
    };

    const fetchSalaryStructure = async (empId: string) => {
        try {
            const res = await fetch(`${API_URL}/structure/${empId}`, { headers: headers() });
            if (res.ok) return await res.json();
            return null;
        } catch (error) {
            console.error('Failed to fetch structure', error);
            return null;
        }
    };

    const saveSalaryStructure = async (empId: string, data: SalaryStructure) => {
        try {
            const res = await fetch(`${API_URL}/structure`, {
                method: 'POST',
                headers: headers(),
                body: JSON.stringify({ employeeId: empId, ...data })
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || res.statusText);
            }
            toast.success('Salary structure saved');
        } catch (error: any) {
            toast.error(error.message || 'Failed to save structure');
        }
    };

    const generatePayslip = async (empId: string, month: number, year: number, lossOfPay: number) => {
        try {
            const res = await fetch(`${API_URL}/generate`, {
                method: 'POST',
                headers: headers(),
                body: JSON.stringify({ employeeId: empId, month, year, lossOfPay })
            });
            if (!res.ok) throw new Error((await res.json()).message);
            toast.success('Payslip generated');
            fetchAllPayslips(month, year); // Refresh list
        } catch (error: any) {
            toast.error(error.message || 'Failed to generate');
        }
    };

    const updatePayslipStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`${API_URL}/${id}/status`, {
                method: 'PUT',
                headers: headers(),
                body: JSON.stringify({ status })
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || res.statusText);
            }
            toast.success(`Payslip marked as ${status}`);
            setAllPayslips(prev => prev.map(p => p.id === id ? { ...p, status: status as any } : p));
        } catch (error: any) {
            toast.error(error.message || 'Failed to update status');
        }
    };

    useEffect(() => {
        if (user) {
            fetchMyPayslips();
        }
    }, [user]);

    return (
        <PayrollContext.Provider value={{
            myPayslips, allPayslips,
            fetchMyPayslips, fetchSalaryStructure, saveSalaryStructure,
            generatePayslip, fetchAllPayslips, updatePayslipStatus
        }}>
            {children}
        </PayrollContext.Provider>
    );
}

export function usePayroll() {
    const context = useContext(PayrollContext);
    if (context === undefined) {
        throw new Error('usePayroll must be used within a PayrollProvider');
    }
    return context;
}
