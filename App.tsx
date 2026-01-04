import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import FloatingElements from './components/FloatingElements';
import GravityIcons from './components/GravityIcons';
import FeatureScroll from './components/FeatureScroll';
import VideoSection from './components/VideoSection';
import UseCases from './components/UseCases';
import Solutions from './components/Solutions';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import BlogSection from './components/BlogSection';
import BottomCTA from './components/BottomCTA';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BlogMain from './components/BlogMain';
import BlogPost1 from './components/BlogPost1';
import BlogPost2 from './components/BlogPost2';
import BlogPost3 from './components/BlogPost3';
import BlogPost4 from './components/BlogPost4';
import BlogPost5 from './components/BlogPost5';
import BlogPost6 from './components/BlogPost6';
import ScrollToTop from './components/ScrollToTop';
import { motion, useScroll, useSpring } from 'framer-motion';

function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-white min-h-screen text-gray-900 selection:bg-[#3186FF] selection:text-white cursor-none font-sans">
      <CustomCursor />
      <FloatingElements />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#3186FF] origin-left z-50"
        style={{ scaleX }}
      />

      <Header />
      
      <main>
        <Hero />
        <VideoSection />
        <GravityIcons />
        <FeatureScroll />
        <UseCases />
        <Solutions />
        <Pricing />
        <BlogSection />
        <BottomCTA />
         <FAQ />
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogMain />} />
        <Route path="/blog/conversion-design-physics" element={<BlogPost1 />} />
        <Route path="/blog/webgl-depth-technology" element={<BlogPost2 />} />
        <Route path="/blog/2026-design-trends" element={<BlogPost3 />} />
        <Route path="/blog/mobile-first-is-dead" element={<BlogPost4 />} />
        <Route path="/blog/speed-equals-revenue" element={<BlogPost5 />} />
        <Route path="/blog/accessibility-competitiveness" element={<BlogPost6 />} />
      </Routes>
    </Router>
  );
}

export default App;