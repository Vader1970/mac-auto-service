import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WOFInspections.module.css';

import wofInspectionsSrcset from '../../../assets/images/mac-wof.jpg?w=640;960;1200&format=webp&quality=80&as=srcset';
import wofInspectionsImg from '../../../assets/images/mac-wof.jpg?w=960&format=webp&quality=80';

gsap.registerPlugin(ScrollTrigger);

const WOFInspections = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
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
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.container}>

                <div className={styles.textContent} ref={textRef}>
                    <h2 className={styles.title}>Warrant of Fitness (WOF) Inspections</h2>

                    <p className={styles.description}>
                    A Warrant of Fitness (WOF) is a legally required safety inspection that ensures your vehicle meets New Zealand road safety standards. Vehicles first registered before 1 January 2000 generally require a WOF every six months, while vehicles registered after that date require inspection every twelve months. Staying up to date with your WOF helps keep you, your passengers, and other road users safe.
                    </p>

                    <p className={styles.description}>
                    Our qualified inspectors carry out thorough WOF inspections in line with NZTA guidelines, checking critical safety components such as brakes, tyres, steering, suspension, lights, seatbelts, and structural integrity. We focus on clear communication, explaining any issues in plain language so you understand exactly what needs attention.
                    </p>

                    <p className={styles.description}>
                    If your vehicle requires repairs to pass its WOF inspection, our experienced mechanics can complete most work onsite quickly and efficiently. Once repairs are completed, we'll recheck the vehicle and issue your Warrant of Fitness without unnecessary delays, helping you get back on the road with confidence.
                    </p>

                    <p className={styles.description}>
                    In cases where specialist repairs are required — such as windscreen replacement or panel work — we can recommend trusted local providers and help coordinate the process to ensure your vehicle meets compliance standards as smoothly as possible.
                    </p>

                    <button 
                        onClick={(e) => { e.preventDefault(); document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' }); }} 
                        className={styles.bookButton}
                    >
                        Book Your WOF Today
                    </button>
                </div>

                <div className={styles.imageContent} ref={imageRef}>
                    <div className={styles.imageWrapper}>
                        <img
                            src={wofInspectionsImg}
                            srcSet={wofInspectionsSrcset}
                            sizes="(max-width: 992px) 100vw, 50vw"
                            alt="Inspector with clipboard during a Warrant of Fitness check at Mac Auto Services"
                            className={styles.image}
                            loading="lazy"
                            decoding="async"
                            width={1024}
                            height={764}
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default WOFInspections;
