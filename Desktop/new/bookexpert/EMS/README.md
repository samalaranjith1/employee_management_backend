# Employee Management System (EMS)

A modern, responsive MERN Stack application for managing employee records.

## Features

### Authentication
- **Secure Login Page**: JWT-based Authentication.
- **Protected Routes**: Dashboard access is restricted to authenticated users.

### Dashboard
- **Overview**: View total employee count and status distribution.
- **Navigation**: Clean sidebar navigation.

### Employee Management
- **List View**: Rich table display with employee avatars and status badges.
- **Search & Filter**: Real-time searching by name/email and filtering by active status.
- **Add/Edit Employee**: Modal-based form for adding and updating employee details (Data persisted in MongoDB).
- **Image Upload**: Support for Avatar images (Base64).
- **Delete**: Secure deletion with executing confirmation.
- **Print**: Optimized print layout for employee lists.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Styling**: Vanilla CSS (Variables, Glassmorphism)
- **State Management**: React Context API

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed and running locally

### 1. Setup Backend
Open a terminal in the project root:
```bash
cd server
npm install
npm run seed  # Creates admin user (admin@example.com / password)
node index.js
```
The server runs on `http://localhost:5000`.

### 2. Setup Frontend
Open a **new** terminal in the project root:
```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

## Login Credentials
- **Email**: admin@example.com
- **Password**: password

## Design Decisions

- **Glassmorphism**: Used to create a premium, modern feel with transparency and blurs.
- **MERN Stack**: Full stack implementation for robust data management.
- **REST API**: Clean API structure for Auth and Employees using Express.
- **JWT Auth**: Secure stateless authentication strategy.
