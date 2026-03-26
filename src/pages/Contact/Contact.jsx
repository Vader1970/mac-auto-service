import React, { useEffect } from 'react';
import { CONTACT_PAGE_DESCRIPTION, CONTACT_PAGE_TITLE, SITE_TITLE } from '../../constants/seo';
import Hero from '../../components/sections/Hero/Hero';
import AfterpayBanner from '../../components/sections/AfterpayBanner/AfterpayBanner';
import ContactPageSection from '../../components/sections/ContactPageSection/ContactPageSection';
import contactHeroSrcset from '../../assets/images/contact-us.webp?w=800;1200;1600&format=webp&quality=80&as=srcset';
import contactHeroImg from '../../assets/images/contact-us.webp?w=1200&format=webp&quality=80';

const Contact = () => {
    useEffect(() => {
        document.title = CONTACT_PAGE_TITLE;

        let meta = document.querySelector('meta[name="description"]');
        const createdMeta = !meta;
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'description');
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', CONTACT_PAGE_DESCRIPTION);

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
        <div className="contact-page">
            <Hero
                imageSrc={contactHeroImg}
                imageSrcSet={contactHeroSrcset}
                title="Contact Us"
                short
            />
            <AfterpayBanner />
            <ContactPageSection />
        </div>
    );
};

export default Contact;
