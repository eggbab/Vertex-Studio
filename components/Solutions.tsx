import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Rocket, Repeat } from 'lucide-react';

const Solutions: React.FC = () => {
  return (
    <section className="border-t border-gray-100 bg-white relative z-10">
      <div className="flex flex-col lg:flex-row">
        
        {/* Left Side - Project Base */}
        <div className="flex-1 relative border-b lg:border-b-0 lg:border-r border-gray-100 min-h-[700px] flex items-center justify-center overflow-hidden group hover:bg-[#F8FAFC] transition-colors duration-700 px-6 py-20">
          
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[150px]" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
            <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-10 text-[#3186FF] border border-gray-100 shadow-xl shadow-blue-50"
            >
                <Rocket className="w-10 h-10" />
            </motion.div>
            <h3 className="text-5xl md:text-7xl font-display font-bold text-gray-900 mb-8 tracking-tighter leading-[0.9]">
              One-Time<br/>Project
            </h3>
            <div className="w-12 h-1 bg-[#3186FF] mb-8 rounded-full opacity-20"></div>
            <p className="text-xl text-gray-500 mb-12 leading-relaxed font-light break-keep">
              단 한 번의 제작으로도 강력합니다.<br/>
              기획, 디자인, 개발, SEO까지 완벽하게 세팅된 <strong className="text-gray-900">고성능 랜딩페이지</strong>를 2주 안에 런칭해드립니다.
            </p>
            <button className="group flex items-center gap-3 px-10 py-5 bg-[#3186FF] hover:bg-blue-600 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-xl shadow-blue-200/50 cursor-hover">
              프로젝트 의뢰하기
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right Side - Subscription */}
        <div className="flex-1 relative min-h-[700px] flex items-center justify-center overflow-hidden group hover:bg-[#FAF5FF] transition-colors duration-700 px-6 py-20">
          
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-100/50 rounded-full blur-[150px]" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
             <motion.div 
                whileHover={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-10 text-purple-600 border border-gray-100 shadow-xl shadow-purple-50"
            >
                <Repeat className="w-10 h-10" />
            </motion.div>
            <h3 className="text-5xl md:text-7xl font-display font-bold text-gray-900 mb-8 tracking-tighter leading-[0.9]">
              Growth<br/>Partner
            </h3>
            <div className="w-12 h-1 bg-purple-600 mb-8 rounded-full opacity-20"></div>
            <p className="text-xl text-gray-500 mb-12 leading-relaxed font-light break-keep">
              랜딩페이지는 만드는 것이 끝이 아닙니다.<br/>
              매월 데이터 분석을 통해 디자인과 카피를 개선하는 <strong className="text-gray-900">전환율 최적화(CRO) 구독 서비스</strong>입니다.
            </p>
            <button className="group flex items-center gap-3 px-10 py-5 bg-white border border-gray-200 hover:border-gray-400 text-gray-900 font-bold rounded-full transition-all transform hover:scale-105 shadow-sm hover:shadow-lg cursor-hover">
              구독 플랜 알아보기
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Solutions;