import React from 'react';
import { LayoutDashboard, Camera, Newspaper, Handshake, ChevronRight, LogOut, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
    const location = useLocation();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'posts', label: 'Posts (Blog)', icon: <Camera size={20} /> },
        { id: 'news', label: 'Actualités', icon: <Newspaper size={20} /> },
        { id: 'partners', label: 'Partenaires', icon: <Handshake size={20} /> },
        { id: 'visitors', label: 'Visiteurs', icon: <Mail size={20} /> },
        { id: 'messages', label: 'Messages', icon: <Mail size={20} /> },
    ];

    return (
        <aside className="w-64 bg-primary min-h-screen flex flex-col fixed left-0 top-0 z-[120]">
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Logo" className="h-8 brightness-0 invert" />
                    <span className="text-white font-black italic tracking-tighter text-sm uppercase">Admin Panel</span>
                </div>
            </div>

            <nav className="flex-1 py-6 px-4 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeTab === item.id
                            ? 'bg-secondary text-primary font-bold shadow-lg'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            {item.icon}
                            <span className="text-sm">{item.label}</span>
                        </div>
                        {activeTab === item.id && <ChevronRight size={16} />}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-white/10">
                <Link
                    to="/"
                    className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:text-red-400 transition-colors text-sm font-bold uppercase tracking-widest"
                >
                    <LogOut size={18} />
                    Quitter l'admin
                </Link>
            </div>
        </aside>
    );
};

export default AdminSidebar;
