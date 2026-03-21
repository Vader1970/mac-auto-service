import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CTA.module.css';

import bgImg from '../../../assets/images/inside-workshop-crop.jpg';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
    const sectionRef = useRef(null);
    // const bgRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax effect removed, handled by CSS on section

            // Fade up effect for the textual content inside
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
        <section className={styles.ctaSection} style={{ backgroundImage: `url(${bgImg})` }} ref={sectionRef}>
            <div className={styles.overlay}></div>


            <div className={styles.container} ref={contentRef}>
                <h2 className={styles.title}>Need a WOF or Service?</h2>
                <div className={styles.textContainer}>
                    <p className={styles.subtitle}>Fast booking. Clear pricing. Trusted technicians.</p>
                    <p className={styles.subtitle}>Get back on the road safely without the hassle.</p>
                </div>
                <Link to="/services" className={styles.ctaButton}>View Our Services</Link>
            </div>
        </section>
    );
};

export default CTA;
