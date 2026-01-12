import React, { useState, useEffect } from 'react';
import { Handshake, Plus, Trash2, Globe, Bookmark, Edit, X, Save } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAlertContext } from '../../components/AlertProvider';

const AdminPartners = () => {
    const alert = useAlertContext();
    const [partners, setPartners] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editingPartner, setEditingPartner] = useState({
        name: '',
        logoUrl: '',
        website: '',
        type: 'Sponsor'
    });
    const [newPartner, setNewPartner] = useState({
        name: '',
        logoUrl: '',
        website: '',
        type: 'Sponsor'
    });

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = () => {
        fetch('https://jbrbackend.onrender.com/api/partners')
            .then(res => res.json())
            .then(data => setPartners(data))
            .catch(err => console.error(err));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        
        setIsSubmitting(true);
        try {
            const res = await fetch('https://jbrbackend.onrender.com/api/partners', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPartner)
            });
            if (res.ok) {
                const createdPartner = await res.json();
                setPartners([createdPartner, ...partners]);
                alert.success('Partenaire ajouté avec succès !');
                setIsCreating(false);
                setNewPartner({ name: '', logoUrl: '', website: '', type: 'Sponsor' });
            }
        } catch (err) {
            alert.error('Erreur lors de l\'ajout');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (isUpdating) return;
        
        setIsUpdating(true);
        try {
            const res = await fetch(`https://jbrbackend.onrender.com/api/partners/${editingPartner._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingPartner)
            });
            if (res.ok) {
                alert.success('Partenaire mis à jour avec succès !');
                setIsEditing(false);
                setEditingPartner({ name: '', logoUrl: '', website: '', type: 'Sponsor' });
                fetchPartners();
            }
        } catch (err) {
            alert.error('Erreur lors de la mise à jour');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async (id) => {
        if (isDeleting) return;
        
        alert.confirm(
            'Êtes-vous sûr de vouloir supprimer ce partenaire ?',
            async () => {
                setIsDeleting(true);
                try {
                    const res = await fetch(`https://jbrbackend.onrender.com/api/partners/${id}`, {
                        method: 'DELETE'
                    });
                    if (res.ok) {
                        alert.success('Partenaire supprimé avec succès !');
                        setPartners(partners.filter(p => p._id !== id));
                    }
                } catch (err) {
                    alert.error('Erreur lors de la suppression');
                } finally {
                    setIsDeleting(false);
                }
            }
        );
    };

    const handleEditPartner = (partner) => {
        setEditingPartner(partner);
        setIsEditing(true);
    };

    return (
        <AdminLayout title="Partenaires">
            <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex justify-between items-center">
                <button
                    onClick={() => setIsCreating(true)}
                    className="bg-green-600 text-white px-6 py-3 rounded-xl font-black italic uppercase text-xs tracking-widest flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all w-full"
                >
                    <Plus size={18} /> Ajouter un Partenaire
                </button>
            </div>

            {isCreating && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 w-full animate-fade-in">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary uppercase italic tracking-tighter">
                        <Handshake className="text-green-600" /> Ajouter un Partenaire
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nom du Partenaire</label>
                                <input
                                    type="text"
                                    value={newPartner.name}
                                    onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-green-500"
                                    placeholder="Ex: Nike"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Type de Partenaire</label>
                                <select
                                    value={newPartner.type}
                                    onChange={(e) => setNewPartner({ ...newPartner, type: e.target.value })}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-green-500"
                                >
                                    <option value="Sponsor">Sponsor</option>
                                    <option value="Partenaire">Partenaire</option>
                                    <option value="Fournisseur">Fournisseur</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">URL du Logo</label>
                                <input
                                    type="text"
                                    value={newPartner.logoUrl}
                                    onChange={(e) => setNewPartner({ ...newPartner, logoUrl: e.target.value })}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-green-500"
                                    placeholder="https://example.com/logo.png"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Site Web</label>
                                <input
                                    type="text"
                                    value={newPartner.website}
                                    onChange={(e) => setNewPartner({ ...newPartner, website: e.target.value })}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-green-500"
                                    placeholder="https://example.com"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2 flex gap-4 mt-2">
                            <button type="submit" className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-black italic uppercase tracking-[0.2em] shadow-lg">Enregistrer  </button>
                            <button onClick={() => setIsCreating(false)} className="px-8 bg-slate-100 text-slate-500 rounded-2xl font-bold uppercase text-xs tracking-widest">Annuler</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {partners.map((partner) => (
                    <div key={partner._id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center group relative w-full h-full min-h-[280px] max-w-sm mx-auto">
                        <button 
                            onClick={() => handleDelete(partner._id)}
                            className="absolute top-4 right-4 text-slate-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50"
                            disabled={isDeleting}
                        >
                            <Trash2 size={16} />
                        </button>
                        <div className="w-24 h-24 rounded-2xl bg-slate-50 p-4 mb-4 flex items-center justify-center flex-shrink-0">
                            {partner.logoUrl ? (
                                <img src={partner.logoUrl} className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all" alt="" />
                            ) : (
                                <Handshake size={32} className="text-slate-300" />
                            )}
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-2 py-0.5 rounded-full mb-2">{partner.type}</span>
                        <h4 className="text-sm font-bold text-primary mb-1">{partner.name}</h4>
                        {partner.website && (
                            <a href={partner.website} target="_blank" rel="noreferrer" className="text-[10px] text-slate-400 hover:text-primary flex items-center gap-1 font-bold italic tracking-tight">
                                <Globe size={10} /> Visiter le site
                            </a>
                        )}
                        <div className="mt-auto pt-4 w-full">
                            <div className="flex flex-wrap gap-2 justify-center">
                                <button 
                                    onClick={() => handleEditPartner(partner)}
                                    className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500 hover:text-primary transition-colors bg-blue-50 px-3 py-2 rounded-md flex-1 min-w-[80px] h-10 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isDeleting || isUpdating}
                                >
                                    Modifier
                                </button>
                                <button 
                                    onClick={() => handleDelete(partner._id)}
                                    className="text-[9px] font-black uppercase tracking-[0.2em] text-red-500 hover:text-primary transition-colors bg-red-50 px-3 py-2 rounded-md flex-1 min-w-[80px] h-10 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isDeleting || isUpdating}
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Partner Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-[300] flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
                    <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-scale-up relative">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="absolute top-4 right-4 w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-all"
                        >
                            <X size={16} />
                        </button>
                        <div className="p-8">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary uppercase italic tracking-tighter">
                                <Edit className="text-blue-500" /> Modifier  
                            </h2>
                            <form onSubmit={handleUpdate} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Nom du Partenaire</label>
                                    <input
                                        type="text"
                                        value={editingPartner.name}
                                        onChange={(e) => setEditingPartner({ ...editingPartner, name: e.target.value })}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-blue-500"
                                        placeholder="Ex: Nike"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Type de Partenaire</label>
                                    <select
                                        value={editingPartner.type}
                                        onChange={(e) => setEditingPartner({ ...editingPartner, type: e.target.value })}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-blue-500"
                                    >
                                        <option value="Sponsor">Sponsor</option>
                                        <option value="Partenaire">Partenaire</option>
                                        <option value="Fournisseur">Fournisseur</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">URL du Logo</label>
                                    <input
                                        type="text"
                                        value={editingPartner.logoUrl}
                                        onChange={(e) => setEditingPartner({ ...editingPartner, logoUrl: e.target.value })}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-blue-500"
                                        placeholder="https://example.com/logo.png"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Site Web</label>
                                    <input
                                        type="text"
                                        value={editingPartner.website}
                                        onChange={(e) => setEditingPartner({ ...editingPartner, website: e.target.value })}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-blue-500"
                                        placeholder="https://example.com"
                                    />
                                </div>
                                <div className="mt-6">
                                    <button 
                                        type="submit" 
                                        className="w-full bg-blue-500 text-white py-4 rounded-2xl font-black italic uppercase tracking-[0.2em] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={isUpdating}
                                    >
                                        {isUpdating ? 'Mise à jour...' : 'Mettre à jour  '}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </AdminLayout>
    );
};

export default AdminPartners;
