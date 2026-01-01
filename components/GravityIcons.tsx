import React from 'react';
import { motion } from 'framer-motion';
import { Brain, PenTool, Target, Zap, MousePointerClick, Search, LineChart } from 'lucide-react';

const methodologies = [
  { Icon: Brain, label: "고객 심리학", delay: 0 },
  { Icon: PenTool, label: "카피라이팅", delay: 0.2 },
  { Icon: Target, label: "타겟 분석", delay: 0.5 },
  { Icon: Zap, label: "로딩 속도", delay: 0.1 },
  { Icon: LineChart, label: "데이터 분석", delay: 0.3 },
  { Icon: MousePointerClick, label: "행동 유도(CTA)", delay: 0.6 },
  { Icon: Search, label: "SEO 최적화", delay: 0.4 },
];

const GravityIcons: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-gray-900">
          <span className="text-[#3186FF]">Conversion</span> Stack
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto break-keep leading-relaxed">
          단순히 예쁜 디자인은 팔리지 않습니다.<br/>
          Vertex Studio는 7가지 핵심 요소를 결합하여 <strong>'팔리는 구조'</strong>를 설계합니다.
        </p>
      </div>

      <div className="relative w-full max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-8 md:gap-12 px-4 pb-12">
        {methodologies.map(({ Icon, label, delay }, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center gap-4"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
            }}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-100/50 flex items-center justify-center text-gray-400 hover:border-[#3186FF] hover:text-[#3186FF] hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
              <Icon className="w-8 h-8 md:w-10 md:h-10 transition-colors" strokeWidth={1.5} />
            </div>
            <span className="text-sm font-bold text-gray-600 font-display">{label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GravityIcons;