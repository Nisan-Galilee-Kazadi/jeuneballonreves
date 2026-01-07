import React, { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCircle, Clock, Search, Reply, Forward, Star, Archive, Eye, EyeOff, Send, X, ChevronLeft, User, Calendar } from 'lucide-react';
import { useAlertContext } from '../../components/AlertProvider';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // all, unread, read, starred
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);
    const alert = useAlertContext();

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/admin/messages');
            const data = await res.json();
            setMessages(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            alert.error('Erreur lors du chargement des messages');
            setMessages([]); // S'assurer que messages est toujours un tableau
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
                if (selectedMessage && selectedMessage._id === id) {
                    setSelectedMessage({ ...selectedMessage, status: 'read' });
                }
            }
        } catch (err) {
            console.error(err);
            alert.error('Erreur lors du marquage comme lu');
        }
    };

    const markAsUnread = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/admin/messages/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'unread' })
            });
            if (res.ok) {
                setMessages(messages.map(m => m._id === id ? { ...m, status: 'unread' } : m));
                if (selectedMessage && selectedMessage._id === id) {
                    setSelectedMessage({ ...selectedMessage, status: 'unread' });
                }
            }
        } catch (err) {
            console.error(err);
            alert.error('Erreur lors du marquage comme non lu');
        }
    };

    const toggleStar = async (id) => {
        try {
            const message = messages.find(m => m._id === id);
            if (!message) {
                alert.error('Message non trouvé dans la liste');
                return;
            }
            
            const newStarredStatus = !message.starred;
            
            const res = await fetch(`http://localhost:5000/api/admin/messages/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ starred: newStarredStatus })
            });
            
            if (res.ok) {
                setMessages(messages.map(m => m._id === id ? { ...m, starred: newStarredStatus } : m));
                if (selectedMessage && selectedMessage._id === id) {
                    setSelectedMessage({ ...selectedMessage, starred: newStarredStatus });
                }
            } else if (res.status === 404) {
                // Si le message n'existe plus, le retirer de la liste
                setMessages(messages.filter(m => m._id !== id));
                if (selectedMessage && selectedMessage._id === id) {
                    setSelectedMessage(null);
                }
                alert.error('Ce message n\'existe plus et a été retiré de la liste');
            } else {
                const errorData = await res.json().catch(() => ({}));
                alert.error(errorData.message || 'Erreur lors du marquage comme important');
            }
        } catch (err) {
            console.error(err);
            alert.error('Erreur réseau lors du marquage comme important');
        }
    };

    const deleteMessage = async (id) => {
        alert.confirm(
            'Êtes-vous sûr de vouloir supprimer ce message ?',
            async () => {
                try {
                    const res = await fetch(`http://localhost:5000/api/admin/messages/${id}`, {
                        method: 'DELETE'
                    });
                    if (res.ok) {
                        setMessages(messages.filter(m => m._id !== id));
                        if (selectedMessage && selectedMessage._id === id) {
                            setSelectedMessage(null);
                        }
                        alert.success('Message supprimé avec succès');
                    } else {
                        alert.error('Erreur lors de la suppression');
                    }
                } catch (err) {
                    console.error(err);
                    alert.error('Erreur réseau lors de la suppression');
                }
            },
            'Confirmation de suppression'
        );
    };

    const archiveMessage = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/admin/messages/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ archived: true })
            });
            if (res.ok) {
                setMessages(messages.filter(m => m._id !== id));
                if (selectedMessage && selectedMessage._id === id) {
                    setSelectedMessage(null);
                }
                alert.success('Message archivé avec succès');
            } else if (res.status === 404) {
                // Si le message n'existe plus, le retirer de la liste
                setMessages(messages.filter(m => m._id !== id));
                if (selectedMessage && selectedMessage._id === id) {
                    setSelectedMessage(null);
                }
                alert.error('Ce message n\'existe plus et a été retiré de la liste');
            } else {
                const errorData = await res.json().catch(() => ({}));
                alert.error(errorData.message || 'Erreur lors de l\'archivage');
            }
        } catch (err) {
            console.error(err);
            alert.error('Erreur réseau lors de l\'archivage');
        }
    };

    const sendReply = async () => {
        if (!replyText.trim()) {
            alert.error('Veuillez écrire un message avant d\'envoyer');
            return;
        }
        
        try {
            // Créer le mailto link avec le sujet et le contenu
            const email = selectedMessage.email;
            const subject = `Re: ${selectedMessage.subject || 'Contact depuis le site'}`;
            const body = `Bonjour ${selectedMessage.name},\n\n${replyText}\n\n---\nMessage original:\n${selectedMessage.message}\n\nCordialement,\nÉquipe Jeune Ballon Rêves`;
            
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Ouvrir le client email par défaut
            window.location.href = mailtoLink;
            
            // Marquer le message comme traité
            alert.success('Client email ouvert avec votre réponse pré-remplie !');
            setReplyingTo(null);
            setReplyText('');
            
            // Optionnellement marquer comme lu
            if (selectedMessage.status === 'unread') {
                markAsRead(selectedMessage._id);
            }
            
        } catch (err) {
            console.error(err);
            alert.error('Erreur lors de l\'ouverture du client email');
        }
    };

    const filteredMessages = (Array.isArray(messages) ? messages : []).filter(msg => {
        const matchesSearch = msg.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            msg.message?.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (!matchesSearch) return false;
        
        switch (filter) {
            case 'unread':
                return msg.status === 'unread';
            case 'read':
                return msg.status === 'read';
            case 'starred':
                return msg.starred;
            default:
                return true;
        }
    });

    const handleSelectMessage = (message) => {
        setSelectedMessage(message);
        if (message.status === 'unread') {
            markAsRead(message._id);
        }
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-secondary"></div>
            </div>
        );
    }

    return (
        <div className="h-full bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="flex flex-col lg:flex-row h-full">
                {/* Panneau de gauche - Liste des messages */}
                <div className={`w-full lg:w-96 border-r border-slate-200 flex flex-col ${selectedMessage ? 'hidden lg:flex' : 'flex'}`}>
                    {/* En-tête de la liste */}
                    <div className="p-3 sm:p-4 border-b border-slate-200 bg-slate-50">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <h2 className="text-base sm:text-lg font-black text-primary uppercase italic tracking-tighter">
                                Boîte de réception
                            </h2>
                            <div className="flex items-center gap-2">
                                <span className="bg-secondary text-primary px-2 py-1 rounded-full text-xs font-black">
                                    {messages.filter(m => m.status === 'unread').length}
                                </span>
                            </div>
                        </div>
                        
                        {/* Barre de recherche */}
                        <div className="relative mb-3">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        {/* Filtres */}
                        <div className="flex flex-wrap gap-2">
                            {['all', 'unread', 'read', 'starred'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-2 sm:px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                                        filter === f
                                            ? 'bg-primary text-white'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    {f === 'all' && 'Tous'}
                                    {f === 'unread' && 'Non lus'}
                                    {f === 'read' && 'Lus'}
                                    {f === 'starred' && 'Importants'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Liste des messages */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredMessages.length > 0 ? (
                            filteredMessages.map((msg) => (
                                <div
                                    key={msg._id}
                                    onClick={() => handleSelectMessage(msg)}
                                    className={`p-3 sm:p-4 border-b border-slate-100 cursor-pointer transition-all hover:bg-slate-50 ${
                                        selectedMessage?._id === msg._id ? 'bg-primary/5 border-l-4 border-primary' : ''
                                    } ${msg.status === 'unread' ? 'bg-white' : 'bg-slate-50/50'}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 mt-1">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleStar(msg._id);
                                                }}
                                                className="text-slate-400 hover:text-yellow-500 transition-colors"
                                            >
                                                <Star size={16} className={msg.starred ? 'fill-yellow-500 text-yellow-500' : ''} />
                                            </button>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className={`text-sm truncate ${msg.status === 'unread' ? 'font-black text-primary' : 'font-medium text-slate-600'}`}>
                                                    {msg.subject || 'Sans objet'}
                                                </h3>
                                                <span className="text-xs text-slate-400 flex-shrink-0 ml-2">
                                                    {new Date(msg.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 font-medium mb-1">
                                                {msg.name} • {msg.email}
                                            </p>
                                            <p className="text-xs text-slate-600 line-clamp-2">
                                                {msg.message}
                                            </p>
                                        </div>
                                        {msg.status === 'unread' && (
                                            <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0 mt-2"></div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-6 sm:p-8 text-center text-slate-400">
                                <Mail size={40} sm:size={48} className="mx-auto mb-4 opacity-50" />
                                <p className="text-xs sm:text-sm">Aucun message trouvé</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Panneau de droite - Lecture du message */}
                <div className={`flex-1 flex flex-col ${selectedMessage ? 'flex' : 'hidden lg:flex'}`}>
                    {selectedMessage ? (
                        <>
                            {/* En-tête du message */}
                            <div className="p-4 sm:p-6 border-b border-slate-200 bg-white">
                                <div className="flex items-center justify-between mb-4">
                                    <h1 className="text-lg sm:text-xl font-black text-primary truncate pr-2">
                                        {selectedMessage.subject || 'Sans objet'}
                                    </h1>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => toggleStar(selectedMessage._id)}
                                            className="p-2 text-slate-400 hover:text-yellow-500 transition-colors rounded-lg hover:bg-slate-100"
                                            title="Marquer comme important"
                                        >
                                            <Star size={18} className={selectedMessage.starred ? 'fill-yellow-500 text-yellow-500' : ''} />
                                        </button>
                                        <button
                                            onClick={() => selectedMessage.status === 'read' ? markAsUnread(selectedMessage._id) : markAsRead(selectedMessage._id)}
                                            className="p-2 text-slate-400 hover:text-primary transition-colors rounded-lg hover:bg-slate-100"
                                            title={selectedMessage.status === 'read' ? 'Marquer comme non lu' : 'Marquer comme lu'}
                                        >
                                            {selectedMessage.status === 'read' ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                        <button
                                            onClick={() => archiveMessage(selectedMessage._id)}
                                            className="p-2 text-slate-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-slate-100"
                                            title="Archiver"
                                        >
                                            <Archive size={18} />
                                        </button>
                                        <button
                                            onClick={() => deleteMessage(selectedMessage._id)}
                                            className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-slate-100"
                                            title="Supprimer"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-slate-600">
                                    <div className="flex items-center gap-2">
                                        <User size={16} />
                                        <span className="font-medium truncate">{selectedMessage.name}</span>
                                        <span className="text-slate-400 hidden sm:inline">•</span>
                                        <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline truncate">
                                            {selectedMessage.email}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Calendar size={16} />
                                        <span className="text-xs">{new Date(selectedMessage.createdAt).toLocaleDateString('fr-FR', {
                                            weekday: 'short',
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Contenu du message */}
                            <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-slate-50">
                                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
                                    <div className="prose prose-sm max-w-none">
                                        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                                            {selectedMessage.message}
                                        </p>
                                    </div>
                                </div>

                                {/* Section de réponse */}
                                {replyingTo === selectedMessage._id ? (
                                    <div className="mt-4 sm:mt-6 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-base sm:text-lg font-black text-primary truncate">
                                                Répondre à {selectedMessage.name}
                                            </h3>
                                            <button
                                                onClick={() => {
                                                    setReplyingTo(null);
                                                    setReplyText('');
                                                }}
                                                className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-100"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                        <textarea
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Écrivez votre réponse..."
                                            className="w-full h-24 sm:h-32 p-3 sm:p-4 border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                        />
                                        <div className="flex justify-end gap-3 mt-4">
                                            <button
                                                onClick={() => {
                                                    setReplyingTo(null);
                                                    setReplyText('');
                                                }}
                                                className="px-4 sm:px-6 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-slate-200 transition-all"
                                            >
                                                Annuler
                                            </button>
                                            <button
                                                onClick={sendReply}
                                                className="px-4 sm:px-6 py-2 bg-primary text-white rounded-xl font-black italic uppercase text-xs tracking-widest hover:bg-primary/90 transition-all flex items-center gap-2"
                                            >
                                                <Send size={16} />
                                                Envoyer
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-4 sm:mt-6 flex justify-center">
                                        <button
                                            onClick={() => setReplyingTo(selectedMessage._id)}
                                            className="px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-xl font-black italic uppercase text-xs tracking-widest hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg"
                                        >
                                            <Reply size={16} sm:size={18} />
                                            Répondre
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center bg-slate-50">
                            <div className="text-center p-6">
                                <Mail size={48} sm:size={64} className="mx-auto text-slate-300 mb-4" />
                                <p className="text-slate-400 font-medium text-sm">Sélectionnez un message pour le lire</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminMessages;
