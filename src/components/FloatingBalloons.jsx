import React from 'react';
import { motion } from 'framer-motion';

const FloatingBalloons = () => {
    // Generate random balloons
    const balloons = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100, // Random horizontal position
        scale: 0.5 + Math.random() * 1, // Random size
        duration: 15 + Math.random() * 20, // Random speed
        delay: Math.random() * 10, // Random start delay
        color: i % 3 === 0 ? 'text-primary' : i % 3 === 1 ? 'text-secondary' : 'text-red-700' // Alternating colors
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {balloons.map((balloon) => (
                <motion.div
                    key={balloon.id}
                    className={`absolute bottom-[-100px] ${balloon.color} opacity-[0.05]`}
                    style={{ left: `${balloon.left}%` }}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{
                        y: -1200, // Float up off screen
                        opacity: [0, 0.08, 0], // Fade in then out
                        x: [0, Math.random() * 100 - 50, 0], // Slight horizontal drift
                        rotate: [0, 360]
                    }}
                    transition={{
                        duration: balloon.duration,
                        repeat: Infinity,
                        delay: balloon.delay,
                        ease: "linear"
                    }}
                >
                    <i className="fas fa-futbol" style={{ fontSize: `${balloon.scale * 4}rem` }}></i>
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingBalloons;
