import Hero from '../../components/sections/Hero/Hero';
import AfterpayBanner from '../../components/sections/AfterpayBanner/AfterpayBanner';
import AboutWhoWeAre from '../../components/sections/AboutWhoWeAre/AboutWhoWeAre';
import BrandsCarousel from '../../components/sections/BrandsCarousel/BrandsCarousel';
import AboutIntroducingUs from '../../components/sections/AboutIntroducingUs/AboutIntroducingUs';
import AboutTestimonialParallax from '../../components/sections/AboutTestimonialParallax/AboutTestimonialParallax';
import ContactPageSection from '../../components/sections/ContactPageSection/ContactPageSection';
import aboutUsHeroImg from '../../assets/images/about-us.webp';

const About = () => {
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
