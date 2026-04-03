//Contact

import React, { useState } from 'react';
import styles from './ContactForm.module.css';

const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL || '/api/contact';

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [messageLen, setMessageLen] = useState(0);
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);
        setIsSubmitting(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const payload = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone') || '',
            service: formData.get('service'),
            message: formData.get('message') || '',
        };

        try {
            const res = await fetch(CONTACT_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                if (res.status === 404 && import.meta.env.DEV) {
                    throw new Error(
                        'The contact API is not available on this port. Plain Vite (npm run dev) does not run /api/contact. Stop the dev server and run: npm run dev:vercel — then open the URL shown in the terminal (often http://localhost:3000), not :5173. See docs/FORM_AND_RESEND_SETUP.md.'
                    );
                }
                throw new Error(data?.message || 'Something went wrong. Please try again.');
            }

            form.reset();
            setMessageLen(0);
            setStatus({
                type: 'success',
                text: 'Thank you! We’ve received your message and will be in touch soon.',
            });
        } catch (err) {
            console.error(err);
            setStatus({
                type: 'error',
                text: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
            <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="firstName">
                    First Name <span className={styles.required}>*</span>
                </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={styles.input}
                    required
                    autoComplete="given-name"
                />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="lastName">
                    Last Name <span className={styles.required}>*</span>
                </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={styles.input}
                    required
                    autoComplete="family-name"
                />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="email">
                    Email Address <span className={styles.required}>*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.input}
                    required
                    autoComplete="email"
                />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="phone">
                    Phone Number
                </label>
                <input type="tel" id="phone" name="phone" className={styles.input} autoComplete="tel" />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="service">
                    Select the service you want to book <span className={styles.required}>*</span>
                </label>
                <select id="service" name="service" className={styles.select} required defaultValue="">
                    <option value="" disabled>
                        Select your service
                    </option>
                    <option value="Warrant of Fitness (WOF)">Warrant of Fitness (WOF)</option>
                    <option value="Vehicle Servicing">Vehicle Servicing</option>
                    <option value="Mechanical Repairs">Mechanical Repairs</option>
                    <option value="Other">Other / Enquiry</option>
                </select>
            </div>

            <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                    <label className={styles.label} htmlFor="message">
                        Message
                    </label>
                    <span className={styles.charCount} aria-live="polite">
                        {messageLen} / 180
                    </span>
                </div>
                <textarea
                    id="message"
                    name="message"
                    className={styles.textarea}
                    maxLength={180}
                    defaultValue=""
                    onChange={(ev) => setMessageLen(ev.target.value.length)}
                />
            </div>

            <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
            >
                {isSubmitting ? 'Sending…' : 'Submit'}
            </button>

            {status && (
                <div
                    className={status.type === 'success' ? styles.formSuccess : styles.formError}
                    role="alert"
                >
                    {status.text}
                </div>
            )}
        </form>
    );
};

export default ContactForm;
