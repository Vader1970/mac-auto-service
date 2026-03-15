import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './RepairsCTA.module.css';

import bgImg from '../../../assets/images/engine-repair.webp';

gsap.registerPlugin(ScrollTrigger);

const RepairsCTA = () => {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(bgRef.current,
                { yPercent: -20 },
                {
                    yPercent: 20,
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
                <img src={bgImg} alt="Engine repair" className={styles.bgImage} ref={bgRef} />
                <div className={styles.overlay}></div>
            </div>

            <div className={styles.container} ref={contentRef}>
                <h2 className={styles.title}>Quality Repairs. Trusted Mechanics.</h2>
                <div className={styles.textContainer}>
                    <p className={styles.subtitle}>From brakes and diagnostics to engine and transmission work, we've got you covered.</p>
                    <p className={styles.subtitle}>Get a clear quote and book your repair with a Christchurch mechanic you can trust.</p>
                </div>
                <Link to="/contact" className={styles.ctaButton}>Get in Touch</Link>
            </div>
        </section>
    );
};

export default RepairsCTA;
