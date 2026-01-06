import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Employee, EmployeeContextType } from '../types/employee';

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

// Updated API URL to port 5001
const API_URL = `${import.meta.env.VITE_API_URL}/employees`;

export function EmployeeProvider({ children }: { children: ReactNode }) {
    const [employees, setEmployees] = useState<Employee[]>([]);

    const getToken = () => localStorage.getItem('ems_token');

    const fetchEmployees = async () => {
        try {
            const response = await fetch(API_URL, {
                headers: { Authorization: `Bearer ${getToken()}` }
            });
            if (response.ok) {
                const data = await response.json();
                setEmployees(data);
            }
        } catch (error) {
            console.error('Failed to fetch employees', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const addEmployee = async (employeeData: Omit<Employee, 'id'>) => {
        try {
            // Sanitize data -> convert empty strings to null to avoid CastErrors
            const payload = { ...employeeData };
            const nullableFields = ['department', 'designation', 'reportingManager', 'dateOfBirth', 'dateOfJoining'];
            // @ts-ignore
            nullableFields.forEach(field => { if (payload[field] === '') payload[field] = null; });

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || response.statusText);
            }

            const newEmployee = await response.json();
            setEmployees(prev => [newEmployee, ...prev]);
            return newEmployee;
        } catch (error) {
            console.error('Failed to add employee', error);
            throw error;
        }
    };

    const updateEmployee = async (id: string, updates: Partial<Employee>) => {
        try {
            // Sanitize data
            const payload = { ...updates };
            const nullableFields = ['department', 'designation', 'reportingManager', 'dateOfBirth', 'dateOfJoining'];
            // @ts-ignore
            nullableFields.forEach(field => { if (payload[field] === '') payload[field] = null; });

            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                const updated = await response.json();
                setEmployees(prev => prev.map(emp => emp.id === id ? updated : emp));
            }
        } catch (error) {
            console.error('Failed to update employee', error);
        }
    };

    const deleteEmployee = async (id: string) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            if (response.ok) {
                setEmployees(prev => prev.filter(emp => emp.id !== id));
            } else {
                const errorText = await response.text();
                throw new Error(errorText || response.statusText);
            }
        } catch (error) {
            console.error('Failed to delete employee', error);
            throw error;
        }
    };

    const getEmployee = (id: string) => {
        return employees.find(emp => emp.id === id);
    };

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee, getEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
}

export function useEmployee() {
    const context = useContext(EmployeeContext);
    if (context === undefined) {
        throw new Error('useEmployee must be used within an EmployeeProvider');
    }
    return context;
}
