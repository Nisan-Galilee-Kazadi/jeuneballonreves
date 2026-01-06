import React, { useState, useEffect } from 'react';
import { Handshake, Plus, Trash2, Globe, Bookmark } from 'lucide-react';

const AdminPartners = () => {
    const [partners, setPartners] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
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
        fetch('http://localhost:5000/api/partners')
            .then(res => res.json())
            .then(data => setPartners(data))
            .catch(err => console.error(err));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/partners', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPartner)
            });
            if (res.ok) {
                alert('Partenaire ajouté !');
                setIsCreating(false);
                setNewPartner({ name: '', logoUrl: '', website: '', type: 'Sponsor' });
                fetchPartners();
            }
        } catch (err) {
            alert('Erreur lors de l\'ajout');
        }
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <button
                    onClick={() => setIsCreating(true)}
                    className="bg-green-600 text-white px-6 py-3 rounded-xl font-black italic uppercase text-xs tracking-widest flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
                >
                    <Plus size={18} /> Ajouter un Partenaire
                </button>
            </div>

            {isCreating && (
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100 max-w-2xl animate-fade-in">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary uppercase italic tracking-tighter">
                        <Handshake className="text-green-600" /> Nouveau Partenaire
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Nom de l'organisation</label>
                            <input
                                type="text"
                                value={newPartner.name}
                                onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                                className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-green-500"
                                placeholder="Nom..."
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Logo (URL)</label>
                            <input
                                type="text"
                                value={newPartner.logoUrl}
                                onChange={(e) => setNewPartner({ ...newPartner, logoUrl: e.target.value })}
                                className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-green-500"
                                placeholder="Lien vers le logo"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Site Web</label>
                            <input
                                type="text"
                                value={newPartner.website}
                                onChange={(e) => setNewPartner({ ...newPartner, website: e.target.value })}
                                className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-green-500"
                                placeholder="https://..."
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Type de partenariat</label>
                            <select
                                value={newPartner.type}
                                onChange={(e) => setNewPartner({ ...newPartner, type: e.target.value })}
                                className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 ring-green-500 font-bold text-sm"
                            >
                                <option value="Sponsor">Sponsor</option>
                                <option value="Collaborateur">Collaborateur</option>
                                <option value="Média">Média</option>
                            </select>
                        </div>
                        <div className="md:col-span-2 flex gap-4 mt-2">
                            <button type="submit" className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-black italic uppercase tracking-[0.2em] shadow-lg">Enregistrer le Partenaire</button>
                            <button onClick={() => setIsCreating(false)} className="px-8 bg-slate-100 text-slate-500 rounded-2xl font-bold uppercase text-xs tracking-widest">Annuler</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {partners.map((partner) => (
                    <div key={partner._id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center group relative">
                        <button className="absolute top-4 right-4 text-slate-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                        <div className="w-20 h-20 rounded-2xl bg-slate-50 p-4 mb-4 flex items-center justify-center">
                            <img src={partner.logoUrl} className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all" alt="" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-2 py-0.5 rounded-full mb-2">{partner.type}</span>
                        <h4 className="text-sm font-bold text-primary mb-1">{partner.name}</h4>
                        {partner.website && (
                            <a href={partner.website} target="_blank" rel="noreferrer" className="text-[10px] text-slate-400 hover:text-primary flex items-center gap-1 font-bold italic tracking-tight">
                                <Globe size={10} /> Visiter le site
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPartners;
