import Hero from '../../components/sections/Hero/Hero';
import AfterpayBanner from '../../components/sections/AfterpayBanner/AfterpayBanner';
import contactHeroImg from '../../assets/images/contact-us.webp';

const About = () => {
    return (
        <div className="about-page">
            <Hero
                imageSrc={contactHeroImg}
                title="About Us"
                short
            />
            <AfterpayBanner />
        </div>
    );
};

export default About;
