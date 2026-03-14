import React from 'react';
import Hero from '../../components/sections/Hero/Hero';
import GeneralRepairs from '../../components/sections/GeneralRepairs/GeneralRepairs';
import repairsHeroImg from '../../assets/images/mac-repairs.jpg';

const Repairs = () => {
    return (
        <div className="repairs-page">
            <Hero
                imageSrc={repairsHeroImg}
                title="Repairs"
                short
            />
            <GeneralRepairs />
        </div>
    );
};

export default Repairs;
