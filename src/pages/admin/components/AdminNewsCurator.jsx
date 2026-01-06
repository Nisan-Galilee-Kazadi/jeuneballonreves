import React, { useState, useEffect } from 'react';
import { Globe, Plus, Check, RefreshCw } from 'lucide-react';

const AdminNewsCurator = () => {
    const [externalNews, setExternalNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [importing, setImporting] = useState(null);

    // Simulated External API Feed (Mock Data)
    const mockExternalFeed = [
        {
            id: 'ext_1',
            source: 'France Football',
            title: "La formation française à l'honneur cette saison",
            summary: "Les centres de formation continuent de produire des pépites. focus sur les méthodes qui marchent.",
            imageUrl: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&q=80&w=800",
            date: new Date().toISOString()
        },
        {
            id: 'ext_2',
            source: 'L\'Équipe',
            title: "Mercato : Les jeunes talents les plus convoités",
            summary: "Analyse des mouvements à venir pour les espoirs U19. Les grands clubs sont à l'affût.",
            imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0565c6d?auto=format&fit=crop&q=80&w=800",
            date: new Date(Date.now() - 86400000).toISOString()
        },
        {
            id: 'ext_3',
            source: 'Foot Mercato',
            title: "Interview : L'importance du mental chez les jeunes",
            summary: "Un psychologue du sport décrypte les clés de la réussite pour les aspirants footballeurs.",
            imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=800",
            date: new Date(Date.now() - 172800000).toISOString()
        },
        {
            id: 'ext_4',
            source: 'So Foot',
            title: "Reportage : Le football amateur, vivier inépuisable",
            summary: "Immersion dans les clubs de quartier qui forgent les champions de demain.",
            imageUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=800",
            date: new Date(Date.now() - 259200000).toISOString()
        }
    ];

    useEffect(() => {
        fetchExternalNews();
    }, []);

    const fetchExternalNews = () => {
        setLoading(true);
        // Simulate API call delay
        setTimeout(() => {
            setExternalNews(mockExternalFeed);
            setLoading(false);
        }, 1500);
    };

    const handleImport = async (item) => {
        setImporting(item.id);

        try {
            await fetch('http://localhost:5000/api/news', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: item.title,
                    content: `${item.summary}\n\n(Source: ${item.source})`,
                    imageUrl: item.imageUrl,
                    category: 'International'
                })
            });

            // Remove from list after import
            setExternalNews(prev => prev.filter(n => n.id !== item.id));
            // Show success notification (could be a toast)
        } catch (err) {
            console.error(err);
        } finally {
            setImporting(null);
        }
    };

    return (
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-black text-primary uppercase italic tracking-tighter flex items-center gap-2">
                        <Globe className="text-blue-500" size={24} />
                        Flux Actualités Live
                    </h2>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                        Contenu suggéré depuis le web
                    </p>
                </div>
                <button
                    onClick={fetchExternalNews}
                    className="p-2 bg-white rounded-full text-slate-400 hover:text-primary hover:rotate-180 transition-all duration-500 shadow-sm"
                >
                    <RefreshCw size={20} />
                </button>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse flex gap-4">
                            <div className="w-24 h-16 bg-slate-200 rounded-lg"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {externalNews.length > 0 ? (
                        externalNews.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex gap-4 group hover:shadow-md transition-all">
                                <div className="w-24 h-24 shrink-0 overflow-hidden rounded-lg">
                                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1 block">
                                                {item.source}
                                            </span>
                                            <span className="text-[10px] text-slate-400">
                                                {new Date(item.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-primary leading-tight line-clamp-2 mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 line-clamp-2">
                                            {item.summary}
                                        </p>
                                    </div>
                                    <div className="mt-3 flex justify-end">
                                        <button
                                            onClick={() => handleImport(item)}
                                            disabled={importing === item.id}
                                            className="bg-green-50 text-green-600 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-green-500 hover:text-white transition-all flex items-center gap-1 disabled:opacity-50"
                                        >
                                            {importing === item.id ? (
                                                <RefreshCw size={12} className="animate-spin" />
                                            ) : (
                                                <Plus size={12} />
                                            )}
                                            {importing === item.id ? 'Ajout...' : 'Valider'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-slate-400 italic text-sm">
                            Aucune nouvelle suggestion pour le moment.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminNewsCurator;
