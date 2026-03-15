import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ServicingParallax.module.css';

import bgImg from '../../../assets/images/shaking-hands-trust.webp';

gsap.registerPlugin(ScrollTrigger);

const ServicingParallax = () => {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(bgRef.current,
                { yPercent: -12 },
                {
                    yPercent: 12,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );

            gsap.fromTo(contentRef.current.children,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.bgContainer}>
                <img src={bgImg} alt="Trust and reliability" className={styles.bgImage} ref={bgRef} />
                <div className={styles.overlay}></div>
            </div>

            <div className={styles.container} ref={contentRef}>
                <h2 className={styles.title}>Trusted Servicing. Peace of Mind.</h2>
                <div className={styles.textContainer}>
                    <p className={styles.subtitle}>Protect your investment and ensure your family's safety with regular, professional servicing.</p>
                    <p className={styles.subtitle}>Experience honest pricing, expert advice, and mechanics who truly care about your vehicle.</p>
                </div>
                <Link to="/contact" className={styles.ctaButton}>Book Your Service Now</Link>
            </div>
        </section>
    );
};

export default ServicingParallax;
