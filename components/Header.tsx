import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger change slightly earlier for smoother transition
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Animation variants for cleaner code and smoother transitions
  const headerVariants = {
    top: {
      y: 0,
      width: "100%",
      maxWidth: "1400px",
      backgroundColor: "rgba(255, 255, 255, 0)",
      borderColor: "rgba(255, 255, 255, 0)",
      borderRadius: "0px",
      paddingTop: "24px",
      paddingBottom: "24px",
      paddingLeft: "40px",
      paddingRight: "40px",
      boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    },
    scrolled: {
      y: 12, // Move down slightly to float
      width: "95%",
      maxWidth: "960px", // Limit width to create pill shape
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      borderColor: "rgba(255, 255, 255, 0.5)",
      borderRadius: "9999px",
      paddingTop: "12px",
      paddingBottom: "12px",
      paddingLeft: "28px",
      paddingRight: "8px", // Tighter right padding for button group
      boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)",
    }
  };

  return (
    <>
      {/* Container - Pointer events none ensures clicks pass through the empty space around header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <motion.header 
          initial="top"
          animate={scrolled ? "scrolled" : "top"}
          variants={headerVariants}
          transition={{ duration: 0.5, type: "spring", stiffness: 120, damping: 20 }}
          className="pointer-events-auto flex items-center justify-between backdrop-blur-xl border border-transparent overflow-hidden"
        >
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display font-bold text-xl tracking-tighter text-gray-900 cursor-pointer select-none shrink-0 whitespace-nowrap"
          >
            VERTEX STUDIO
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-6 text-[14px] font-medium tracking-wide text-gray-600">
            {['Process', 'Use Cases', 'Pricing', 'FAQ'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', ''))} 
                className="hover:text-black hover:bg-black/5 px-4 py-2 rounded-full transition-all cursor-hover whitespace-nowrap"
              >
                {item === 'Pricing' ? <span className="text-[#3186FF] font-semibold">{item}</span> : item}
              </button>
            ))}
          </nav>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button className="px-5 py-2.5 text-xs font-bold text-gray-900 bg-transparent hover:bg-gray-100 rounded-full transition-colors cursor-hover whitespace-nowrap hidden lg:block">
              로그인
            </button>
            <button className="px-6 py-2.5 bg-[#111827] hover:bg-black text-white text-xs font-bold rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105 cursor-hover whitespace-nowrap">
              무료 진단
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gray-900 cursor-hover p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.header>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-32 px-6 flex flex-col gap-8 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              <button onClick={() => scrollToSection('process')} className="text-4xl font-display font-bold text-gray-900 text-left tracking-tighter hover:text-[#3186FF] transition-colors">Process</button>
              <button onClick={() => scrollToSection('usecases')} className="text-4xl font-display font-bold text-gray-900 text-left tracking-tighter hover:text-[#3186FF] transition-colors">Cases</button>
              <button onClick={() => scrollToSection('pricing')} className="text-4xl font-display font-bold text-[#3186FF] text-left tracking-tighter">Pricing</button>
              <button onClick={() => scrollToSection('faq')} className="text-4xl font-display font-bold text-gray-900 text-left tracking-tighter hover:text-[#3186FF] transition-colors">FAQ</button>
            </nav>
            <div className="h-px bg-gray-200 my-2" />
            <div className="flex flex-col gap-3">
               <button className="w-full py-4 bg-gray-100 text-gray-900 font-bold rounded-2xl text-lg hover:bg-gray-200 transition-colors">
                클라이언트 로그인
              </button>
              <button className="w-full py-4 bg-[#111827] text-white font-bold rounded-2xl text-lg shadow-xl hover:bg-black transition-colors">
                지금 매출 올리기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;