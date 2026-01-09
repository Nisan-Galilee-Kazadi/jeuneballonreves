import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Camera, Newspaper, Heart, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout';

const StatCard = ({ title, value, icon, color, trend, linkTo }) => (
    <Link to={linkTo} className="block">
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-md transition-shadow"
        >
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}`}>
                {icon}
            </div>
            {trend && (
                <span className="flex items-center gap-1 text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">
                    <TrendingUp size={12} /> {trend}
                </span>
            )}
        </div>
        <h3 className="text-slate-500 text-sm font-bold uppercase tracking-widest">{title}</h3>
        <p className="text-3xl font-black text-primary mt-1">{value}</p>
        </motion.div>
    </Link>
);

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch('http://jbrbackend.onrender.com/api/admin/stats')
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error(err));
    }, []);

    if (!stats) return <div className="p-8 text-primary font-bold animate-pulse">Chargement des statistiques...</div>;

    return (
        <AdminLayout title="Tableau de bord">
            <div className="h-full w-full overflow-x-hidden">
                <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 w-full max-w-full">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    <div className="w-full min-w-0">
                        <StatCard title="Total Posts" value={stats.posts} icon={<Camera size={24} />} color="bg-blue-500" trend="+12%" linkTo="/admin/posts" />
                    </div>
                    <div className="w-full min-w-0">
                        <StatCard title="Actualités" value={stats.news} icon={<Newspaper size={24} />} color="bg-orange-500" trend="+5%" linkTo="/admin/news" />
                    </div>
                    <div className="w-full min-w-0">
                        <StatCard title="Partenaires" value={stats.partners} icon={<Users size={24} />} color="bg-green-500" trend="+2" linkTo="/admin/partners" />
                    </div>
                    <div className="w-full min-w-0">
                        <StatCard title="Engagement" value={stats.engagement} icon={<Heart size={24} />} color="bg-red-500" trend="+8%" linkTo="/admin/messages" />
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                    {/* Recent Activity */}
                    <div className="xl:col-span-2 w-full min-w-0">
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 sm:p-6 lg:p-8 overflow-hidden w-full">
                            <div className="flex justify-between items-center mb-6 lg:mb-8">
                                <h3 className="text-lg font-black text-primary uppercase italic tracking-tighter">Activité Récente</h3>
                                <button className="text-xs font-bold text-secondary uppercase tracking-widest hover:underline">Voir tout</button>
                            </div>
                            <div className="space-y-6 overflow-x-hidden">
                                {stats.recentActivity.map((post, i) => (
                                    <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0 min-w-0">
                                        <div className="flex items-center gap-4 min-w-0 flex-1">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                                                <img src={post.imageUrl} className="w-full h-full object-cover" alt="" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-bold text-primary truncate">{post.title}</p>
                                                <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-1">
                                                    <Clock size={10} /> {new Date(post.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 sm:gap-4 flex-shrink-0">
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                                <Heart size={12} className="text-red-400" /> {post.reactions.likes + post.reactions.hearts}
                                            </span>
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                                <Newspaper size={12} className="text-blue-400" /> {post.comments.length}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Shortcuts / Tips */}
                    <div className="space-y-6 lg:space-y-8 w-full min-w-0">
                        <div className="bg-primary rounded-3xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden w-full">
                            <div className="absolute -bottom-10 -right-10 opacity-10">
                                <i className="fas fa-futbol text-[150px]"></i>
                            </div>
                            <h4 className="text-lg font-bold mb-4">Conseil Pro</h4>
                            <p className="text-sm text-white/70 leading-relaxed mb-6 italic">
                                "Mettez à jour vos actualités au moins 2 fois par semaine pour booster l'engagement de votre communauté."
                            </p>
                            <Link to="/admin/posts" className="bg-secondary text-primary px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl inline-block text-center hover:scale-105 transition-all">
                                Créer un post
                            </Link>
                        </div>

                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                            <h4 className="text-sm font-black text-primary uppercase italic tracking-tighter mb-4">Alerte Partenaires</h4>
                            <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl">
                                <TrendingUp className="text-orange-500" />
                                <p className="text-xs font-medium text-orange-800">2 nouveaux logos à vérifier pour le carrousel.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
