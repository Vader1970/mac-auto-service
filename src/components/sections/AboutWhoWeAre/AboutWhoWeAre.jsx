import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AboutWhoWeAre.module.css';
import shopFrontImg from '../../../assets/images/shop-front.webp';

gsap.registerPlugin(ScrollTrigger);

const AboutWhoWeAre = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            gsap.fromTo(imageRef.current,
                { x: -50, opacity: 0 },
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
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.container}>

                <div className={styles.contentWrapper}>
                    <div className={styles.imageContent} ref={imageRef}>
                        <div className={styles.imageWrapper}>
                            <img src={shopFrontImg} alt="Street view of the Mac Auto Services workshop entrance in Bromley, Christchurch" className={styles.image} />
                        </div>
                        <p className={styles.caption}>*Established in 2018*</p>
                    </div>

                    <div className={styles.textContent} ref={textRef}>
                        <h2 className={styles.title}>Who are we?</h2>
                        <p className={styles.description}>
                            Mac Auto Services stands as a local automotive service provider catering to the needs of our community in Christchurch. With an impressive 30 years in the industry, Mac Auto Services has undergone a remarkable journey since its inception, we've transformed into a hub for automotive care. Our facility is equipped with state-of-the-art machinery, ensuring efficient and reliable automotive solutions.
                        </p>
                        <p className={styles.description}>
                            What sets us apart is our commitment to fostering genuine, enduring relationships with our customers. We prioritize open communication and transparent discussions, ensuring our clients are heard and understood. Our team, comprising qualified and approachable technicians, are dedicated to providing clear explanations in layman's terms.
                        </p>
                        <p className={styles.description}>
                            Before proceeding with any repairs, your approval is our priority. We guarantee the quality of our workmanship. Operating in adherence to manufacturers' specifications, we service a wide range of vehicles, enabling us to conduct warranty servicing.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutWhoWeAre;
