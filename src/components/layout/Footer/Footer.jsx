import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import whiteLogoSrcset from '../../../assets/images/white-logo.png?w=200;400&format=webp&quality=92&as=srcset';
import whiteLogo from '../../../assets/images/white-logo.png?w=400&format=webp&quality=92';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <img
                        src={whiteLogo}
                        srcSet={whiteLogoSrcset}
                        sizes="200px"
                        alt="Mac Auto Services wordmark"
                        className={styles.logoImage}
                        width={200}
                        height={65}
                        loading="lazy"
                        decoding="async"
                    />
                    <p>Unit 1&2/56 Wickham Street,<br />Christchurch 8062,<br />Bromley</p>
                </div>
                <div className={styles.column}>
                    <h4>Menu</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className={styles.column}>
                    <h4>Services</h4>
                    <ul>
                        <li><Link to="/services">All Services</Link></li>
                        <li><Link to="/services/wof">WOF</Link></li>
                        <li><Link to="/services/repairs">Repairs</Link></li>
                        <li><Link to="/services/servicing">Servicing</Link></li>
                    </ul>
                </div>
                <div className={styles.column}>
                    <h4>Opening Hours</h4>
                    <p>Mon - Fri: 8:00am - 5:00pm<br />Sat: 8:30am - 12:30pm<br />Sun: Closed</p>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>&copy; {new Date().getFullYear()} Mac Auto Services. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
