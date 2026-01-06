# EMS 2.0 Implementation Plan

This document outlines the roadmap to transform the current EMS into a comprehensive Enterprise Resource Planning (ERP) system for employee management.

## 1. Core & Auth Module (Existing - To Be Enhanced)
- [x] Login/Register
- [x] JWT Authentication
- [x] Basic Layout (Glassmorphism)
- [ ] **Enhancement**: Role-based Access Control (RBAC) implementation (Admin, HR, Manager, Employee).

## 2. Employee Management Module (Partial - To Be Enhanced)
- [x] Basic CRUD (Name, Email, Gen, DOB, State).
- [ ] **Enhancement**: 
    - [ ] Profile Photo Upload (Real file storage, currently base64/placeholder).
    - [ ] Link to Department/Designation.
    - [ ] Assign Reporting Manager.
    - [ ] Employment Status (Probation, Permanent, Notice).
    - [ ] Document Links.

## 3. Organization Structure Module (Foundational)
- [ ] **Department Management**: Create, Edit, Delete Departments (e.g., Engineering, Sales).
- [ ] **Designation Management**: Create Roles (e.g., Senior Dev, Intern).
- [ ] **Teams**: Group employees.
- [ ] **Org Chart**: Visual hierarchy viewer.

## 4. Attendance Management Module
- [ ] **Daily Logs**: Punch In/Out API.
- [ ] **Logic**: Calculate hours worked.
- [ ] **Correction**: Request correction workflow.
- [ ] **Reports**: Monthly summary.

## 5. Leave Management Module
- [ ] **Configuration**: Define Leave Types (Sick, Casual, Paid).
- [ ] **Balances**: Track remaining leaves per user.
- [ ] **Workflow**: Apply -> Manager Approve/Reject.
- [ ] **Calendar**: Team absence view.

## 6. Payroll & Compensation Module
- [ ] **Structure**: Define Base, HRA, DA, etc.
- [ ] **Processing**: Monthly generation script.
- [ ] **Payslips**: PDF Generation.
- [ ] **History**: View past salaries.

## 7. Performance Management Module
- [ ] **Goals/OKRs**: Set quarterly targets.
- [ ] **Reviews**: Manager & Self review forms.
- [ ] **Rating**: 1-5 scale and feedback.

## 8. Training & Skills Module
- [ ] **Skill Matrix**: Tag employees with skills (React, Node, Sales).
- [ ] **Training**: List available courses (Status: Assigned, Completed).

## 9. Request & Approval Module
- [ ] **Assets**: "Need new laptop".
- [ ] **Documents**: "Need Address Proof".
- [ ] **Workflow**: Generic approval engine.

## 10. Communication Module
- [ ] **Notices**: Admin posts announcements.
- [ ] **Holidays**: Yearly calendar.

## 11. Document Management Module
- [ ] **Repository**: Upload/View PDFs.
- [ ] **Permissions**: Who can see what.

## 12. Dashboard & Analytics (To Be Enhanced)
- [x] Basic Counters.
- [ ] **Advanced**: Charts for Attendance, Attrition, Leave distribution.

## 13. Audit & Compliance
- [ ] **Logs**: Middleware to record *who* did *what*.
- [ ] **History**: Field-level modifications.

## 14. System Config
- [ ] **Settings**: Global variables (Work hours, Leave rules).

---

## Immediate Next Steps (Phase 1)
1.  **Database Modeling**: Create Schemas for all major modules to stabilize the data architecture.
2.  **Organization Structure**: Implement Departments and Designations (Prerequisite for robust Employee profiles).
3.  **Enhanced Employee Form**: Connect Employees to the new Org Structure.
