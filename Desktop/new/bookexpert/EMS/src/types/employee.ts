import type { Department, Designation } from '../context/OrganizationContext';

export interface Employee {
    id: string;
    fullName: string;
    email: string;
    gender: 'Male' | 'Female' | 'Other';
    dateOfBirth: string; // ISO date string
    state: string;
    isActive: boolean;
    avatar?: string;

    // --- New Fields ---
    department?: string | Department;
    designation?: string | Designation;
    reportingManager?: string | Employee;
    dateOfJoining?: string;
    status: 'Active' | 'Probation' | 'Notice Period' | 'Terminated' | 'Resigned' | 'Inactive';
    workMode: 'Office' | 'Remote' | 'Hybrid';
    phone?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
    role?: 'Admin' | 'HR' | 'Manager' | 'Employee';
}

export interface EmployeeContextType {
    employees: Employee[];
    addEmployee: (employee: Omit<Employee, 'id'>) => Promise<Employee>;
    updateEmployee: (id: string, employee: Partial<Employee>) => Promise<void>;
    deleteEmployee: (id: string) => Promise<void>;
    getEmployee: (id: string) => Employee | undefined;
}
