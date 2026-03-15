import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Settings, ShieldCheck, Wrench, Car, Award } from 'lucide-react';
import styles from './RepairServicesWeOffer.module.css';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
    {
        title: "Brake Repairs & Safety Inspections",
        description: (
            <div className={styles.richContent}>
                <p>Your brakes are your car&apos;s most important safety feature. If you&apos;re noticing squeaks, juddering, pulling to one side, or a handbrake that struggles on hills, it&apos;s time to have them checked. Ignoring the signs can lead to reduced stopping power, expensive damage, or even a failed Warrant of Fitness.</p>
                <p>At Mac Auto Services, our qualified technicians use the latest tools and equipment to diagnose issues accurately and restore your braking system to peak performance.</p>
                <p>Our brake services include:</p>
                <ul>
                    <li>Brake pad and shoe replacement</li>
                    <li>Rotor and drum machining or replacement</li>
                    <li>Brake fluid flushing and bleeding</li>
                    <li>Parking brake service and adjustment</li>
                    <li>Hydraulic system repairs (calipers, hoses, and cylinders)</li>
                    <li>ABS testing and fault diagnosis</li>
                </ul>
                <p>Whether it&apos;s a quick pad change or a full system overhaul, we&apos;ll get your brakes stopping smoothly and safely. Book your brake check today and drive with confidence.</p>
                <Link to="/contact" className={styles.bookButton}>Book Your Brake Repairs Today</Link>
            </div>
        )
    },
    {
        title: "Transmission & Driveline Repairs",
        description: (
            <div className={styles.richContent}>
                <p>Your transmission and driveline pass power from the engine to the wheels. If your car is slow to go into gear, slips, shudders, or makes clunks or whining noises, it needs attention. Ignoring these signs can lead to costly failures.</p>
                <p>Mac Auto Services diagnoses and repairs both manual and automatic transmissions, as well as clutches, differentials, and drive shafts. We aim to find the actual fault first, then repair or replace what&apos;s needed.</p>
                <p>Our transmission & driveline repairs include:</p>
                <ul>
                    <li>Automatic and manual transmission diagnosis and repairs</li>
                    <li>Clutch adjustment, hydraulic repairs, and replacement</li>
                    <li>Differential servicing and repairs</li>
                    <li>Driveshaft and CV joint inspection and replacement</li>
                    <li>Transmission fluid changes and flushing</li>
                </ul>
                <p>Whether it&apos;s a simple adjustment or a full transmission or driveline repair, we&apos;ll get your car putting power to the road smoothly again. Book your transmission and driveline check today and sort those noises and shudders before they get worse.</p>
                <Link to="/contact" className={styles.bookButton}>Book Your Transmission Repairs Today</Link>
            </div>
        )
    },
    {
        title: "Engine Diagnostics & Mechanical Repairs",
        description: (
            <div className={styles.richContent}>
                <p>Loss of power, rough running, hard starting, poor fuel economy, or a check engine light all point to engine problems. Small issues left alone can turn into major repairs.</p>
                <p>At Mac Auto Services, we use scan tools and solid mechanical checks to find out what&apos;s really going on. We then explain the options and carry out practical repairs that suit your budget and vehicle.</p>
                <p>Our engine repair services include:</p>
                <ul>
                    <li>Engine fault code reading and diagnosis</li>
                    <li>Misfire, rough idle, and stalling checks</li>
                    <li>Timing belt and timing chain replacement</li>
                    <li>Gasket and seal replacement, oil and coolant leak repairs</li>
                    <li>Fuel system and intake repairs</li>
                </ul>
                <p>Whether it&apos;s a minor running issue or a larger repair job, we&apos;ll get your engine starting easily and pulling strongly again. Book your engine check today and stay ahead of costly breakdowns.</p>
                <Link to="/contact" className={styles.bookButton}>Book Your Engine Repairs Today</Link>
            </div>
        )
    },
    {
        title: "Cooling System Repairs",
        description: (
            <div className={styles.richContent}>
                <p>An engine that runs too hot can quickly be damaged. Signs of cooling problems include a rising temperature gauge, coolant on the ground, sweet smells, steam, or a heater that doesn&apos;t work properly.</p>
                <p>Mac Auto Services checks the whole cooling system to find leaks, blockages, or failed parts. We replace what&apos;s worn out and refill with the correct coolant so the engine stays at the right temperature.</p>
                <p>Our cooling system services include:</p>
                <ul>
                    <li>Radiator testing, repairs, and replacement</li>
                    <li>Cooling system pressure tests and leak checks</li>
                    <li>Coolant flushing and replacement</li>
                    <li>Water pump and thermostat replacement</li>
                    <li>Hose, clamp, fan, and sensor repairs</li>
                </ul>
                <p>Whether you&apos;ve had a one - off overheat or ongoing temperature problems, we&apos;ll get your cooling system working properly again. Book your cooling system inspection today and protect your engine from serious damage.</p>
                <Link to="/contact" className={styles.bookButton}>Book Your Cooling System Repairs Today</Link>
            </div>
        )
    },
    {
        title: "Warning Light & Fault Code Diagnosis",
        description: (
            <div className={styles.richContent}>
                <p>When a warning light comes on, something in the system isn&apos;t working properly. Simply turning the light off doesn&apos;t fix the problem and it will usually come back.</p>
                <p>At Mac Auto Services, we plug in diagnostic equipment and carry out basic checks to see why the light is on. We then advise you on the best repair so the fault is properly sorted.</p>
                <p>Our diagnostic services include:</p>
                <ul>
                    <li>Check engine light and fault code diagnosis</li>
                    <li>ABS and traction control system checks</li>
                    <li>Airbag and safety system checks</li>
                    <li>Live data testing while the car is running</li>
                    <li>Clearing lights after repairs are completed</li>
                </ul>
                <p>Whether it&apos;s an engine, ABS, or airbag light, we&apos;ll track down the cause and fix it properly. Book your warning light diagnosis today and know exactly what&apos;s going on with your car.</p>
                <Link to="/contact" className={styles.bookButton}>Book Your Diagnostic Check Today</Link>
            </div>
        )
    },
    {
        title: "Exhaust Repairs & Replacements",
        description: (
            <div className={styles.richContent}>
                <p>A damaged exhaust can be noisy, smelly, and unsafe. Common signs include rattles, loud exhaust noise, fumes getting into the cabin, or visible rust and holes.</p>
                <p>Mac Auto Services inspects the exhaust from front to back, looking for leaks, broken hangers, and rusted sections. We repair where possible or replace parts that are beyond saving.</p>
                <p>Our exhaust repair services include:</p>
                <ul>
                    <li>Exhaust leak detection and section repairs</li>
                    <li>Muffler and resonator replacement</li>
                    <li>Catalytic converter checks and replacement</li>
                    <li>Exhaust mount and hanger repairs</li>
                    <li>Fabricated sections where standard parts don&apos;t fit</li>
                </ul>
                <p>Whether you need a small section repaired or a full exhaust replacement, we&apos;ll get your car running quieter and safer. Book your exhaust check today and sort that noise before it becomes a bigger issue.</p>
                <Link to="/contact" className={styles.bookButton}>Book Your Exhaust Repairs Today</Link>
            </div>
        )
    },
    {
        title: "Suspension & Steering Repairs",
        description: (
            <div className={styles.richContent}>
                <p>Worn suspension or steering makes a car feel loose, noisy, and unstable. You might hear knocks over bumps, feel the car wandering on the road, or notice uneven tyre wear.</p>
                <p>At Mac Auto Services, we inspect shocks, bushes, joints, and steering parts for wear and play. Replacing worn parts improves ride comfort, handling, and tyre life.</p>
                <p>Our suspension repair services include:</p>
                <ul>
                    <li>Shock absorber and strut replacement</li>
                    <li>Control arm, bush, and ball joint repairs</li>
                    <li>Steering rack, pump, and linkage repairs</li>
                    <li>Suspension checks for WoF</li>
                    <li>Wheel alignment checks and adjustments</li>
                </ul>
                <p>Whether it&apos;s a single worn joint or a full suspension refresh, we&apos;ll get your car riding and steering the way it should. Book your suspension and steering check today and feel the difference on the road.</p>
                <Link to="/contact" className={styles.bookButton}>Book Your Suspension & Steering Check Today</Link>
            </div>
        )
    },
    {
        title: "Automotive Electrical Repairs",
        description: (
            <div className={styles.richContent}>
                <p>Electrical issues can show up as flat batteries, slow cranking, dead lights, or accessories that work only sometimes. Guessing and swapping parts can get expensive.</p>
                <p>Mac Auto Services uses electrical testing gear to track down faults in the starting, charging, and lighting systems, as well as interior electrics. We then repair or replace the faulty parts.</p>
                <p>Our electrical repair services include:</p>
                <ul>
                    <li>Battery testing, charging system checks, and replacement</li>
                    <li>Starter motor and alternator diagnosis and repairs</li>
                    <li>Headlight, tail light, and indicator repairs</li>
                    <li>Power window, central locking, and accessory repairs</li>
                    <li>Wiring and connector inspection and repairs</li>
                </ul>
                <p>Whether it&apos;s a no - start problem or an annoying intermittent fault, we&apos;ll find the cause and fix it properly. Book your electrical check today and get your car starting and running reliably again.</p>
                <Link to="/contact" className={styles.bookButton}>Book Your Electrical Repairs Today</Link>
            </div>
        )
    },
    {
        title: "Tyre Replacement & Wheel Services",
        description: (
            <div className={styles.richContent}>
                <p>Tyres and wheels affect how well your car grips, stops, and steers. Worn tread, vibration, or the car pulling to one side are signs something needs attention.</p>
                <p>At Mac Auto Services, we supply and fit tyres, then balance and align the wheels so they wear evenly and perform properly. We&apos;ll recommend options that suit both your car and how you drive.</p>
                <p>Our tyre and wheel services include:</p>
                <ul>
                    <li>New tyre supply and fitting</li>
                    <li>Wheel balancing</li>
                    <li>Puncture repairs when safe to do so</li>
                    <li>Wheel alignment checks and adjustments</li>
                    <li>Tyre rotation and tread wear checks</li>
                </ul>
                <p>Whether it&apos;s a no - start problem or an annoying intermittent fault, we&apos;ll find the cause and fix it properly. Book your electrical check today and get your car starting and running reliably again.</p>
                <Link to="/contact" className={styles.bookButton}>Book Your Tyre & Wheel Services Today</Link>
            </div>
        )
    },
];

const featuresList = [
    {
        icon: <Wrench size={24} color="#54595F" />,
        title: "FULL AUTOMOTIVE SERVICING",
        description: "We're like a GP for your car"
    },
    {
        icon: <Award size={24} color="#54595F" />,
        title: "WOF",
        description: "Wait in our comfortable waiting room"
    },
    {
        icon: <Settings size={24} color="#54595F" />,
        title: "WARRANTY SERVICE & REPAIRS",
        description: "For all major warranty companies"
    },
    {
        icon: <Car size={24} color="#54595F" />,
        title: "COURTESY CARS AVAILABLE",
        description: "Private and commercial vehicles available by request"
    },
    {
        icon: <ShieldCheck size={24} color="#54595F" />,
        title: "QUALIFIED AND EXPERIENCED MECHANICS",
        description: "You can be sure you're in good hands"
    }
];

const ServiceItem = ({ service, isOpen, onClick }) => {
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);

    useLayoutEffect(() => {
        if (isOpen && contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        } else {
            setContentHeight(0);
        }
    }, [isOpen, service.description]);

    return (
        <div className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
            <button className={styles.accordionHeader} onClick={onClick}>
                <span className={styles.accordionIconLeft}>
                    {isOpen ? '—' : '+'}
                </span>
                <span className={styles.questionText}>{service.title}</span>
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
                    {typeof service.description === 'string' ? <p>{service.description}</p> : service.description}
                </div>
            </div>
        </div>
    );
};

const RepairServicesWeOffer = () => {
    const [openIndices, setOpenIndices] = useState([]);
    const sectionRef = useRef(null);
    const leftColRef = useRef(null);
    const rightColRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(leftColRef.current,
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%"
                    }
                }
            );

            gsap.fromTo(rightColRef.current,
                { x: 50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
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

    const toggleItem = (index) => {
        setOpenIndices(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index) 
                : [...prev, index]
        );
    };

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.container}>

                <div className={styles.leftColumn} ref={leftColRef}>
                    <h2 className={styles.title}>Full Automotive Servicing. Qualified Mechanics. Exceptional Standards</h2>
                    <p className={styles.description}>
                        We are able to provide a full range of mechanical and automotive repair services
                    </p>

                    <div className={styles.accordionList}>
                        {servicesList.map((service, index) => (
                            <ServiceItem
                                key={index}
                                service={service}
                                isOpen={openIndices.includes(index)}
                                onClick={() => toggleItem(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.rightColumn} ref={rightColRef}>
                    <div className={styles.featuresTimeline}>
                        {featuresList.map((feature, index) => (
                            <div key={index} className={styles.featureItem}>
                                <div className={styles.featureIconContainer}>
                                    <div className={styles.featureIcon}>
                                        {feature.icon}
                                    </div>
                                    {index < featuresList.length - 1 && <div className={styles.timelineLine}></div>}
                                </div>
                                <div className={styles.featureTextContent}>
                                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                                    <p className={styles.featureDescription}>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default RepairServicesWeOffer;
