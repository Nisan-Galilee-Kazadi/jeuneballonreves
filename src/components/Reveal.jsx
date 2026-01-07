import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const Reveal = ({
    children,
    width = "fit-content",
    delay = 0.25,
    className = "",
    direction = "up" // "up", "right"
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const variants = {
        hidden: direction === "right" ? { opacity: 0, x: 400 } : { opacity: 0, y: 75 },
        visible: direction === "right" ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 },
    };

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: direction === "right" ? "visible" : "hidden" }} className={`p-1 ${className}`}>
            <motion.div
                variants={variants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{
                    duration: direction === "right" ? 1.2 : 0.8,
                    delay: delay,
                    ease: "easeOut"
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};
