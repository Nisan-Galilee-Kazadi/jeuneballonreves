import React, { useState, useEffect } from 'react';
import { Camera, Send, Plus, Trash2, Heart, MessageCircle, MoreVertical, Eye } from 'lucide-react';

const AdminPosts = () => {
    const [posts, setPosts] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [newPost, setNewPost] = useState({
        title: '',
        caption: '',
        imageUrl: '',
        type: 'instagram'
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        fetch('http://localhost:5000/api/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPost)
            });
            if (res.ok) {
                alert('Post créé avec succès !');
                setIsCreating(false);
                setNewPost({ title: '', caption: '', imageUrl: '', type: 'instagram' });
                fetchPosts();
            }
        } catch (err) {
            alert('Erreur lors de la création');
        }
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div className="flex gap-4">
                    <button
                        onClick={() => setIsCreating(true)}
                        className="bg-secondary text-primary px-6 py-3 rounded-xl font-black italic uppercase text-xs tracking-widest flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
                    >
                        <Plus size={18} /> Nouveau Post
                    </button>
                    <button className="bg-white text-primary px-6 py-3 rounded-xl font-black italic uppercase text-xs tracking-widest flex items-center gap-2 border border-slate-200">
                        <Eye size={18} /> Voir sur le site
                    </button>
                </div>
            </div>

            {isCreating && (
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-secondary/20 max-w-2xl animate-fade-in">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary uppercase italic tracking-tighter">
                        <Camera className="text-secondary" /> Créer un nouveau post
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Titre du post</label>
                                <input
                                    type="text"
                                    value={newPost.title}
                                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-secondary"
                                    placeholder="Ex: Séance entraînement Matin"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Lien de l'image (URL)</label>
                                <input
                                    type="text"
                                    value={newPost.imageUrl}
                                    onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-secondary"
                                    placeholder="https://images.unsplash.com/..."
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Légende / Description</label>
                            <textarea
                                value={newPost.caption}
                                onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                                className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-secondary flex-1 resize-none h-full min-h-[140px]"
                                placeholder="Partagez l'histoire de ce moment..."
                                required
                            ></textarea>
                        </div>
                        <div className="md:col-span-2 flex gap-4 mt-2">
                            <button type="submit" className="flex-1 bg-primary text-white py-4 rounded-2xl font-black italic uppercase tracking-[0.2em] shadow-lg">Publier Maintenant</button>
                            <button onClick={() => setIsCreating(false)} className="px-8 bg-slate-100 text-slate-500 rounded-2xl font-bold uppercase text-xs tracking-widest">Annuler</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {posts.map((post) => (
                    <div key={post._id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group relative">
                        <div className="h-48 overflow-hidden relative">
                            <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl text-primary flex gap-3 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                <button className="hover:text-secondary transition-colors"><Plus size={16} /></button>
                            </div>
                            <div className="absolute bottom-4 left-4 bg-primary text-secondary px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                                {post.type}
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-sm font-black text-primary uppercase italic tracking-tighter truncate">{post.title}</h4>
                                <button className="text-slate-300 hover:text-primary"><MoreVertical size={16} /></button>
                            </div>
                            <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed italic">"{post.caption}"</p>

                            <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <Heart size={14} className="text-red-500 fill-red-500" />
                                        <span className="text-xs font-bold text-primary">{post.reactions?.likes || 0}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MessageCircle size={14} className="text-slate-400" />
                                        <span className="text-xs font-bold text-primary">{post.comments?.length || 0}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedPost(post)}
                                    className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary hover:text-primary transition-colors bg-primary/5 px-2 py-1 rounded-md"
                                >
                                    Détails
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Post Detail Modal */}
            {selectedPost && (
                <div className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-[300] flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
                    <div className="bg-white w-full max-w-5xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px] animate-scale-up">
                        <div className="md:w-1/2 bg-slate-100 relative">
                            <img src={selectedPost.imageUrl} className="w-full h-full object-cover" alt="" />
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="absolute top-6 left-6 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-primary shadow-lg md:hidden"
                            >
                                <Trash2 size={20} className="rotate-45" />
                            </button>
                        </div>
                        <div className="md:w-1/2 flex flex-col p-8 md:p-12">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-black text-primary uppercase italic tracking-tighter">Aperçu du Post</h3>
                                <button
                                    onClick={() => setSelectedPost(null)}
                                    className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-all hidden md:flex"
                                >
                                    <Plus size={24} className="rotate-45" />
                                </button>
                            </div>

                            <div className="space-y-6 flex-1 overflow-y-auto pr-4 custom-scrollbar">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2">Légende</p>
                                    <p className="text-lg text-primary font-medium italic leading-relaxed">"{selectedPost.caption}"</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-red-50 p-4 rounded-3xl border border-red-100">
                                        <div className="flex items-center gap-2 text-red-500 mb-1">
                                            <Heart size={16} className="fill-red-500" />
                                            <span className="text-xs font-bold uppercase tracking-widest">Likes</span>
                                        </div>
                                        <p className="text-2xl font-black text-primary">{selectedPost.reactions?.likes || 0}</p>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-3xl border border-blue-100">
                                        <div className="flex items-center gap-2 text-blue-500 mb-1">
                                            <MessageCircle size={16} />
                                            <span className="text-xs font-bold uppercase tracking-widest">Commentaires</span>
                                        </div>
                                        <p className="text-2xl font-black text-primary">{selectedPost.comments?.length || 0}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-4">Fil des commentaires</p>
                                    <div className="space-y-4">
                                        {selectedPost.comments && selectedPost.comments.length > 0 ? (
                                            selectedPost.comments.map((comm, idx) => (
                                                <div key={idx} className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center group">
                                                    <div>
                                                        <p className="text-xs font-bold text-primary">{comm.user || "Anonyme"}</p>
                                                        <p className="text-xs text-slate-500 italic mt-0.5">{comm.text}</p>
                                                    </div>
                                                    <button className="text-slate-200 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-xs text-slate-400 italic font-medium py-4">Aucun commentaire pour le moment.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 mt-8 border-t border-slate-100 flex gap-4">
                                <button className="flex-1 bg-primary text-secondary py-4 rounded-2xl font-black italic uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-transform">Masquer</button>
                                <button className="px-8 bg-red-50 text-red-400 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-red-100 transition-colors flex items-center gap-2">
                                    Supprimer <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPosts;

