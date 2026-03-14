import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Counter.module.css';

gsap.registerPlugin(ScrollTrigger);

const counters = [
    { label: 'Years Experience', endValue: 30, suffix: '+' },
    { label: 'Customer Satisfaction', endValue: 99, suffix: '%' },
    { label: 'Quality Service', endValue: 100, suffix: '%' }
];

const Counter = () => {
    const sectionRef = useRef(null);
    const numberRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Counter Animation
            numberRefs.current.forEach((el, index) => {
                const targetValue = counters[index].endValue;

                gsap.fromTo(el,
                    { innerHTML: 0 },
                    {
                        innerHTML: targetValue,
                        duration: 2.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 85%", // Starts animating when 85% relative to viewport
                        },
                        snap: { innerHTML: 1 }, // Only show whole numbers during count up
                        onUpdate: function () {
                            el.innerHTML = Math.round(this.targets()[0].innerHTML);
                        }
                    }
                );
            });

            // Reveal wrapper fade up based on our animation guide
            gsap.fromTo(`.${styles.item}`,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.counterSection} ref={sectionRef}>
            <div className={styles.container}>
                {counters.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <div className={styles.numberWrapper}>
                            <span className={styles.number} ref={el => numberRefs.current[index] = el}>0</span>
                            <span className={styles.suffix}>{item.suffix}</span>
                        </div>
                        <p className={styles.label}>{item.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Counter;
