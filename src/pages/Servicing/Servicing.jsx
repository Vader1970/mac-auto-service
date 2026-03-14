import React from 'react';
import Hero from '../../components/sections/Hero/Hero';
import servicingHeroImg from '../../assets/images/mac-servicing.jpg';

const Servicing = () => {
    return (
        <div className="servicing-page">
            <Hero
                imageSrc={servicingHeroImg}
                title="Servicing"
                short
            />
            <div className="page-container" style={{ padding: '60px 20px', maxWidth: 1200, margin: '0 auto' }}>
                <p>Waiting for section screenshots to build the content...</p>
            </div>
        </div>
    );
};

export default Servicing;
