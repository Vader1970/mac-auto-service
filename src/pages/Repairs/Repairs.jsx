import React, { useEffect } from 'react';
import { REPAIRS_PAGE_DESCRIPTION, REPAIRS_PAGE_TITLE, SITE_TITLE } from '../../constants/seo';
import Hero from '../../components/sections/Hero/Hero';
import AfterpayBanner from '../../components/sections/AfterpayBanner/AfterpayBanner';
import GeneralRepairs from '../../components/sections/GeneralRepairs/GeneralRepairs';
import RepairsCTA from '../../components/sections/RepairsCTA/RepairsCTA';
import RepairServicesWeOffer from '../../components/sections/RepairServicesWeOffer/RepairServicesWeOffer';
import ContactPageSection from '../../components/sections/ContactPageSection/ContactPageSection';
import repairsHeroImg from '../../assets/images/repairs-hero.webp';

const Repairs = () => {
    useEffect(() => {
        document.title = REPAIRS_PAGE_TITLE;

        let meta = document.querySelector('meta[name="description"]');
        const createdMeta = !meta;
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'description');
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', REPAIRS_PAGE_DESCRIPTION);

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
        <div className="repairs-page">
            <Hero
                imageSrc={repairsHeroImg}
                title="Repairs"
                short
                backgroundPositionMobile="left"
            />
            <AfterpayBanner />
            <GeneralRepairs />
            <RepairsCTA />
            <RepairServicesWeOffer />
            <ContactPageSection />
        </div>
    );
};

export default Repairs;
