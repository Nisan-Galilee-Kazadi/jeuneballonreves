import React, { useState, useEffect } from 'react';
import { Newspaper, Send, Plus, Trash2, Calendar, User, Search, Eye, Edit, Save, X } from 'lucide-react';
import AdminNewsCurator from './components/AdminNewsCurator';
import { useAlertContext } from '../../components/AlertProvider';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminNews = () => {
    const [news, setNews] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [viewingItem, setViewingItem] = useState(null);
    const [newItem, setNewItem] = useState({
        title: '',
        content: '',
        category: 'Général',
        imageUrl: '',
        isExternal: false,
        sourceUrl: ''
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
                setNewItem({ title: '', content: '', category: 'Général', imageUrl: '', isExternal: false, sourceUrl: '' });
                fetchNews();
            } else {
                alert.error('Erreur lors de la publication');
            }
        } catch (err) {
            alert.error('Erreur réseau lors de la publication');
        }
    };

    return (
        <AdminLayout title=" Actualités">
            <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex justify-between items-center">
                <button
                    onClick={() => setIsCreating(true)}
                    className="bg-primary text-secondary px-6 py-3 rounded-xl font-black italic uppercase text-xs tracking-widest flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all w-full"
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Type d'actualité</label>
                                <select
                                    value={newItem.isExternal ? 'external' : 'internal'}
                                    onChange={(e) => setNewItem({ ...newItem, isExternal: e.target.value === 'external', sourceUrl: e.target.value === 'external' ? newItem.sourceUrl : '' })}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-primary"
                                >
                                    <option value="internal">Interne (JBR)</option>
                                    <option value="external">Externe (Source externe)</option>
                                </select>
                            </div>
                            {newItem.isExternal && (
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">URL de la source</label>
                                    <input
                                        type="url"
                                        value={newItem.sourceUrl}
                                        onChange={(e) => setNewItem({ ...newItem, sourceUrl: e.target.value })}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-primary"
                                        placeholder="https://example.com/article"
                                        required={newItem.isExternal}
                                    />
                                </div>
                            )}
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


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((article) => (
                    <div key={article._id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group relative w-full">
                        {/* Image en haut */}
                        <div className="h-48 overflow-hidden relative">
                            {article.imageUrl ? (
                                <img src={article.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                            ) : (
                                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                    <Newspaper size={32} className="text-slate-300" />
                                </div>
                            )}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl text-primary flex gap-3 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="hover:text-orange-500 transition-colors"><Edit size={16} /></button>
                                <button className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                            </div>
                            <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                                {article.category}
                            </div>
                        </div>

                        {/* Contenu */}
                        <div className="p-5">
                            <h4 className="text-sm font-black text-primary uppercase italic tracking-tighter line-clamp-2 mb-2">{article.title}</h4>
                            <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed">{article.content}</p>

                            {/* Boutons en row wrap */}
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setViewingItem(article)}
                                    className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-500 hover:text-primary transition-colors bg-orange-50 px-2 py-1 rounded-md flex-1 min-w-[80px]"
                                >
                                    Détails
                                </button>
                                <button 
                                    onClick={() => handleEdit(article)}
                                    className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500 hover:text-primary transition-colors bg-blue-50 px-2 py-1 rounded-md flex-1 min-w-[80px]"
                                >
                                    Modifier
                                </button>
                                <button 
                                    onClick={() => handleDelete(article._id)}
                                    className="text-[9px] font-black uppercase tracking-[0.2em] text-red-500 hover:text-primary transition-colors bg-red-50 px-2 py-1 rounded-md flex-1 min-w-[80px]"
                                >
                                    Supprimer
                                </button>
                            </div>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Type d'actualité</label>
                                    <select
                                        value={editingItem.isExternal ? 'external' : 'internal'}
                                        onChange={(e) => setEditingItem({ ...editingItem, isExternal: e.target.value === 'external', sourceUrl: e.target.value === 'external' ? editingItem.sourceUrl : '' })}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-primary"
                                    >
                                        <option value="internal">Interne (JBR)</option>
                                        <option value="external">Externe (Source externe)</option>
                                    </select>
                                </div>
                                {editingItem.isExternal && (
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">URL de la source</label>
                                        <input
                                            type="url"
                                            value={editingItem.sourceUrl || ''}
                                            onChange={(e) => setEditingItem({ ...editingItem, sourceUrl: e.target.value })}
                                            className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-primary"
                                            placeholder="https://example.com/article"
                                            required={editingItem.isExternal}
                                        />
                                    </div>
                                )}
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
                            <div className="flex flex-col gap-4">
                                <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-black italic uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2">
                                    <Save size={18} /> Mettre à jour
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
                                    {viewingItem.isExternal && viewingItem.sourceUrl && (
                                        <p className="mt-2">
                                            <a 
                                                href={viewingItem.sourceUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:text-secondary flex items-center gap-1"
                                            >
                                                <ExternalLink size={12} /> Voir la source
                                            </a>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </AdminLayout>
    );
};

export default AdminNews;
