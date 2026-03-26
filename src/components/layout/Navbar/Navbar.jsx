import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import styles from './Navbar.module.css';
import logoSrcset from '../../../assets/images/logo-mac-auto-services.png?w=150;300&format=webp&quality=92&as=srcset';
import logoImg from '../../../assets/images/logo-mac-auto-services.png?w=300&format=webp&quality=92';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
    const navbarRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const lastScrollY = useRef(0);
    const navHiddenRef = useRef(false);
    const navElevatedRef = useRef(false);
    const isMenuOpenRef = useRef(isMenuOpen);
    const location = useLocation();

    const hideMobileMenuDom = () => {
        if (mobileMenuRef.current) {
            gsap.set(mobileMenuRef.current, {
                top: '-100vh',
                opacity: 0,
                visibility: 'hidden',
            });
        }
    };

    const closeMobileMenu = () => {
        hideMobileMenuDom();
        setIsMenuOpen(false);
        setIsMobileServicesOpen(false);
    };

    useEffect(() => {
        isMenuOpenRef.current = isMenuOpen;
    }, [isMenuOpen]);

    useEffect(() => {
        let rafId = null;
        const shadowOn = '0 2px 10px rgba(0,0,0,0.1)';
        const shadowOff = '0 0px 0px rgba(0,0,0,0)';

        const handleScroll = () => {
            if (rafId !== null) return;
            rafId = requestAnimationFrame(() => {
                rafId = null;
                const el = navbarRef.current;
                if (!el) return;

                const currentScrollY = window.scrollY;
                const prevY = lastScrollY.current;
                const goingDown = currentScrollY > prevY;
                lastScrollY.current = currentScrollY;

                if (goingDown && currentScrollY > 100) {
                    if (!navHiddenRef.current) {
                        navHiddenRef.current = true;
                        gsap.to(el, { yPercent: -100, duration: 0.3 });
                    }
                } else {
                    const elevated = currentScrollY > 50;
                    if (navHiddenRef.current) {
                        navHiddenRef.current = false;
                        navElevatedRef.current = elevated;
                        gsap.to(el, {
                            yPercent: 0,
                            boxShadow: elevated ? shadowOn : shadowOff,
                            padding: '20px 0',
                            duration: 0.3,
                        });
                    } else if (elevated !== navElevatedRef.current) {
                        navElevatedRef.current = elevated;
                        gsap.to(el, {
                            yPercent: 0,
                            boxShadow: elevated ? shadowOn : shadowOff,
                            padding: '20px 0',
                            duration: 0.3,
                        });
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, []);

    const toggleMenu = () => {
        if (isMenuOpen) {
            /* Instant hide so menu + CTA don’t linger over the page */
            closeMobileMenu();
            return;
        }
        setIsMenuOpen(true);
        gsap.to(mobileMenuRef.current, {
            top: '100%',
            opacity: 1,
            visibility: 'visible',
            duration: 0.5,
            ease: 'power3.out',
        });
    };

    /* Close menu on route change: sync DOM in effect; defer setState so React 19 doesn’t warn about cascading renders */
    useEffect(() => {
        if (!isMenuOpenRef.current) return;
        hideMobileMenuDom();
        queueMicrotask(() => {
            setIsMenuOpen(false);
            setIsMobileServicesOpen(false);
        });
    }, [location.pathname]);

    return (
        <header className={styles.header} ref={navbarRef}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/">
                        <img
                            src={logoImg}
                            srcSet={logoSrcset}
                            sizes="150px"
                            alt="Mac Auto Services — Christchurch mechanic and WOF"
                            className={styles.logoImage}
                            width={150}
                            height={57}
                            decoding="async"
                        />
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
                    <Link to="/contact" className="btn">Book Now</Link>
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
                        <Link to="/contact" className="btn" onClick={closeMobileMenu}>Book Now</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
