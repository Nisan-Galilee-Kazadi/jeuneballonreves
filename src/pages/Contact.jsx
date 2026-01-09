import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Reveal } from '../components/Reveal';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer, isOpen, toggleOpen }) => {
    return (
        <div className="border-b border-slate-200">
            <button
                onClick={toggleOpen}
                className="w-full py-6 flex justify-between items-center text-left hover:text-primary transition-all group"
            >
                <span className={`text-lg font-bold italic transition-colors ${isOpen ? 'text-primary' : 'text-slate-800'}`}>{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <i className={`fas fa-chevron-down text-secondary group-hover:text-primary transition-colors`}></i>
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 text-slate-600 leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Contact = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const faqData = [
        {
            question: "Comment devenir partenaire ?",
            answer: "Vous pouvez nous contacter directement par téléphone ou par email pour discuter des opportunités de collaboration."
        },
        {
            question: "L'émission est-elle ouverte à tous les jeunes ?",
            answer: "Oui, notre mission est de valoriser tous les talents méconnus évoluant dans l'ombre."
        },
        {
            question: "Où peut-on suivre les émissions ?",
            answer: "Suivez-nous sur nos réseaux sociaux et notre page Facebook pour être informé des prochaines diffusions."
        },
        {
            question: "Quel est l'objectif du projet ?",
            answer: "Former et révéler les futurs joueurs capables de porter haut les couleurs du Léopard congolais."
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch('http://jbrbackend.onrender.com/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setSubmitted(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
            }
        } catch (err) {
            console.error(err);
            alert('Erreur lors de l\'envoi du message');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Layout>
            <div className="pt-32 pb-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16">
                        {/* Contact Details */}
                        <div className="space-y-12">
                            <div>
                                <Reveal direction="right" delay={3.8}>
                                    <h1 className="text-primary text-5xl font-black italic tracking-tighter mb-8 border-b-4 border-secondary inline-block">Contact</h1>
                                </Reveal>
                                <Reveal delay={0.3}>
                                    <p className="text-slate-600">Vous avez une question ou souhaitez nous rejoindre ? Utilisez le formulaire ou les canaux ci-dessous.</p>
                                </Reveal>
                            </div>

                            {/* Contact Form */}
                            <Reveal delay={0.4} width="100%">
                                <form onSubmit={handleSubmit} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                                    {submitted ? (
                                        <div className="text-center py-8 animate-fade-in">
                                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <i className="fas fa-check text-2xl"></i>
                                            </div>
                                            <h3 className="text-xl font-bold text-primary mb-2">Message Envoyé !</h3>
                                            <p className="text-sm text-slate-500">Merci de nous avoir contactés. Nous vous répondrons prochainement.</p>
                                            <button
                                                onClick={() => setSubmitted(false)}
                                                className="mt-6 text-xs font-bold text-primary uppercase tracking-widest hover:text-secondary transition-colors"
                                            >
                                                Envoyer un autre message
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Nom Complet</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        placeholder="Votre nom"
                                                        className="w-full bg-white border-none rounded-2xl px-4 py-3 focus:ring-2 ring-primary transition-all shadow-sm"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Email</label>
                                                    <input
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        placeholder="votre@email.com"
                                                        className="w-full bg-white border-none rounded-2xl px-4 py-3 focus:ring-2 ring-primary transition-all shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Sujet</label>
                                                <input
                                                    type="text"
                                                    value={formData.subject}
                                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                    placeholder="L'objet de votre message"
                                                    className="w-full bg-white border-none rounded-2xl px-4 py-3 focus:ring-2 ring-primary transition-all shadow-sm"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Message</label>
                                                <textarea
                                                    required
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    placeholder="Comment pouvons-nous vous aider ?"
                                                    className="w-full bg-white border-none rounded-2xl px-4 py-3 focus:ring-2 ring-primary transition-all shadow-sm h-32 resize-none"
                                                ></textarea>
                                            </div>
                                            <button
                                                disabled={submitting}
                                                type="submit"
                                                className="w-full bg-primary text-white font-black italic uppercase tracking-[0.2em] py-4 rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                            >
                                                {submitting ? 'Envoi...' : 'Envoyer le Message'}
                                            </button>
                                        </>
                                    )}
                                </form>
                            </Reveal>

                            <div className="space-y-8">
                                <Reveal delay={0.5} width="100%">
                                    <div className="flex items-center gap-6 group">
                                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl group-hover:bg-secondary group-hover:text-primary transition-all">
                                            <i className="fas fa-phone"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-primary">Téléphone</h4>
                                            <p className="text-slate-600">+243 826011165</p>
                                        </div>
                                    </div>
                                </Reveal>

                                <Reveal delay={0.6} width="100%">
                                    <div className="flex items-center gap-6 group">
                                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl group-hover:bg-secondary group-hover:text-primary transition-all">
                                            <i className="fas fa-envelope"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-primary">Email</h4>
                                            <p className="text-slate-600">veroniquendwaya@gmail.com</p>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                        </div>

                        {/* FAQ and Support */}
                        <div className="space-y-16">
                            <div>
                                <Reveal delay={0.2}>
                                    <h2 className="text-primary text-4xl font-black italic tracking-tighter mb-8 uppercase">FAQ</h2>
                                </Reveal>
                                <div className="space-y-2">
                                    {faqData.map((item, index) => (
                                        <Reveal key={index} delay={0.3 + index * 0.1} width="100%">
                                            <FAQItem
                                                question={item.question}
                                                answer={item.answer}
                                                isOpen={openIndex === index}
                                                toggleOpen={() => setOpenIndex(index === openIndex ? -1 : index)}
                                            />
                                        </Reveal>
                                    ))}
                                </div>
                            </div>

                            {/* Donation CTA */}
                            <Reveal delay={0.7} width="100%">
                                <div className="relative overflow-hidden p-8 rounded-3xl border-t-8 border-secondary bg-slate-50 shadow-xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&q=80"
                                        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
                                        alt=""
                                    />
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-black text-primary italic mb-4 uppercase">Soutenez le Projet</h3>
                                        <p className="text-slate-600 text-sm mb-6 leading-relaxed font-medium">Chaque contribution compte pour l’épanouissement des jeunes talents et la pérennité du projet Jeunes, Ballon et Rêves.</p>
                                        <button className="bg-primary text-white font-black italic uppercase text-[10px] tracking-widest px-8 py-4 rounded-xl hover:scale-105 transition-all shadow-lg">Faire un don maintenant</button>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
