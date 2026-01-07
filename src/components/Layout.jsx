import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronUp, Facebook, Twitter, Instagram, Youtube, Home, Info, Target, BookOpen, Handshake, Mail, MessageCircle } from 'lucide-react';
import FloatingBalloons from './FloatingBalloons';
import EntryBallon from './EntryBallon';

const MobileSidebar = ({ isOpen, onClose }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const links = [
        { name: 'Accueil', path: '/', icon: <Home size={20} /> },
        { name: 'À propos', path: '/about', icon: <Info size={20} /> },
        { name: 'Mission & Vision', path: '/mission', icon: <Target size={20} /> },
        { name: 'Programme JBR', path: '/programme-jbr', icon: <BookOpen size={20} /> },
        { name: 'La lecture et moi', path: '/lecture-et-moi', icon: <MessageCircle size={20} /> },
        { name: 'Partenariat', path: '/partenariat', icon: <Handshake size={20} /> },
        { name: 'Blog', path: '/blog', icon: <Mail size={20} /> },
        { name: 'Actualités', path: '/actualites', icon: <Mail size={20} /> },
        { name: 'Contact', path: '/contact', icon: <Mail size={20} /> },
    ];

    const handleLinkClick = (path) => {
        navigate(path);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed inset-0 z-[150] flex"
                >
                    {/* Overlay */}
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    
                    {/* Sidebar Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="relative w-80 h-full bg-primary shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src="/logo.png" alt="Logo" className="h-8 brightness-0 invert" />
                                    <span className="text-white font-black italic tracking-tighter text-sm uppercase">Menu</span>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 overflow-y-auto py-4">
                            {links.map((link, idx) => (
                                <motion.button
                                    key={link.path}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                                    onClick={() => handleLinkClick(link.path)}
                                    className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-all hover:bg-white/5 ${
                                        pathname === link.path ? 'bg-white/10 text-white' : 'text-white/80'
                                    }`}
                                >
                                    <div className="flex-shrink-0">
                                        {link.icon}
                                    </div>
                                    <span className="text-sm font-medium">{link.name}</span>
                                    {pathname === link.path && (
                                        <div className="ml-auto w-2 h-2 bg-secondary rounded-full"></div>
                                    )}
                                </motion.button>
                            ))}
                            
                            {/* Donation Button */}
                            <div className="p-6 pt-2">
                                <Link
                                    to="/donation"
                                    onClick={onClose}
                                    className="w-full bg-secondary text-primary px-6 py-3 rounded-xl font-black uppercase text-sm shadow-lg hover:bg-white transition-all text-center block"
                                >
                                    Faire un don
                                </Link>
                            </div>
                        </nav>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const Navbar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mediasOpen, setMediasOpen] = useState(false);
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
        {
            name: 'Médias',
            submenu: [
                { name: 'Blog', path: '/blog' },
                { name: 'Actualités', path: '/actualites' }
            ]
        },
        { name: 'Contact', path: '/contact' },
    ];

    const handleLinkClick = (path) => {
        navigate(path);
        setIsOpen(false);
        setMediasOpen(false);
    };

    const isSolid = isOpen || isExiting || scrolled;
    const isMobileTransparent = isHome && !isSolid;

    return (
        <>
            {/* Mobile Sidebar */}
            <MobileSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
            
            {/* Desktop Navigation */}
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
                    {links.map((link, idx) => (
                        <div key={idx}>
                            {link.submenu ? (
                                <div
                                    className="relative group"
                                    onMouseEnter={() => setMediasOpen(true)}
                                    onMouseLeave={() => setMediasOpen(false)}
                                >
                                    <button className="hover:text-secondary transition-all whitespace-nowrap uppercase cursor-pointer flex items-center gap-1">
                                        {link.name}
                                        <ChevronDown size={8} />
                                    </button>
                                    {mediasOpen && (
                                        <div className="absolute top-full left-0 pt-2 z-50">
                                            <div className="bg-white shadow-2xl rounded-lg overflow-hidden min-w-[180px]">
                                                {link.submenu.map((sublink) => (
                                                    <button
                                                        key={sublink.path}
                                                        onClick={() => {
                                                            handleLinkClick(sublink.path);
                                                            setMediasOpen(false);
                                                        }}
                                                        className={`block w-full text-left px-6 py-3 text-primary hover:bg-secondary hover:text-primary transition-all ${pathname === sublink.path ? 'bg-secondary/20 font-black' : ''}`}
                                                    >
                                                        {sublink.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleLinkClick(link.path)}
                                    className={`${pathname === link.path ? 'border-b-2 border-secondary pb-1' : 'hover:text-secondary'} transition-all whitespace-nowrap uppercase cursor-pointer`}
                                >
                                    {link.name}
                                </button>
                            )}
                        </div>
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
                    className="lg:hidden text-white text-2xl z-[110] p-2 hover:bg-white/10 rounded-lg transition-all"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>
        </>
    );
};

const Footer = () => (
    <footer className="bg-[#002244] text-white py-12 px-6 relative overflow-hidden">
        <div className="absolute -bottom-10 -left-10 opacity-5">
            <div className="w-[150px] h-[150px] bg-secondary/20 rounded-full"></div>
        </div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            <div className="flex gap-6">
                <Facebook className="text-xl hover:text-secondary cursor-pointer transition-all" />
                <Twitter className="text-xl hover:text-secondary cursor-pointer transition-all" />
                <Instagram className="text-xl hover:text-secondary cursor-pointer transition-all" />
                <Youtube className="text-xl hover:text-secondary cursor-pointer transition-all" />
            </div>

            <div className="flex gap-8 text-[11px] font-bold tracking-widest opacity-60">
                <Link to="/contact" className="hover:opacity-100 uppercase">Mentions légales</Link>
                <Link to="/contact" className="hover:opacity-100 uppercase">Politique de confidentialité</Link>
            </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-[10px] font-bold opacity-30 tracking-[0.2em] relative z-10">
            {new Date().getFullYear()} Jeunes, Ballon & Rêves. Tous droits réservés.
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
                        <div className="w-8 h-8 bg-secondary rounded-full drop-shadow-lg"></div>
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
            <FloatingBalloons />


            {/* Enhanced Rolling Loader */}
            <AnimatePresence>
                {isLoading && (
                    <PageLoader onComplete={() => setIsLoading(false)} key="loader" />
                )}
            </AnimatePresence>

            {!isLoading && <EntryBallon key={`balloon-${pathname}`} />}
        </div>
    );
};

export default Layout;
