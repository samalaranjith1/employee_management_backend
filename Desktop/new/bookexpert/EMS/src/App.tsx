import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { OrganizationProvider } from './context/OrganizationContext';
import { AttendanceProvider } from './context/AttendanceContext';
import { LeaveProvider } from './context/LeaveContext';
import { PayrollProvider } from './context/PayrollContext';
import { PerformanceProvider } from './context/PerformanceContext';
import { DocumentProvider } from './context/DocumentContext';
import { RecruitmentProvider } from './context/RecruitmentContext';
import { EventProvider } from './context/EventContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Organization from './pages/Organization';
import Attendance from './pages/Attendance';
import Leave from './pages/Leave';
import Payroll from './pages/Payroll';
import Performance from './pages/Performance';
import Documents from './pages/Documents';
import Recruitment from './pages/Recruitment';
import Events from './pages/Events';
import Careers from './pages/Careers';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OrganizationProvider>
          <AttendanceProvider>
            <LeaveProvider>
              <PayrollProvider>
                <PerformanceProvider>
                  <DocumentProvider>
                    <RecruitmentProvider>
                      <EventProvider>
                        <EmployeeProvider>
                          <Toaster
                            position="top-right"
                            toastOptions={{
                              style: {
                                background: '#1e293b',
                                color: '#fff',
                                border: '1px solid rgba(255,255,255,0.1)',
                              },
                              success: {
                                style: {
                                  background: 'rgba(16, 185, 129, 0.9)',
                                  borderColor: '#10b981',
                                },
                              },
                              error: {
                                duration: 4000,
                                style: {
                                  background: 'rgba(239, 68, 68, 0.9)',
                                  borderColor: '#ef4444',
                                },
                              },
                            }}
                          />
                          <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/careers" element={<Careers />} />

                            <Route element={<ProtectedRoute />}>
                              <Route element={<DashboardLayout />}>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/employees" element={<Employees />} />
                                <Route path="/organization" element={<Organization />} />
                                <Route path="/attendance" element={<Attendance />} />
                                <Route path="/leave" element={<Leave />} />
                                <Route path="/payroll" element={<Payroll />} />
                                <Route path="/performance" element={<Performance />} />
                                <Route path="/documents" element={<Documents />} />
                                <Route path="/recruitment" element={<Recruitment />} />
                                <Route path="/events" element={<Events />} />
                              </Route>
                            </Route>

                            <Route path="*" element={<Navigate to="/" replace />} />
                          </Routes>
                        </EmployeeProvider>
                      </EventProvider>
                    </RecruitmentProvider>
                  </DocumentProvider>
                </PerformanceProvider>
              </PayrollProvider>
            </LeaveProvider>
          </AttendanceProvider>
        </OrganizationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
