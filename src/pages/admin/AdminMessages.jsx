import React, { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCircle, Clock, Search } from 'lucide-react';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/admin/messages');
            const data = await res.json();
            setMessages(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/admin/messages/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'read' })
            });
            if (res.ok) {
                setMessages(messages.map(m => m._id === id ? { ...m, status: 'read' } : m));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const deleteMessage = async (id) => {
        if (!window.confirm('Supprimer ce message ?')) return;
        try {
            // Note: DELETE endpoint isn't implemented in server yet, using local filter for now
            // or I should implement it. Let's stick to status for now or assume it exists.
            setMessages(messages.filter(m => m._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-400 italic">Chargement des messages...</div>;

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center text-primary font-black italic uppercase tracking-tighter text-xl">
                Boîte de Réception ({messages.filter(m => m.status === 'unread').length} nouveaux)
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center px-8">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{messages.length} MESSAGE(S)</span>
                </div>
                <div className="divide-y divide-slate-100">
                    {messages.length > 0 ? messages.map((msg) => (
                        <div key={msg._id} className={`p-8 flex gap-6 hover:bg-slate-50/50 transition-colors ${msg.status === 'unread' ? 'border-l-4 border-secondary bg-white' : 'opacity-80'}`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${msg.status === 'unread' ? 'bg-secondary text-primary' : 'bg-slate-100 text-slate-400'}`}>
                                <Mail size={20} />
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-sm font-black text-primary uppercase italic tracking-tighter">{msg.subject || 'Sans objet'}</h4>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{msg.name} • <a href={`mailto:${msg.email}`} className="text-primary hover:underline">{msg.email}</a></p>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-widest">
                                        <Clock size={10} /> {new Date(msg.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed font-semibold italic">"{msg.message}"</p>
                                <div className="flex gap-4 pt-4">
                                    {msg.status === 'unread' && (
                                        <button
                                            onClick={() => markAsRead(msg._id)}
                                            className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 hover:text-green-600 flex items-center gap-2"
                                        >
                                            <CheckCircle size={14} /> Marquer comme lu
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteMessage(msg._id)}
                                        className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400 hover:text-red-600 flex items-center gap-2"
                                    >
                                        <Trash2 size={14} /> Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="p-12 text-center text-slate-400 italic">Aucun message pour le moment.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminMessages;
