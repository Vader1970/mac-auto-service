import React, { useEffect } from 'react';
import { HOME_PAGE_DESCRIPTION, HOME_PAGE_TITLE, SITE_TITLE } from '../../constants/seo';
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
    useEffect(() => {
        document.title = HOME_PAGE_TITLE;

        let meta = document.querySelector('meta[name="description"]');
        const createdMeta = !meta;
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'description');
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', HOME_PAGE_DESCRIPTION);

        return () => {
            document.title = SITE_TITLE;
            if (createdMeta) {
                meta.remove();
            } else {
                meta.removeAttribute('content');
            }
        };
    }, []);

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
