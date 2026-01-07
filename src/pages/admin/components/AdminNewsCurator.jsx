import React, { useState, useEffect } from 'react';
import { Globe, Plus, Check, RefreshCw, ExternalLink, Copy, Image, Shield, AlertCircle } from 'lucide-react';
import { useAlertContext } from '../../../components/AlertProvider';

const AdminNewsCurator = () => {
    const [externalNews, setExternalNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [importing, setImporting] = useState(null);
    const [verifyingSource, setVerifyingSource] = useState(null);
    const [sourceStatus, setSourceStatus] = useState({});
    const [editingImage, setEditingImage] = useState(null);
    const [customImageUrl, setCustomImageUrl] = useState('');
    const alert = useAlertContext();

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

    const verifySource = async (item) => {
        setVerifyingSource(item.id);
        try {
            const response = await fetch(`http://localhost:5000/api/verify-source`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: item.link })
            });
            const data = await response.json();
            setSourceStatus(prev => ({
                ...prev,
                [item.id]: {
                    verified: data.verified,
                    domain: data.domain,
                    reputation: data.reputation,
                    sslValid: data.sslValid
                }
            }));
        } catch (err) {
            setSourceStatus(prev => ({
                ...prev,
                [item.id]: { verified: false, error: 'Erreur de vérification' }
            }));
        } finally {
            setVerifyingSource(null);
        }
    };

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert.success('Adresse copiée dans le presse-papiers !');
        } catch (err) {
            alert.error('Erreur lors de la copie');
        }
    };

    const handleImageUpdate = (item) => {
        setEditingImage(item.id);
        setCustomImageUrl(item.imageUrl || '');
    };

    const saveImageUpdate = (item) => {
        setExternalNews(prev => prev.map(news => 
            news.id === item.id ? { ...news, imageUrl: customImageUrl } : news
        ));
        setEditingImage(null);
        setCustomImageUrl('');
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
                alert.success('Nouvelle importée avec succès !');
                setExternalNews(prev => prev.filter(n => n.id !== item.id));
            } else {
                const errorData = await response.json();
                alert.error(`Erreur: ${errorData.message || 'Impossible d\'importer'}`);
            }
        } catch (err) {
            console.error(err);
            alert.error('Erreur réseau lors de l\'import');
        } finally {
            setImporting(null);
        }
    };

    return (
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-black text-primary uppercase italic tracking-tighter flex items-center gap-2">
                        <Globe className="text-secondary" size={24} />
                        Actualités du Web
                    </h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-0.5">
                        Suggestions Foot avec vérification de source
                    </p>
                </div>
                <button
                    onClick={fetchExternalNews}
                    className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-primary hover:bg-slate-100 transition-all duration-300"
                    title="Actualiser les flux"
                >
                    <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse flex gap-4 p-4">
                            <div className="w-32 h-20 bg-slate-100 rounded-xl"></div>
                            <div className="flex-1 space-y-2 py-1">
                                <div className="h-4 bg-slate-100 rounded-full w-3/4"></div>
                                <div className="h-3 bg-slate-100 rounded-full w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4 overflow-y-auto max-h-[750px] pr-2 scrollbar-thin scrollbar-thumb-slate-200 overflow-x-hidden">
                    {externalNews.length > 0 ? (
                        externalNews.map((item) => (
                            <div key={item.id} className="bg-slate-50/50 p-4 rounded-2xl flex gap-6 items-center border border-transparent hover:border-primary/10 hover:bg-white hover:shadow-xl transition-all duration-500 group">
                                <div className="w-40 h-28 shrink-0 overflow-hidden rounded-xl bg-white border border-slate-100 relative shadow-sm">
                                    {item.imageUrl ? (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            loading="lazy"
                                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                        />
                                    ) : null}
                                    <div className={`absolute inset-0 items-center justify-center bg-slate-50 text-slate-200 ${item.imageUrl ? 'hidden' : 'flex'}`}>
                                        <Globe size={32} />
                                    </div>
                                    <div className="absolute top-1.5 left-1.5 bg-primary/80 backdrop-blur-sm text-secondary text-[8px] font-black uppercase px-2 py-0.5 rounded-md">
                                        {item.source}
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-[9px] font-black text-secondary bg-primary px-2 py-0.5 rounded-md uppercase tracking-widest">
                                            {item.category}
                                        </span>
                                        <span className="text-[9px] font-bold text-slate-400">
                                            {new Date(item.date).toLocaleDateString()}
                                        </span>
                                        {sourceStatus[item.id] && (
                                            <div className="flex items-center gap-1">
                                                {sourceStatus[item.id].verified ? (
                                                    <div className="flex items-center gap-1 text-green-600">
                                                        <Shield size={12} />
                                                        <span className="text-[8px] font-bold">Vérifié</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1 text-red-600">
                                                        <AlertCircle size={12} />
                                                        <span className="text-[8px] font-bold">Non vérifié</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-md font-black text-primary leading-tight mb-1 group-hover:text-secondary transition-colors duration-300 line-clamp-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 line-clamp-2 font-medium leading-relaxed italic mb-3">
                                        {item.summary}
                                    </p>
                                    
                                    {/* Image Update Section */}
                                    {editingImage === item.id ? (
                                        <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Image size={14} className="text-blue-600" />
                                                <span className="text-xs font-bold text-blue-800">Mettre à jour l'image</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={customImageUrl}
                                                    onChange={(e) => setCustomImageUrl(e.target.value)}
                                                    className="flex-1 text-xs bg-white border border-blue-200 rounded px-2 py-1"
                                                    placeholder="URL de l'image..."
                                                />
                                                <button
                                                    onClick={() => saveImageUpdate(item)}
                                                    className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                                >
                                                    <Check size={12} />
                                                </button>
                                                <button
                                                    onClick={() => setEditingImage(null)}
                                                    className="px-2 py-1 bg-slate-300 text-slate-700 text-xs rounded hover:bg-slate-400"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                    ) : null}

                                    <div className="flex gap-2 flex-wrap">
                                        <button
                                            onClick={() => handleImport(item)}
                                            disabled={importing === item.id}
                                            className="bg-primary text-white px-4 py-2 rounded-lg font-black italic uppercase text-[9px] tracking-widest hover:bg-primary/95 transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
                                        >
                                            {importing === item.id ? (
                                                <RefreshCw size={12} className="animate-spin" />
                                            ) : (
                                                <Plus size={12} />
                                            )}
                                            {importing === item.id ? 'Import...' : 'Valider'}
                                        </button>
                                        <button
                                            onClick={() => verifySource(item)}
                                            disabled={verifyingSource === item.id}
                                            className="px-4 bg-white border border-slate-100 text-slate-600 py-2 rounded-lg font-bold uppercase text-[9px] tracking-widest hover:bg-slate-50 transition-all flex items-center shadow-sm gap-1 disabled:opacity-50"
                                        >
                                            {verifyingSource === item.id ? (
                                                <RefreshCw size={12} className="animate-spin" />
                                            ) : (
                                                <Shield size={12} />
                                            )}
                                            Vérifier
                                        </button>
                                        <button
                                            onClick={() => copyToClipboard(item.link)}
                                            className="px-4 bg-white border border-slate-100 text-slate-600 py-2 rounded-lg font-bold uppercase text-[9px] tracking-widest hover:bg-slate-50 transition-all flex items-center shadow-sm gap-1"
                                        >
                                            <Copy size={12} />
                                            Copier
                                        </button>
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 bg-white border border-slate-100 text-slate-400 py-2 rounded-lg font-bold uppercase text-[9px] tracking-widest hover:bg-slate-50 transition-all flex items-center shadow-sm gap-1"
                                        >
                                            <ExternalLink size={12} />
                                            Source
                                        </a>
                                        <button
                                            onClick={() => handleImageUpdate(item)}
                                            className="px-4 bg-purple-50 border border-purple-200 text-purple-600 py-2 rounded-lg font-bold uppercase text-[9px] tracking-widest hover:bg-purple-100 transition-all flex items-center shadow-sm gap-1"
                                        >
                                            <Image size={12} />
                                            Image
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                            <Globe className="mx-auto text-slate-200 mb-3" size={48} />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                                Aucun nouvel article trouvé<br />
                                <span className="text-[9px] font-medium normal-case italic opacity-60">Tout est déjà publié ou filtré.</span>
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminNewsCurator;
