import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CTA.module.css';

import bgImg from '../../../assets/images/inside-workshop-crop.jpg';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax effect on the background image
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
        <section className={styles.ctaSection} ref={sectionRef}>
            <div className={styles.bgContainer}>
                <img src={bgImg} alt="Workshop Background" className={styles.bgImage} ref={bgRef} />
                <div className={styles.overlay}></div>
            </div>

            <div className={styles.container} ref={contentRef}>
                <h2 className={styles.title}>Need a WOF or Service?</h2>
                <div className={styles.textContainer}>
                    <p className={styles.subtitle}>Fast booking. Clear pricing. Trusted technicians.</p>
                    <p className={styles.subtitle}>Get back on the road safely without the hassle.</p>
                </div>
                <button className={styles.ctaButton}>Book online now</button>
            </div>
        </section>
    );
};

export default CTA;
