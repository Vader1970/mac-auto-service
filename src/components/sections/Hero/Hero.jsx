import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef(null);
    const title1Ref = useRef(null);
    const title2Ref = useRef(null);
    const textRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animations should play immediately on load
            const tl = gsap.timeline();

            // Content reveal sequence
            tl.fromTo([title1Ref.current, title2Ref.current],
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
                "-=0.5"
            )
                .fromTo(textRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                    "-=0.6"
                )
                .fromTo(btnRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
                    "-=0.5"
                );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = () => {
        gsap.to(btnRef.current, { y: -2, scale: 1.02, duration: 0.2, ease: 'power1.inOut' });
    };

    const handleMouseLeave = () => {
        gsap.to(btnRef.current, { y: 0, scale: 1, duration: 0.2, ease: 'power1.inOut' });
    };

    return (
        <section className={styles.hero} ref={heroRef}>
            <div className={styles.background}>
                <div className={styles.overlay}></div>
            </div>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        <span ref={title1Ref} className={styles.titleLine}>Warrant of Fitness & Car Repairs in Christchurch</span>
                    </h1>
                    <p className={styles.description} ref={textRef}>
                        From Warrant of Fitness inspections and brake repairs to full engine rebuilds, we look after cars, motorbikes, trailers, and light trucks with straightforward advice and dependable service.
                    </p>
                    <div ref={btnRef} className={styles.btnWrapper}>
                        <Link
                            to="/services"
                            className={`btn ${styles.ctaBtn}`}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            View Our Services
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
