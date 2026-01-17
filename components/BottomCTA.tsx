import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const BottomCTA: React.FC = () => {
  return (
    <section className="px-4 md:px-6 pb-6 bg-gray-50">
      <div className="relative rounded-[2.5rem] overflow-hidden bg-[#111827] text-white mx-auto max-w-[1400px]">

        {/* Animated Particles */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent" />
          {/* Stars */}
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-1/2 left-2/3 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-40 animate-pulse delay-75"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white rounded-full opacity-50 animate-pulse delay-150"></div>
        </div>

        <div className="relative z-10 py-32 md:py-48 px-6 flex flex-col items-center text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10 mx-auto backdrop-blur-lg shadow-[0_0_40px_-10px_rgba(49,134,255,0.3)]">
              <Zap className="w-6 h-6 text-[#3186FF] fill-current" />
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter mb-8 max-w-4xl mx-auto leading-[1.1] break-keep">
            <span className="whitespace-nowrap">아직도 방문자를 놓치고 계신가요?</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              지금 바로 매출을 올려보세요.
            </span>
          </h2>

          <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-12 font-light leading-relaxed">
            고민하는 사이에도 경쟁사는 고객을 전환시키고 있습니다.<br />
            더 이상 기회를 잃지 마세요. Vertex Studio가 돕겠습니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md mx-auto">
            <button className="flex-1 px-8 py-4 bg-white text-black text-base font-bold rounded-full hover:bg-gray-100 transition-all hover:scale-105 cursor-hover shadow-xl shadow-white/10 whitespace-nowrap">
              무료 상담 신청하기
            </button>
            <button className="flex-1 px-8 py-4 bg-transparent border border-white/20 text-white text-base font-bold rounded-full hover:bg-white/10 transition-all hover:scale-105 cursor-hover whitespace-nowrap">
              1분 만에 견적 받기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomCTA;