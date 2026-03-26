import React, { useEffect } from 'react';
import { SERVICES_PAGE_DESCRIPTION, SERVICES_PAGE_TITLE, SITE_TITLE } from '../../constants/seo';
import Hero from '../../components/sections/Hero/Hero';
import AfterpayBanner from '../../components/sections/AfterpayBanner/AfterpayBanner';
import ServicesSection from '../../components/sections/Services/Services';
import ContactPageSection from '../../components/sections/ContactPageSection/ContactPageSection';
import oilChangeSrcset from '../../assets/images/services-hero.jpg?w=800;1200;1600&format=webp&quality=80&as=srcset';
import oilChangeImg from '../../assets/images/services-hero.jpg?w=1200&format=webp&quality=80';

const Services = () => {
    useEffect(() => {
        document.title = SERVICES_PAGE_TITLE;

        let meta = document.querySelector('meta[name="description"]');
        const createdMeta = !meta;
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'description');
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', SERVICES_PAGE_DESCRIPTION);

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
        <div className="services-page">
            <Hero
                imageSrc={oilChangeImg}
                imageSrcSet={oilChangeSrcset}
                title="Our Services"
                short
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
            <ContactPageSection />
        </div>
    );
};

export default Services;
