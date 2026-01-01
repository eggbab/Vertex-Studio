import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MousePointer2 } from 'lucide-react';

const funnelSteps = [
  {
    id: 1,
    title: "The Hook",
    subtitle: "3초의 법칙",
    desc: "방문자가 사이트에 머무를지 결정하는 시간은 단 3초입니다. 강력한 헤드라인과 직관적인 비주얼로 고객의 시선을 즉시 사로잡아 이탈을 막습니다.",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2670&auto=format&fit=crop",
    status: "Attention"
  },
  {
    id: 2,
    title: "The Story",
    subtitle: "설득의 논리",
    desc: "고객의 문제(Pain Point)를 짚어주고, 우리의 솔루션이 왜 유일한 해결책인지 증명합니다. 스크롤을 내릴수록 사고 싶어지는 심리적 서사를 구축합니다.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
    status: "Interest"
  },
  {
    id: 3,
    title: "Social Proof",
    subtitle: "신뢰 구축",
    desc: "리뷰, 파트너사, 성과 지표를 전략적으로 배치하여 의심을 확신으로 바꿉니다. '나만 모르고 있나?'라는 긍정적인 불안감을 조성하여 신뢰도를 높입니다.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2632&auto=format&fit=crop",
    status: "Trust"
  },
  {
    id: 4,
    title: "Call To Action",
    subtitle: "행동 유도",
    desc: "망설임 없는 클릭을 유도합니다. 버튼의 위치, 컬러, 문구 하나까지 A/B 테스트 데이터에 기반하여 설계된 '저항 없는 결제/문의' 경로를 완성합니다.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    status: "Action"
  }
];

const FeatureScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const elements = document.querySelectorAll('.funnel-text-item');
      const viewCenter = window.scrollY + window.innerHeight * 0.5;
      
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;
        
        if (viewCenter >= elementTop && viewCenter < elementBottom) {
          setActiveFeature(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="process" className="bg-white py-24 md:py-40 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-32">
         <h2 className="text-5xl md:text-7xl font-display font-bold text-gray-900 mb-8 tracking-tighter">Winning <span className="text-[#3186FF]">Funnel</span> Strategy</h2>
         <p className="text-2xl text-gray-500 font-light max-w-2xl">방문자를 충성 고객으로 만드는 Vertex만의<br/> 4단계 전환 공식</p>
      </div>

      <div ref={containerRef} className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32">
        
        {/* Left: Scrolling Text Content */}
        <div className="flex flex-col">
          {funnelSteps.map((step, idx) => (
            <div 
              key={step.id} 
              className={`funnel-text-item min-h-[80vh] flex flex-col justify-center transition-all duration-700 ${activeFeature === idx ? 'opacity-100 translate-x-0' : 'opacity-20 translate-x-0 blur-sm'}`}
            >
              <div className="flex items-center gap-4 mb-8">
                 <span className={`font-mono text-sm font-bold tracking-widest uppercase ${activeFeature === idx ? 'text-[#3186FF]' : 'text-gray-300'}`}>Step 0{idx + 1}</span>
                 <div className={`h-px flex-1 ${activeFeature === idx ? 'bg-[#3186FF]' : 'bg-gray-200'}`}></div>
              </div>
              
              <h3 
                className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-2 cursor-pointer tracking-tighter" 
                onClick={() => setActiveFeature(idx)}
              >
                {step.title}
              </h3>
              <p className="text-xl text-[#3186FF] font-medium mb-8">{step.subtitle}</p>

              <div className="max-w-lg">
                <p className="text-xl md:text-2xl text-gray-500 leading-relaxed break-keep font-light">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
          <div className="h-[20vh] hidden lg:block"></div>
        </div>

        {/* Right: Sticky Visual */}
        <div className="hidden lg:block relative h-full">
          <div className="sticky top-[15vh] h-[70vh] w-full flex items-center">
            <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200 border border-gray-100 bg-gray-50">
              {funnelSteps.map((step, idx) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: activeFeature === idx ? 1 : 0,
                    scale: activeFeature === idx ? 1 : 1.1,
                    zIndex: activeFeature === idx ? 10 : 0
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
                  
                  {/* Floating Context Card */}
                  <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl flex justify-between items-center transform transition-transform duration-500 hover:scale-[1.02]">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <MousePointer2 className="w-5 h-5 text-white" />
                        <span className="text-xs font-mono text-white/70 uppercase tracking-widest font-semibold">Funnel Stage</span>
                      </div>
                      <p className="text-white font-bold text-2xl tracking-tight">{step.status}</p>
                    </div>
                    <div className="h-14 w-14 rounded-full border border-white/20 bg-white/10 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeatureScroll;