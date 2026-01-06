import React, { useState } from 'react';
import Layout from '../components/Layout';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex justify-between items-center text-left hover:text-primary transition-all"
            >
                <span className="text-lg font-bold italic">{question}</span>
                <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-secondary`}></i>
            </button>
            {isOpen && <div className="pb-6 text-slate-600 leading-relaxed">{answer}</div>}
        </div>
    );
};

const Contact = () => (
    <Layout>
        <div className="pt-32 pb-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16">
                    {/* Contact Details */}
                    <div>
                        <h1 className="text-primary text-5xl font-black italic tracking-tighter mb-8 border-b-4 border-secondary inline-block">Contact</h1>
                        <p className="text-slate-600 mb-12">Vous avez une question ou souhaitez nous rejoindre ? N'hésitez pas à nous contacter via les canaux ci-dessous.</p>

                        <div className="space-y-8">
                            <div className="flex items-center gap-6 group">
                                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl group-hover:bg-secondary group-hover:text-primary transition-all">
                                    <i className="fas fa-phone"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary">Téléphone</h4>
                                    <p className="text-slate-600">+243 826011165</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl group-hover:bg-secondary group-hover:text-primary transition-all">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary">Email</h4>
                                    <p className="text-slate-600">veroniquendwaya@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl group-hover:bg-secondary group-hover:text-primary transition-all">
                                    <i className="fab fa-facebook-f"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary">Facebook</h4>
                                    <p className="text-slate-600">Jeunes, Ballon et Rêves</p>
                                </div>
                            </div>
                        </div>

                        {/* Donation CTA */}
                        <div className="mt-20 p-8 rounded-sm border-t-8 border-secondary bg-slate-50 shadow-xl">
                            <h3 className="text-2xl font-black text-primary italic mb-4">SOUTENEZ NOTRE PROJET</h3>
                            <p className="text-slate-600 text-sm mb-6">Chaque contribution compte pour l’épanouissement des jeunes talents et la pérennité du projet.</p>
                            <button className="bg-primary text-white font-bold px-8 py-3 rounded-sm hover:bg-opacity-90 tracking-widest uppercase text-xs">Faire un don</button>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div>
                        <h2 className="text-primary text-4xl font-black italic tracking-tighter mb-8 uppercase">FAQ</h2>
                        <div className="space-y-2">
                            <FAQItem
                                question="Comment devenir partenaire ?"
                                answer="Vous pouvez nous contacter directement par téléphone ou par email pour discuter des opportunités de collaboration."
                            />
                            <FAQItem
                                question="L'émission est-elle ouverte à tous les jeunes ?"
                                answer="Oui, notre mission est de valoriser tous les talents méconnus évoluant dans l'ombre."
                            />
                            <FAQItem
                                question="Où peut-on suivre les émissions ?"
                                answer="Suivez-nous sur nos réseaux sociaux et notre page Facebook pour être informé des prochaines diffusions."
                            />
                            <FAQItem
                                question="Quel est l'objectif du projet ?"
                                answer="Former et révéler les futurs joueurs capables de porter haut les couleurs du Léopard congolais."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
);

export default Contact;
