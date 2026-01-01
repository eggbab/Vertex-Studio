import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, DollarSign } from 'lucide-react';

const cases = [
  {
    id: 1,
    title: "DB 수집 및 리드 생성",
    subtitle: "고관여 서비스 / B2B",
    desc: "신청하지 않고는 못 배기게 만듭니다. 잠재 고객의 정보를 최대한 많이, 그리고 정확하게 수집하는 최적화된 설계를 제공합니다.",
    image: "https://images.unsplash.com/photo-1553877616-15236ed3634d?q=80&w=2670&auto=format&fit=crop",
    icon: Users,
    stat: "리드 수집 3.5배 증가",
    colSpan: "md:col-span-2"
  },
  {
    id: 2,
    title: "상품 판매 (커머스)",
    subtitle: "건기식 / 뷰티",
    desc: "상세페이지를 넘어선 랜딩페이지의 힘. 제품의 매력을 극대화합니다.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2670&auto=format&fit=crop",
    icon: DollarSign,
    stat: "ROAS 200% 개선",
    colSpan: "md:col-span-1"
  },
  {
    id: 3,
    title: "신규 서비스 런칭",
    subtitle: "SaaS / 스타트업",
    desc: "초기 얼리어답터 확보를 위한 강력한 임팩트와 명확한 Value Proposition을 전달합니다.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop",
    icon: TrendingUp,
    stat: "사전 예약 1만명 달성",
    colSpan: "md:col-span-1"
  },
  {
    id: 4,
    title: "브랜드 아이덴티티",
    subtitle: "엔터프라이즈",
    desc: "기업의 가치를 높이는 독보적인 비주얼 스토리텔링을 구축합니다.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop",
    icon: ArrowRight,
    stat: "브랜드 인지도 상승",
    colSpan: "md:col-span-2"
  }
];

const UseCases: React.FC = () => {
  return (
    <section id="usecases" className="py-40 bg-white border-t border-gray-100 relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-display font-bold text-gray-900 mb-8 tracking-tighter">
              Proven <span className="text-gray-300">Scenarios</span>
            </h2>
            <p className="text-gray-500 text-xl break-keep leading-relaxed font-light">
              비즈니스 목표가 무엇이든, Vertex Studio는 그 목표를 달성하기 위한 가장 확실한 지름길을 설계합니다.
            </p>
          </div>
          <div className="hidden md:flex">
             <button className="px-8 py-4 rounded-full border border-gray-200 text-base font-bold hover:bg-black hover:text-white hover:border-black transition-all cursor-hover shadow-sm">
                성공 사례 더보기
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[500px]">
          {cases.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`group relative overflow-hidden rounded-[2.5rem] bg-gray-100 cursor-pointer ${item.colSpan}`}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-8 left-8">
                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm font-bold">
                    <item.icon className="w-4 h-4" />
                    {item.stat}
                 </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="block text-sm font-bold text-[#3186FF] uppercase tracking-widest mb-3">{item.subtitle}</span>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                  {item.desc}
                </p>
                
                <div className="mt-6 flex items-center gap-2 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  View Case Study <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;