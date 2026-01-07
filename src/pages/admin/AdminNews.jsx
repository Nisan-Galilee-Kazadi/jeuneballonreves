import React, { useState, useEffect } from 'react';
import { Newspaper, Send, Plus, Trash2, Calendar, User, Search, Eye, Edit, Save, X } from 'lucide-react';
import AdminNewsCurator from './components/AdminNewsCurator';
import { useAlertContext } from '../../components/AlertProvider';

const AdminNews = () => {
    const [news, setNews] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [viewingItem, setViewingItem] = useState(null);
    const [newItem, setNewItem] = useState({
        title: '',
        content: '',
        category: 'Général',
        imageUrl: ''
    });
    const alert = useAlertContext();

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = () => {
        fetch('http://localhost:5000/api/news')
            .then(res => res.json())
            .then(data => setNews(data))
            .catch(err => console.error(err));
    };

    const handleDelete = async (id) => {
        alert.confirm(
            'Êtes-vous sûr de vouloir supprimer cette actualité ?',
            async () => {
                try {
                    const res = await fetch(`http://localhost:5000/api/news/${id}`, {
                        method: 'DELETE'
                    });
                    if (res.ok) {
                        alert.success('Actualité supprimée avec succès !');
                        fetchNews();
                    } else {
                        alert.error('Erreur lors de la suppression');
                    }
                } catch (err) {
                    alert.error('Erreur réseau lors de la suppression');
                }
            },
            'Confirmation de suppression'
        );
    };

    const handleEdit = (item) => {
        setEditingItem(item);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/api/news/${editingItem._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingItem)
            });
            if (res.ok) {
                alert.success('Actualité mise à jour avec succès !');
                setEditingItem(null);
                fetchNews();
            } else {
                alert.error('Erreur lors de la mise à jour');
            }
        } catch (err) {
            alert.error('Erreur réseau lors de la mise à jour');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/news', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            });
            if (res.ok) {
                alert.success('Actualité publiée avec succès !');
                setIsCreating(false);
                setNewItem({ title: '', content: '', category: 'Général', imageUrl: '' });
                fetchNews();
            } else {
                alert.error('Erreur lors de la publication');
            }
        } catch (err) {
            alert.error('Erreur réseau lors de la publication');
        }
    };

    return (
        <div className="p-8 space-y-8 w-full">
            <div className="flex justify-between items-center">
                <button
                    onClick={() => setIsCreating(true)}
                    className="bg-primary text-secondary px-6 py-3 rounded-xl font-black italic uppercase text-xs tracking-widest flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
                >
                    <Plus size={18} /> Nouvelle Actualité
                </button>
            </div>

            {isCreating && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 w-full animate-fade-in">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary uppercase italic tracking-tighter">
                        <Newspaper className="text-secondary" /> Rédiger une actualité
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Titre de l'article</label>
                                <input
                                    type="text"
                                    value={newItem.title}
                                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-primary"
                                    placeholder="Titre accrocheur..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Illustration (URL)</label>
                                <input
                                    type="text"
                                    value={newItem.imageUrl}
                                    onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-primary"
                                    placeholder="Lien vers une image"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Contenu de l'article</label>
                            <textarea
                                value={newItem.content}
                                onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                                className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-primary h-48 resize-none"
                                placeholder="Développez votre actualité ici..."
                                required
                            ></textarea>
                        </div>
                        <div className="flex gap-4">
                            <button type="submit" className="flex-1 bg-primary text-white py-4 rounded-2xl font-black italic uppercase tracking-[0.2em] shadow-lg">Publier l'Actualité</button>
                            <button onClick={() => setIsCreating(false)} className="px-8 bg-slate-100 text-slate-500 rounded-2xl font-bold uppercase text-xs tracking-widest">Annuler</button>
                        </div>
                    </form>
                </div>
            )}

            {/* News Curator Section */}
            <AdminNewsCurator />


            <div className="space-y-4">
                {news.map((item) => (
                    <div key={item._id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 group hover:shadow-md transition-all">
                        {item.imageUrl ? (
                            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                                <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
                            </div>
                        ) : (
                            <div className="w-24 h-24 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
                                <Newspaper className="text-slate-200" size={32} />
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-secondary bg-primary px-2 py-0.5 rounded-md">{item.category}</span>
                                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1"><Calendar size={10} /> {new Date(item.createdAt).toLocaleDateString()}</span>
                            </div>
                            <h4 className="text-lg font-bold text-primary truncate hover:text-clip hover:whitespace-normal transition-all">{item.title}</h4>
                            <p className="text-sm text-slate-500 line-clamp-1 mt-1 font-medium">{item.content}</p>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => handleDelete(item._id)}
                                className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                title="Supprimer"
                            >
                                <Trash2 size={18} />
                            </button>
                            <button 
                                onClick={() => handleEdit(item)}
                                className="p-2 text-slate-300 hover:text-blue-500 transition-colors"
                                title="Modifier"
                            >
                                <Edit size={18} />
                            </button>
                            <button 
                                onClick={() => setViewingItem(item)}
                                className="p-2 text-slate-300 hover:text-green-500 transition-colors"
                                title="Voir détail"
                            >
                                <Eye size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Edit Modal */}
            {editingItem && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                                <Edit className="text-secondary" /> Modifier l'actualité
                            </h2>
                            <button
                                onClick={() => setEditingItem(null)}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleUpdate} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Titre de l'article</label>
                                    <input
                                        type="text"
                                        value={editingItem.title}
                                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-primary"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Illustration (URL)</label>
                                    <input
                                        type="text"
                                        value={editingItem.imageUrl}
                                        onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-primary"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Contenu de l'article</label>
                                <textarea
                                    value={editingItem.content}
                                    onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-primary h-48 resize-none"
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Catégorie</label>
                                <select
                                    value={editingItem.category}
                                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-primary"
                                >
                                    <option value="Général">Général</option>
                                    <option value="Transfert">Transfert</option>
                                    <option value="Match">Match</option>
                                    <option value="Injury">Blessure</option>
                                    <option value="Other">Autre</option>
                                </select>
                            </div>
                            <div className="flex gap-4">
                                <button type="submit" className="flex-1 bg-primary text-white py-4 rounded-2xl font-black italic uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2">
                                    <Save size={18} /> Mettre à jour
                                </button>
                                <button 
                                    onClick={() => setEditingItem(null)} 
                                    className="px-8 bg-slate-100 text-slate-500 rounded-2xl font-bold uppercase text-xs tracking-widest"
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Detail Modal */}
            {viewingItem && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                                <Eye className="text-secondary" /> Détails de l'actualité
                            </h2>
                            <button
                                onClick={() => setViewingItem(null)}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            {viewingItem.imageUrl && (
                                <div className="w-full h-64 rounded-2xl overflow-hidden">
                                    <img 
                                        src={viewingItem.imageUrl} 
                                        alt={viewingItem.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="space-y-4">
                                <div>
                                    <span className="text-xs font-black uppercase tracking-widest text-secondary bg-primary px-3 py-1 rounded-full">
                                        {viewingItem.category}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-black text-primary">{viewingItem.title}</h3>
                                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{viewingItem.content}</p>
                                <div className="pt-4 border-t border-slate-100 text-xs text-slate-400">
                                    <p>Créé le: {new Date(viewingItem.createdAt).toLocaleDateString('fr-FR')}</p>
                                    {viewingItem.updatedAt && (
                                        <p>Modifié le: {new Date(viewingItem.updatedAt).toLocaleDateString('fr-FR')}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminNews;
