import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Services.module.css';

import wofImg from '../../../assets/images/mac-wof.jpg';
import repairsImg from '../../../assets/images/mac-repairs.jpg';
import servicingImg from '../../../assets/images/mac-servicing.jpg';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
    {
        title: 'WOF',
        image: wofImg,
        link: '/services/mac-wof'
    },
    {
        title: 'Repairs',
        image: repairsImg,
        link: '/services/mac-repairs'
    },
    {
        title: 'Servicing',
        image: servicingImg,
        link: '/services/mac-servicing'
    }
];

const Services = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const textRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header and Text fade up
            gsap.fromTo([headerRef.current, textRef.current],
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

            // Cards staggered reveal
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
                    Our <span className={styles.highlight}>Services</span>
                </h2>

                <div className={styles.introText} ref={textRef}>
                    <p>
                        Our experienced mechanics have over 30 years experience providing a comprehensive range of automotive maintenance and repair services. We aim to provide top quality customer service and workmanship for all our clients throughout the Christchurch and wider Canterbury region.
                    </p>
                    <p>
                        From motorbikes and trailers to cars, utes, vans and light trucks, our workshop can cater to a wide variety of repairs and general maintenance needs. If you simply need of WOF, oil change, new tyres, a wheel alignment or a full engine rebuild, we've got you covered.
                    </p>
                    <p>
                        Come in and talk to our friendly team, we'll assess your vehicle and get you back up and running and on the road.
                    </p>
                </div>

                <div className={styles.cardsGrid}>
                    {servicesData.map((service, index) => (
                        <Link
                            to={service.link}
                            key={index}
                            className={styles.card}
                            ref={el => cardsRef.current[index] = el}
                        >
                            <div className={styles.cardImageWrapper}>
                                <img src={service.image} alt={service.title} className={styles.cardImage} />
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
