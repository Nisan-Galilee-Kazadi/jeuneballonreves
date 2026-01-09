import React from 'react';
import Layout from '../components/Layout';
import { Reveal } from '../components/Reveal';
import { AnimatedPageTitle } from '../components/AnimatedPageTitle';

const MissionVision = () => (
    <Layout>
        <div className="pt-32 pb-20 px-4">
            <div className="max-w-5xl mx-auto space-y-20">
                <section>
                    <AnimatedPageTitle title="Mission" />
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <Reveal style={{ width: "100%" }} delay={0.3}>
                            <div className="relative overflow-hidden space-y-6 text-lg text-slate-700 leading-relaxed shadow-lg p-8 bg-white border-l-8 border-[#2D5A27]">
                                <img
                                    src="/images/mission-vision.jpg"
                                    className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
                                    alt=""
                                />
                                <div className="relative z-10">
                                    <p>
                                        Cette émission a pour mission de donner de la visibilité aux jeunes talents qui brillent dans l’ombre,
                                        en leur offrant une plateforme d’expression, de reconnaissance et de promotion.
                                    </p>
                                    <p className="font-bold text-primary italic mt-6">
                                        L'objectif est de contribuer durablement au développement du football congolais.
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <img src="/images/mission-vision.jpg" className="rounded-lg shadow-2xl" alt="Mission" />
                        </Reveal>
                    </div>
                </section>

                <section>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <Reveal delay={0.3}>
                            <img src="/images/vision.jpg" className="rounded-lg shadow-2xl order-2 md:order-1" alt="Vision" />
                        </Reveal>
                        <div className="order-1 md:order-2">
                            <AnimatedPageTitle title="Vision" />
                            <Reveal width="100%" delay={0.4}>
                                <div className="relative overflow-hidden space-y-6 text-lg text-slate-700 leading-relaxed shadow-lg p-8 bg-white border-r-8 border-[#2D5A27]">
                                    <img
                                        src="/images/vision.jpg"
                                        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
                                        alt=""
                                    />
                                    <div className="relative z-10">
                                        <p>
                                            Notre vision est d’identifier, accompagner et valoriser de jeunes joueurs prometteurs,
                                            capables à terme d’intégrer l’équipe nationale et de porter loin le Léopard.
                                        </p>
                                        <p className="mt-6">
                                            Nous participons activement au rayonnement du football congolais, tant sur le plan national qu’international.
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </Layout>
);

export default MissionVision;
