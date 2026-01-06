import React, { useState, useEffect } from 'react';
import { Newspaper, Send, Plus, Trash2, Calendar, User } from 'lucide-react';

const AdminNews = () => {
    const [news, setNews] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newItem, setNewItem] = useState({
        title: '',
        content: '',
        category: 'Général',
        imageUrl: ''
    });

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = () => {
        fetch('http://localhost:5000/api/news')
            .then(res => res.json())
            .then(data => setNews(data))
            .catch(err => console.error(err));
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
                alert('Actualité publiée !');
                setIsCreating(false);
                setNewItem({ title: '', content: '', category: 'Général', imageUrl: '' });
                fetchNews();
            }
        } catch (err) {
            alert('Erreur lors de la publication');
        }
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <button
                    onClick={() => setIsCreating(true)}
                    className="bg-primary text-secondary px-6 py-3 rounded-xl font-black italic uppercase text-xs tracking-widest flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
                >
                    <Plus size={18} /> Nouvelle Actualité
                </button>
            </div>

            {isCreating && (
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-primary/10 max-w-3xl animate-fade-in">
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
                            <button className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                            <button className="p-2 text-slate-300 hover:text-primary transition-colors"><Plus size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminNews;
