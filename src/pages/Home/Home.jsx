import React from 'react';
import Hero from '../../components/sections/Hero/Hero';
import Counter from '../../components/sections/Counter/Counter';
import AfterpayBanner from '../../components/sections/AfterpayBanner/AfterpayBanner';
import Services from '../../components/sections/Services/Services';
import CTA from '../../components/sections/CTA/CTA';
import WhyChooseUs from '../../components/sections/WhyChooseUs/WhyChooseUs';
import Testimonials from '../../components/sections/Testimonials/Testimonials';
import FAQ from '../../components/sections/FAQ/FAQ';
import ContactPageSection from '../../components/sections/ContactPageSection/ContactPageSection';

const Home = () => {
    return (
        <div className="home-page">
            <Hero />
            <Counter />
            <AfterpayBanner />
            <Services />
            <CTA />
            <WhyChooseUs />
            <Testimonials />
            <FAQ />
            <ContactPageSection />
        </div>
    );
};

export default Home;
