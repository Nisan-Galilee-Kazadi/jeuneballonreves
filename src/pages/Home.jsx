import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Reveal } from '../components/Reveal';
import { motion } from 'framer-motion';

const revealUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

const HeroBox = memo(({ title, subtitle, img, path }) => {
    const navigate = useNavigate();
    const handleClick = useCallback(() => navigate(path), [navigate, path]);
    
    return (
        <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px", amount: 0.3 }}
            onClick={handleClick}
            className="relative h-48 md:h-56 rounded-sm overflow-hidden group shadow-2xl flex flex-col items-stretch cursor-pointer"
        >
            <div className="flex-1 overflow-hidden">
                <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={title} />
            </div>
            <div className="bg-[#002244] py-4 px-2 text-center relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                    <h3 className="text-white text-3xl md:text-4xl font-script drop-shadow-lg">{title}</h3>
                </div>
                <div className="mt-4 pt-2 border-t border-white/20">
                    <p className="text-white text-[10px] font-medium opacity-90">{subtitle}</p>
                </div>
            </div>
        </motion.div>
    );
});

const FeatureCard = memo(({ title, desc, btnText, btnColor, bgImg, colorClass, path }) => {
    const navigate = useNavigate();
    const handleClick = useCallback(() => navigate(path), [navigate, path]);
    
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-30px", amount: 0.3 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`feature-card ${colorClass} z-20`}
        >
            {bgImg && <img src={bgImg} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply" alt="" />}
            <div className="relative z-10 text-left">
                <h4 className="text-white text-2xl font-black italic tracking-tighter leading-tight mb-1">{title}</h4>
                <p className="text-white text-[10px] opacity-90 font-bold max-w-[200px]">{desc}</p>
            </div>
            <div className="relative z-10 self-end">
                <button onClick={handleClick} className={`${btnColor} text-[10px] font-bold px-5 py-1.5 rounded-sm shadow-md transition-transform hover:scale-105 inline-block cursor-pointer`}>
                    {btnText}
                </button>
            </div>
        </motion.div>
    );
});

const Home = () => {
    const navigate = useNavigate();
    return (
        <Layout>
            {/* SECTION HERO */}
            <section className="relative h-[65vh] md:h-[80vh] flex flex-col justify-center items-center text-center px-4 z-10">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8 }}
                        src="/images/hero-football.jpg"
                        className="w-full h-full object-cover"
                        alt="Hero"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "backOut" }}
                    className="flex flex-col items-center max-w-5xl"
                >
                    <Reveal direction="right" delay={0.5}>
                        <h1 className="text-white text-4xl md:text-8xl font-black italic tracking-tighter drop-shadow-2xl mb-4 leading-none uppercase">
                            JEUNES, BALLON & RÊVES
                        </h1>
                    </Reveal>
                    <p className="text-white text-xs md:text-lg font-bold italic mb-8 opacity-90 drop-shadow-md">
                        Valorisons les talents d'aujourd'hui pour construire les champions de demain.
                    </p>
                    <button onClick={() => navigate('/contact')} className="btn-gold cursor-pointer">Découvrir l'émission</button>
                </motion.div>

                {/* Floating Football Micro-animation */}
                <motion.div
                    animate={{ y: [0, -15, 0], rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-10 right-10 opacity-20 hidden md:block"
                >
                    <i className="fas fa-futbol text-6xl text-white"></i>
                </motion.div>
            </section>

            {/* OVERLAPPING BOXES */}
            <div className="relative z-[30] max-w-5xl mx-auto px-4 mt-8 md:-mt-24 mb-20 md:mb-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <HeroBox title="Jeunes" subtitle="l'avenir du football congolais" img="/images/mission-vision.jpg" path="/programme-jbr" />
                    <HeroBox title="Ballon" subtitle="Symbole de passion et d'effort" img="/images/ballon.jpg" path="/programme-jbr" />
                    <HeroBox title="Rêves" subtitle="Poursuivre ses rêves de grandeur" img="/images/reves.jpg" path="/programme-jbr" />
                </div>
            </div>

            {/* SECTION À PROPOS */}
            <section className="pt-20 md:pt-56 pb-20 px-4 relative bg-[#eef2f6] z-0 overflow-hidden">
                {/* Decorative Balls */}
                <div className="absolute top-20 -left-20 opacity-5 -rotate-12">
                    <i className="fas fa-futbol text-[200px] text-primary"></i>
                </div>
                <motion.div
                    animate={{ x: [0, 1000], y: [0, -200, 0], rotate: 720 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-40 -left-10 opacity-[0.02] pointer-events-none"
                >
                    <i className="fas fa-futbol text-[120px] text-primary"></i>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-30px", amount: 0.3 }}
                    variants={{
                        hidden: { opacity: 0, x: -30 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
                    }}
                    className="max-w-6xl mx-auto flex flex-col items-center relative z-10"
                >
                    <h2 className="text-primary text-3xl md:text-4xl font-black italic tracking-tighter mb-10 decoration-secondary decoration-4 underline-offset-8 underline uppercase shrink-0">À PROPOS</h2>

                    <div className="bg-white rounded-sm flex flex-col md:flex-row shadow-2xl max-w-4xl border-t-8 border-primary overflow-hidden">
                        <div className="md:w-1/3 h-64 md:h-auto overflow-hidden relative group">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                src="/images/presenter.jpg"
                                className="w-full h-full object-cover"
                                alt="Presenter"
                            />
                            <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                        <div className="flex-1 p-8 md:p-10 text-left flex flex-col justify-center bg-slate-50">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-12 h-1 bg-secondary"></div>
                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">Présentation</p>
                            </div>
                            <h4 className="text-primary text-2xl md:text-3xl font-black italic tracking-tighter leading-none decoration-primary/10 underline underline-offset-4">Véronique Ndwaya Mwela</h4>
                            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-2 mb-6">Journaliste & Communicologue</p>

                            <p className="text-slate-600 text-sm italic mb-8 border-l-4 border-secondary pl-4 py-2">
                                "Parce que chaque enfant mérite de voir son rêve s'envoler comme un ballon vers le ciel."
                            </p>

                            <div className="flex justify-start">
                                <button onClick={() => navigate('/about')} className="bg-primary text-white text-[10px] font-bold px-8 py-3 rounded-sm hover:translate-x-2 transition-transform tracking-widest uppercase cursor-pointer flex items-center gap-2">
                                    Explorer son parcours <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* SECTION FEATURES */}
            <section className="py-24 px-4 bg-white relative z-10 overflow-hidden">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FeatureCard
                        title="Mission & Vision"
                        desc="Notre engagement pour l'avenir du football"
                        btnText="Nos objectifs"
                        btnColor="bg-secondary text-primary"
                        colorClass="bg-[#1b4332]"
                        bgImg="/images/mission-vision.jpg"
                        path="/mission"
                    />
                    <FeatureCard
                        title="La Lecture et Moi"
                        desc="Le pouvoir des livres dans nos vies"
                        btnText="Découvrir"
                        btnColor="bg-secondary text-primary"
                        colorClass="bg-[#660708]"
                        bgImg="/images/lecture.jpg"
                        path="/lecture-et-moi"
                    />
                    <FeatureCard
                        title="Donation"
                        desc="Soutenez notre projet"
                        btnText="Faire un don"
                        btnColor="bg-[#8b0000] text-white"
                        colorClass="bg-[#8a5a44]"
                        bgImg="/images/donation.jpg"
                        path="/donation"
                    />
                    <FeatureCard
                        title="Partenariat"
                        desc="Devenez notre partenaire"
                        btnText="Collaborer avec nous"
                        btnColor="bg-[#8b0000] text-white"
                        colorClass="bg-[#3c2f2f]"
                        bgImg="/images/partenariat.jpg"
                        path="/partenariat"
                    />
                </div>
            </section>

            {/* MARQUEE SECTION (DEFILEMENT) */}
            <div className="bg-primary py-8 overflow-hidden border-y-4 border-secondary/30 relative">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap gap-20 items-center justify-start"
                >
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex gap-20 items-center">
                            <span className="text-white text-4xl md:text-6xl font-black italic tracking-tighter uppercase opacity-40">JEUNES</span>
                            <i className="fas fa-futbol text-secondary text-3xl opacity-60"></i>
                            <span className="text-white text-4xl md:text-6xl font-black italic tracking-tighter uppercase opacity-40">BALLON</span>
                            <i className="fas fa-futbol text-secondary text-3xl opacity-60"></i>
                            <span className="text-white text-4xl md:text-6xl font-black italic tracking-tighter uppercase opacity-40">RÊVES</span>
                            <i className="fas fa-futbol text-secondary text-3xl opacity-60"></i>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* SECTION MÉDIAS */}
            <section className="py-24 px-4 bg-[#f1f3f6] relative overflow-hidden">
                <div className="absolute -bottom-20 -right-20 opacity-5 rotate-45">
                    <i className="fas fa-futbol text-[250px] text-primary"></i>
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-30px", amount: 0.3 }}
                        className="text-primary text-3xl font-black italic tracking-tighter mb-16 uppercase"
                    >
                        DANS LES MÉDIAS
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Émissions', img: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80' },
                            { name: 'Interviews', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80' },
                            { name: 'Actualités', img: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80' }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05, duration: 0.3 }}
                                viewport={{ once: true, margin: "-30px", amount: 0.3 }}
                                onClick={() => navigate('/medias')}
                                className="bg-white rounded-sm overflow-hidden shadow-xl border-b-8 border-primary group block cursor-pointer"
                            >
                                <div className="h-44 relative overflow-hidden">
                                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" alt={item.name} />
                                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors duration-300" />
                                </div>
                                <div className="bg-[#003366] py-4 text-white text-[12px] font-bold tracking-widest italic flex flex-col group-hover:bg-secondary group-hover:text-primary transition-colors duration-300">
                                    <span>{item.name}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </Layout>
    );
};

export default Home;
