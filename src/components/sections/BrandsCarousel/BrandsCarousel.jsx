import React from 'react';
import styles from './BrandsCarousel.module.css';

import penrite from '../../../assets/images/penrite.png';
import ryco from '../../../assets/images/ryco.png';
import monroe from '../../../assets/images/monroe.png';
import gates from '../../../assets/images/gates.png';
import kumho from '../../../assets/images/kumho.png';
import bendix from '../../../assets/images/bendix.png';

const logos = [
    { src: penrite, alt: 'Penrite oils and lubricants logo' },
    { src: ryco, alt: 'Ryco filters logo' },
    { src: monroe, alt: 'Monroe shock absorbers logo' },
    { src: gates, alt: 'Gates belts and hoses logo' },
    { src: kumho, alt: 'Kumho tyres logo' },
    { src: bendix, alt: 'Bendix brakes logo' },
];

const BrandsCarousel = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    We use only quality components from reliable manufactures. Below are some of the brands we use.
                </h2>
                
                <div className={styles.carouselContainer}>
                    <div className={styles.track}>
                        <div className={styles.logoSet}>
                            {logos.map((logo, index) => (
                                <img key={`logo-1-${index}`} src={logo.src} alt={logo.alt} className={styles.logo} width="160" height="80" loading="lazy" decoding="async" />
                            ))}
                        </div>
                        <div className={styles.logoSet} aria-hidden="true">
                            {logos.map((logo, index) => (
                                <img key={`logo-2-${index}`} src={logo.src} alt="" className={styles.logo} width="160" height="80" loading="lazy" decoding="async" aria-hidden="true" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandsCarousel;
