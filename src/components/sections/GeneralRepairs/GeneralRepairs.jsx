import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './GeneralRepairs.module.css';

import repairsSectionImg from '../../../assets/images/car-trouble.webp';

gsap.registerPlugin(ScrollTrigger);

const GeneralRepairs = () => {
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
                    <h2 className={styles.title}>General Automotive Repairs</h2>

                    <p className={styles.description}>
                        From brake and suspension work to engine diagnostics, we handle a wide range of general automotive repairs. Our team uses up-to-date diagnostic equipment to identify problems accurately and get you back on the road with reliable, safe repairs.
                    </p>

                    <p className={styles.description}>
                        We work on cars, motorbikes, trailers, and light trucks. Whether you need a quick fix or a more involved repair, we provide clear explanations, honest advice, and quality workmanship. Your safety and your vehicle's dependability are our priorities.
                    </p>

                    <p className={styles.description}>
                        If a fault is found during a WOF or service, we can often complete the repair on-site and recheck your vehicle without delay. For larger or specialist jobs, we'll give you a straightforward quote and timeline so you know what to expect.
                    </p>

                    <p className={styles.description}>
                        Contact us to discuss your repair needs or book your vehicle in. We're here to help keep your vehicle running safely and reliably.
                    </p>

                    <button 
                        onClick={(e) => { e.preventDefault(); document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' }); }} 
                        className={styles.bookButton}
                    >
                        Book Your Repairs Today
                    </button>
                </div>

                <div className={styles.imageContent} ref={imageRef}>
                    <div className={styles.imageWrapper}>
                        <img src={repairsSectionImg} alt="Mechanic with vehicle - Mac Auto Services" className={styles.image} />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default GeneralRepairs;
