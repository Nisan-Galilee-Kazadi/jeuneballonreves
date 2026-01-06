import React, { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCircle, Clock, Search } from 'lucide-react';

const AdminMessages = () => {
    // For now, this is a mock or would fetch from a contact messages endpoint if it existed
    // Since we used Web3Forms earlier, this might be a placeholder for local DB storage if implemented later
    const [messages, setMessages] = useState([
        { id: 1, name: "Jean Dupont", email: "jean@example.com", subject: "Partenariat Foot", message: "Bonjour, je souhaiterais discuter d'un possible partenariat avec votre académie.", date: new Date().toISOString(), status: 'unread' },
        { id: 2, name: "Marie K.", email: "marie@test.cd", subject: "Inscription enfant", message: "Quels sont les tarifs pour l'inscription d'un enfant de 10 ans ?", date: new Date().toISOString(), status: 'read' },
    ]);

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center text-primary font-black italic uppercase tracking-tighter text-xl">
                Boîte de Réception
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center px-8">
                    <span className="text-xs font-bold text-slate-400">2 MESSAGES</span>
                    <div className="flex gap-4">
                        <button className="text-[10px] font-bold text-primary hover:text-secondary uppercase tracking-widest">Tout marquer comme lu</button>
                    </div>
                </div>
                <div className="divide-y divide-slate-50">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`p-8 flex gap-6 hover:bg-slate-50 transition-colors ${msg.status === 'unread' ? 'border-l-4 border-secondary' : ''}`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${msg.status === 'unread' ? 'bg-secondary text-primary' : 'bg-slate-100 text-slate-400'}`}>
                                <Mail size={20} />
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-sm font-black text-primary uppercase italic tracking-tighter">{msg.subject}</h4>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{msg.name} • {msg.email}</p>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-widest">
                                        <Clock size={10} /> {new Date(msg.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed font-medium italic">"{msg.message}"</p>
                                <div className="flex gap-4 pt-4">
                                    <button className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-secondary flex items-center gap-2">
                                        <CheckCircle size={14} /> Répondre
                                    </button>
                                    <button className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400 hover:text-red-600 flex items-center gap-2">
                                        <Trash2 size={14} /> Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminMessages;
