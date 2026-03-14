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

    const hasDescription = description !== undefined && description !== null && description !== '';
    const hasCta = ctaText !== undefined && ctaText !== null && ctaText !== '';

    const content = {
        title: title ?? defaultContent.title,
        description: hasDescription ? description : defaultContent.description,
        ctaText: hasCta ? ctaText : defaultContent.ctaText,
        ctaLink: ctaLink ?? defaultContent.ctaLink,
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.fromTo(titleRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
            );
            if (hasDescription && textRef.current) {
                tl.fromTo(textRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                    "-=0.6"
                );
            }
            if (hasCta && btnRef.current) {
                tl.fromTo(btnRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
                    "-=0.5"
                );
            }
        }, heroRef);

        return () => ctx.revert();
    }, [hasDescription, hasCta]);

    const handleMouseEnter = () => {
        gsap.to(btnRef.current, { y: -2, scale: 1.02, duration: 0.2, ease: 'power1.inOut' });
    };

    const handleMouseLeave = () => {
        gsap.to(btnRef.current, { y: 0, scale: 1, duration: 0.2, ease: 'power1.inOut' });
    };

    const titleOnly = !hasDescription && !hasCta;

    return (
        <section className={`${styles.hero} ${titleOnly ? styles.titleOnly : ''}`} ref={heroRef}>
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
                    {hasDescription && (
                        <p className={styles.description} ref={textRef}>
                            {content.description}
                        </p>
                    )}
                    {hasCta && (
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
                    )}
                </div>
            </div>
        </section>
    );
};

export default Hero;
