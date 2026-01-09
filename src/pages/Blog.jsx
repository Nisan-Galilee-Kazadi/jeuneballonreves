import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Send, X } from 'lucide-react';
import Layout from '../components/Layout';
import { Reveal } from '../components/Reveal';
import { AnimatedPageTitle } from '../components/AnimatedPageTitle';
import { getPosts } from '../api';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [commentInputs, setCommentInputs] = useState({});
    const [showComments, setShowComments] = useState({});
    const [showNameModal, setShowNameModal] = useState(false);
    const [pendingCommentPostId, setPendingCommentPostId] = useState(null);
    const [visitorName, setVisitorName] = useState('');
    const [tempName, setTempName] = useState('');

    useEffect(() => {
        // Load visitor name from localStorage
        const savedName = localStorage.getItem('jbr_visitor_name');
        if (savedName) {
            setVisitorName(savedName);
        }

        // Load liked posts from localStorage
        const savedLikes = localStorage.getItem('jbr_liked_posts');
        const likedPosts = savedLikes ? JSON.parse(savedLikes) : [];

        const fetchPosts = async () => {
            try {
                const response = await getPosts();
                const responseData = response.data || [];
                const blogPosts = responseData.filter(p => p.type === 'blog' || p.type === 'instagram');

                // Mark posts as liked based on localStorage
                // NOTE: We do not overwrite likes count from localStorage, we trust backend for count
                // We only check "isLiked" state locally
                const postsWithLikes = blogPosts.map(post => ({
                    ...post,
                    isLiked: likedPosts.includes(post._id)
                }));

                setPosts(postsWithLikes);
            } catch (err) {
                console.error(err);
                setPosts([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();

        // Polling for live updates (every 10 seconds)
        // This ensures new comments from other users appear automatically
        const interval = setInterval(fetchPosts, 10000);

        return () => clearInterval(interval);
    }, []);

    // Optimistic Like/Unlike with localStorage
    const handleLike = async (postId) => {
        setPosts(prevPosts => prevPosts.map(post => {
            if (post._id === postId) {
                const isLiked = post.isLiked;
                const newLikedState = !isLiked;

                // Update localStorage
                const savedLikes = localStorage.getItem('jbr_liked_posts');
                let likedPosts = savedLikes ? JSON.parse(savedLikes) : [];

                if (newLikedState) {
                    likedPosts.push(postId);
                } else {
                    likedPosts = likedPosts.filter(id => id !== postId);
                }

                localStorage.setItem('jbr_liked_posts', JSON.stringify(likedPosts));

                return {
                    ...post,
                    isLiked: newLikedState,
                    reactions: {
                        ...post.reactions,
                        likes: isLiked ? (post.reactions?.likes || 0) - 1 : (post.reactions?.likes || 0) + 1
                    }
                };
            }
            return post;
        }));

        // Backend sync
        try {
            await fetch(`https://jbrbackend.onrender.com/api/posts/${postId}/react`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'likes' })
            });
        } catch (err) {
            console.error('Error syncing like:', err);
        }
    };

    // Check if visitor has a name before commenting
    const handleCommentClick = (postId) => {
        if (!visitorName) {
            setPendingCommentPostId(postId);
            setShowNameModal(true);
        } else {
            handleAddComment(postId);
        }
    };

    // Save visitor name
    const handleSaveName = async () => {
        if (tempName.trim()) {
            const newName = tempName.trim();
            setVisitorName(newName);
            localStorage.setItem('jbr_visitor_name', newName);

            // Register visitor in backend
            try {
                await fetch('https://jbrbackend.onrender.com/api/visitors', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: newName })
                });
            } catch (err) {
                console.error('Error registering visitor:', err);
            }

            setShowNameModal(false);
            if (pendingCommentPostId) {
                handleAddComment(pendingCommentPostId, newName);
                setPendingCommentPostId(null);
            }
        }
    };

    // Add Comment
    const handleAddComment = async (postId, nameOverride = null) => {
        const commentText = commentInputs[postId]?.trim();
        if (!commentText) return;

        const newComment = {
            user: nameOverride || visitorName || "Visiteur",
            text: commentText,
            createdAt: new Date()
        };

        // Optimistic update
        setPosts(prevPosts => prevPosts.map(post => {
            if (post._id === postId) {
                return {
                    ...post,
                    comments: [...(post.comments || []), newComment]
                };
            }
            return post;
        }));

        setCommentInputs({ ...commentInputs, [postId]: '' });

        // Backend sync
        try {
            await fetch(`https://jbrbackend.onrender.com/api/posts/${postId}/comment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newComment)
            });
        } catch (err) {
            console.error('Error adding comment:', err);
        }
    };

    return (
        <Layout>
            <div className="pt-32 pb-20 px-4 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <AnimatedPageTitle title="Blog JBR" className="justify-center" />
                        <Reveal width="100%" delay={0.4}>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Nos moments, nos histoires, nos rêves</p>
                        </Reveal>
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
                        <div className="flex gap-8">
                            {/* Main Feed - Single Column */}
                            <div className="flex-1 max-w-2xl mx-auto lg:mx-0 space-y-8">
                                {posts && posts.length > 0 ? (
                                    posts.map((post) => (
                                        <Reveal key={post._id} width="100%">
                                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                                {/* Post Header */}
                                                <div className="p-4 flex items-center gap-3 border-b border-slate-100">
                                                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                                        <i className="fas fa-futbol text-secondary text-sm"></i>
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-black text-primary text-sm uppercase italic tracking-tighter">{post.title}</p>
                                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                                                            {new Date(post.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="bg-secondary text-primary px-3 py-1 rounded-full text-[9px] font-black uppercase">
                                                        Blog
                                                    </div>
                                                </div>

                                                {/* Post Image */}
                                                <div className="relative">
                                                    <img src={post.imageUrl} className="w-full h-auto" alt={post.title} />
                                                </div>

                                                {/* Actions */}
                                                <div className="p-4 space-y-3">
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            onClick={() => handleLike(post._id)}
                                                            className="flex items-center gap-2 group"
                                                        >
                                                            <Heart
                                                                size={24}
                                                                className={`transition-all ${post.isLiked ? 'fill-red-500 text-red-500' : 'text-slate-700 hover:text-red-500'}`}
                                                            />
                                                            <span className="text-sm font-bold text-primary">{post.reactions?.likes || 0}</span>
                                                        </button>
                                                        <button
                                                            onClick={() => setShowComments({ ...showComments, [post._id]: !showComments[post._id] })}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <MessageCircle size={24} className="text-slate-700 hover:text-primary transition-colors" />
                                                            <span className="text-sm font-bold text-primary">{post.comments?.length || 0}</span>
                                                        </button>
                                                    </div>

                                                    {/* Caption */}
                                                    <p className="text-sm text-slate-700 leading-relaxed">
                                                        <span className="font-black text-primary mr-2">{post.title}</span>
                                                        {post.caption}
                                                    </p>

                                                    {/* Comments Section */}
                                                    {showComments[post._id] && (
                                                        <div className="space-y-3 pt-3 border-t border-slate-100">
                                                            {post.comments && post.comments.length > 0 ? (
                                                                post.comments.map((comment, idx) => (
                                                                    <div key={idx} className="text-sm">
                                                                        <span className="font-bold text-primary mr-2">{comment.user}</span>
                                                                        <span className="text-slate-700">{comment.text}</span>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <p className="text-xs text-slate-400 italic">Aucun commentaire pour le moment.</p>
                                                            )}

                                                            {/* Add Comment */}
                                                            <div className="flex gap-2 pt-2">
                                                                <input
                                                                    type="text"
                                                                    value={commentInputs[post._id] || ''}
                                                                    onChange={(e) => setCommentInputs({ ...commentInputs, [post._id]: e.target.value })}
                                                                    onKeyPress={(e) => e.key === 'Enter' && handleCommentClick(post._id)}
                                                                    placeholder="Ajouter un commentaire..."
                                                                    className="flex-1 bg-slate-50 border-none rounded-full px-4 py-2 text-sm focus:ring-2 ring-secondary"
                                                                />
                                                                <button
                                                                    onClick={() => handleCommentClick(post._id)}
                                                                    className="bg-secondary text-primary p-2 rounded-full hover:bg-primary hover:text-secondary transition-all"
                                                                >
                                                                    <Send size={18} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Reveal>
                                    ))
                                ) : (
                                    <div className="text-center py-20 bg-white shadow-inner rounded-lg">
                                        <p className="text-slate-400 italic">Aucun article de blog disponible pour le moment.</p>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar Animation - Desktop Only - FIXED (never scrolls) */}
                            < div className="hidden lg:block w-[420px] fixed right-8 top-32 h-[calc(100vh-10rem)]" >
                                <div className="relative w-full h-full overflow-hidden rounded-3xl bg-linear-to-br from-primary to-primary/80 p-8">
                                    {/* Continuous Floating Balls */}
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute"
                                            animate={{
                                                y: [0, -400, 0],
                                                x: [0, Math.sin(i) * 50, 0],
                                                rotate: 360
                                            }}
                                            transition={{
                                                duration: 8 + i * 2,
                                                repeat: Infinity,
                                                ease: "linear",
                                                delay: i * 1.5
                                            }}
                                            style={{
                                                left: `${20 + i * 15}%`,
                                                top: '100%'
                                            }}
                                        >
                                            <i className={`fas fa-futbol text-secondary/20 text-${3 + i}xl`}></i>
                                        </motion.div>
                                    ))}

                                    {/* Content */}
                                    <div className="relative z-10 text-white">
                                        <h3 className="text-2xl font-black italic tracking-tighter mb-4 uppercase">Jeune, Ballon & Rêves</h3>
                                        <p className="text-sm opacity-80 leading-relaxed mb-6">
                                            Suivez nos aventures, nos victoires et nos moments de partage. Chaque post raconte une histoire unique.
                                        </p>
                                        <div className="space-y-3">
                                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                                <p className="text-xs uppercase tracking-widest font-bold opacity-60 mb-1">Total Posts</p>
                                                <p className="text-3xl font-black">{posts.length}</p>
                                            </div>
                                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                                <p className="text-xs uppercase tracking-widest font-bold opacity-60 mb-1">Engagement</p>
                                                <p className="text-3xl font-black">
                                                    {posts.reduce((acc, p) => acc + (p.reactions?.likes || 0) + (p.comments?.length || 0), 0)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Name Modal */}
            <AnimatePresence>
                {showNameModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-500 flex items-center justify-center p-4"
                        onClick={() => setShowNameModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-black text-primary uppercase italic tracking-tighter">Présentez-vous !</h3>
                                <button
                                    onClick={() => setShowNameModal(false)}
                                    className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <p className="text-sm text-slate-600 mb-6">
                                Pour commenter, dites-nous comment vous vous appelez. Votre nom sera affiché avec vos commentaires.
                            </p>
                            <input
                                type="text"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSaveName()}
                                placeholder="Votre nom ou pseudo..."
                                className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 mb-6 focus:ring-2 ring-secondary"
                                autoFocus
                            />
                            <button
                                onClick={handleSaveName}
                                className="w-full bg-primary text-secondary py-3 rounded-2xl font-black uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all"
                            >
                                Enregistrer
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Layout>
    );
};

export default Blog;
