import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FloatingItem } from '../types';
import { random } from '../lib/utils';

const FloatingElements: React.FC = () => {
  // Generate random shapes
  const shapes: FloatingItem[] = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: random(0, 100),
      y: random(0, 100),
      size: random(2, 4), // Smaller, subtle particles
      rotation: random(0, 360),
      shape: Math.random() > 0.5 ? 'circle' : 'square'
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {shapes.map((item) => (
        <motion.div
          key={item.id}
          className="absolute bg-blue-500/10 backdrop-blur-sm"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: item.size,
            height: item.size,
            borderRadius: item.shape === 'circle' ? '50%' : '2px',
          }}
          animate={{
            y: [0, random(-50, 50), 0],
            x: [0, random(-20, 20), 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: random(10, 20),
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
    </div>
  );
};

export default FloatingElements;