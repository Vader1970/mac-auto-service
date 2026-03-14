import React from 'react';
import Hero from '../../components/sections/Hero/Hero';

const Contact = () => {
    return (
        <div className="contact-page">
            <Hero
                title="Contact Us"
                description="Get in touch with our friendly team to book a WOF, service, or repair. We're here to help with straightforward advice and appointments that suit you."
                ctaText="Book Your WOF Here"
                ctaLink="/services/wof"
            />
            <div className="page-container" style={{ padding: '60px 20px', maxWidth: 1200, margin: '0 auto' }}>
                <p>Waiting for section screenshots to build the content...</p>
            </div>
        </div>
    );
};

export default Contact;
