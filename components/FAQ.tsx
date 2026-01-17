import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Clock, Shield, Zap, CreditCard, Globe, RefreshCw, Settings } from 'lucide-react';

const faqs = [
  {
    question: "기본 패키지에는 무엇이 포함되나요?",
    answer: "기본 패키지(199만원)에는 맞춤형 원페이지 랜딩, 문의 수단 1개 연결(채널톡/카카오채널 연동), GA4 기본 연결결, 도메인 연결, 그리고 런칭 후 7일간 텍스트 수정 케어가 포함됩니다. 전환율 높은 랜딩페이지를 빠르게 제작해 드립니다.",
    icon: Zap,
    category: "서비스"
  },
  {
    question: "제작 기간은 얼마나 걸리나요?",
    answer: "기본 원페이지 랜딩은 평균 영업일 기준준 7일 내외로 완료됩니다. 추가 페이지가 있는 경우 페이지당 2~3일이 추가될 수 있습니다. 자료 준비 상황과 피드백 속도에 따라 일정이 달라질 수 있습니다.",
    icon: Clock,
    category: "제작"
  },
  {
    question: "도메인이 없어도 제작 가능한가요?",
    answer: "네, 가능합니다. 도메인이 없으신 경우 제작 과정에서 도메인 구매를 안내해 드립니다. 이미 보유하신 도메인이 있다면 해당 도메인에 연결해 드리며, 추가 비용은 없습니다.",
    icon: Globe,
    category: "제작"
  },
  {
    question: "'문의 자동정리' 옵션은 무엇인가요?",
    answer: "문의 자동정리(39만원)는 고객 문의가 들어오면 자동으로 구글 시트나 노션에 정리되는 기능입니다. 이름, 연락처, 문의 내용 등이 자동 정리되어 고객 관리가 훨씬 쉬워집니다. 소상공인분들께 특히 인기 있는 옵션입니다.",
    icon: Settings,
    category: "옵션"
  },
  {
    question: "추가 페이지는 어떤 경우에 필요한가요?",
    answer: "기본 패키지는 원페이지 랜딩입니다. 서비스 소개, 포트폴리오, 팀 소개, 이용약관 등 별도 페이지가 필요하시면 추가 페이지(페이지당 69만원)를 선택하시면 됩니다. 최대 10개까지 추가 가능합니다.",
    icon: HelpCircle,
    category: "옵션"
  },
  {
    question: "월 운영 구독이 뭔가요?",
    answer: "월 운영 구독(월 29만원)은 호스팅과 무제한 수정 가능한 풀 Full Care 서비스입니다. 텍스트, 이미지 교체, 후기 업데이트, 링크 수정 등 운영에 필요한 수정을 횟수 제한 없이 요청하실 수 있습니다. 단, 구조 변경이나 새 페이지 추가는 별도 작업입니다.",
    icon: RefreshCw,
    category: "구독"
  },
  {
    question: "월 구독 없이도 이용 가능한가요?",
    answer: "네, 월 구독은 선택 사항입니다. 구독 없이 제작만 진행하셔도 됩니다. 제작된 파일을 압축하여 이메일로 보내드립니다. 다만 이 경우 호스팅 및 운영을 별도로 준비하셔야 하고, 제작 완료 후 수정이 필요하시면 건당 별도 비용이 발생합니다.",
    icon: CreditCard,
    category: "구독"
  },
  {
    question: "결제는 어떻게 하나요?",
    answer: "견적 페이지에서 옵션 선택 후 바로 결제하실 수 있습니다. 토스페이먼츠를 통해 카드, 계좌이체 등 다양한 결제 수단을 지원합니다. 결제 완료 후 담당자가 24시간 내에 연락드립니다.",
    icon: CreditCard,
    category: "결제"
  },
  {
    question: "환불 정책은 어떻게 되나요?",
    answer: "제작 착수 전에는 100% 환불됩니다. 제작 진행 중에는 진행 단계에 따라 부분 환불이 가능하며, 제작 완료 후에는 환불이 어렵습니다. 월 구독은 다음 결제일 전까지 해지 요청하시면 다음 달부터 결제되지 않습니다.",
    icon: Shield,
    category: "결제"
  },
  {
    question: "수정 요청은 어떻게 하나요?",
    answer: "로그인 후 '내 주문' 페이지에서 수정 요청을 보내실 수 있습니다. 요청 내용을 작성해 주시면 48시간 내에 처리되며, 완료 시 이메일로 알림을 보내드립니다. 월 구독 고객은 무제한, 비구독 고객은 런칭 후 7일간 텍스트 수정이 무료입니다.",
    icon: RefreshCw,
    category: "지원"
  }
];

const categories = ["전체", "서비스", "제작", "옵션", "구독", "결제", "지원"];

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
              <HelpCircle className="w-3 h-3" /> 자주 묻는 질문
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-gray-900 mb-8 tracking-tighter leading-tight">
              궁금한 점이<br className="md:hidden" /> 있으신가요?
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto break-keep leading-relaxed font-light">
              랜딩페이지 제작에 대해 가장 많이 묻는 질문들입니다.<br/>
              더 궁금한 점이 있다면 언제든 문의해 주세요.
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
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={`${activeCategory}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
            <a 
              href="/quote"
              className="px-6 py-2 bg-[#111827] text-white text-sm font-bold rounded-full hover:bg-black transition-all hover:scale-105 cursor-hover"
            >
              견적 문의하기
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
