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
        fetch('https://jbrbackend.onrender.com/api/admin/aggregate-news')
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
            const response = await fetch(`https://jbrbackend.onrender.com/api/verify-source`, {
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
            const response = await fetch('https://jbrbackend.onrender.com/api/news', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: item.title,
                    content: item.summary,
                    imageUrl: item.imageUrl,
                    category: item.category || 'Général',
                    author: 'Admin',
                    isExternal: true,
                    sourceUrl: item.link
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
        <div className="bg-white rounded-3xl p-2 border border-slate-100 shadow-sm w-full">
            <div className="flex justify-between items-center mb-4">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto max-h-[750px] pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                    {externalNews.length > 0 ? (
                        externalNews.map((item) => (
                            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group relative w-full h-full min-h-[320px] flex flex-col max-w-sm mx-auto">
                                {/* Image en haut */}
                                <div className="h-48 overflow-hidden relative flex-shrink-0">
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
                                    <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm text-secondary text-[8px] font-black uppercase px-2 py-0.5 rounded-md">
                                        {item.source}
                                    </div>
                                    {sourceStatus[item.id] && (
                                        <div className="absolute top-4 right-4">
                                            {sourceStatus[item.id].verified ? (
                                                <div className="bg-green-500 text-white p-1 rounded-full">
                                                    <Shield size={12} />
                                                </div>
                                            ) : (
                                                <div className="bg-red-500 text-white p-1 rounded-full">
                                                    <AlertCircle size={12} />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Contenu */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[9px] font-black text-secondary bg-primary px-2 py-0.5 rounded-md uppercase tracking-widest">
                                            {item.category}
                                        </span>
                                        <span className="text-[9px] font-bold text-slate-400">
                                            {new Date(item.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h4 className="text-sm font-black text-primary uppercase italic tracking-tighter line-clamp-2 mb-2">{item.title}</h4>
                                    <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed">{item.summary}</p>
                                    
                                    {/* Image Update Section */}
                                    {editingImage === item.id ? (
                                        <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Image size={14} className="text-blue-600" />
                                                <span className="text-xs font-bold text-blue-800">Mettre à jour l'image</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="overflow-x-auto">
                                                    <input
                                                        type="text"
                                                        value={customImageUrl}
                                                        onChange={(e) => setCustomImageUrl(e.target.value)}
                                                        className="min-w-full text-xs bg-white border border-blue-200 rounded px-2 py-1 whitespace-nowrap"
                                                        placeholder="Entrez la nouvelle URL de l'image..."
                                                    />
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => saveImageUpdate(item)}
                                                        className="flex-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 flex items-center justify-center gap-1"
                                                    >
                                                        <Check size={12} /> Valider
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingImage(null)}
                                                        className="flex-1 px-2 py-1 bg-slate-300 text-slate-700 text-xs rounded hover:bg-slate-400"
                                                    >
                                                        × Annuler
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}

                                    {/* Boutons en row wrap */}
                                    <div className="mt-auto flex flex-wrap gap-2">
                                        <button
                                            onClick={() => handleImport(item)}
                                            disabled={importing === item.id}
                                            className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-500 hover:text-primary transition-colors bg-orange-50 px-3 py-2 rounded-md flex-1 min-w-[80px] h-10 flex items-center justify-center gap-1 disabled:opacity-50"
                                        >
                                            {importing === item.id ? (
                                                <RefreshCw size={10} className="animate-spin" />
                                            ) : (
                                                <Plus size={10} />
                                            )}
                                            {importing === item.id ? 'Import...' : 'Importer'}
                                        </button>
                                        <button
                                            onClick={() => verifySource(item)}
                                            disabled={verifyingSource === item.id}
                                            className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500 hover:text-primary transition-colors bg-blue-50 px-3 py-2 rounded-md flex-1 min-w-[80px] h-10 flex items-center justify-center gap-1 disabled:opacity-50"
                                        >
                                            {verifyingSource === item.id ? (
                                                <RefreshCw size={10} className="animate-spin" />
                                            ) : (
                                                <Shield size={10} />
                                            )}
                                            Vérifier
                                        </button>
                                        <button
                                            onClick={() => copyToClipboard(item.link)}
                                            className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-primary transition-colors bg-slate-50 px-3 py-2 rounded-md flex-1 min-w-[80px] h-10 flex items-center justify-center gap-1"
                                        >
                                            <Copy size={10} />
                                            Copier
                                        </button>
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-500 hover:text-primary transition-colors bg-purple-50 px-3 py-2 rounded-md flex-1 min-w-[80px] h-10 flex items-center justify-center gap-1"
                                        >
                                            <ExternalLink size={10} />
                                            Source
                                        </a>
                                        <button
                                            onClick={() => handleImageUpdate(item)}
                                            className="text-[9px] font-black uppercase tracking-[0.2em] text-green-500 hover:text-primary transition-colors bg-green-50 px-3 py-2 rounded-md flex-1 min-w-[80px] h-10 flex items-center justify-center gap-1"
                                        >
                                            <Image size={10} />
                                            Image
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
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
