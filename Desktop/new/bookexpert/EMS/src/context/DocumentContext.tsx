import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

export interface Document {
    id: string; // Transformed from _id
    _id: string;
    title: string;
    type: string;
    fileData: string; // Base64
    fileName?: string;
    createdAt: string;
}

interface DocumentContextType {
    documents: Document[];
    fetchDocuments: () => Promise<void>;
    uploadDocument: (data: { title: string; type: string; fileData: string; fileName: string }) => Promise<void>;
    deleteDocument: (id: string) => Promise<void>;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

const API_URL = `${import.meta.env.VITE_API_URL}/documents`;

export function DocumentProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [documents, setDocuments] = useState<Document[]>([]);

    const getToken = () => localStorage.getItem('ems_token');
    const headers = () => ({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
    });

    const fetchDocuments = async () => {
        try {
            const res = await fetch(`${API_URL}/my-documents`, { headers: headers() });
            if (res.ok) setDocuments(await res.json());
        } catch (error) {
            console.error('Fetch documents failed', error);
        }
    };

    const uploadDocument = async (data: any) => {
        try {
            const res = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                headers: headers(),
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error(await res.text());
            toast.success('Document uploaded');
            fetchDocuments();
        } catch (error: any) {
            toast.error(error.message || 'Upload failed');
        }
    };

    const deleteDocument = async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: headers()
            });
            if (!res.ok) throw new Error(await res.text());
            toast.success('Document deleted');
            setDocuments(prev => prev.filter(d => d._id !== id));
        } catch (error: any) {
            toast.error(error.message || 'Delete failed');
        }
    };

    useEffect(() => {
        if (user) {
            fetchDocuments();
        }
    }, [user]);

    return (
        <DocumentContext.Provider value={{ documents, fetchDocuments, uploadDocument, deleteDocument }}>
            {children}
        </DocumentContext.Provider>
    );
}

export function useDocuments() {
    const context = useContext(DocumentContext);
    if (context === undefined) {
        throw new Error('useDocuments must be used within a DocumentProvider');
    }
    return context;
}
