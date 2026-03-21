import React from 'react';
import styles from './ContactForm.module.css';

const ContactForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Functionality will be connected to Resend later
    };

    return (
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

            <button type="submit" className={styles.submitButton}>
                Submit
            </button>
        </form>
    );
};

export default ContactForm;
