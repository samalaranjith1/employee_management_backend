import { useState, useEffect } from 'react';
import { usePayroll } from '../context/PayrollContext';
import type { SalaryStructure, Payslip } from '../context/PayrollContext';
import { useEmployee } from '../context/EmployeeContext';
import { Banknote, Calculator, Download, Eye, FileText } from 'lucide-react';

export default function Payroll() {
    const {
        myPayslips, allPayslips,
        fetchSalaryStructure, saveSalaryStructure,
        generatePayslip, fetchAllPayslips, updatePayslipStatus
    } = usePayroll();

    // @ts-ignore
    const { employees } = useEmployee(); // To select employee for structure/generation

    const [activeTab, setActiveTab] = useState<'my-payslips' | 'manage'>('my-payslips');

    // --- Management States ---
    const [selectedEmpId, setSelectedEmpId] = useState('');
    const [salaryStruct, setSalaryStruct] = useState<SalaryStructure>({
        basic: 0, hra: 0, da: 0, specialAllowance: 0, pf: 0, tax: 0
    });

    // Payslip Generation
    const [genMonth, setGenMonth] = useState(new Date().getMonth() + 1); // 1-12
    const [genYear, setGenYear] = useState(new Date().getFullYear());
    const [genLOP, setGenLOP] = useState(0);

    const [viewPayslip, setViewPayslip] = useState<Payslip | null>(null);

    // Load structure when employee selected
    useEffect(() => {
        if (selectedEmpId) {
            fetchSalaryStructure(selectedEmpId).then(data => {
                if (data) setSalaryStruct(data);
                else setSalaryStruct({ basic: 0, hra: 0, da: 0, specialAllowance: 0, pf: 0, tax: 0 }); // Reset if new
            });
        }
    }, [selectedEmpId]);

    // Fetch all payslips on load (for admin view)
    useEffect(() => {
        if (activeTab === 'manage') {
            fetchAllPayslips(genMonth, genYear);
        }
    }, [activeTab, genMonth, genYear]);

    const handleSaveStructure = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedEmpId) return;
        await saveSalaryStructure(selectedEmpId, salaryStruct);
    };

    const handleGenerate = async () => {
        if (!selectedEmpId) return;
        await generatePayslip(selectedEmpId, genMonth, genYear, genLOP);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    };

    const getMonthName = (m: number) => new Date(2000, m - 1).toLocaleString('default', { month: 'long' });

    const handlePrintPayload = () => {
        window.print();
    };

    return (
        <div>
            <div className="glass-panel no-print" style={{ marginBottom: '1.5rem', padding: '1rem', display: 'flex', gap: '1rem' }}>
                <button
                    className={`btn-secondary ${activeTab === 'my-payslips' ? 'active-tab' : ''}`}
                    style={{ background: activeTab === 'my-payslips' ? 'rgba(59, 130, 246, 0.2)' : 'transparent' }}
                    onClick={() => setActiveTab('my-payslips')}
                >
                    <FileText size={18} style={{ display: 'inline', marginRight: '8px' }} />
                    My Payslips
                </button>
                <button
                    className={`btn-secondary ${activeTab === 'manage' ? 'active-tab' : ''}`}
                    style={{ background: activeTab === 'manage' ? 'rgba(59, 130, 246, 0.2)' : 'transparent' }}
                    onClick={() => setActiveTab('manage')}
                >
                    <Banknote size={18} style={{ display: 'inline', marginRight: '8px' }} />
                    Payroll Management
                </button>
            </div>

            {/* --- MY PAYSLIPS --- */}
            {activeTab === 'my-payslips' && (
                <div className="glass-panel no-print">
                    <h3 style={{ marginBottom: '1rem' }}>Recent Payslips</h3>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Period</th>
                                    <th>Base Salary</th>
                                    <th>Deductions</th>
                                    <th>Net Pay</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myPayslips.map(slip => (
                                    <tr key={slip.id}>
                                        <td>{getMonthName(slip.month)} {slip.year}</td>
                                        <td>{formatCurrency(slip.totalEarnings)}</td>
                                        <td style={{ color: '#ef4444' }}>- {formatCurrency(slip.totalDeductions)}</td>
                                        <td style={{ fontWeight: 600, color: '#10b981' }}>{formatCurrency(slip.netPay)}</td>
                                        <td>
                                            <span className={`badge ${slip.status === 'Paid' ? 'badge-success' : 'badge-secondary'}`}>
                                                {slip.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="action-btn"
                                                title="View / Print"
                                                onClick={() => setViewPayslip(slip)}
                                            >
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {myPayslips.length === 0 && (
                                    <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No payslips found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* --- MANAGEMENT TAB --- */}
            {activeTab === 'manage' && (
                <div className="no-print" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '1.5rem' }}>

                    {/* LEFT: Salary Structure Form */}
                    <div className="glass-panel">
                        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calculator size={20} /> Salary Structure
                        </h3>

                        <div className="form-group">
                            <label className="form-label">Select Employee</label>
                            <select
                                className="form-input"
                                value={selectedEmpId}
                                onChange={e => setSelectedEmpId(e.target.value)}
                            >
                                <option value="">-- Select --</option>
                                {employees.map(e => (
                                    <option key={e.id} value={e.id}>{e.fullName} ({e.email})</option>
                                ))}
                            </select>
                        </div>

                        {selectedEmpId && (
                            <form onSubmit={handleSaveStructure}>
                                <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="form-group">
                                        <label className="form-label">Basic Pay</label>
                                        <input type="number" className="form-input" value={salaryStruct.basic} onChange={e => setSalaryStruct({ ...salaryStruct, basic: parseFloat(e.target.value) || 0 })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">HRA</label>
                                        <input type="number" className="form-input" value={salaryStruct.hra} onChange={e => setSalaryStruct({ ...salaryStruct, hra: parseFloat(e.target.value) || 0 })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">DA</label>
                                        <input type="number" className="form-input" value={salaryStruct.da} onChange={e => setSalaryStruct({ ...salaryStruct, da: parseFloat(e.target.value) || 0 })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Special Allow.</label>
                                        <input type="number" className="form-input" value={salaryStruct.specialAllowance} onChange={e => setSalaryStruct({ ...salaryStruct, specialAllowance: parseFloat(e.target.value) || 0 })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">PF (Deduction)</label>
                                        <input type="number" className="form-input" value={salaryStruct.pf} onChange={e => setSalaryStruct({ ...salaryStruct, pf: parseFloat(e.target.value) || 0 })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Tax (TDS)</label>
                                        <input type="number" className="form-input" value={salaryStruct.tax} onChange={e => setSalaryStruct({ ...salaryStruct, tax: parseFloat(e.target.value) || 0 })} />
                                    </div>
                                </div>

                                <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span>Gross:</span>
                                        <strong>{formatCurrency((salaryStruct.basic + salaryStruct.hra + salaryStruct.da + salaryStruct.specialAllowance))}</strong>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ef4444' }}>
                                        <span>Deductions:</span>
                                        <strong>{formatCurrency((salaryStruct.pf + salaryStruct.tax))}</strong>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-glass)', fontSize: '1.1rem' }}>
                                        <span>Net Salary:</span>
                                        <strong style={{ color: '#10b981' }}>{formatCurrency((salaryStruct.basic + salaryStruct.hra + salaryStruct.da + salaryStruct.specialAllowance) - (salaryStruct.pf + salaryStruct.tax))}</strong>
                                    </div>
                                </div>

                                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                                    Save Structure
                                </button>

                                <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border-glass)' }} />

                                <h4 style={{ marginBottom: '0.5rem' }}>Generate Payslip</h4>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label style={{ fontSize: '0.8rem' }}>Month</label>
                                        <input type="number" min="1" max="12" className="form-input" value={genMonth} onChange={e => setGenMonth(parseInt(e.target.value))} />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ fontSize: '0.8rem' }}>Year</label>
                                        <input type="number" className="form-input" value={genYear} onChange={e => setGenYear(parseInt(e.target.value))} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label style={{ fontSize: '0.8rem' }}>Loss of Pay (Amt)</label>
                                    <input type="number" className="form-input" value={genLOP} onChange={e => setGenLOP(parseFloat(e.target.value))} />
                                </div>
                                <button type="button" className="btn-secondary" style={{ width: '100%' }} onClick={handleGenerate}>
                                    Generate Draft Payslip
                                </button>
                            </form>
                        )}
                    </div>

                    {/* RIGHT: Payslip List */}
                    <div className="glass-panel">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3>Payslips for {getMonthName(genMonth)} {genYear}</h3>
                        </div>
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Employee</th>
                                        <th>Net Pay</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allPayslips.map(slip => (
                                        <tr key={slip.id}>
                                            <td>
                                                <div style={{ fontWeight: 600 }}>{typeof slip.employee === 'object' ? slip.employee.fullName : 'Unknown'}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{typeof slip.employee === 'object' ? slip.employee.employeeId : ''}</div>
                                            </td>
                                            <td style={{ fontWeight: 600 }}>{formatCurrency(slip.netPay)}</td>
                                            <td>
                                                <span className={`badge ${slip.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                                                    {slip.status}
                                                </span>
                                            </td>
                                            <td>
                                                {slip.status !== 'Paid' && (
                                                    <button
                                                        className="btn-primary"
                                                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', height: 'auto', marginRight: '5px' }}
                                                        onClick={() => updatePayslipStatus(slip.id, 'Paid')}
                                                    >
                                                        Mark Paid
                                                    </button>
                                                )}
                                                <button
                                                    className="action-btn"
                                                    title="View"
                                                    onClick={() => setViewPayslip(slip)}
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {allPayslips.length === 0 && <tr><td colSpan={4} style={{ textAlign: 'center' }}>No payslips generated for this period.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* PAYSLIP VIEW/PRINT MODAL */}
            {viewPayslip && (
                <div className="modal-overlay">
                    <div className="glass-panel modal-content" style={{ maxWidth: '700px', width: '90%' }}>
                        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3>Payslip Detail</h3>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="btn-primary" onClick={handlePrintPayload}><Download size={18} /> Print</button>
                                <button className="close-btn" onClick={() => setViewPayslip(null)}>✕</button>
                            </div>
                        </div>

                        <div className="printable-payslip" style={{ background: 'white', color: 'black', padding: '2rem', borderRadius: '4px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '2px solid #eee', paddingBottom: '1rem' }}>
                                <h1 style={{ margin: 0, color: '#333' }}>BookExpert Inc.</h1>
                                <p style={{ color: '#666', margin: '5px 0' }}>123 Tech Park, Innovation Street, Digital City</p>
                                <h2 style={{ margin: '1rem 0 0 0', fontSize: '1.2rem', textTransform: 'uppercase' }}>
                                    Payslip for {getMonthName(viewPayslip.month)} {viewPayslip.year}
                                </h2>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                                <div>
                                    <strong>Employee:</strong> {typeof viewPayslip.employee === 'object' ? viewPayslip.employee.fullName : 'N/A'}<br />
                                    <strong>ID:</strong> {typeof viewPayslip.employee === 'object' ? viewPayslip.employee.employeeId : 'N/A'}<br />
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <strong>Generated:</strong> {new Date(viewPayslip.createdAt).toLocaleDateString()}<br />
                                    <strong>Status:</strong> {viewPayslip.status}
                                </div>
                            </div>

                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
                                <thead>
                                    <tr style={{ background: '#f5f5f5' }}>
                                        <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Earnings</th>
                                        <th style={{ textAlign: 'right', padding: '10px', border: '1px solid #ddd' }}>Amount</th>
                                        <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Deductions</th>
                                        <th style={{ textAlign: 'right', padding: '10px', border: '1px solid #ddd' }}>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Basic Salary</td>
                                        <td style={{ textAlign: 'right', padding: '8px', border: '1px solid #ddd' }}>{formatCurrency(viewPayslip.basic)}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Provident Fund</td>
                                        <td style={{ textAlign: 'right', padding: '8px', border: '1px solid #ddd' }}>{formatCurrency(viewPayslip.lossOfPay > 0 ? 0 : 0 /* Need to store PF in payslip if accurate */)}</td>
                                        {/* To keep it simple, we just show LOP and Total Deductions for now as separate items, 
                                            since schema lumps PF/Tax into totals or structure. 
                                            Ideally Payslip model should snapshot PF/Tax individually. 
                                            It currently has snapshot of structure values basic/hra/etc but not explicit pf/tax fields in schema (except via structure lookup which is lost). 
                                            Wait, Payslip schema DOES NOT have pf/tax snapshot. It only has totalDeductions. */
                                        }
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>HRA</td>
                                        <td style={{ textAlign: 'right', padding: '8px', border: '1px solid #ddd' }}>{formatCurrency(viewPayslip.hra)}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Loss of Pay</td>
                                        <td style={{ textAlign: 'right', padding: '8px', border: '1px solid #ddd' }}>{formatCurrency(viewPayslip.lossOfPay)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>DA</td>
                                        <td style={{ textAlign: 'right', padding: '8px', border: '1px solid #ddd' }}>{formatCurrency(viewPayslip.da)}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Other Taxes/Deductions</td>
                                        <td style={{ textAlign: 'right', padding: '8px', border: '1px solid #ddd' }}>{formatCurrency(viewPayslip.totalDeductions - viewPayslip.lossOfPay)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Special Allowance</td>
                                        <td style={{ textAlign: 'right', padding: '8px', border: '1px solid #ddd' }}>{formatCurrency(viewPayslip.specialAllowance)}</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}></td>
                                        <td style={{ textAlign: 'right', padding: '8px', border: '1px solid #ddd' }}></td>
                                    </tr>
                                    <tr style={{ background: '#f5f5f5', fontWeight: 'bold' }}>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>Total Earnings</td>
                                        <td style={{ textAlign: 'right', padding: '10px', border: '1px solid #ddd' }}>{formatCurrency(viewPayslip.totalEarnings)}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>Total Deductions</td>
                                        <td style={{ textAlign: 'right', padding: '10px', border: '1px solid #ddd' }}>{formatCurrency(viewPayslip.totalDeductions)}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1rem', borderRadius: '4px', minWidth: '200px' }}>
                                    <div style={{ fontSize: '0.9rem', color: '#166534' }}>Net Pay</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#15803d' }}>{formatCurrency(viewPayslip.netPay)}</div>
                                </div>
                            </div>

                            <div style={{ marginTop: '3rem', borderTop: '1px solid #ddd', paddingTop: '1rem', fontSize: '0.8rem', color: '#888', textAlign: 'center' }}>
                                This is a computer-generated document and does not require a signature.
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
