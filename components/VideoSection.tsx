import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

const VideoSection: React.FC = () => {
  return (
    <section className="py-32 px-4 md:px-8 bg-white relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-20 px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-8 tracking-tighter"
          >
            감각이 아닌 <span className="text-[#3186FF]">데이터</span>로 증명합니다
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 max-w-3xl mx-auto break-keep leading-relaxed font-light"
          >
            대부분의 웹사이트는 방문자의 98%를 놓치고 있습니다.<br/>
            Vertex Studio는 그 잃어버린 <strong className="text-gray-900 font-medium">98%를 고객으로 되돌리는 프로세스</strong>를 설계합니다.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-video rounded-[3rem] overflow-hidden bg-gray-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] group cursor-pointer border border-gray-100 mx-auto"
        >
          {/* Dashboard/Analytics Imagery */}
          <div className="absolute inset-0 bg-gray-50">
             <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" 
              alt="Analytics Dashboard showing growth" 
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
            />
            <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>

          {/* Centered Stats Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 group-hover:bg-white/40 transition-all duration-300 shadow-2xl cursor-hover">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center pl-1 shadow-lg text-[#3186FF]">
                <BarChart3 className="w-8 h-8 md:w-10 md:h-10" />
              </div>
            </div>
          </div>

          {/* Bottom Label */}
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
            <div className="bg-white/90 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <p className="text-gray-900 font-mono text-xs md:text-sm uppercase tracking-widest font-bold">평균 전환율 350% 상승 달성</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;