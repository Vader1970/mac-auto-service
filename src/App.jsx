import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import ScrollToTop from './components/layout/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Services from './pages/Services/Services';
import WOF from './pages/WOF/WOF';
import Repairs from './pages/Repairs/Repairs';
import Servicing from './pages/Servicing/Servicing';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main className="main-layout">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/wof" element={<WOF />} />
          <Route path="/services/repairs" element={<Repairs />} />
          <Route path="/services/servicing" element={<Servicing />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
