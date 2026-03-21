import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import styles from './WhyChooseUs.module.css';

import mustangImg from '../../../assets/images/purple-mustang.jpg';

gsap.registerPlugin(ScrollTrigger);

const features = [
    "Experienced Local Mechanics",
    "Straightforward, Fair Pricing",
    "All Makes & Models Welcome",
    "Friendly, Reliable Service"
];

const WhyChooseUs = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text column reveal
            gsap.fromTo(textRef.current.children,
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

            // Image column reveal
            gsap.fromTo(imageRef.current,
                { x: 50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
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
        <section className={styles.whySection} ref={sectionRef}>
            <div className={styles.container}>

                <div className={styles.textContent} ref={textRef}>
                    <h2 className={styles.title}>Why choose Mac Auto Services?</h2>

                    <p className={styles.description}>
                        We've been repairing and servicing vehicles for over 30 years, and we still believe in doing things the right way. Honest advice, fair pricing, and quality work you can rely on — that's what keeps our customers coming back.
                    </p>

                    <ul className={styles.featureList}>
                        {features.map((feature, index) => (
                            <li key={index} className={styles.featureItem}>
                                <svg className={styles.checkIcon} viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <Link to="/services/servicing" className={styles.bookButton}>Book Your Service</Link>
                </div>

                <div className={styles.imageContent} ref={imageRef}>
                    <div className={styles.imageWrapper}>
                        <img src={mustangImg} alt="Purple Mustang" className={styles.image} />
                        <div className={styles.overlay}></div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default WhyChooseUs;
