import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ServicesThatKeepYouMoving.module.css';

import bgImg from '../../../assets/images/wof-parallax.jpg';

gsap.registerPlugin(ScrollTrigger);

const ServicesThatKeepYouMoving = () => {
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
                <img src={bgImg} alt="Vehicle and road" className={styles.bgImage} ref={bgRef} />
                <div className={styles.overlay}></div>
            </div>

            <div className={styles.container} ref={contentRef}>
                <h2 className={styles.title}>Services That Keep You Moving</h2>
                <div className={styles.textContainer}>
                    <p className={styles.subtitle}>Don't wait until its too late.</p>
                    <p className={styles.subtitle}>Book Your WOF with a trusted Christchurch mechanic.</p>
                </div>
                <Link to="/contact" className={styles.ctaButton}>Book Your WOF Today</Link>
            </div>
        </section>
    );
};

export default ServicesThatKeepYouMoving;
