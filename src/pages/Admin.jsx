import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminTopbar from '../components/admin/AdminTopbar';
import AdminDashboard from './admin/AdminDashboard';
import AdminPosts from './admin/AdminPosts';
import AdminNews from './admin/AdminNews';
import AdminPartners from './admin/AdminPartners';
import AdminVisitors from './admin/AdminVisitors';
import AdminMessages from './admin/AdminMessages';
import { Menu, X, LayoutDashboard, Camera, Newspaper, Handshake, LogOut, Mail, Users, ChevronRight } from 'lucide-react';

const Admin = () => {
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem('adminActiveTab') || 'dashboard';
    });
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('adminActiveTab', activeTab);
    }, [activeTab]);

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'posts', label: 'Posts (Blog)', icon: <Camera size={20} /> },
        { id: 'news', label: 'Actualités', icon: <Newspaper size={20} /> },
        { id: 'partners', label: 'Partenaires', icon: <Handshake size={20} /> },
        { id: 'visitors', label: 'Visiteurs', icon: <Users size={20} /> },
        { id: 'messages', label: 'Messages', icon: <Mail size={20} /> },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <AdminDashboard />;
            case 'posts':
                return <AdminPosts />;
            case 'news':
                return <AdminNews />;
            case 'partners':
                return <AdminPartners />;
            case 'visitors':
                return <AdminVisitors />;
            case 'messages':
                return <AdminMessages />;
            default:
                return <AdminDashboard />;
        }
    };

    const getTitle = () => {
        switch (activeTab) {
            case 'dashboard': return 'Tableau de bord';
            case 'posts': return 'Gestion des Posts';
            case 'news': return 'Actualités & Médias';
            case 'partners': return 'Partenaires & Sponsors';
            case 'messages': return 'Messages Reçus';
            default: return 'Administration';
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setSidebarOpen(false); // Fermer le menu mobile après sélection
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Mobile Menu Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-[130] lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed left-0 top-0 h-full w-64 bg-primary z-[140] transform transition-transform duration-300 ease-in-out lg:hidden ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                {/* Header Mobile */}
                <div className="p-4 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="Logo" className="h-8 brightness-0 invert" />
                            <span className="text-white font-black italic tracking-tighter text-sm uppercase">Admin Panel</span>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Navigation Mobile */}
                <nav className="flex-1 py-4 px-3 overflow-y-auto">
                    {menuItems.map((item, idx) => (
                        <button
                            key={item.id}
                            onClick={() => handleTabClick(item.id)}
                            className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all mb-2 ${
                                activeTab === item.id
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

                {/* Footer Mobile */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full flex items-center gap-3 px-3 py-3 text-white/40 hover:text-red-400 transition-colors text-sm font-bold uppercase tracking-widest"
                    >
                        <LogOut size={16} />
                        Quitter l'admin
                    </button>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {/* Main Content Area */}
            <div className="lg:ml-64 flex flex-col min-h-screen">
                <AdminTopbar 
                    title={getTitle()} 
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                    sidebarOpen={sidebarOpen}
                />

                <main className="flex-1 overflow-y-auto">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default Admin;

