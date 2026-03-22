import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './FAQ.module.css';

gsap.registerPlugin(ScrollTrigger);

const defaultFaqs = [
    {
        question: "What services does your mechanic workshop provide?",
        answer: "We offer a full range of automotive services, including Warrant of Fitness (WOF) inspections, routine servicing, brake repairs, engine diagnostics, mechanical repairs, and pre-purchase inspections for cars, motorhomes, trailers, and light trucks."
    },
    {
        question: "Do you carry out Warrant of Fitness (WOF) inspections?",
        answer: "Yes, we provide thorough WOF inspections in line with New Zealand safety standards. If repairs are required, we'll explain exactly what needs attention and provide a clear quote before starting any work."
    },
    {
        question: "What happens if my vehicle fails its WOF?",
        answer: "If your vehicle doesn't pass inspection, we'll give you a detailed list of required repairs. You have 28 days to complete the work and return for a recheck."
    },
    {
        question: "How often should I service my car?",
        answer: "Most vehicles should be serviced every 10,000 - 15,000km or once a year, whichever comes first. Regular servicing helps prevent breakdowns, improves fuel efficiency, and extends the life of your vehicle."
    },
    {
        question: "Can you diagnose engine warning lights?",
        answer: "Absolutely. We use modern diagnostic equipment to identify engine fault codes and performance issues. Once diagnosed, we'll explain the problem in plain English and outline the next steps."
    },
    {
        question: "Do you provide brake repairs and replacements?",
        answer: "Yes. We inspect and repair brake pads, discs, and related components. If you hear squealing, grinding, or notice reduced braking performance, it's important to have your brakes checked promptly."
    },
    {
        question: "Do you repair major mechanical issues like engines and gearboxes?",
        answer: "Our experienced mechanics handle everything from minor repairs to complex engine and gearbox work, focusing on reliable, long-term solutions."
    },
    {
        question: "Do you work on all vehicle makes and models?",
        answer: "We service most makes and models, including petrol and diesel vehicles. If you're unsure about your specific vehicle, feel free to contact us."
    },
    {
        question: "What's included in a full vehicle service?",
        answer: "A standard service typically includes an oil and filter change, fluid checks, brake inspection, tyre condition check, and a general safety and mechanical assessment."
    },
    {
        question: "Do you offer pre-purchase vehicle inspections?",
        answer: "Yes. If you're buying a used vehicle, we can carry out a detailed inspection to help you understand its mechanical condition before committing."
    },
    {
        question: "Where are you located and how do I book an appointment?",
        answer: "Our workshop is conveniently located in Bromley, serving drivers across Christchurch. You can book your WOF, service, or repairs by calling us or using form below."
    }
];

const FAQItem = ({ faq, isOpen, onClick }) => {
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);

    useLayoutEffect(() => {
        if (isOpen && contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        } else {
            setContentHeight(0);
        }
    }, [isOpen, faq.answer]);

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
                style={{ maxHeight: contentHeight }}
            >
                 <div className={styles.accordionInner} ref={contentRef}>
                    <p>{faq.answer}</p>
                </div>
            </div>
        </div>
    );
};

const FAQ = ({
    title = "FAQ's",
    highlightWord = " ",
    description = "Find answers to common questions about WOF inspections, servicing, and vehicle repairs. If you need more information, our friendly team is always happy to help.",
    faqs = defaultFaqs
}) => {
    const [openIndex, setOpenIndex] = useState(null);
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const listRef = useRef(null);

    const parts = highlightWord && title.includes(highlightWord) ? title.split(highlightWord) : [title];
    const titleContent = parts.length > 1
        ? parts.flatMap((part, i) => (i < parts.length - 1 ? [part, <span key={i} className={styles.highlight}>{highlightWord}</span>] : [part]))
        : title;

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
                    <h2 className={styles.title}>{titleContent}</h2>
                    <p className={styles.description}>{description}</p>
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
