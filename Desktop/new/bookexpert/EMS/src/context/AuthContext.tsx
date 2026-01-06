import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/auth';

interface AuthContextType {
    user: User | null;
    login: (email: string, password?: string) => Promise<void>;
    register: (name: string, email: string, password?: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Updated API URL to port 5001
const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('ems_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password?: string) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                let errorMsg = 'Login failed';
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorData.error || JSON.stringify(errorData);
                } catch {
                    errorMsg = await response.text();
                }
                throw new Error(errorMsg);
            }

            const data = await response.json();
            localStorage.setItem('ems_user', JSON.stringify(data.user));
            localStorage.setItem('ems_token', data.token); // Store token
            setUser(data.user);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const register = async (name: string, email: string, password?: string) => {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                let errorMsg = 'Registration failed';
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorData.error || JSON.stringify(errorData);
                } catch {
                    errorMsg = await response.text();
                }
                throw new Error(errorMsg);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('ems_user');
        localStorage.removeItem('ems_token');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
