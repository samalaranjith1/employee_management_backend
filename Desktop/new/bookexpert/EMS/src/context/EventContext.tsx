import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

export interface Event {
    _id: string;
    title: string;
    description: string;
    type: 'Announcement' | 'Event' | 'Holiday' | 'Meeting';
    date: string;
    audience: string;
    createdAt: string;
}

interface EventContextType {
    events: Event[];
    fetchEvents: () => Promise<void>;
    createEvent: (data: Partial<Event>) => Promise<void>;
    deleteEvent: (id: string) => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

const API_URL = `${import.meta.env.VITE_API_URL}/events`;

export function EventProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [events, setEvents] = useState<Event[]>([]);

    const getToken = () => localStorage.getItem('ems_token');
    const headers = () => ({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
    });

    const fetchEvents = async () => {
        try {
            const res = await fetch(API_URL, { headers: headers() });
            if (res.ok) setEvents(await res.json());
        } catch (error) {
            console.error('Fetch events failed', error);
        }
    };

    const createEvent = async (data: any) => {
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: headers(),
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error(await res.text());
            toast.success('Event created');
            fetchEvents();
        } catch (error: any) {
            toast.error(error.message || 'Failed to create event');
        }
    };

    const deleteEvent = async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: headers()
            });
            if (!res.ok) throw new Error(await res.text());
            toast.success('Event deleted');
            setEvents(prev => prev.filter(e => e._id !== id));
        } catch (error: any) {
            toast.error(error.message || 'Delete failed');
        }
    };

    useEffect(() => {
        if (user) {
            fetchEvents();
        }
    }, [user]);

    return (
        <EventContext.Provider value={{ events, fetchEvents, createEvent, deleteEvent }}>
            {children}
        </EventContext.Provider>
    );
}

export function useEvents() {
    const context = useContext(EventContext);
    if (context === undefined) {
        throw new Error('useEvents must be used within a EventProvider');
    }
    return context;
}
