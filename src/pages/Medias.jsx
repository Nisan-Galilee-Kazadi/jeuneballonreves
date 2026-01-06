import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { getPosts } from '../api';

const Medias = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getPosts();
                setPosts(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <Layout>
            <div className="pt-32 pb-20 px-4 bg-slate-50 min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-primary text-5xl font-black italic tracking-tighter mb-4 uppercase">Médias</h1>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Le projet Jeunes, Ballon et Rêves en images</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-40">
                            <div className="relative w-16 h-16 flex items-center justify-center">
                                {/* Multiple Orbiting Balls */}
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
                                                y: [0, -15, 0] // Oscillation for 'juggling' look
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
                                {/* Core Glow */}
                                <div className="w-6 h-6 bg-secondary/20 rounded-full blur-lg animate-pulse"></div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <div key={post._id} className="bg-white rounded-sm shadow-xl overflow-hidden group">
                                        <div className="h-64 overflow-hidden relative">
                                            <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                                            <div className="absolute top-4 right-4 bg-secondary text-primary font-black px-3 py-1 text-[10px] uppercase rounded-sm">
                                                {post.type}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-primary text-xl font-black italic tracking-tighter mb-2 underline decoration-secondary decoration-2">{post.title}</h3>
                                            <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">{post.caption}</p>
                                            <div className="mt-6 flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                                <div className="flex gap-4">
                                                    <span><i className="fas fa-heart text-secondary mr-1"></i> {post.reactions?.hearts || 0}</span>
                                                    <span><i className="fas fa-comment text-primary mr-1"></i> {post.comments?.length || 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20 bg-white shadow-inner rounded-lg">
                                    <p className="text-slate-400 italic">Aucun contenu disponible pour le moment.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Medias;
