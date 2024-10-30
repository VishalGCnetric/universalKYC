import React, { useEffect, useState, Suspense } from 'react';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import KYCApp from './pages/Form';
import { p } from 'framer-motion/client';
import Kyc from "./pages/KycApp"

const App = () => {
  const [scrolled, setScrolled] = useState(false);  
  const location = useLocation();
  const [navbarHighlight, setNavbarHighlight] = useState(false);

  // Handle scroll for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to the top of the page
    setNavbarHighlight(true);
    const timer = setTimeout(() => setNavbarHighlight(false), 1000); // Remove highlight after 1 second

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [location]);

  return (
    

      <Suspense fallback={<p>Loading...</p>}> {/* Suspense wrapper with Loading fallback */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/form" element={<KYCApp />} />
          <Route path="/kyc" element={<Kyc />} />
          <Route path="*" element={<p>Loading...</p>} />  
        </Routes>
     
      </Suspense>

  );
};

export default App;
