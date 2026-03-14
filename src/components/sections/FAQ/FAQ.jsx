import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './FAQ.module.css';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        question: "What services does your mechanic workshop provide?",
        answer: "We offer a full range of automotive services, including Warrant of Fitness (WOF) inspections, routine servicing, brake repairs, engine diagnostics, mechanical repairs, and pre-purchase inspections for cars, motorbikes, trailers, and light trucks."
    },
    {
        question: "Do you carry out Warrant of Fitness (WOF) inspections?",
        answer: "Yes, we are a fully certified WOF testing station. We can perform your inspection and also carry out any necessary repairs if your vehicle fails."
    },
    {
        question: "What happens if my vehicle fails its WOF?",
        answer: "If your vehicle fails its WOF, we will provide a detailed report of the issues. We can quote and perform the necessary repairs onsite, then recheck and issue your WOF once compliant."
    },
    {
        question: "How often should I service my car?",
        answer: "Generally, we recommend a minor service every 10,000km or 6 months, and a major service every 20,000km or 12 months, though this can vary based on your vehicle's make, model, and age."
    },
    {
        question: "Can you diagnose engine warning lights?",
        answer: "Yes, we have advanced diagnostic scan tools to read engine codes and identify issues causing warning lights on your dashboard."
    },
    {
        question: "Do you provide brake repairs and replacements?",
        answer: "Absolutely. We offer comprehensive brake services including pad replacements, rotor machining, fluid flushes, and full system safety checks."
    },
    {
        question: "Do you repair major mechanical issues like engines and gearboxes?",
        answer: "Yes, our experienced mechanics can handle major repairs including full engine rebuilds, gearbox replacements, and complex mechanical diagnostics."
    },
    {
        question: "Do you work on all vehicle makes and models?",
        answer: "We service and repair a wide variety of vehicles including all common Japanese, European, and American makes and models."
    },
    {
        question: "What's included in a full vehicle service?",
        answer: "A full service typically includes engine oil and filter change, checking and topping up all fluids, comprehensive safety check, brake inspection, suspension check, and tire pressure adjustments."
    },
    {
        question: "Do you offer pre-purchase vehicle inspections?",
        answer: "Yes, we can perform thorough pre-purchase inspections to give you peace of mind before buying a used vehicle."
    },
    {
        question: "Where are you located and how do I book an appointment?",
        answer: "We are located at 123 Mechanic Street, Auckland. You can book an appointment by calling us or using the 'Book online now' button on our website."
    }
];

const FAQItem = ({ faq, isOpen, onClick }) => {
    const contentRef = useRef(null);

    return (
        <div className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
            <button className={styles.accordionHeader} onClick={onClick}>
                <span className={styles.accordionIconLeft}>
                    {isOpen ? '—' : '+'}
                </span>
                <span className={styles.questionText}>{faq.question}</span>
                <span className={styles.accordionIconRight}>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0)' }}>
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </span>
            </button>
            <div
                className={styles.accordionContent}
                ref={contentRef}
                style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
            >
                <div className={styles.accordionInner}>
                    <p>{faq.answer}</p>
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null); // All closed by default
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(titleRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
            );

            gsap.fromTo(listRef.current.children,
                { x: 30, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.faqSection} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.textContent} ref={titleRef}>
                    <h2 className={styles.title}>FAQ's</h2>
                    <p className={styles.description}>
                        Find answers to common questions about WOF inspections, servicing, and vehicle repairs. If you need more information, our friendly team is always happy to help.
                    </p>
                </div>

                <div className={styles.faqListContainer}>
                    <div className={styles.faqList} ref={listRef}>
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                faq={faq}
                                isOpen={openIndex === index}
                                onClick={() => toggleItem(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
