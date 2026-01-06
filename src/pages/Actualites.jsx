import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import Layout from '../components/Layout';

const Actualites = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedNews, setSelectedNews] = useState(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = () => {
        fetch('http://localhost:5000/api/news')
            .then(res => res.json())
            .then(data => setNews(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    return (
        <Layout>
            <div className="pt-32 pb-20 px-4 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-primary text-5xl font-black italic tracking-tighter mb-4 uppercase">Actualités Football</h1>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Les dernières nouvelles du monde du ballon rond</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-40">
                            <div className="relative w-16 h-16 flex items-center justify-center">
                                {[...Array(4)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute"
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "linear",
                                            delay: i * 0.5
                                        }}
                                        style={{ width: '100%', height: '100%' }}
                                    >
                                        <motion.div
                                            animate={{
                                                rotate: -360,
                                                scale: [1, 1.2, 1],
                                                y: [0, -15, 0]
                                            }}
                                            transition={{
                                                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                                                scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
                                                y: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
                                            }}
                                            className="w-5 h-5 flex items-center justify-center absolute top-0 left-1/2 -translate-x-1/2"
                                        >
                                            <i className="fas fa-futbol text-primary text-xl drop-shadow-md"></i>
                                        </motion.div>
                                    </motion.div>
                                ))}
                                <div className="w-6 h-6 bg-secondary/20 rounded-full blur-lg animate-pulse"></div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {news.length > 0 ? (
                                news.map((item) => (
                                    <motion.div
                                        key={item._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                                        onClick={() => setSelectedNews(item)}
                                    >
                                        <div className="h-56 overflow-hidden relative">
                                            <img
                                                src={item.imageUrl}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                alt={item.title}
                                            />
                                            <div className="absolute top-4 left-4 bg-secondary text-primary font-black px-3 py-1.5 text-[9px] uppercase rounded-full shadow-lg">
                                                {item.category}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-primary text-xl font-black italic tracking-tighter mb-3 leading-tight group-hover:text-secondary transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-4">
                                                {item.content}
                                            </p>
                                            <button className="text-secondary font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                                                Voir plus <i className="fas fa-arrow-right"></i>
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20 bg-white shadow-inner rounded-lg">
                                    <p className="text-slate-400 italic">Aucune actualité disponible pour le moment.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Newspaper Modal - Desktop */}
            <AnimatePresence>
                {selectedNews && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[500] flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedNews(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-none md:rounded-sm shadow-2xl relative"
                            style={{
                                fontFamily: 'Georgia, serif'
                            }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedNews(null)}
                                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-all z-10 shadow-lg"
                            >
                                <X size={20} />
                            </button>

                            {/* Newspaper Header */}
                            <div className="border-b-4 border-primary p-6 md:p-8 bg-slate-50">
                                <div className="text-center">
                                    <h1 className="text-4xl md:text-6xl font-black italic text-primary mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                        JBR Actualités
                                    </h1>
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 font-bold">
                                        {new Date(selectedNews.createdAt).toLocaleDateString('fr-FR', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>

                            {/* Article Content - Newspaper Style */}
                            <div className="p-6 md:p-12">
                                {/* Category Badge */}
                                <div className="mb-6">
                                    <span className="bg-secondary text-primary px-4 py-1.5 text-xs font-black uppercase tracking-widest rounded-full">
                                        {selectedNews.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h2 className="text-3xl md:text-5xl font-black leading-tight mb-6 text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                                    {selectedNews.title}
                                </h2>

                                {/* Desktop: 2-column layout with image */}
                                <div className="hidden md:grid md:grid-cols-3 gap-8 mb-8">
                                    <div className="col-span-2">
                                        <p className="text-lg leading-relaxed text-slate-700 text-justify" style={{ columnCount: 2, columnGap: '2rem', fontFamily: 'Georgia, serif' }}>
                                            {selectedNews.content}
                                        </p>
                                    </div>
                                    <div className="col-span-1">
                                        <img
                                            src={selectedNews.imageUrl}
                                            alt={selectedNews.title}
                                            className="w-full h-auto rounded-sm shadow-lg mb-2"
                                        />
                                        <p className="text-xs italic text-slate-500 text-center">Photo d'illustration</p>
                                    </div>
                                </div>

                                {/* Mobile: Simple layout */}
                                <div className="md:hidden space-y-6">
                                    <img
                                        src={selectedNews.imageUrl}
                                        alt={selectedNews.title}
                                        className="w-full h-auto rounded-lg shadow-lg"
                                    />
                                    <p className="text-base leading-relaxed text-slate-700 text-justify" style={{ fontFamily: 'Georgia, serif' }}>
                                        {selectedNews.content}
                                    </p>
                                </div>

                                {/* Footer */}
                                <div className="mt-12 pt-6 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
                                    <p className="italic">Source: Jeune Ballon Rêves</p>
                                    <p className="font-bold uppercase tracking-widest">Page 1</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Layout>
    );
};

export default Actualites;
