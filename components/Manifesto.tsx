import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"]
  });

  const words = "Traditional web design is heavy. It's cluttered. It's grounded by convention. At HyperLift, we cut the tethers. We build weightless, high-velocity digital experiences that float above the noise and pull your customers into orbit.".split(" ");

  return (
    <section ref={containerRef} className="relative py-32 md:py-60 px-6 md:px-20 z-10 min-h-[80vh] flex items-center justify-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-7xl leading-[1.1] font-bold flex flex-wrap gap-x-4 gap-y-2 justify-center text-center">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(scrollYProgress, [start, end], [20, 0]);
            
            return (
              <motion.span 
                key={i}
                style={{ opacity, y }}
                className="inline-block"
              >
                {word}
              </motion.span>
            );
          })}
        </h2>
      </div>
    </section>
  );
};

export default Manifesto;