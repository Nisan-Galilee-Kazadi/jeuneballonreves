import React from 'react';
import { motion } from 'framer-motion';

const EntryBallon = () => {
    return (
        <motion.div
            initial={{ x: "-20vw", y: "20vh", rotate: 0, opacity: 0, scale: 0.5 }}
            animate={{
                x: "120vw",
                y: "15vh",
                rotate: 1080,
                opacity: [0, 1, 1, 0],
                scale: 1.2
            }}
            transition={{
                duration: 2,
                ease: "linear",
                delay: 0.2
            }}
            className="fixed top-0 left-0 text-secondary text-7xl z-150 pointer-events-none drop-shadow-2xl"
        >
            <i className="fas fa-futbol"></i>
        </motion.div>
    );
};

export default EntryBallon;
