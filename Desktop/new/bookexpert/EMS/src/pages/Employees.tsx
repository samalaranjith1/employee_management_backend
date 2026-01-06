import { useState } from 'react';
import toast from 'react-hot-toast';
import { useEmployee } from '../context/EmployeeContext';
import type { Employee } from '../types/employee';
import EmployeeFormModal from '../components/EmployeeFormModal';
import {
    Search,
    Edit2,
    Trash2,
    Printer,
    Plus
} from 'lucide-react';

export default function Employees() {
    const { employees, deleteEmployee, addEmployee, updateEmployee } = useEmployee();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
    const [genderFilter, setGenderFilter] = useState<'All' | 'Male' | 'Female' | 'Other'>('All');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>(undefined);

    // Filter Logic
    const filteredEmployees = employees.filter(emp => {
        const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesActive = activeFilter === 'All'
            ? true
            : activeFilter === 'Active' ? emp.isActive : !emp.isActive;

        const matchesGender = genderFilter === 'All'
            ? true
            : emp.gender === genderFilter;

        return matchesSearch && matchesActive && matchesGender;
    });

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await deleteEmployee(id);
                toast.success('Employee deleted successfully');
            } catch (error: any) {
                toast.error(error.message || 'Failed to delete employee');
            }
        }
    };

    const handleStatusToggle = async (emp: Employee) => {
        const newStatus = !emp.isActive;
        try {
            await updateEmployee(emp.id, {
                isActive: newStatus,
                status: newStatus ? 'Active' : 'Inactive'
            });
            toast.success(`Status updated to ${newStatus ? 'Active' : 'Inactive'}`);
        } catch (error: any) {
            toast.error('Failed to update status');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleAddClick = () => {
        setSelectedEmployee(undefined);
        setIsModalOpen(true);
    };

    const handleEditClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (data: Omit<Employee, 'id'>) => {
        try {
            if (selectedEmployee) {
                await updateEmployee(selectedEmployee.id, data);
                toast.success('Employee updated successfully');
            } else {
                await addEmployee(data);
                toast.success('Employee added successfully');
            }
            setIsModalOpen(false);
        } catch (error: any) {
            console.error('Operation failed', error);
            const msg = error.message || 'Operation failed';
            toast.error(msg);
        }
    };

    return (
        <div>
            {/* Toolbar */}
            <div className="toolbar glass-panel" style={{ padding: '1rem' }}>
                <div className="search-bar">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-group">
                    <select
                        className="filter-select"
                        value={activeFilter}
                        onChange={(e) => setActiveFilter(e.target.value as any)}
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    <select
                        className="filter-select"
                        value={genderFilter}
                        onChange={(e) => setGenderFilter(e.target.value as any)}
                    >
                        <option value="All">All Genders</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <button
                        className="btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        onClick={handleAddClick}
                    >
                        <Plus size={20} />
                        Add Employee
                    </button>

                    <button className="btn-primary" onClick={handlePrint} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-glass)' }}>
                        <Printer size={20} />
                    </button>
                </div>
            </div>

            {/* Table - Printable Section */}
            <div className="glass-panel printable-area" style={{ padding: '0' }}>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Gender</th>
                                <th>DOB</th>
                                <th>State</th>
                                <th>Status</th>
                                <th className="no-print">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map((emp) => (
                                    <tr key={emp.id}>
                                        <td>
                                            <div className="employee-cell">
                                                <img
                                                    src={emp.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.fullName)}`}
                                                    alt={emp.fullName}
                                                    className="table-avatar"
                                                />
                                                <div>
                                                    <div style={{ fontWeight: 500 }}>{emp.fullName}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{emp.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{emp.gender}</td>
                                        <td>{new Date(emp.dateOfBirth).toLocaleDateString()}</td>
                                        <td>{emp.state}</td>
                                        <td>
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    checked={emp.isActive}
                                                    onChange={() => handleStatusToggle(emp)}
                                                />
                                                <span className="slider round"></span>
                                            </label>
                                            <span style={{ marginLeft: '8px', fontSize: '0.85rem', color: emp.isActive ? '#10b981' : 'var(--text-secondary)' }}>
                                                {emp.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="no-print">
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    className="action-btn"
                                                    title="Edit"
                                                    onClick={() => handleEditClick(emp)}
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    className="action-btn delete"
                                                    title="Delete"
                                                    onClick={() => handleDelete(emp.id)}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                                        No employees found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <EmployeeFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
                initialData={selectedEmployee}
            />

            <style>{`
                .switch {
                    position: relative;
                    display: inline-block;
                    width: 34px;
                    height: 18px;
                    vertical-align: middle;
                }
                .switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #4b5563; /* Gray-600 */
                    transition: .4s;
                    border-radius: 34px;
                }
                .slider:before {
                    position: absolute;
                    content: "";
                    height: 14px;
                    width: 14px;
                    left: 2px;
                    bottom: 2px;
                    background-color: white;
                    transition: .4s;
                    border-radius: 50%;
                }
                input:checked + .slider {
                    background-color: #10b981; /* Emerald-500 */
                }
                input:checked + .slider:before {
                    transform: translateX(16px);
                }
            `}</style>
        </div>
    );
}
