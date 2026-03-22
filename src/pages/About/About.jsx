import React, { useEffect } from 'react';
import { ABOUT_PAGE_DESCRIPTION, ABOUT_PAGE_TITLE, SITE_TITLE } from '../../constants/seo';
import Hero from '../../components/sections/Hero/Hero';
import AfterpayBanner from '../../components/sections/AfterpayBanner/AfterpayBanner';
import AboutWhoWeAre from '../../components/sections/AboutWhoWeAre/AboutWhoWeAre';
import BrandsCarousel from '../../components/sections/BrandsCarousel/BrandsCarousel';
import AboutIntroducingUs from '../../components/sections/AboutIntroducingUs/AboutIntroducingUs';
import AboutTestimonialParallax from '../../components/sections/AboutTestimonialParallax/AboutTestimonialParallax';
import ContactPageSection from '../../components/sections/ContactPageSection/ContactPageSection';
import aboutUsHeroImg from '../../assets/images/about-us.webp';

const About = () => {
    useEffect(() => {
        document.title = ABOUT_PAGE_TITLE;

        let meta = document.querySelector('meta[name="description"]');
        const createdMeta = !meta;
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'description');
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', ABOUT_PAGE_DESCRIPTION);

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
        <div className="about-page">
            <Hero
                imageSrc={aboutUsHeroImg}
                title="About Us"
                short
                backgroundPositionMobile="right"
            />
            <AfterpayBanner />
            <AboutWhoWeAre />
            <BrandsCarousel />
            <AboutIntroducingUs />
            <AboutTestimonialParallax />
            <ContactPageSection />
        </div>
    );
};

export default About;
