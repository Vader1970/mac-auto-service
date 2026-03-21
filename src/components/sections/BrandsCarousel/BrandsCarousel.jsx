import React from 'react';
import styles from './BrandsCarousel.module.css';

import penrite from '../../../assets/images/penrite.png';
import ryco from '../../../assets/images/ryco.png';
import monroe from '../../../assets/images/monroe.png';
import gates from '../../../assets/images/gates.png';
import kumho from '../../../assets/images/kumho.png';
import bendix from '../../../assets/images/bendix.png';

const logos = [
    { src: penrite, alt: 'Penrite' },
    { src: ryco, alt: 'Ryco' },
    { src: monroe, alt: 'Monroe' },
    { src: gates, alt: 'Gates' },
    { src: kumho, alt: 'Kumho' },
    { src: bendix, alt: 'Bendix' }
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
                                <img key={`logo-1-${index}`} src={logo.src} alt={logo.alt} className={styles.logo} />
                            ))}
                        </div>
                        <div className={styles.logoSet} aria-hidden="true">
                            {logos.map((logo, index) => (
                                <img key={`logo-2-${index}`} src={logo.src} alt={logo.alt} className={styles.logo} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandsCarousel;
