import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const isHome = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Accueil', path: '/' },
        { name: 'À propos', path: '/about' },
        { name: 'Mission & Vision', path: '/mission' },
        { name: 'Programme JBR', path: '/programme-jbr' },
        { name: 'La lecture et moi', path: '/lecture-et-moi' },
        { name: 'Partenariat', path: '/partenariat' },
        { name: 'Médias', path: '/medias' },
        { name: 'Contact', path: '/contact' },
    ];

    const menuVariants = {
        closed: {
            x: "100%",
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
                when: "afterChildren",
                duration: 0.6,
                ease: [0.76, 0, 0.24, 1]
            }
        },
        open: {
            x: 0,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.3,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const itemVariants = {
        closed: {
            opacity: 0,
            x: 50,
            transition: { duration: 0.3 }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1]
            }
        }
    };

    const handleLinkClick = (path) => {
        if (isOpen) {
            setIsOpen(false);
            navigate(path);
        } else {
            navigate(path);
        }
    };

    const isSolid = isOpen || isExiting || scrolled;
    const isMobileTransparent = isHome && !isSolid;

    return (
        <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 
            ${isMobileTransparent ? 'bg-transparent shadow-none' : 'bg-primary shadow-xl'} 
            lg:bg-primary lg:shadow-xl
            px-6 py-4 flex justify-between items-center lg:px-16`}>

            <div className="flex items-center gap-3">
                <div onClick={() => handleLinkClick('/')} className="cursor-pointer">
                    <img src="/logo.png" alt="Logo" className="h-10 md:h-12 drop-shadow-md" />
                </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex gap-6 text-white text-[11px] font-bold items-center text-center">
                {links.map((link) => (
                    <button
                        key={link.path}
                        onClick={() => handleLinkClick(link.path)}
                        className={`${pathname === link.path ? 'border-b-2 border-secondary pb-1' : 'hover:text-secondary'} transition-all whitespace-nowrap uppercase cursor-pointer`}
                    >
                        {link.name}
                    </button>
                ))}
                <button
                    onClick={() => handleLinkClick('/donation')}
                    className="bg-secondary text-primary px-5 py-2 rounded-sm font-black text-[10px] uppercase shadow-lg hover:bg-white transition-all ml-4 cursor-pointer"
                >
                    Faire un don
                </button>
            </div>

            {/* Mobile Toggle */}
            <button
                className="lg:hidden text-white text-2xl z-[110]"
                onClick={() => setIsOpen(!isOpen)}
            >
                <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence onExitComplete={() => setIsExiting(false)}>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        onAnimationStart={(definition) => {
                            if (definition === "closed") setIsExiting(true);
                            if (definition === "open") setIsExiting(false);
                        }}
                        className="fixed inset-0 bg-[#002244] flex flex-col justify-center items-center gap-8 lg:hidden z-[105]"
                    >
                        {links.map((link) => (
                            <motion.div key={link.path} variants={itemVariants}>
                                <button
                                    onClick={() => handleLinkClick(link.path)}
                                    className={`text-2xl font-black italic tracking-tighter uppercase cursor-pointer ${pathname === link.path ? 'text-secondary' : 'text-white'}`}
                                >
                                    {link.name}
                                </button>
                            </motion.div>
                        ))}
                        <motion.div variants={itemVariants}>
                            <button
                                onClick={() => handleLinkClick('/donation')}
                                className="bg-secondary text-primary px-10 py-3 rounded-sm font-black uppercase text-sm shadow-xl mt-4 inline-block cursor-pointer"
                            >
                                Faire un don
                            </button>
                        </motion.div>

                        {/* Decoration Ball in Mobile Menu */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-10 opacity-10 pointer-events-none"
                        >
                            <i className="fas fa-futbol text-[150px] text-white"></i>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Footer = () => (
    <footer className="bg-[#002244] text-white py-12 px-6 relative overflow-hidden">
        <div className="absolute -bottom-10 -left-10 opacity-5">
            <i className="fas fa-futbol text-[150px] text-white"></i>
        </div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            <div className="flex gap-6">
                <i className="fab fa-facebook-f text-xl hover:text-secondary cursor-pointer transition-all"></i>
                <i className="fab fa-twitter text-xl hover:text-secondary cursor-pointer transition-all"></i>
                <i className="fab fa-instagram text-xl hover:text-secondary cursor-pointer transition-all"></i>
                <i className="fab fa-youtube text-xl hover:text-secondary cursor-pointer transition-all"></i>
            </div>

            <div className="flex gap-8 text-[11px] font-bold tracking-widest opacity-60">
                <Link to="/contact" className="hover:opacity-100 uppercase">Mentions légales</Link>
                <Link to="/contact" className="hover:opacity-100 uppercase">Politique de confidentialité</Link>
            </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-[10px] font-bold opacity-30 tracking-[0.2em] relative z-10">
            © 2024 Jeunes, Ballon et Rêves. Tous droits réservés.
        </div>
    </footer>
);

const PageLoader = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    const text = "chargement...";

    const letterVariants = {
        initial: { opacity: 0, y: 10 },
        animate: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1
            }
        })
    };

    return (
        <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-primary z-[200] flex items-center justify-center pointer-events-none"
        >
            <div className="flex flex-col items-center relative w-max">
                <div className="relative pt-6">
                    {/* Rolling Football: Left -> Right -> Center */}
                    <motion.div
                        initial={{ x: "-150%", rotate: 0 }}
                        animate={{
                            x: ["-150%", "150%", "0%"],
                            rotate: [0, 1080, 720]
                        }}
                        transition={{
                            duration: 2.5,
                            ease: "easeInOut",
                            delay: 0.2
                        }}
                        className="absolute top-0 left-0 w-full flex justify-center"
                    >
                        <i className="fas fa-futbol text-secondary text-2xl drop-shadow-lg"></i>
                    </motion.div>


                    <div className="flex">
                        {text.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={letterVariants}
                                initial="initial"
                                animate="animate"
                                className="text-white/80 font-medium italic text-lg inline-block"
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="w-full h-[2px] bg-secondary/20 mt-2 origin-left overflow-hidden"
                >
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        className="w-full h-full bg-secondary"
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};


const Layout = ({ children }) => {
    const { pathname } = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
    }, [pathname]);

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden relative">
            <Navbar />

            {/* Page Content */}
            <main className="flex-1 flex flex-col">
                {children}
            </main>

            <Footer />

            {/* Background floating balls global decorations */}
            <div className="fixed inset-0 pointer-events-none -z-10 bg-slate-50">
                <motion.div
                    animate={{ y: [0, 100, 0], x: [0, 50, 0], rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity }}
                    className="absolute top-1/4 -right-10 opacity-[0.03]"
                >
                    <i className="fas fa-futbol text-[300px] text-primary"></i>
                </motion.div>
                <motion.div
                    animate={{ y: [0, -100, 0], x: [0, -50, 0], rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity }}
                    className="absolute bottom-1/4 -left-10 opacity-[0.03]"
                >
                    <i className="fas fa-futbol text-[350px] text-primary"></i>
                </motion.div>
            </div>

            {/* Enhanced Rolling Loader */}
            <AnimatePresence>
                {isLoading && (
                    <PageLoader onComplete={() => setIsLoading(false)} key="loader" />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Layout;
