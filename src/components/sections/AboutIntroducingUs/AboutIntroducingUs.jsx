import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AboutIntroducingUs.module.css';

import chrisImg from '../../../assets/images/about-chris.jpg';
import meganImg from '../../../assets/images/about-megan.jpg';

gsap.registerPlugin(ScrollTrigger);

const AboutIntroducingUs = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current.children,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%"
                    }
                }
            );

            gsap.fromTo(cardsRef.current.children,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.header} ref={headerRef}>
                    <h2 className={styles.title}>Introducing us</h2>
                    <p className={styles.description}>
                        We're a small family owned and operated business. Here's a little bit about us.
                    </p>
                </div>

                <div className={styles.cardsContainer} ref={cardsRef}>
                    {/* Chris Card */}
                    <div className={styles.card}>
                        <img src={chrisImg} alt="Portrait of Chris Low, owner and head mechanic" className={styles.cardImage} width="400" height="400" loading="lazy" decoding="async" />
                        <h3 className={styles.cardName}>Chris Low</h3>
                        <p className={styles.cardRole}>Owner/Mechanic</p>
                        <p className={styles.cardText}>
                            Chris is our head and main automotive technician, with 30 years of mechanical experience, you can rest assured of quality and expertise.
                        </p>
                    </div>

                    {/* Megan Card */}
                    <div className={styles.card}>
                        <img src={meganImg} alt="Portrait of Megan Low, owner and administrator" className={styles.cardImage} width="400" height="400" loading="lazy" decoding="async" />
                        <h3 className={styles.cardName}>Megan Low</h3>
                        <p className={styles.cardRole}>Owner/Administrator</p>
                        <p className={styles.cardText}>
                            Megan is our friendly Administrator that keeps the wheels churning. If you have any enquiries about your account or need to make a booking, look no further.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutIntroducingUs;
