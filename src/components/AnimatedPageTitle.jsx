import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

export const AnimatedPageTitle = ({ title, className = "" }) => {
    return (
        <div className={`relative mb-8 flex items-center ${className}`}>
            <motion.div
                initial={{ x: -100, rotate: -360, opacity: 0 }}
                animate={{ x: 0, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "backOut", delay: 0.2 }} // Ballon arrive
                className="mr-4 md:mr-6 shrink-0"
            >
                <i className="fas fa-futbol text-3xl md:text-5xl text-secondary drop-shadow-xl"></i>
            </motion.div>

            <Reveal direction="right" delay={0.2}> {/* Synchro avec l'arrivée du ballon */}
                <h1 className="text-primary text-4xl md:text-5xl font-black italic tracking-tighter border-b-4 border-secondary inline-block pb-2">
                    {title}
                </h1>
            </Reveal>
        </div>
    );
};
