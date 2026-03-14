import React from 'react';
import Hero from '../../components/sections/Hero/Hero';

const About = () => {
    return (
        <div className="about-page">
            <Hero
                title="About Us"
                description="With over 30 years of experience, Mac Auto Services is your trusted local mechanic in Christchurch. We offer honest advice, quality workmanship, and reliable service for cars, motorbikes, trailers, and light trucks."
                ctaText="Get in Touch"
                ctaLink="/contact"
            />
            <div className="page-container" style={{ padding: '60px 20px', maxWidth: 1200, margin: '0 auto' }}>
                <p>Waiting for section screenshots to build the content...</p>
            </div>
        </div>
    );
};

export default About;
