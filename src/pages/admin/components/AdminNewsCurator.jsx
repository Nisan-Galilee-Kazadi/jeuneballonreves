import React, { useState, useEffect } from 'react';
import { Globe, Plus, Check, RefreshCw } from 'lucide-react';

const AdminNewsCurator = () => {
    const [externalNews, setExternalNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [importing, setImporting] = useState(null);

    useEffect(() => {
        fetchExternalNews();
    }, []);

    const fetchExternalNews = () => {
        setLoading(true);
        fetch('http://localhost:5000/api/admin/aggregate-news')
            .then(res => res.json())
            .then(data => {
                setExternalNews(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    const handleImport = async (item) => {
        setImporting(item.id);
        try {
            const response = await fetch('http://localhost:5000/api/news', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: item.title,
                    content: `${item.summary}\n\n(Source: ${item.source} - ${item.link})`,
                    imageUrl: item.imageUrl,
                    category: item.category || 'Général',
                    author: 'Admin'
                })
            });

            if (response.ok) {
                alert('Nouvelle importée avec succès !');
                setExternalNews(prev => prev.filter(n => n.id !== item.id));
            } else {
                const errorData = await response.json();
                alert(`Erreur: ${errorData.message || 'Impossible d\'importer'}`);
            }
        } catch (err) {
            console.error(err);
            alert('Erreur réseau lors de l\'import');
        } finally {
            setImporting(null);
        }
    };

    return (
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 max-w-4xl mx-auto h-fit">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-black text-primary uppercase italic tracking-tighter flex items-center gap-2">
                        <Globe className="text-blue-500" size={24} />
                        Flux Actualités Live
                    </h2>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                        Suggestions Foot (Exclut les actus déjà publiées)
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
                            <div className="w-24 h-24 bg-slate-200 rounded-lg"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4 overflow-y-auto max-h-[700px] pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                    {externalNews.length > 0 ? (
                        externalNews.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex gap-4 group hover:shadow-md transition-all border border-slate-100 hover:border-blue-200">
                                <div className="w-32 h-24 shrink-0 overflow-hidden rounded-lg bg-slate-100 flex items-center justify-center border border-slate-50 relative">
                                    {item.imageUrl ? (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            loading="lazy"
                                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                        />
                                    ) : null}
                                    <div className={`absolute inset-0 items-center justify-center bg-slate-50 text-slate-300 ${item.imageUrl ? 'hidden' : 'flex'}`}>
                                        <Globe size={32} />
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-0.5">
                                    <div>
                                        <div className="flex justify-between items-start mb-1.5">
                                            <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50/50 px-2 py-0.5 rounded border border-blue-100/50">
                                                {item.source}
                                            </span>
                                            <span className="text-[10px] font-medium text-slate-400">
                                                {new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-slate-800 leading-snug line-clamp-2 mb-1.5 group-hover:text-blue-700 transition-colors text-sm">
                                            {item.title}
                                        </h3>
                                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed opacity-80">
                                            {item.summary}
                                        </p>
                                    </div>
                                    <div className="mt-2.5 flex justify-between items-center">
                                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{item.category}</span>
                                        <div className="flex gap-2">
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-slate-50 text-slate-400 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide hover:bg-slate-100 hover:text-slate-600 transition-all border border-slate-100"
                                            >
                                                Lien
                                            </a>
                                            <button
                                                onClick={() => handleImport(item)}
                                                disabled={importing === item.id}
                                                className="bg-blue-600 text-white px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide hover:bg-blue-700 transition-all flex items-center gap-1 shadow-sm hover:shadow-blue-200 disabled:opacity-50"
                                            >
                                                {importing === item.id ? (
                                                    <RefreshCw size={10} className="animate-spin" />
                                                ) : (
                                                    <Plus size={10} />
                                                )}
                                                {importing === item.id ? '...' : 'Importer'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200">
                            <Globe className="mx-auto text-slate-200 mb-2" size={40} />
                            <p className="text-slate-400 italic text-sm">
                                Aucun nouvel article inédit pour le moment.<br />
                                <span className="text-[10px] not-italic font-bold uppercase tracking-widest text-slate-300">Tout est déjà publié ou filtré</span>
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminNewsCurator;
