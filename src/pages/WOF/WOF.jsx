import React from 'react';
import Hero from '../../components/sections/Hero/Hero';
import AfterpayBanner from '../../components/sections/AfterpayBanner/AfterpayBanner';
import WOFInspections from '../../components/sections/WOFInspections/WOFInspections';
import ServicesThatKeepYouMoving from '../../components/sections/ServicesThatKeepYouMoving/ServicesThatKeepYouMoving';
import FAQ from '../../components/sections/FAQ/FAQ';
import ContactPageSection from '../../components/sections/ContactPageSection/ContactPageSection';
import wofHeroImg from '../../assets/images/wof-hero.jpg';

const wofFaqs = [
    {
        question: "What's included in a WOF?",
        answer: "A WOF inspection covers safety-critical items such as brakes, tyres, steering, suspension, lights, seatbelts, windscreen, wipers, structural condition, and exhaust. Our inspectors follow NZTA guidelines to ensure your vehicle meets legal safety standards."
    },
    {
        question: "What happens if my WOF fails?",
        answer: "If your vehicle fails its WOF, we'll give you a clear report of what needs to be fixed. We can carry out most repairs on-site and then recheck your vehicle. Once it meets the standard, we'll issue your WOF so you can get back on the road without delay."
    },
    {
        question: "How often do I need a WOF?",
        answer: "Vehicles first registered in New Zealand before 1 January 2000 need a WOF every 6 months. Vehicles registered on or after that date need a WOF every 12 months. Keeping your WOF current is a legal requirement and helps keep you and others safe."
    },
    {
        question: "Do I need to book an appointment for a WOF?",
        answer: "Yes. We recommend booking so we can allocate time for your inspection and any follow-up work. You can call us or get in touch via our website to book a time that suits you."
    },
    {
        question: "How much does a WOF cost?",
        answer: "Our WOF inspection fee is competitive and transparent. If repairs are required, we'll provide a quote before doing any work. Contact us or visit for the current WOF price and to book."
    },
    {
        question: "Is a WOF the same as a vehicle service?",
        answer: "No. A WOF is a safety inspection required by law to check that your vehicle meets minimum roadworthiness standards. A service includes maintenance such as oil and filter changes, fluid checks, and wear-and-tear items. We offer both WOF inspections and full servicing."
    }
];

const WOF = () => {
    return (
        <div className="wof-page">
            <Hero
                imageSrc={wofHeroImg}
                title="Warrant of Fitness (WOF)"
                short
            />
            <AfterpayBanner />
            <WOFInspections />
            <ServicesThatKeepYouMoving />
            <FAQ
                title="FAQ's"
                description="Here are some commonly asked questions about a Warrant of Fitness (WOF). If you don't find your question here, give our friendly team a call."
                faqs={wofFaqs}
            />
            <ContactPageSection />
        </div>
    );
};

export default WOF;
