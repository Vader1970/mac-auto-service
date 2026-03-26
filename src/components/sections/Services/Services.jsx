import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Services.module.css';

import wofSrcset from '../../../assets/images/mac-wof.jpg?w=640;960;1280&format=webp&quality=80&as=srcset';
import wofImg from '../../../assets/images/mac-wof.jpg?w=960&format=webp&quality=80';
import repairsSrcset from '../../../assets/images/mac-repairs.jpg?w=640;960;1280&format=webp&quality=80&as=srcset';
import repairsImg from '../../../assets/images/mac-repairs.jpg?w=960&format=webp&quality=80';
import servicingSrcset from '../../../assets/images/mac-servicing.jpg?w=640;960;1280&format=webp&quality=80&as=srcset';
import servicingImg from '../../../assets/images/mac-servicing.jpg?w=960&format=webp&quality=80';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
    {
        title: 'WOF',
        imageAlt: 'Mechanic carrying out a Warrant of Fitness inspection at Mac Auto Services',
        imageSrc: wofImg,
        imageSrcset: wofSrcset,
        link: '/services/wof',
        width: 1024,
        height: 764,
    },
    {
        title: 'Repairs',
        imageAlt: 'Vehicle repair work in the Mac Auto Services workshop',
        imageSrc: repairsImg,
        imageSrcset: repairsSrcset,
        link: '/services/repairs',
        width: 787,
        height: 838,
    },
    {
        title: 'Servicing',
        imageAlt: 'Vehicle being serviced at Mac Auto Services',
        imageSrc: servicingImg,
        imageSrcset: servicingSrcset,
        link: '/services/servicing',
        width: 785,
        height: 837,
    }
];

const defaultIntro = (
    <>
        <p>
            Our experienced mechanics have over 30 years experience providing a comprehensive range of automotive maintenance and repair services. We aim to provide top quality customer service and workmanship for all our clients throughout the Christchurch and wider Canterbury region.
        </p>
        <p>
            From motorhomes and trailers to cars, utes, vans and light trucks, our workshop can cater to a wide variety of repairs and general maintenance needs. If you simply need of WOF, oil change, new tyres, or a full engine rebuild, we've got you covered.
        </p>
        <p>
            Come in and talk to our friendly team, we'll assess your vehicle and get you back up and running and on the road.
        </p>
    </>
);

const Services = ({
    title = 'Our Services',
    highlightWord = 'Services',
    subheading,
    introContent = defaultIntro,
    services = servicesData
}) => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const subheadingRef = useRef(null);
    const textRef = useRef(null);
    const cardsRef = useRef([]);

    const parts = highlightWord && title.includes(highlightWord) ? title.split(highlightWord) : [title];
    const titleContent = parts.length > 1
        ? parts.flatMap((part, i) => i < parts.length - 1 ? [part, <span key={i} className={styles.highlight}>{highlightWord}</span>] : [part])
        : title;

    useEffect(() => {
        const ctx = gsap.context(() => {
            const headerElements = [headerRef.current, subheadingRef.current, textRef.current].filter(Boolean);
            gsap.fromTo(headerElements,
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

            gsap.fromTo(cardsRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.servicesSection} ref={sectionRef}>
            <div className={styles.container}>

                <h2 className={styles.sectionTitle} ref={headerRef}>
                    {titleContent}
                </h2>

                {subheading && (
                    <p className={styles.subheading} ref={subheadingRef}>
                        {subheading}
                    </p>
                )}

                <div className={styles.introText} ref={textRef}>
                    {introContent}
                </div>

                <div className={styles.cardsGrid}>
                    {services.map((service, index) => (
                        <Link
                            to={service.link}
                            key={service.title}
                            className={styles.card}
                            ref={el => cardsRef.current[index] = el}
                        >
                            <div className={styles.cardImageWrapper}>
                                <img
                                    src={service.imageSrc}
                                    srcSet={service.imageSrcset}
                                    sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
                                    alt={service.imageAlt ?? `Mac Auto Services — ${service.title}`}
                                    className={styles.cardImage}
                                    loading="lazy"
                                    decoding="async"
                                    width={service.width ?? 800}
                                    height={service.height ?? 600}
                                />
                                <div className={styles.overlay}></div>
                            </div>

                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{service.title}</h3>
                                <div className={styles.cardFooter}>
                                    <span className={styles.readMore}>Read more</span>
                                    <div className={styles.arrowIcon}>
                                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible' }}>
                                            <line className={styles.arrowLine} x1="-2.5" y1="12" x2="15.5" y2="12"></line>
                                            <polyline points="8.5 5 15.5 12 8.5 19"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.bottomBorder}></div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Services;
