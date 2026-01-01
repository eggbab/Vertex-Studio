import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, Orbit, Globe } from 'lucide-react';

const services = [
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Launch Velocity",
    desc: "Landing pages engineered for speed. Sub-second load times that keep engagement high."
  },
  {
    icon: <Orbit className="w-8 h-8" />,
    title: "Orbital Design",
    desc: "Visuals that captivate. UX that guides users naturally toward conversion centers."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Kinetic Copy",
    desc: "Words that move. Narrative structures designed to overcome inertia and drive action."
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Universal Scale",
    desc: "Responsive architectures that maintain perfect gravity across all device atmospheres."
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 border-t border-white/20 pt-8 flex justify-between items-end"
        >
          <h3 className="text-xl font-display font-bold uppercase tracking-widest text-white/50">Our Capabilities</h3>
          <span className="hidden md:block text-white/30 font-mono">01 — 04</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.03)" }}
              className="group relative p-8 md:p-12 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden transition-colors"
            >
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500 text-white/50 group-hover:text-white">
                {service.icon}
              </div>
              
              <div className="relative z-10 mt-20">
                <h4 className="text-2xl md:text-3xl font-display font-bold mb-4">{service.title}</h4>
                <p className="text-white/60 leading-relaxed text-lg">{service.desc}</p>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;