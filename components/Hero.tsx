import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TypingText from './TypingText';
import { TrendingUp, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.95]);

  // Canvas Animation Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;

    const particles: { x: number; y: number; originX: number; originY: number }[] = [];
    const gap = 30; // Grid spacing
    const radius = 1; // Dot radius

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      particles.length = 0;
      
      // Create grid of particles
      const cols = Math.floor(canvas.width / gap);
      const rows = Math.floor(canvas.height / gap);
      const offsetX = (canvas.width - cols * gap) / 2;
      const offsetY = (canvas.height - rows * gap) / 2;

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * gap + offsetX;
          const y = j * gap + offsetY;
          particles.push({ x, y, originX: x, originY: y });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#9CA3AF'; // Base dot color (gray-400)
      
      particles.forEach((p) => {
        // Calculate distance from mouse
        const dx = mouseX - p.originX;
        const dy = mouseY - p.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 150;
        
        // Interaction
        let scale = 1;
        let alpha = 0.2; // Default opacity
        
        if (dist < interactionRadius) {
          const force = (interactionRadius - dist) / interactionRadius;
          scale = 1 + force * 2.5; // Scale up when close
          alpha = 0.2 + force * 0.5; // Increase opacity when close
          
          // Optional: Slight movement away from cursor
          // const angle = Math.atan2(dy, dx);
          // const moveDist = force * 10;
          // p.x = p.originX + Math.cos(angle) * moveDist;
          // p.y = p.originY + Math.sin(angle) * moveDist;
        } else {
          p.x = p.originX;
          p.y = p.originY;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(156, 163, 175, ${alpha})`; // gray-400 with dynamic alpha
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    init();
    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden z-10 pt-32 pb-20 bg-white">
      
      {/* Interactive Dot Grid Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <motion.div 
        style={{ y: y1, opacity, scale }}
        className="text-center z-10 px-4 max-w-7xl mx-auto flex flex-col items-center w-full"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
           <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_5px_20px_rgba(49,134,255,0.15)] transition-all cursor-default group">
             <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3186FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3186FF]"></span>
              </span>
             <span className="text-[13px] font-bold tracking-widest text-gray-600 uppercase font-display group-hover:text-[#3186FF] transition-colors">Conversion Rate Optimization</span>
           </div>
        </motion.div>

        {/* Typing Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 h-8 flex items-center justify-center"
        >
          <TypingText />
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display text-[13vw] md:text-[8.5vw] leading-[0.9] font-bold tracking-tighter text-[#111827] mb-12 text-center break-keep relative"
        >
          Design for
          <br />
          <span className="relative inline-block">
             <span className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-purple-100 blur-2xl opacity-50"></span>
             <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-[#3186FF] via-blue-600 to-[#2563eb]">
              Revenue
             </span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-2xl text-gray-500 font-normal max-w-3xl mx-auto leading-relaxed break-keep mb-16 px-4"
        >
          예쁜 홈페이지는 잊으세요. 우리는 오직 <strong className="text-gray-900 font-semibold">'팔리는'</strong> 랜딩페이지만 만듭니다.
          <br className="hidden md:block"/>
          심리학 기반의 카피라이팅과 데이터 주도형 디자인으로 고객을 설득합니다.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto px-6"
        >
          <button className="group relative px-9 py-5 bg-[#111827] text-white rounded-full text-base font-bold tracking-wide overflow-hidden transition-all hover:scale-105 shadow-2xl shadow-blue-900/20 cursor-hover min-w-[220px]">
            <span className="relative z-10 flex items-center justify-center gap-2">
              지금 매출 올리기 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1"/>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          <button className="group px-9 py-5 bg-white text-gray-900 border border-gray-200 rounded-full text-base font-semibold tracking-wide hover:bg-gray-50 transition-all flex items-center justify-center gap-2 cursor-hover min-w-[220px] shadow-sm hover:shadow-lg">
            <TrendingUp className="w-4 h-4 text-[#3186FF] group-hover:scale-110 transition-transform" />
            전환율 개선 사례
          </button>
        </motion.div>
      </motion.div>

      {/* Dynamic Background Gradients - Reduced opacity to blend with dots */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-20">
         <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.2, 0.3],
              x: [0, 50, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-gradient-to-br from-blue-50/80 to-purple-50/80 rounded-full blur-[120px] mix-blend-multiply" 
         />
         <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.3, 0.2],
              x: [0, -30, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-gradient-to-tl from-cyan-50/80 to-blue-50/80 rounded-full blur-[120px] mix-blend-multiply" 
         />
      </div>
    </div>
  );
};

export default Hero;