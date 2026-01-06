import React from 'react';
import { Bell, UserCircle, Search } from 'lucide-react';

const AdminTopbar = ({ title }) => {
    return (
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-[115]">
            <div className="flex items-center gap-8 flex-1">
                <h2 className="text-xl font-black text-primary uppercase italic tracking-tighter">{title}</h2>
                <div className="max-w-md w-full relative hidden md:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="w-full bg-slate-100 border-none rounded-full py-2 pl-12 pr-4 text-sm focus:ring-2 ring-secondary/20 transition-all font-medium"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 text-slate-400 hover:text-primary transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="text-right">
                        <p className="text-sm font-bold text-primary leading-none group-hover:text-secondary transition-colors">Admin JBR</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Super Admin</p>
                    </div>
                    <UserCircle size={32} className="text-slate-300 group-hover:text-primary transition-colors" />
                </div>
            </div>
        </header>
    );
};

export default AdminTopbar;
