import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

const defaultContent = {
    title: 'Warrant of Fitness & Car Repairs in Christchurch',
    description: 'From Warrant of Fitness inspections and brake repairs to full engine rebuilds, we look after cars, motorbikes, trailers, and light trucks with straightforward advice and dependable service.',
    ctaText: 'View Our Services',
    ctaLink: '/services',
};

const Hero = ({ imageSrc, title, description, ctaText, ctaLink }) => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const btnRef = useRef(null);

    const content = {
        title: title ?? defaultContent.title,
        description: description ?? defaultContent.description,
        ctaText: ctaText ?? defaultContent.ctaText,
        ctaLink: ctaLink ?? defaultContent.ctaLink,
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.fromTo(titleRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
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
            <div
                className={styles.background}
                style={imageSrc ? { backgroundImage: `url(${imageSrc})` } : undefined}
            >
                <div className={styles.overlay}></div>
            </div>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        <span ref={titleRef} className={styles.titleLine}>{content.title}</span>
                    </h1>
                    <p className={styles.description} ref={textRef}>
                        {content.description}
                    </p>
                    <div ref={btnRef} className={styles.btnWrapper}>
                        <Link
                            to={content.ctaLink}
                            className={`btn ${styles.ctaBtn}`}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {content.ctaText}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
