import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminTopbar from '../components/admin/AdminTopbar';
import AdminDashboard from './admin/AdminDashboard';
import AdminPosts from './admin/AdminPosts';
import AdminNews from './admin/AdminNews';
import AdminPartners from './admin/AdminPartners';
import AdminVisitors from './admin/AdminVisitors';
import AdminMessages from './admin/AdminMessages';

const Admin = () => {
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem('adminActiveTab') || 'dashboard';
    });

    useEffect(() => {
        localStorage.setItem('adminActiveTab', activeTab);
    }, [activeTab]);

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

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Sidebar */}
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Content Area */}
            <div className="ml-64 flex flex-col min-h-screen">
                <AdminTopbar title={getTitle()} />

                <main className="flex-1 overflow-y-auto">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default Admin;

