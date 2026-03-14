import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WOFInspections.module.css';

import wofInspectionsImg from '../../../assets/images/mac-wof.jpg';

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
                        A Warrant of Fitness (WOF) is a legally required safety inspection that ensures your vehicle meets New Zealand road safety standards. Vehicles registered before 1 January 2000 need a WOF every six months; those registered after need one every twelve months. Keeping your WOF up to date is essential for your safety and legal compliance.
                    </p>

                    <p className={styles.description}>
                        Our qualified inspectors carry out thorough checks in line with NZTA guidelines. We examine brakes, tyres, steering, suspension, lights, seatbelts, and structural integrity, among other safety components. You'll receive clear communication about the condition of your vehicle and any work required.
                    </p>

                    <p className={styles.description}>
                        If repairs are needed to pass your WOF, our experienced mechanics can complete most work on-site quickly and efficiently. We'll then recheck your vehicle and issue your WOF without delay once it meets the standard.
                    </p>

                    <p className={styles.description}>
                        For specialist repairs such as windscreen replacement or panel work, we can recommend trusted local providers and coordinate the process so your vehicle is compliant and back on the road as smoothly as possible.
                    </p>

                    <Link to="/contact" className={styles.bookButton}>Book Your WOF Today</Link>
                </div>

                <div className={styles.imageContent} ref={imageRef}>
                    <div className={styles.imageWrapper}>
                        <img src={wofInspectionsImg} alt="WOF inspection - mechanic with clipboard" className={styles.image} />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default WOFInspections;
