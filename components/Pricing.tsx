import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: "랜딩 제작 패키지",
    price: "1,990,000",
    period: "원 (1회)",
    desc: "커스텀 원페이지 랜딩 제작. 문의폼, 채널톡, GA4 세팅까지 올인원 패키지로 바로 런칭하세요.",
    features: [
      "커스텀 원페이지 랜딩 제작",
      "문의폼 또는 카톡/전화 연결",
      "채널톡/카카오채널 설치",
      "GA4 + 이벤트 세팅",
      "도메인 연결 1회",
      "7일 텍스트 수정 무제한"
    ],
    highlight: false,
    cta: "견적 확인하기",
    link: "/quote"
  },
  {
    name: "월 운영 구독",
    price: "290,000",
    period: "원 / 월",
    desc: "호스팅 + 수정 무제한. 문구·사진·FAQ 등 운영에 필요한 모든 변경을 48시간 내 처리해 드립니다.",
    features: [
      "호스팅/배포/점검 포함",
      "문구·가격·사진 교체 무제한",
      "후기/FAQ/링크 변경 무제한",
      "48시간 SLA 보장",
      "동시 진행 1건 (Queue 관리)",
      "언제든 해지 가능"
    ],
    highlight: true,
    cta: "구독 포함 견적 보기",
    link: "/quote"
  },
  {
    name: "추가 옵션",
    price: "390,000",
    period: "원~",
    desc: "필요한 기능만 선택하세요. 문의 자동정리, 추가 페이지 등 옵션을 자유롭게 조합할 수 있습니다.",
    features: [
      "문의 자동정리 (+390,000원)",
      "→ 구글시트 저장 + 이메일 알림",
      "추가 페이지 1개 (+690,000원)",
      "→ 이벤트/프로모션 랜딩",
      "옵션은 견적에서 선택",
      "조합에 따라 할인 적용"
    ],
    highlight: false,
    cta: "옵션 선택하기",
    link: "/quote"
  }
];

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section id="pricing" className="py-20 md:py-32 bg-white relative z-10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gray-50 rounded-full blur-[100px] -z-10" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16 md:mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-[#3186FF] bg-blue-50/50 rounded-full border border-blue-100 uppercase backdrop-blur-sm">
              <Sparkles className="w-3 h-3" /> Pricing Plans
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-gray-900 mb-6 md:mb-8 tracking-tighter leading-tight">
              투명한 <span className="text-[#3186FF]">정찰가</span>, <br className="md:hidden" />깔끔한 견적
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto break-keep leading-relaxed font-light">
              옵션 선택만으로 실시간 견적 확인.<br/>복잡한 협의 없이 바로 결제하고 제작을 시작하세요.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col h-full transition-all duration-500 group ${
                plan.highlight 
                  ? 'bg-[#111827] text-white shadow-2xl shadow-blue-900/30 scale-100 lg:scale-110 z-10' 
                  : 'bg-white text-gray-900 border border-gray-100 shadow-xl shadow-gray-200/50 hover:border-gray-300 hover:shadow-2xl hover:-translate-y-1'
              }`}
            >
              {plan.highlight && (
                <>
                  <div className="absolute -inset-[1px] bg-gradient-to-b from-blue-500 to-purple-600 rounded-[1.5rem] md:rounded-[2.5rem] -z-10 blur-[1px] opacity-70" />
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
                onClick={() => navigate(plan.link)}
                className={`w-full py-5 rounded-2xl font-bold text-sm tracking-wide transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${
                  plan.highlight 
                    ? 'bg-white text-black hover:bg-gray-100 shadow-lg' 
                    : 'bg-[#111827] text-white hover:bg-black shadow-lg shadow-gray-300/50'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
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