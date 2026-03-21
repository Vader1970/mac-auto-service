import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AboutTestimonialParallax.module.css';

import bgImg from '../../../assets/images/happy-customer.webp';
import starImg from '../../../assets/images/gold-Star.png';

gsap.registerPlugin(ScrollTrigger);

const AboutTestimonialParallax = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
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
        <section className={styles.section} style={{ backgroundImage: `url(${bgImg})` }} ref={sectionRef}>
            <div className={styles.overlay}></div>

            <div className={styles.container} ref={contentRef}>
                <div className={styles.card}>
                    <div className={styles.starsWrapper}>
                        {[...Array(5)].map((_, i) => (
                            <img key={i} src={starImg} alt="Gold Star" className={styles.starsIcon} />
                        ))}
                    </div>
                    <p className={styles.reviewText}>
                        Brilliant Place to go to get Maintenance Or Servicing done On your Motor vehicles. Chris Lowe Will See U Right.
                    </p>
                    <p className={styles.authorText}>Harry Robinson</p>
                </div>
            </div>
        </section>
    );
};

export default AboutTestimonialParallax;
