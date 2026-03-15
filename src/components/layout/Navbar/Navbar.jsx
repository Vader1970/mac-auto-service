import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import styles from './Navbar.module.css';
import logoImg from '../../../assets/images/logo-mac-auto-services.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
    const navbarRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const lastScrollY = useRef(0);
    const isMenuOpenRef = useRef(isMenuOpen);
    const location = useLocation();

    useEffect(() => {
        isMenuOpenRef.current = isMenuOpen;
    }, [isMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Scroll direction logic
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                // Scrolling down - hide navbar
                gsap.to(navbarRef.current, { yPercent: -100, duration: 0.3 });
            } else {
                // Scrolling up or at the top - show navbar
                if (currentScrollY > 50) {
                    gsap.to(navbarRef.current, { yPercent: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', padding: '20px 0', duration: 0.3 });
                } else {
                    gsap.to(navbarRef.current, { yPercent: 0, boxShadow: '0 0px 0px rgba(0,0,0,0)', padding: '20px 0', duration: 0.3 });
                }
            }

            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        const nextState = !isMenuOpen;
        setIsMenuOpen(nextState);

        if (nextState) {
            gsap.to(mobileMenuRef.current, {
                top: '100%',
                opacity: 1,
                visibility: 'visible',
                duration: 0.5,
                ease: 'power3.out'
            });
        } else {
            gsap.to(mobileMenuRef.current, {
                top: '-100vh',
                opacity: 0,
                visibility: 'hidden',
                duration: 0.5,
                ease: 'power3.in'
            });
        }
    };

    useEffect(() => {
        if (!isMenuOpenRef.current) return;
        gsap.to(mobileMenuRef.current, {
            top: '-100vh',
            opacity: 0,
            visibility: 'hidden',
            duration: 0.5,
            ease: 'power3.in',
            onComplete: () => {
                setIsMenuOpen(false);
                setIsMobileServicesOpen(false);
            }
        });
    }, [location]);

    return (
        <header className={styles.header} ref={navbarRef}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/">
                        <img src={logoImg} alt="Mac Auto Services Logo" className={styles.logoImage} />
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className={styles.navDesktop}>
                    <ul className={styles.menu}>
                        <li className={styles.dropdownContainer}>
                            <Link to="/services">Services</Link>
                            <div className={styles.dropdownMenu}>
                                <Link to="/services/wof">WOF</Link>
                                <Link to="/services/repairs">Repairs</Link>
                                <Link to="/services/servicing">Servicing</Link>
                            </div>
                        </li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </nav>
                <div className={styles.ctaDesktop}>
                    <Link to="/services/wof" className="btn">Book Your WOF Here</Link>
                </div>

                {/* Hamburger Icon */}
                <div className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''} `} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={styles.mobileMenu} ref={mobileMenuRef}>
                <ul className={styles.mobileMenuList}>
                    <li><Link to="/">Home</Link></li>
                    <li className={styles.mobileDropdownContainer}>
                        <div 
                            className={styles.mobileDropdownToggle} 
                            onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                        >
                            <span>Services</span>
                            <span className={`${styles.mobileDropdownArrow} ${isMobileServicesOpen ? styles.open : ''}`}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </span>
                        </div>
                        <div className={`${styles.mobileSubItemsWrapper} ${isMobileServicesOpen ? styles.open : ''}`}>
                            <ul className={styles.mobileSubItemsList}>
                                <li><Link to="/services/wof">WOF</Link></li>
                                <li><Link to="/services/repairs">Repairs</Link></li>
                                <li><Link to="/services/servicing">Servicing</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li className={styles.mobileCta}>
                        <Link to="/services/wof" className="btn">Book Your WOF</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
