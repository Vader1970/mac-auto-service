import Hero from '../../components/sections/Hero/Hero';
import AfterpayBanner from '../../components/sections/AfterpayBanner/AfterpayBanner';
import ContactPageSection from '../../components/sections/ContactPageSection/ContactPageSection';
import contactHeroImg from '../../assets/images/contact-us.webp';

const Contact = () => {
    return (
        <div className="contact-page">
            <Hero
                imageSrc={contactHeroImg}
                title="Contact Us"
                short
            />
            <AfterpayBanner />
            <ContactPageSection />
        </div>
    );
};

export default Contact;
