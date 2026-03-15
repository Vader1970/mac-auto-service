import React from 'react';
import Hero from '../../components/sections/Hero/Hero';
import GeneralRepairs from '../../components/sections/GeneralRepairs/GeneralRepairs';
import RepairsCTA from '../../components/sections/RepairsCTA/RepairsCTA';
import RepairServicesWeOffer from '../../components/sections/RepairServicesWeOffer/RepairServicesWeOffer';
import repairsHeroImg from '../../assets/images/repairs-hero.webp';

const Repairs = () => {
    return (
        <div className="repairs-page">
            <Hero
                imageSrc={repairsHeroImg}
                title="Repairs"
                short
            />
            <GeneralRepairs />
            <RepairsCTA />
            <RepairServicesWeOffer />
        </div>
    );
};

export default Repairs;
