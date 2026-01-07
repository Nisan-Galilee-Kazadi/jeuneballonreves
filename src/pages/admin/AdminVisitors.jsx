import React, { useState, useEffect } from 'react';
import { Globe, Activity, MessageCircle, Heart, Trash2 } from 'lucide-react';

const AdminVisitors = () => {
    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVisitors();
    }, []);

    const fetchVisitors = () => {
        fetch('http://localhost:5000/api/visitors')
            .then(res => res.json())
            .then(data => setVisitors(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black text-primary uppercase italic tracking-tighter flex items-center gap-3">
                        <Globe className="text-secondary" size={28} />
                        Visiteurs Enregistrés
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">Personnes ayant interagi avec le blog</p>
                </div>
                <div className="bg-secondary text-primary px-6 py-3 rounded-xl font-black text-2xl">
                    {visitors.length}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-secondary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visitors.length > 0 ? (
                        visitors.map((visitor) => (
                            <div key={visitor._id} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                            <span className="text-secondary font-black text-lg uppercase">
                                                {visitor.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-black text-primary text-lg">{visitor.name}</h3>
                                            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Visiteur</p>
                                        </div>
                                    </div>
                                    <button className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3">
                                        <div className="flex items-center gap-2 text-primary">
                                            <MessageCircle size={16} />
                                            <span className="text-xs font-bold uppercase tracking-widest">Commentaires</span>
                                        </div>
                                        <span className="text-lg font-black text-primary">{visitor.commentsCount || 0}</span>
                                    </div>

                                    <div className="flex items-center justify-between bg-red-50 rounded-xl p-3">
                                        <div className="flex items-center gap-2 text-red-500">
                                            <Heart size={16} className="fill-red-500" />
                                            <span className="text-xs font-bold uppercase tracking-widest">Likes</span>
                                        </div>
                                        <span className="text-lg font-black text-red-500">{visitor.likesCount || 0}</span>
                                    </div>

                                    <div className="flex items-center justify-between bg-blue-50 rounded-xl p-3">
                                        <div className="flex items-center gap-2 text-blue-500">
                                            <Activity size={16} />
                                            <span className="text-xs font-bold uppercase tracking-widest">Dernière visite</span>
                                        </div>
                                        <span className="text-xs font-bold text-blue-500">
                                            {new Date(visitor.lastVisit).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400">
                                    <p>Première visite : {new Date(visitor.firstVisit).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-white rounded-2xl shadow-inner">
                            <Globe size={48} className="mx-auto text-slate-300 mb-4" />
                            <p className="text-slate-400 italic">Aucun visiteur enregistré pour le moment.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminVisitors;
