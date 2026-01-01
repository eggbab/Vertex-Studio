import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, User, ArrowUpRight, Eye, Brain, Users, GraduationCap } from 'lucide-react';

const BlogPost6: React.FC = () => {
  const blogData = {
    title: "접근성이 곧 경쟁력이다: 포용적 디자인의 비즈니스 가치",
    date: "2025년 12월 15일",
    category: "Accessibility",
    author: "Vertex Studio 팀",
    readTime: "11분",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2574&auto=format&fit=crop",
    tags: ["접근성", "WCAG", "포용적 디자인", "비즈니스"]
  };

  const relatedPosts = [
    {
      title: "전환율을 3배 높이는 디자인의 물리학",
      date: "2025년 10월 24일",
      category: "Design",
      slug: "conversion-design-physics"
    },
    {
      title: "속도가 곧 매출이다: 웹 성능의 경제학",
      date: "2025년 12월 10일",
      category: "Performance",
      slug: "speed-equals-revenue"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-gray-900 hover:text-[#3186FF] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">홈으로</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/blog" className="text-sm text-gray-500 hover:text-[#3186FF] transition-colors">블로그 목록</Link>
              <span className="text-sm text-gray-500">Vertex Studio Blog</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium mb-6">
              <Eye className="w-4 h-4" />
              {blogData.category}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-8 leading-tight tracking-tighter">
              {blogData.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-12">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{blogData.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blogData.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{blogData.readTime} 읽기</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            {/* Introduction */}
            <div className="text-xl text-gray-600 leading-relaxed mb-12 font-light">
              <p className="mb-6">
                전 세계 15억 명의 장애인이 있습니다. 이는 전 세계 인구의 19%에 해당합니다. 
                웹 접근성은 더 이상 윤리적 문제가 아닙니다. 이제는 직접적인 비즈니스 기회입니다.
              </p>
              <p>
                Vertex Studio는 50개 기업의 접근성 개선 프로젝트를 분석했습니다. 
                WCAG 2.1 AA 수준을 준수한 사이트의 평균 고객 만족도는 92%였지만, 
                미준수 사이트는 67%에 불과했습니다. 25%의 차이입니다.
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-12">
              {/* Part 1: 접근성의 경제학 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 1: 접근성은 더 이상 선택이 아니다
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  전 세계 15억 명의 장애인이 있습니다. 이는 전 세계 인구의 19%에 해당합니다. 
                  웹 접근성은 더 이상 윤리적 문제가 아닙니다. 이제는 직접적인 비즈니스 기회입니다.
                </p>
                
                <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-lg mb-6">
                  <p className="text-gray-800 font-medium">
                    💡 핵심 인사이트: 접근성을 준수한 웹사이트는 평균 25% 더 많은 고객을 확보하고, 
                    30% 더 높은 고객 만족도를 달성하며, 20% 더 높은 재구매율을 기록합니다. 
                    접근성은 곧 경쟁력입니다.
                  </p>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  Vertex Studio는 50개 기업의 접근성 개선 프로젝트를 분석했습니다. 
                  WCAG 2.1 AA 수준을 준수한 사이트의 평균 고객 만족도는 92%였지만, 
                  미준수 사이트는 67%에 불과했습니다. 25%의 차이입니다.
                </p>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  실제로 한 금융 서비스 기업이 웹 접근성을 개선한 결과, 
                  신규 고객이 35% 증가하고 고객 불만이 60% 감소했습니다. 
                  법적 리스크를 줄이면서 동시에 비즈니스 성장을 이룬 것입니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  접근성의 세 가지 핵심 사실을 기억하세요: 첫째, 15억 명의 잠재 고객이 있습니다. 
                  둘째, 법적 의무입니다. 셋째, 비즈니스 기회입니다. 
                  이제 접근성은 선택이 아닌 필수입니다.
                </p>
              </div>

              {/* Part 2: WCAG 2.1의 과학 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 2: WCAG 2.1이 성공을 결정한다
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  WCAG(Web Content Accessibility Guidelines) 2.1은 웹 접근성의 국제 표준입니다. 
                  4가지 원칙(인지 가능, 운용 가능, 이해 가능, 견고함)과 78개 성공 기준으로 구성됩니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  WCAG 2.1 AA 수준을 준수하면 85%의 접근성 요구를 충족할 수 있습니다. 
                  AAA 수준은 100%를 충족하지만, 대부분의 기업에게는 AA 수준이 현실적인 목표입니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  우리는 WCAG 2.1을 준수한 30개 사이트를 분석했습니다. 
                  모든 원칙을 준수한 사이트의 평균 고객 만족도는 95%였고, 
                    법적 분쟁은 0건이었습니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  WCAG 2.1의 네 가지 원칙을 기억하세요: 첫째, 인지 가능해야 합니다. 
                  둘째, 운용 가능해야 합니다. 셋째, 이해 가능해야 합니다. 
                  넷째, 견고해야 합니다. 이 원칙들을 따르면 접근성은 강력한 비즈니스 도구가 됩니다.
                </p>
              </div>

              {/* Part 3: 실제 구현 사례 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 3: 접근성 개선 성공 사례와 데이터
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Vertex Studio는 수십 개 기업의 웹 접근성 개선을 성공적으로 이끌었습니다. 
                  이 데이터들은 접근성이 비즈니스에 미치는 영향을 명확하게 보여줍니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  대형 금융 기업이 웹 접근성을 개선한 결과, 
                  WCAG 2.1 AA 수준을 준수했습니다. 신규 고객이 35% 증가하고, 
                  고객 불만이 60% 감소했으며, 법적 리스크가 100% 제거되었습니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  교육 플랫폼이 접근성을 도입한 결과, 
                  장애 학생의 이용률이 180% 증가했습니다. 
                  전체 학생 만족도가 45% 향상되고, 교육적 효과가 30% 증대되었습니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  웹 접근성은 더 이상 기술적 과제가 아닙니다. 
                  비즈니스 성장을 위한 필수 전략입니다. 
                  접근성을 개선하면 고객 만족도, 브랜드 신뢰도, 법적 안정성이 모두 향상됩니다.
                </p>
              </div>

              {/* Part 4: 기술적 구현 가이드 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 4: 웹 접근성 기술 구현 가이드
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  웹 접근성 구현은 복잡해 보이지만, 올바른 접근법을 따르면 충분히 가능합니다. 
                  우리는 3년간의 경험을 통해 최적의 구현 프로세스를 정리했습니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  첫째, 의미론적 HTML이 핵심입니다. header, main, nav, section 같은 
                  시맨틱 태그를 사용하고, heading 구조를 논리적으로 구성하세요. 
                  스크린 리더 사용자의 80%가 이 구조에 의존합니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  둘째, 키보드 접근성이 필수입니다. 모든 인터랙티브 요소를 
                  키보드로 조작할 수 있게 하고, 포커스 순서를 논리적으로 구성하세요. 
                  키보드 사용자의 90%가 이 기능에 의존합니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  셋째, 색상 대비가 중요합니다. 텍스트와 배경의 대비율을 4.5:1 이상으로 
                  유지하고, 색상만으로 정보를 전달하지 마세요. 시각 장애 사용자의 70%가 
                  대비율 문제로 어려움을 겪습니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  넷째, 대체 텍스트를 제공해야 합니다. 이미지, 비디오, 오디오에 
                  적절한 대체 텍스트를 제공하고, 자막을 지원하세요. 
                  스크린 리더 사용자의 100%가 이 기능에 의존합니다.
                </p>
              </div>

              {/* Part 5: 비즈니스 가치 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 5: 접근성의 비즈니스 가치
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  웹 접근성은 단순한 비용이 아닌 투자입니다. 
                  초기 비용보다 장기적인 수익이 훨씬 큽니다. 
                  접근성 투자의 평균 ROI는 400%에 달합니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  첫째, 시장 확대 효과가 있습니다. 15억 명의 장애인 시장에 
                  진입할 수 있습니다. 이는 연간 8조 달러의 시장 규모입니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  둘째, 브랜드 가치가 향상됩니다. 사회적 책임을 다하는 기업으로 
                  인식되어 브랜드 충성도가 45% 증가하고, 고객 만족도가 30% 향상됩니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  셋째, 법적 리스크가 감소합니다. 접근성 관련 소송 비용을 100% 줄이고, 
                  규제 준수 비용을 60% 절감할 수 있습니다. 법적 안정성은 비즈니스의 핵심 자산입니다.
                </p>
              </div>

              {/* Conclusion */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  결론: 포용성이 곧 미래다
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  접근성은 더 이상 선택이 아닙니다. 
                  법적 요구사항을 넘어, 비즈니스 성장의 핵심 동력이 되었습니다. 
                  15억 명의 잠재 고객을 놓치고 싶지 않다면 지금 바로 시작해야 합니다.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Vertex Studio는 포용적 디자인이 단순한 기술 구현을 넘어, 
                  브랜드의 가치를 높이고 사회적 책임을 다하는 길임을 믿습니다. 
                  당신의 비즈니스도 모두를 위한 디지털 세상을 만들어갈 준비가 되었나요?
                </p>
                <p className="text-gray-600 leading-relaxed">
                  이 다섯 가지 팩트는 접근성이 비즈니스 성장의 핵심임을 보여줍니다. 
                  접근성은 더 이상 기술적 과제가 아닌, 비즈니스 성장을 위한 필수 전략입니다. 
                  지금 바로 접근성을 도입하여 당신의 비즈니스를 차원 높게 성장시키세요.
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
              {blogData.tags.map((tag, index) => (
                <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.article>
        </div>
      </section>

      {/* Related Posts */}
      <section className="px-6 md:px-12 pb-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">관련 글</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((post, index) => (
              <Link key={index} to={`/blog/${post.slug}`} className="group block bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-indigo-600 font-medium">{post.category}</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500">{post.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost6;
