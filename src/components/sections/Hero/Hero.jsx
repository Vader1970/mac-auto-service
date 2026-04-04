import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

import heroDefaultSrcset from '../../../assets/images/hero-new.webp?w=750;1400;1920&format=webp&quality=78&as=srcset';
import heroDefaultSrc from '../../../assets/images/hero-new.webp?w=1400&format=webp&quality=78';

gsap.registerPlugin(ScrollTrigger);

const defaultContent = {
    title: 'Warrant of Fitness & Car Repairs in Christchurch',
    description: 'From Warrant of Fitness inspections and brake repairs to full engine rebuilds, we look after cars, motorhomes, trailers, and light trucks with straightforward advice and dependable service.',
    ctaText: 'View Our Services',
    ctaLink: '/services',
};

const Hero = ({
    imageSrc,
    imageSrcSet,
    imageSizes = '100vw',
    title,
    description,
    ctaText,
    ctaLink,
    short: isShort,
    backgroundPositionMobile,
}) => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const btnRef = useRef(null);

    const isDefaultHero = title === undefined;
    const hasDescription = isDefaultHero || (description !== undefined && description !== null && description !== '');
    const hasCta = isDefaultHero || (ctaText !== undefined && ctaText !== null && ctaText !== '');

    const content = {
        title: title ?? defaultContent.title,
        description: description ?? defaultContent.description,
        ctaText: ctaText ?? defaultContent.ctaText,
        ctaLink: ctaLink ?? defaultContent.ctaLink,
    };

    const bgSrc = imageSrc ?? heroDefaultSrc;
    const bgSrcSet = imageSrc ? imageSrcSet : heroDefaultSrcset;

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

    const mobileBgClass = backgroundPositionMobile === 'right' ? styles.bgRightMobile :
        backgroundPositionMobile === 'left' ? styles.bgLeftMobile :
            backgroundPositionMobile === 'center' ? styles.bgCenterMobile : '';

    return (
        <section className={`${styles.hero} ${titleOnly ? styles.titleOnly : ''} ${isShort ? styles.heroShort : ''} ${mobileBgClass}`} ref={heroRef}>
            <div className={styles.media}>
                <img
                    className={styles.heroBgImg}
                    src={bgSrc}
                    srcSet={bgSrcSet}
                    sizes={imageSizes}
                    fetchPriority="high"
                    decoding="async"
                    alt=""
                    aria-hidden="true"
                />
                <div className={styles.overlay}></div>
            </div>
            <div className={styles.container}>
                <div className={styles.content}>
                    {isDefaultHero && (
                        <a
                            href="https://www.google.com/maps/place/Mac+Auto+Services/@-43.5405,172.6895,17z"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.starRating}
                            aria-label="Mac Auto Services rated 4.9 out of 5 stars from 54 Google reviews in Christchurch"
                        >
                            <span className={styles.stars} aria-hidden="true">★★★★★</span>
                            <span className={styles.ratingText}>4.9 / 5 &nbsp;·&nbsp; 54 Google reviews</span>
                        </a>
                    )}
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
