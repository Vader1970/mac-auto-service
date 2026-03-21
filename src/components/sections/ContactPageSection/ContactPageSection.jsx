import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ContactPageSection.module.css';
import chrisImg from '../../../assets/images/chris.png';
import ContactForm from '../../ContactForm/ContactForm';

gsap.registerPlugin(ScrollTrigger);

const ContactPageSection = () => {
    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(formRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
            );

            gsap.fromTo(cardRef.current,
                { x: 40, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="booking-form" className={styles.contactSection} ref={sectionRef}>
            <div className={styles.container}>

                {/* Left Side: Form and Map */}
                <div className={styles.formContainer} ref={formRef}>
                    <h2 className={styles.title}>Book Your Vehicle In Today</h2>
                    <p className={styles.description}>
                        Come in and have a chat to the friendly team at Mac Auto Services. Regardless of whether you just need an oil top up a tyre change, or just simply need to ask us a question we can help.
                    </p>

                    <div className={styles.formWrapper}>
                        <ContactForm />
                    </div>
                </div>

                {/* Right Side: Contact Card */}
                <div className={styles.cardContainer} ref={cardRef}>
                    <img src={chrisImg} alt="Chris from Mac Auto Services" className={styles.cardImage} />

                    <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>Get In Touch</h3>
                        <div className={styles.yellowDivider}></div>
                        <p className={styles.cardText}>
                            Ready to book your vehicle in or need some advice first? Get in touch with the team at Mac Auto Services and we'll help you organise a time that works for you.
                        </p>

                        <h3 className={styles.cardTitle}>Contact Us</h3>
                        <div className={styles.yellowDivider}></div>
                        <p className={styles.contactInfo}>(03) 925 9349</p>
                        <p className={styles.cardText}>mac.autoservices@hotmail.com</p>

                        <h3 className={styles.cardTitle}>Address</h3>
                        <div className={styles.yellowDivider}></div>
                        <p className={styles.contactInfo}>Unit 1&2/56 Wickham Street,</p>
                        <p className={styles.contactInfo}>Christchurch 8062,</p>
                        <p className={styles.contactInfo}>Bromley</p>
                    </div>
                </div>

            </div>

            {/* Map Section */}
            <div className={styles.mapSection}>
                <div className={styles.mapContainer}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2892.4842100868735!2d172.6841753154942!3d-43.53383087912444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d318bdff6c9a3a9%3A0x6b1db94c25f4a7c0!2s56%20Wickham%20Street%2C%20Bromley%2C%20Christchurch%208062%2C%20New%20Zealand!5e0!3m2!1sen!2snz!4v1715830000000!5m2!1sen!2snz"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mac Auto Services Location"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default ContactPageSection;
