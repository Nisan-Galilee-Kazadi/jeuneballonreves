import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FloatingBalloons = () => {
    // Generate random balloons - Reduced count for performance
    const balloons = useMemo(() => Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100, // Random horizontal position
        scale: 0.5 + Math.random() * 0.8, // Random size
        duration: 25 + Math.random() * 15, // Slower speed
        delay: Math.random() * 5, // Random start delay
        color: i % 3 === 0 ? 'text-primary' : i % 3 === 1 ? 'text-secondary' : 'text-red-700' // Alternating colors
    })), []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {balloons.map((balloon) => (
                <motion.div
                    key={balloon.id}
                    className={`absolute bottom-[-100px] ${balloon.color} opacity-[0.03] will-change-transform`}
                    style={{ left: `${balloon.left}%` }}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{
                        y: -1200, // Float up off screen
                        opacity: [0, 0.05, 0], // Fade in then out
                        rotate: 180 // Reduced rotation
                    }}
                    transition={{
                        duration: balloon.duration,
                        repeat: Infinity,
                        delay: balloon.delay,
                        ease: "linear"
                    }}
                >
                    <i className="fas fa-futbol" style={{ fontSize: `${balloon.scale * 3}rem` }}></i>
                </motion.div>
            ))}
        </div>
    );
};

export default React.memo(FloatingBalloons);
