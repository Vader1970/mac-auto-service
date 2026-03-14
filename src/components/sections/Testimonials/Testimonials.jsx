import React, { useState, useEffect } from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
    {
        quote: "Great service, take my boat trailer every year. Always reliable and honest.",
        author: "Adam Hutchins"
    },
    {
        quote: "Great service and got my car through its WOF with minimal waiting time.",
        author: "Mark Simpson"
    },
    {
        quote: "Professional team, clear pricing and excellent communication.",
        author: "Sarah Thompson"
    }
];

const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance slider every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className={styles.testimonialsSection}>
            <div className={styles.container}>

                <h2 className={styles.title}>
                    What <span className={styles.highlight}>Our Clients</span> Say
                </h2>

                <div className={styles.slider}>
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`${styles.slide} ${index === currentSlide ? styles.activeSlide : ''}`}
                        >
                            <p className={styles.quote}>"{testimonial.quote}"</p>
                            <p className={styles.author}>— {testimonial.author}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.dots}>
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
                            onClick={() => setCurrentSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        ></button>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
