import React from 'react';
import Layout from '../components/Layout';
import { Reveal } from '../components/Reveal';
import { AnimatedPageTitle } from '../components/AnimatedPageTitle';

const About = () => (
    <Layout>
        <div className="pt-32 pb-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
                <AnimatedPageTitle title="À propos" />
                <div className="grid md:grid-cols-2 gap-12 items-start mt-12">
                    <Reveal delay={0.3}>
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" className="rounded-lg shadow-2xl w-full" alt="Presenter" />
                    </Reveal>
                    <div className="space-y-6 text-slate-700 leading-relaxed">
                        <Reveal delay={0.4}>
                            <p className="text-xl font-bold text-primary italic">"De nombreux jeunes talents brillent dans l’ombre, sans visibilité ni accompagnement."</p>
                        </Reveal>
                        <Reveal delay={0.5}>
                            <p>
                                Le projet Jeunes, Ballon et Rêves a vu le jour le 1er novembre, animé par la volonté de répondre à un constat clair.
                                Le projet Jeunes, Ballon et Rêves est une initiative dédiée à la promotion des jeunes talents souvent méconnus,
                                évoluant dans l’ombre, avec pour objectif de former et révéler les futurs joueurs capables de porter haut les couleurs du Léopard, symbole de l’équipe nationale.
                            </p>
                        </Reveal>
                        <Reveal delay={0.6}>
                            <p>
                                Face à cette réalité, Jeunes, Ballon et Rêves est né comme une plateforme de révélation, d’expression et de valorisation du talent local.
                            </p>
                        </Reveal>
                        <Reveal delay={0.7} width="100%">
                            <div className="bg-[#f0f4f8] p-6 rounded-lg border-l-8 border-primary shadow-inner">
                                <h4 className="text-primary text-2xl font-black italic tracking-tighter leading-none">Véronique Ndwaya Mwela</h4>
                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Journaliste & Communicologue</p>
                                <p className="mt-4 text-sm font-medium">Spécialiste en communication de crise, engagée dans la valorisation de la jeunesse et du sport.</p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
);

export default About;
