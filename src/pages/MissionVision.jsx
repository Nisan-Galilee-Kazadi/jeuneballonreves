import React from 'react';
import Layout from '../components/Layout';

const MissionVision = () => (
    <Layout>
        <div className="pt-32 pb-20 px-4">
            <div className="max-w-5xl mx-auto space-y-20">
                <section>
                    <h1 className="text-primary text-5xl font-black italic tracking-tighter mb-8 border-b-4 border-secondary inline-block">Mission</h1>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 text-lg text-slate-700 leading-relaxed shadow-lg p-8 bg-white border-l-8 border-[#2D5A27]">
                            <p>
                                Cette émission a pour mission de donner de la visibilité aux jeunes talents qui brillent dans l’ombre,
                                en leur offrant une plateforme d’expression, de reconnaissance et de promotion.
                            </p>
                            <p className="font-bold text-primary italic">
                                L'objectif est de contribuer durablement au développement du football congolais.
                            </p>
                        </div>
                        <img src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80" className="rounded-lg shadow-2xl" alt="Mission" />
                    </div>
                </section>

                <section>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <img src="https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80" className="rounded-lg shadow-2xl order-2 md:order-1" alt="Vision" />
                        <div className="order-1 md:order-2">
                            <h1 className="text-primary text-5xl font-black italic tracking-tighter mb-8 border-b-4 border-secondary inline-block">Vision</h1>
                            <div className="space-y-6 text-lg text-slate-700 leading-relaxed shadow-lg p-8 bg-white border-r-8 border-[#2D5A27]">
                                <p>
                                    Notre vision est d’identifier, accompagner et valoriser de jeunes joueurs prometteurs,
                                    capables à terme d’intégrer l’équipe nationale et de porter loin le Léopard.
                                </p>
                                <p>
                                    Nous participons activement au rayonnement du football congolais, tant sur le plan national qu’international.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </Layout>
);

export default MissionVision;
