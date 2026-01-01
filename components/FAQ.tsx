import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, TrendingUp, Clock, Shield, Zap } from 'lucide-react';

const faqs = [
  {
    question: "Vertex Studio는 어떤 회사인가요?",
    answer: "Vertex Studio는 오직 '팔리는' 랜딩페이지 제작에 특화된 디자인 스튜디오입니다. 심리학 기반의 카피라이팅과 데이터 주도형 디자인으로 고객을 설득하여, 대부분의 웹사이트가 놓치는 90%의 방문자를 실제 고객으로 전환시키는 프로세스를 설계합니다.",
    icon: HelpCircle,
    category: "회사 소개"
  },
  {
    question: "제작 기간은 얼마나 걸리나요?",
    answer: "One-Time Launch 프로젝트의 경우 평균 2주 내외로 완료됩니다. 기획(3일), 디자인(5일), 개발(5일), 최종 검수 및 런칭(2일) 단계로 진행되며, 복잡한 기능이나 대규모 프로젝트의 경우 규모에 따라 기간이 조정될 수 있습니다.",
    icon: Clock,
    category: "프로세스"
  },
  {
    question: "전환율이 실제로 개선되나요?",
    answer: "네, 데이터로 증명됩니다. Vertex Studio의 랜딩페이지는 평균 350%의 전환율 상승을 달성했습니다. A/B 테스트와 월간 데이터 분석을 통해 지속적으로 최적화하며, ROAS 200% 개선, 리드 수집 3.5배 증가 등 구체적인 성과를 보여드립니다.",
    icon: TrendingUp,
    category: "성과"
  },
  {
    question: "One-Time Launch와 Growth Subscription의 차이점은?",
    answer: "One-Time Launch는 단 한 번의 제작으로 완성된 고성능 랜딩페이지를 2주 안에 런칭하는 1회성 프로젝트입니다. Growth Subscription은 매월 데이터 분석을 통해 디자인과 카피를 지속적으로 개선하는 구독형 서비스로, 전담 그로스 매니저가 배정되어 월 2회 A/B 테스트를 진행합니다.",
    icon: Zap,
    category: "서비스"
  },
  {
    question: "어떤 산업에 특화되어 있나요?",
    answer: "특정 산업에 국한되지 않고 다양한 분야에서 성공 사례를 보유하고 있습니다. 주로 고관여 B2B 서비스(리드 생성), 건기식/뷰티 커머스(상품 판매), SaaS/스타트업(신규 런칭), 엔터프라이즈(브랜드 아이덴티티) 등 비즈니스 목표에 맞는 최적화 솔루션을 제공합니다.",
    icon: HelpCircle,
    category: "서비스"
  },
  {
    question: "가격은 어떻게 되나요?",
    answer: "One-Time Launch는 300만원부터 시작하며, Growth Subscription은 월 150만원입니다. Enterprise는 대규모 프로젝트 특성상 별도 견적을 제공합니다. 모든 가격은 VAT 별도이며, 초기 세팅비는 프로젝트 규모에 따라 별도 산정될 수 있습니다.",
    icon: Shield,
    category: "가격"
  },
  {
    question: "수정 및 유지보수는 어떻게 되나요?",
    answer: "Growth Subscription 구독 시 디자인/카피 무제한 부분 수정과 서버/유지보수 비용이 무료로 제공됩니다. One-Time Launch 프로젝트 완료 후에도 별도 유지보수 계약을 통해 지원 가능하며, 6개월간 기본적인 기술 지원을 제공합니다.",
    icon: Shield,
    category: "지원"
  },
  {
    question: "작업 시작 전에 어떤 준비가 필요한가요?",
    answer: "비즈니스 목표, 타겟 고객, 제품/서비스 정보, 브랜드 가이드라인(있는 경우), 경쟁사 분석 자료 등을 공유해주시면 됩니다. 상세한 브리핑을 통해 프로젝트 범위와 목표를 명확히 설정한 후 작업을 시작합니다.",
    icon: HelpCircle,
    category: "프로세스"
  }
];

const categories = ["전체", "회사 소개", "서비스", "성과", "프로세스", "가격", "지원"];

const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFAQs = activeCategory === "전체" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-32 bg-white border-t border-gray-100 relative z-10">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-purple-50/30 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-[#3186FF] bg-blue-50/50 rounded-full border border-blue-100 uppercase backdrop-blur-sm">
              <HelpCircle className="w-3 h-3" /> Frequently Asked Questions
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-gray-900 mb-8 tracking-tighter leading-tight">
              궁금한 점이<br className="md:hidden" /> 있으신가요?
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto break-keep leading-relaxed font-light">
              Vertex Studio에 대해 가장 많이 묻는 질문들입니다.<br/>
              더 궁금한 점이 있다면 언제든 연락주세요.
            </p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-hover ${
                activeCategory === category
                  ? "bg-[#111827] text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence mode="wait">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={`${activeCategory}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="group"
              >
                <div
                  onClick={() => toggleFAQ(index)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    openIndex === index
                      ? "bg-[#111827] text-white border-transparent shadow-2xl"
                      : "bg-white border-gray-100 hover:border-gray-300 hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      openIndex === index
                        ? "bg-blue-500/20 text-[#3186FF]"
                        : "bg-blue-50 text-[#3186FF]"
                    }`}>
                      <faq.icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold uppercase tracking-wider ${
                          openIndex === index ? "text-blue-400" : "text-[#3186FF]"
                        }`}>
                          {faq.category}
                        </span>
                        <ChevronDown 
                          className={`w-5 h-5 transition-transform duration-300 shrink-0 ${
                            openIndex === index ? "rotate-180 text-white" : "text-gray-400"
                          }`} 
                        />
                      </div>
                      
                      <h3 className={`text-lg font-bold mb-2 leading-tight ${
                        openIndex === index ? "text-white" : "text-gray-900"
                      }`}>
                        {faq.question}
                      </h3>
                      
                      <AnimatePresence>
                        {openIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-gray-300 leading-relaxed pt-2 border-t border-white/10">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100">
            <span className="text-gray-600 font-medium">더 궁금한 점이 있으신가요?</span>
            <button className="px-6 py-2 bg-[#111827] text-white text-sm font-bold rounded-full hover:bg-black transition-all hover:scale-105 cursor-hover">
              전화 상담 신청
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
