import React from 'react';
import Hero from '../../components/sections/Hero/Hero';
import AfterpayBanner from '../../components/sections/AfterpayBanner/AfterpayBanner';
import ServicingIntro from '../../components/sections/ServicingIntro/ServicingIntro';
import ServicingParallax from '../../components/sections/ServicingParallax/ServicingParallax';
import FAQ from '../../components/sections/FAQ/FAQ';
import ContactPageSection from '../../components/sections/ContactPageSection/ContactPageSection';
import servicingHeroImg from '../../assets/images/mac-servicing.jpg';

const servicingFaqs = [
    {
        question: "What does a full vehicle service include?",
        answer: "A full service generally includes changing the engine oil and filter, checking and topping up all fluids (coolant, brake fluid, steering fluid), inspecting brakes, steering, suspension, and tires, as well as checking the lights and battery. We follow a comprehensive checklist to ensure your vehicle is in peak condition."
    },
    {
        question: "How often should I get my car serviced?",
        answer: "We recommend a minor service every 10,000 km or 6 months, and a major service every 20,000 km or 12 months. Regular servicing helps prevent unexpected breakdowns, improves fuel efficiency, and significantly extends the life of your engine."
    },
    {
        question: "Do you use premium parts and oils?",
        answer: "Yes, we only use high-quality, reputable brands for engine oils, filters, and replacement parts. We ensure that the products used meet or exceed the manufacturer's specifications for your specific vehicle, giving you peace of mind."
    },
    {
        question: "Can I get a WOF and a service done on the same day?",
        answer: "Absolutely! We highly recommend combining your Warrant of Fitness (WOF) inspection with a regular service. This saves you time and ensures all your vehicle maintenance is up to date in one convenient visit."
    },
    {
        question: "Will servicing my new car with you void the manufacturer's warranty?",
        answer: "No. Under New Zealand law, you have the right to choose where your vehicle is serviced without voiding the manufacturer's statutory warranty, provided the service is carried out to the manufacturer's specifications using appropriate quality parts, which we always adhere to."
    }
];

const Servicing = () => {
    return (
        <div className="servicing-page">
            <Hero
                imageSrc={servicingHeroImg}
                title="Servicing"
                short
            />
            <AfterpayBanner />
            <ServicingIntro />
            <ServicingParallax />
            <FAQ 
                title="Servicing FAQ's" 
                description="Got questions about bringing your car in for a service? Here are some of the most common questions we get from drivers."
                faqs={servicingFaqs} 
            />
            <ContactPageSection />
        </div>
    );
};

export default Servicing;

