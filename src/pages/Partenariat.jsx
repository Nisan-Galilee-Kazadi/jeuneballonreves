import React from 'react';
import Layout from '../components/Layout';

const Partenariat = () => (
    <Layout>
        <div className="pt-32 pb-20 px-4 bg-white">
            <div className="max-w-5xl mx-auto">
                <header className="text-center mb-16">
                    <h1 className="text-primary text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-4">Partenariat</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-sm">Construisons ensemble l'avenir du football</p>
                </header>

                <div className="grid md:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8">
                        <div className="bg-slate-50 p-10 rounded-sm border-l-8 border-primary shadow-xl">
                            <h2 className="text-2xl font-black text-primary italic mb-6">Pourquoi devenir partenaire ?</h2>
                            <p className="text-slate-700 leading-relaxed mb-6">
                                Devenir partenaire de Jeunes, Ballon et Rêves, c'est s'associer à une cause noble et porteuse d'espoir.
                                Votre soutien permet d'offrir des infrastructures de qualité, un encadrement professionnel et une visibilité médiatique sans précédent aux jeunes talents congolais.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Valorisation de votre image de marque",
                                    "Impact social direct sur la jeunesse",
                                    "Accès à un réseau de futurs professionnels",
                                    "Visibilité lors de nos émissions et événements"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 items-start">
                                        <i className="fas fa-handshake text-secondary mt-1"></i>
                                        <span className="font-bold text-slate-800 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-primary p-10 text-white rounded-sm shadow-2xl">
                            <h3 className="text-xl font-black italic mb-4 text-secondary">Collaborons ensemble</h3>
                            <p className="text-sm opacity-80 leading-relaxed">
                                Nous sommes ouverts à différents types de collaborations : sponsoring technique, appui financier, parrainage d'émissions ou fourniture d'équipements.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-10">
                        <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80" className="rounded-sm shadow-2xl w-full border-b-8 border-secondary" alt="Partenariat" />

                        <div className="p-8 border-2 border-slate-100 rounded-sm">
                            <h4 className="text-xl font-black text-primary italic mb-6">Comment procéder ?</h4>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-secondary text-primary rounded-full flex items-center justify-center font-black">1</div>
                                    <p className="text-sm font-medium pt-2">Contactez-nous pour exprimer votre intérêt.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-secondary text-primary rounded-full flex items-center justify-center font-black">2</div>
                                    <p className="text-sm font-medium pt-2">Définissons ensemble les modalités de partenariat.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-secondary text-primary rounded-full flex items-center justify-center font-black">3</div>
                                    <p className="text-sm font-medium pt-2">Signons une convention de collaboration.</p>
                                </div>
                            </div>
                            <div className="mt-10">
                                <a href="mailto:veroniquendwaya@gmail.com" className="bg-primary text-white font-bold px-8 py-3 rounded-sm hover:bg-opacity-90 tracking-widest uppercase text-xs block text-center shadow-lg transition-all">Nous contacter</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
);

export default Partenariat;
