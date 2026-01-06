import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import toast from 'react-hot-toast';

// Types
export interface Department {
    id: string;
    name: string;
    code: string;
    head?: string; // ID of employee
    description?: string;
    isActive: boolean;
}

export interface Designation {
    id: string;
    title: string;
    department?: Department | string; // Populated or ID
    level: number;
    description?: string;
    isActive: boolean;
}

interface OrganizationContextType {
    departments: Department[];
    designations: Designation[];
    fetchDepartments: () => Promise<void>;
    fetchDesignations: () => Promise<void>;
    addDepartment: (dept: Partial<Department>) => Promise<void>;
    updateDepartment: (id: string, dept: Partial<Department>) => Promise<void>;
    deleteDepartment: (id: string) => Promise<void>;
    addDesignation: (desig: Partial<Designation>) => Promise<void>;
    updateDesignation: (id: string, desig: Partial<Designation>) => Promise<void>;
    deleteDesignation: (id: string) => Promise<void>;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

const API_BASE = import.meta.env.VITE_API_URL;

export function OrganizationProvider({ children }: { children: ReactNode }) {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [designations, setDesignations] = useState<Designation[]>([]);

    const getToken = () => localStorage.getItem('ems_token');

    const headers = () => ({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
    });

    const fetchDepartments = async () => {
        try {
            const res = await fetch(`${API_BASE}/departments`, { headers: headers() });
            if (res.ok) setDepartments(await res.json());
        } catch (error) {
            console.error('Fetch departments failed', error);
        }
    };

    const fetchDesignations = async () => {
        try {
            const res = await fetch(`${API_BASE}/designations`, { headers: headers() });
            if (res.ok) setDesignations(await res.json());
        } catch (error) {
            console.error('Fetch designations failed', error);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchDepartments();
        fetchDesignations();
    }, []);

    // --- Department Actions ---
    const addDepartment = async (dept: Partial<Department>) => {
        try {
            // Ensure no ID is sent
            const { id, _id, ...rest } = dept as any;

            const res = await fetch(`${API_BASE}/departments`, {
                method: 'POST',
                headers: headers(),
                body: JSON.stringify(rest)
            });
            if (!res.ok) throw new Error(await res.text());
            const newDept = await res.json();
            setDepartments(prev => [...prev, newDept]);
            toast.success('Department added');
        } catch (error: any) {
            toast.error(error.message || 'Failed to add department');
        }
    };

    const updateDepartment = async (id: string, dept: Partial<Department>) => {
        try {
            const res = await fetch(`${API_BASE}/departments/${id}`, {
                method: 'PUT',
                headers: headers(),
                body: JSON.stringify(dept)
            });
            if (!res.ok) throw new Error(await res.text());
            const updated = await res.json();
            setDepartments(prev => prev.map(d => d.id === id ? updated : d));
            toast.success('Department updated');
        } catch (error: any) {
            toast.error(error.message || 'Failed to update department');
        }
    };

    const deleteDepartment = async (id: string) => {
        try {
            const res = await fetch(`${API_BASE}/departments/${id}`, {
                method: 'DELETE',
                headers: headers()
            });
            if (!res.ok) throw new Error(await res.text());
            setDepartments(prev => prev.filter(d => d.id !== id));
            toast.success('Department deleted');
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete department');
        }
    };

    // --- Designation Actions ---
    const addDesignation = async (desig: Partial<Designation>) => {
        try {
            const res = await fetch(`${API_BASE}/designations`, {
                method: 'POST',
                headers: headers(),
                body: JSON.stringify(desig)
            });
            if (!res.ok) throw new Error(await res.text());
            const newDesig = await res.json();
            setDesignations(prev => [...prev, newDesig]);
            toast.success('Designation added');
        } catch (error: any) {
            toast.error(error.message || 'Failed to add designation');
        }
    };

    const updateDesignation = async (id: string, desig: Partial<Designation>) => {
        try {
            const res = await fetch(`${API_BASE}/designations/${id}`, {
                method: 'PUT',
                headers: headers(),
                body: JSON.stringify(desig)
            });
            if (!res.ok) throw new Error(await res.text());
            const updated = await res.json();
            setDesignations(prev => prev.map(d => d.id === id ? updated : d));
            toast.success('Designation updated');
        } catch (error: any) {
            toast.error(error.message || 'Failed to update designation');
        }
    };

    const deleteDesignation = async (id: string) => {
        try {
            const res = await fetch(`${API_BASE}/designations/${id}`, {
                method: 'DELETE',
                headers: headers()
            });
            if (!res.ok) throw new Error(await res.text());
            setDesignations(prev => prev.filter(d => d.id !== id));
            toast.success('Designation deleted');
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete designation');
        }
    };

    return (
        <OrganizationContext.Provider value={{
            departments, designations,
            fetchDepartments, fetchDesignations,
            addDepartment, updateDepartment, deleteDepartment,
            addDesignation, updateDesignation, deleteDesignation
        }}>
            {children}
        </OrganizationContext.Provider>
    );
}

export function useOrganization() {
    const context = useContext(OrganizationContext);
    if (context === undefined) {
        throw new Error('useOrganization must be used within an OrganizationProvider');
    }
    return context;
}
