import React, { Suspense, lazy } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import ScrollToTop from './components/layout/ScrollToTop/ScrollToTop';

const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Services = lazy(() => import('./pages/Services/Services'));
const WOF = lazy(() => import('./pages/WOF/WOF'));
const Repairs = lazy(() => import('./pages/Repairs/Repairs'));
const Servicing = lazy(() => import('./pages/Servicing/Servicing'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main className="main-layout">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/wof" element={<WOF />} />
            <Route path="/services/repairs" element={<Repairs />} />
            <Route path="/services/servicing" element={<Servicing />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Analytics />
    </Router>
  );
}

export default App;
