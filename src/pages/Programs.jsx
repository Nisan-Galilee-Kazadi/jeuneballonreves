import React from 'react';
import Layout from '../components/Layout';

const ProgramDetail = ({ title, subtitle, content, objectives, quote, image }) => (
    <Layout>
        <div className="pt-32 pb-20 px-4 bg-white">
            <div className="max-w-5xl mx-auto space-y-16">
                <header className="text-center space-y-4">
                    <h1 className="text-primary text-5xl md:text-7xl font-black italic tracking-tighter uppercase">{title}</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-sm">{subtitle}</p>
                </header>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8">
                        <div className="prose prose-slate leading-relaxed text-slate-700 text-lg">
                            {content.map((p, i) => <p key={i}>{p}</p>)}
                        </div>

                        <div className="bg-slate-50 p-8 rounded-sm shadow-xl border-t-8 border-secondary">
                            <h3 className="text-primary text-2xl font-black italic tracking-tighter mb-6 uppercase">Objectifs</h3>
                            <ul className="space-y-4">
                                {objectives.map((obj, i) => (
                                    <li key={i} className="flex gap-4">
                                        <i className="fas fa-check text-secondary mt-1"></i>
                                        <span className="font-bold text-slate-700">{obj}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <img src={image} className="rounded-sm shadow-2xl border-b-8 border-primary w-full" alt={title} />
                        {quote && (
                            <div className="bg-primary p-10 text-white shadow-2xl relative overflow-hidden">
                                <i className="fas fa-quote-left absolute top-4 left-4 text-4xl opacity-10"></i>
                                <p className="text-xl font-script italic leading-relaxed text-secondary">{quote}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </Layout>
);

export const JeunesBallonRevesPage = () => (
    <ProgramDetail
        title="Jeunes, Ballon et Rêves"
        subtitle="Plateforme de révélation de talents"
        content={[
            "Le projet Jeunes, Ballon et Rêves est une initiative dédiée à la promotion des jeunes talents souvent méconnus, évoluant dans l’ombre.",
            "L'objectif est de former et révéler les futurs joueurs capables de porter haut les couleurs du Léopard, symbole de l’équipe nationale."
        ]}
        objectives={[
            "Valoriser les talents méconnus",
            "Rendre visibles les jeunes joueurs hors circuits classiques",
            "Offrir des opportunités de reconnaissance",
            "Contribuer à la formation de joueurs de haut niveau"
        ]}
        image="https://images.unsplash.com/photo-1520127877028-19363999e063?auto=format&fit=crop&q=80"
    />
);

export const LectureMoiPage = () => (
    <ProgramDetail
        title="La lecture et moi"
        subtitle="Le goût de la lecture pour tous"
        content={[
            "La lecture et moi est un programme qui met en lumière l’importance de la lecture dans le développement personnel, intellectuel et professionnel.",
            "Ce programme vise à donner le goût de la lecture aux générations actuelles et futures, en présentant la lecture comme un outil de connaissance."
        ]}
        objectives={[
            "Accueillir des jeunes passionnés de lecture",
            "Encourager l’initiation à la lecture",
            "Développer un esprit critique et créatif",
            "Valoriser la lecture comme levier de réussite"
        ]}
        quote="La lecture n'est pas une contrainte, mais une clé. Elle nous construit aujourd'hui et nous maintient demain."
        image="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80"
    />
);
