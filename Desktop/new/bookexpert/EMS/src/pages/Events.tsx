import { useState } from 'react';
import { useEvents } from '../context/EventContext';
import { Bell, Calendar, Megaphone, Plus, Trash2 } from 'lucide-react';

export default function Events() {
    const { events, createEvent, deleteEvent } = useEvents();
    const [isModalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({
        title: '',
        description: '',
        type: 'Announcement',
        date: new Date().toISOString().split('T')[0],
        audience: 'All'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createEvent(form as any);
        setModalOpen(false);
        setForm({ title: '', description: '', type: 'Announcement', date: new Date().toISOString().split('T')[0], audience: 'All' });
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Announcement': return <Megaphone size={20} color="#3b82f6" />;
            case 'Holiday': return <Calendar size={20} color="#10b981" />;
            default: return <Bell size={20} color="#f59e0b" />;
        }
    };

    return (
        <div>
            <div className="glass-panel" style={{ padding: 0 }}>
                <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>Announcements & Events</h3>
                    <button className="btn-primary" onClick={() => setModalOpen(true)}>
                        <Plus size={18} style={{ marginRight: '6px' }} /> Create New
                    </button>
                </div>

                <div style={{ padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                    {events.map(event => (
                        <div key={event._id} className="glass-panel" style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '50%' }}>
                                        {getTypeIcon(event.type)}
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0 }}>{event.title}</h4>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                            {new Date(event.date).toLocaleDateString()} • {event.type}
                                        </span>
                                    </div>
                                </div>
                                <button className="action-btn delete" onClick={() => deleteEvent(event._id)}>
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: '1.5' }}>
                                {event.description}
                            </p>

                            <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                                <span className="badge badge-secondary" style={{ fontSize: '0.75rem' }}>{event.audience}</span>
                            </div>
                        </div>
                    ))}
                    {events.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                            No active announcements or events.
                        </div>
                    )}
                </div>
            </div>

            {/* CREATE MODAL */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="glass-panel modal-content" style={{ maxWidth: '400px' }}>
                        <div className="modal-header">
                            <h3>Create Event</h3>
                            <button className="close-btn" onClick={() => setModalOpen(false)}>✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-body">
                            <div className="form-group">
                                <label className="form-label">Title</label>
                                <input className="form-input" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Type</label>
                                <select className="form-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value as any })}>
                                    <option>Announcement</option>
                                    <option>Event</option>
                                    <option>Holiday</option>
                                    <option>Meeting</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Date</label>
                                <input type="date" className="form-input" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Audience</label>
                                <select className="form-input" value={form.audience} onChange={e => setForm({ ...form, audience: e.target.value })}>
                                    <option>All</option>
                                    <option>Department</option>
                                    <option>Management</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea className="form-input" rows={3} required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
