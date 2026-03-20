import React from 'react';
import Hero from '../../components/sections/Hero/Hero';
import AfterpayBanner from '../../components/sections/AfterpayBanner/AfterpayBanner';
import ServicesSection from '../../components/sections/Services/Services';
import oilChangeImg from '../../assets/images/services-hero.jpg';

const Services = () => {
    return (
        <div className="services-page">
            <Hero
                imageSrc={oilChangeImg}
                title="Our Services"
                description="From oil changes and routine servicing to WOF inspections, brake repairs, and full mechanical work—we keep your car, bike, or light truck running safely and reliably."
                ctaText="Book Your WOF Here"
                ctaLink="/services/wof"
            />
            <AfterpayBanner />
            <ServicesSection
                title="Complete Car Servicing & Repairs in Christchurch"
                highlightWord={null}
                subheading="Looking for a reliable mechanic in Christchurch?"
                introContent={
                    <p>
                        We provide everything from routine vehicle servicing and WOF inspections to complex mechanical repairs and advanced diagnostics. Whether your car needs preventative maintenance or urgent repairs, our experienced team delivers reliable workmanship, transparent pricing, and honest advice.
                    </p>
                }
            />
        </div>
    );
};

export default Services;
