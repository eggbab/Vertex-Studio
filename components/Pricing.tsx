import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Sparkles } from 'lucide-react';

const plans = [
  {
    name: "One-Time Launch",
    price: "3,000,000",
    period: "부터 (1회성)",
    desc: "신규 런칭이나 단기 캠페인을 위한 완벽한 시작입니다. 고퀄리티 디자인과 개발로 임팩트를 남기세요.",
    features: [
      "맞춤형 기획 및 카피라이팅",
      "고해상도 디자인 (Figma)",
      "반응형 웹 개발 (Mobile/PC)",
      "기본 SEO 세팅",
      "GA4 / Pixel 설치 지원",
      "제작 기간: 2주"
    ],
    highlight: false
  },
  {
    name: "Growth Subscription",
    price: "1,500,000",
    period: "/ 월 (구독형)",
    desc: "지속적인 성장을 위한 파트너십. 데이터를 기반으로 매월 디자인과 문구를 최적화하여 전환율을 높입니다.",
    features: [
      "All One-Time Launch 기능 포함",
      "월 2회 A/B 테스트 진행",
      "월간 데이터 분석 리포트 제공",
      "디자인/카피 무제한 부분 수정",
      "전담 그로스 매니저 배정",
      "서버/유지보수 비용 무료"
    ],
    highlight: true
  },
  {
    name: "Enterprise",
    price: "별도 문의",
    period: "",
    desc: "대규모 트래픽과 복잡한 기능이 필요한 기업을 위한 맞춤형 솔루션입니다. 시스템 구축부터 브랜딩까지.",
    features: [
      "대규모 웹사이트 리뉴얼",
      "CMS (관리자 페이지) 구축",
      "3D / WebGL 인터랙션",
      "글로벌(다국어) 사이트 제작",
      "사내 디자인 시스템 구축",
      "연간 유지보수 계약 가능"
    ],
    highlight: false
  }
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-32 bg-white relative z-10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gray-50 rounded-full blur-[100px] -z-10" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-[#3186FF] bg-blue-50/50 rounded-full border border-blue-100 uppercase backdrop-blur-sm">
              <Sparkles className="w-3 h-3" /> Pricing Plans
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-gray-900 mb-8 tracking-tighter leading-tight">
              합리적인 투자, <br className="md:hidden" />확실한 <span className="text-[#3186FF]">ROI</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto break-keep leading-relaxed font-light">
              단발성 제작부터 지속적인 성장을 위한 구독 모델까지.<br/> 비즈니스 단계에 맞는 최적의 플랜을 선택하세요.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative p-10 rounded-[2.5rem] flex flex-col h-full transition-all duration-500 group ${
                plan.highlight 
                  ? 'bg-[#111827] text-white shadow-2xl shadow-blue-900/30 scale-100 lg:scale-110 z-10' 
                  : 'bg-white text-gray-900 border border-gray-100 shadow-xl shadow-gray-200/50 hover:border-gray-300 hover:shadow-2xl hover:-translate-y-1'
              }`}
            >
              {plan.highlight && (
                <>
                  <div className="absolute -inset-[1px] bg-gradient-to-b from-blue-500 to-purple-600 rounded-[2.5rem] -z-10 blur-[1px] opacity-70" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg border border-white/20">
                    <Star className="w-3 h-3 fill-white" /> Popular Choice
                  </div>
                </>
              )}

              <div className="mb-8">
                <h3 className={`text-xl font-bold mb-4 ${plan.highlight ? 'text-gray-200' : 'text-gray-900'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl md:text-5xl font-display font-bold tracking-tight">{plan.price}</span>
                  <span className={`text-sm ${plan.highlight ? 'text-gray-400' : 'text-gray-500'}`}>{plan.period}</span>
                </div>
                <p className={`text-sm leading-relaxed ${plan.highlight ? 'text-gray-400' : 'text-gray-500'}`}>
                  {plan.desc}
                </p>
              </div>

              <div className={`h-px w-full mb-8 ${plan.highlight ? 'bg-white/10' : 'bg-gray-100'}`} />

              <ul className="flex-1 space-y-5 mb-12">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <div className={`mt-0.5 min-w-5 min-h-5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-blue-500/20 text-[#3186FF]' : 'bg-blue-50 text-[#3186FF]'}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className={`text-sm font-medium ${plan.highlight ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-5 rounded-2xl font-bold text-sm tracking-wide transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                  plan.highlight 
                    ? 'bg-white text-black hover:bg-gray-100 shadow-lg' 
                    : 'bg-[#111827] text-white hover:bg-black shadow-lg shadow-gray-300/50'
                }`}
              >
                {plan.highlight ? '지금 구독 시작하기' : '문의하기'}
              </button>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
            <p className="text-gray-400 text-xs font-medium bg-gray-50 inline-block px-4 py-2 rounded-lg">
                * 모든 가격은 VAT 별도입니다. 초기 세팅비는 프로젝트 규모에 따라 별도 산정될 수 있습니다.
            </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;