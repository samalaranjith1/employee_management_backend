export interface Employee {
    id: string;
    fullName: string;
    email: string;
    gender: 'Male' | 'Female' | 'Other';
    dateOfBirth: string; // ISO date string
    state: string;
    isActive: boolean;
    avatar?: string;
}

export interface EmployeeContextType {
    employees: Employee[];
    addEmployee: (employee: Omit<Employee, 'id'>) => void;
    updateEmployee: (id: string, employee: Partial<Employee>) => void;
    deleteEmployee: (id: string) => void;
    getEmployee: (id: string) => Employee | undefined;
}
