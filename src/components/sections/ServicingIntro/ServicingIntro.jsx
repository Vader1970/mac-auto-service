import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ServicingIntro.module.css';

import servicingIntroSrcset from '../../../assets/images/chris-working.webp?w=640;960;1200&format=webp&quality=80&as=srcset';
import servicingIntroImg from '../../../assets/images/chris-working.webp?w=960&format=webp&quality=80';

gsap.registerPlugin(ScrollTrigger);

const ServicingIntro = () => {
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
                    <h2 className={styles.title}>Comprehensive Vehicle Servicing</h2>

                    <p className={styles.description}>
                        Regular servicing is the key to maintaining your vehicle's performance, safety, and longevity. At Mac Auto Services, we provide thorough, high-quality servicing tailored to your vehicle's specific make, model, and mileage, ensuring it runs efficiently all year round.
                    </p>

                    <p className={styles.description}>
                        Our servicing covers everything from essential oil and filter changes to comprehensive checks of your brakes, suspension, steering, and fluid levels. By catching minor issues early, we help you avoid unexpected breakdowns and costly major repairs in the future.
                    </p>

                    <p className={styles.description}>
                        Whether you need a basic routine maintenance service or a comprehensive full service, our experienced technicians use the latest diagnostic tools and premium parts to guarantee the best care for your vehicle. We service all makes and models, including Japanese, European, and American vehicles.
                    </p>

                    <p className={styles.description}>
                        Don't wait for a warning light to appear. Keep your car running smoothly and efficiently by scheduling your next service with our trusted Christchurch mechanics.
                    </p>

                    <button 
                        onClick={(e) => { e.preventDefault(); document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' }); }} 
                        className={styles.bookButton}
                    >
                        Book Your Service Today
                    </button>
                </div>

                <div className={styles.imageContent} ref={imageRef}>
                    <div className={styles.imageWrapper}>
                        <img
                            src={servicingIntroImg}
                            srcSet={servicingIntroSrcset}
                            sizes="(max-width: 992px) 100vw, 50vw"
                            alt="Technician performing a full vehicle service at Mac Auto Services"
                            className={styles.image}
                            loading="lazy"
                            decoding="async"
                            width={960}
                            height={640}
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ServicingIntro;
