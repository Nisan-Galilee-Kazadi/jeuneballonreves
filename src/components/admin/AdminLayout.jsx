import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Camera, Newspaper, Handshake, LogOut, Mail, Users, ChevronRight, Menu, X, Bell, User } from 'lucide-react';

const AdminLayout = ({ children, title }) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const location = useLocation();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
        { id: 'posts', label: 'Posts (Blog)', icon: <Camera size={20} />, path: '/admin/posts' },
        { id: 'news', label: 'Actualités', icon: <Newspaper size={20} />, path: '/admin/news' },
        { id: 'partners', label: 'Partenaires', icon: <Handshake size={20} />, path: '/admin/partners' },
        { id: 'messages', label: 'Messages', icon: <Mail size={20} />, path: '/admin/messages' },
    ];

    const getActiveTab = () => {
        const path = location.pathname;
        if (path === '/admin') return 'dashboard';
        return path.split('/admin/')[1] || 'dashboard';
    };

    const activeTab = getActiveTab();

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Mobile View */}
            <div className="lg:hidden">
                {/* Mobile Menu Overlay */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 z-[130]"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Mobile Sidebar */}
                <div className={`fixed left-0 top-0 h-full w-64 bg-primary z-[140] transform transition-transform duration-300 ease-in-out ${
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
                        {menuItems.map((item) => (
                            <Link
                                key={item.id}
                                to={item.path}
                                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all mb-2 ${
                                    activeTab === item.id
                                        ? 'bg-secondary text-primary font-bold shadow-lg'
                                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                                }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <div className="flex items-center gap-3">
                                    {item.icon}
                                    <span className="text-sm">{item.label}</span>
                                </div>
                                {activeTab === item.id && <ChevronRight size={16} />}
                            </Link>
                        ))}
                    </nav>

                    {/* Footer Mobile */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                        <Link
                            to="/"
                            className="w-full flex items-center gap-3 px-3 py-3 text-white/40 hover:text-red-400 transition-colors text-sm font-bold uppercase tracking-widest"
                        >
                            <LogOut size={16} />
                            Quitter l'admin
                        </Link>
                    </div>
                </div>

                {/* Mobile Content */}
                <div className="flex flex-col min-h-screen">
                    {/* Mobile Topbar */}
                    <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                            >
                                <Menu size={24} />
                            </button>
                            <h1 className="text-lg font-black text-primary uppercase italic tracking-tighter">{title}</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Notifications */}
                            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                                <Bell size={20} />
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
                            </button>
                            {/* Admin Profile */}
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <User size={16} className="text-white" />
                            </div>
                        </div>
                    </div>

                    <main className="flex-1 overflow-y-auto bg-slate-50">
                        {children}
                    </main>
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden lg:block">
                <div className="flex min-h-screen">
                    {/* Desktop Sidebar */}
                    <div className="w-64 bg-primary min-h-screen flex flex-col fixed left-0 top-0 z-[120]">
                        <div className="p-6 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <img src="/logo.png" alt="Logo" className="h-8 brightness-0 invert" />
                                <span className="text-white font-black italic tracking-tighter text-sm uppercase">Admin Panel</span>
                            </div>
                        </div>

                        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.id}
                                    to={item.path}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
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
                                </Link>
                            ))}
                        </nav>

                        <div className="p-4 border-t border-white/10">
                            <Link
                                to="/"
                                className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:text-red-400 transition-colors text-sm font-bold uppercase tracking-widest"
                            >
                                <LogOut size={16} />
                                Quitter l'admin
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Content */}
                    <div className="flex-1 ml-64 flex flex-col min-w-0">
                        {/* Desktop Topbar */}
                        <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
                            <h1 className="text-xl font-black text-primary uppercase italic tracking-tighter">{title}</h1>
                            <div className="flex items-center gap-4">
                                {/* Notifications */}
                                <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                                    <Bell size={20} />
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
                                </button>
                                {/* Admin Profile */}
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                    <User size={18} className="text-white" />
                                </div>
                            </div>
                        </div>

                        <main className="flex-1 overflow-y-auto bg-slate-50 min-h-0">
                            <div className="w-full min-w-0">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
