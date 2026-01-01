import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FloatingElements from './components/FloatingElements';
import GravityIcons from './components/GravityIcons';
import FeatureScroll from './components/FeatureScroll';
import VideoSection from './components/VideoSection';
import UseCases from './components/UseCases';
import Solutions from './components/Solutions';
import Pricing from './components/Pricing';
import BlogSection from './components/BlogSection';
import BottomCTA from './components/BottomCTA';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { motion, useScroll, useSpring } from 'framer-motion';

function App() {
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
      </main>

      <Footer />
    </div>
  );
}

export default App;