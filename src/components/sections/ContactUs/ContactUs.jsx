import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ContactUs.module.css';

import chrisImg from '../../../assets/images/chris.png';

gsap.registerPlugin(ScrollTrigger);

const ContactUs = () => {
    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const cardRef = useRef(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitResult("");

        const form = e.target;
        const formData = new FormData(form);

        // Required Web3Forms access key
        formData.append("access_key", "d23735c1-c2d7-4aab-ba8a-80d923e4a30e");

        // Optional: Subject line for the email
        formData.append("subject", "New Booking Enquiry from Mac Auto Services Website");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setSubmitResult("Success! Your message has been sent.");
                form.reset(); // Clear the form
            } else {
                console.error("Error from Web3Forms:", data);
                setSubmitResult(data.message || "Failed to submit. Please try again.");
            }
        } catch (error) {
            console.error("Submission Error:", error);
            setSubmitResult("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
        <section className={styles.contactSection} ref={sectionRef}>
            <div className={styles.container}>

                {/* Left Side: Form */}
                <div className={styles.formContainer} ref={formRef}>
                    <h2 className={styles.title}>Book Your Vehicle In Today</h2>
                    <p className={styles.description}>
                        Come in and have a chat to the friendly team at Mac Auto Services. Regardless of whether you just need an oil top up a tyre change, or just simply need to ask us a question we can help.
                    </p>

                    <form className={styles.contactForm} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="firstName">First Name <span className={styles.required}>*</span></label>
                            <input type="text" id="firstName" name="First Name" className={styles.input} required />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="lastName">Last Name <span className={styles.required}>*</span></label>
                            <input type="text" id="lastName" name="Last Name" className={styles.input} required />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="email">Email Address <span className={styles.required}>*</span></label>
                            <input type="email" id="email" name="email" className={styles.input} required />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="Phone Number" className={styles.input} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="service">Select the service you want to book <span className={styles.required}>*</span></label>
                            <select id="service" name="Requested Service" className={styles.select} required defaultValue="">
                                <option value="" disabled>Select your service</option>
                                <option value="Warrant of Fitness (WOF)">Warrant of Fitness (WOF)</option>
                                <option value="Vehicle Servicing">Vehicle Servicing</option>
                                <option value="Mechanical Repairs">Mechanical Repairs</option>
                                <option value="Other">Other / Enquiry</option>
                            </select>
                        </div>

                        <div className={styles.inputGroup}>
                            <div className={styles.labelRow}>
                                <label className={styles.label} htmlFor="message">Message</label>
                                <span className={styles.charCount}>0 / 180</span>
                            </div>
                            <textarea id="message" name="message" className={styles.textarea} maxLength={180}></textarea>
                        </div>

                        {/* Honeypot field to prevent spam */}
                        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Sending..." : "Submit"}
                        </button>

                        {submitResult && (
                            <p className={submitResult.includes("Success") ? styles.successMessage : styles.errorMessage}>
                                {submitResult}
                            </p>
                        )}
                    </form>
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
        </section>
    );
};

export default ContactUs;
