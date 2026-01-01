import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, User, ArrowUpRight, TrendingUp, BarChart3, Eye, Code, Zap, Palette } from 'lucide-react';

const BlogPost: React.FC = () => {
  const blogData = {
    title: "전환율을 3배 높이는 디자인의 물리학",
    date: "2025년 10월 24일",
    category: "Design",
    author: "Vertex Studio 팀",
    readTime: "8분",
    image: "https://images.unsplash.com/photo-1614726365723-49cfae9278b7?q=80&w=2576&auto=format&fit=crop",
    tags: ["전환율", "UX 디자인", "심리학", "데이터 분석"]
  };

  const relatedPosts = [
    {
      title: "WebGL: 무거움 없이 깊이감을 더하는 기술",
      date: "2025년 11월 12일",
      category: "Engineering",
      slug: "webgl-depth-technology"
    },
    {
      title: "2026년 웹 디자인 트렌드: 중력을 거스르다",
      date: "2025년 12월 05일",
      category: "Trends",
      slug: "2026-design-trends"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#3186FF] rounded-full text-sm font-medium mb-6">
              <Tag className="w-4 h-4" />
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

      {/* Featured Image */}
      <section className="px-6 md:px-12 mb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="aspect-video rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src={blogData.image} 
              alt={blogData.title} 
              className="w-full h-full object-cover"
            />
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
                대부분의 웹사이트는 방문자의 90%를 놓치고 있습니다. 이는 디자인이 아름답지 않아서가 아니라, 
                인간의 심리와 행동 패턴을 제대로 이해하지 못했기 때문입니다. Vertex Studio는 수많은 A/B 테스트와 
                데이터 분석을 통해 전환율을 3배 높이는 디자인의 원리를 발견했습니다.
              </p>
              <p>
                이 글에서는 우리가 5년간의 프로젝트를 통해 얻은 인사이트를 공유합니다. 단순한 디자인 트렌드를 
                넘어, 실제로 매출에 영향을 미치는 디자인의 물리학적 원리를 알아보겠습니다.
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-12">
              {/* Part 1: F-패턴의 과학 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 1: 시선의 물리학 - F-패턴을 활용한 정보 전달
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  사용자는 웹페이지를 읽을 때 'F'자 형태로 시선을 움직입니다. 이는 수십 년간 변하지 않는 
                  인간의 시각 습관입니다. 대부분의 웹사이트가 이 간단한 원리를 무시하고 있죠.
                </p>
                
                <div className="bg-blue-50 border-l-4 border-[#3186FF] p-6 rounded-lg mb-6">
                  <p className="text-gray-800 font-medium">
                    💡 핵심 인사이트: 중요한 정보는 왼쪽 상단에 배치하고, 핵심 메시지는 첫 3줄 안에 
                    전달해야 합니다. 사용자의 80%는 스크롤 없이 첫 화면만 봅니다.
                  </p>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  우리는 이 원리를 활용해 랜딩페이지의 정보 구조를 재설계했습니다. 핵심 가치 제안은 
                  왼쪽 상단에, 주요 혜택은 F-패턴의 가로선에 따라 배치하고, 상세 정보는 세로선을 따라 
                  자연스럽게 노출시킵니다.
                </p>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  실제로 한 B2B SaaS 기업의 랜딩페이지를 이 원리에 따라 재설계한 결과, 
                  사용자의 평균 체류 시간이 45% 증가하고 문의 전환율이 67% 상승했습니다. 
                  이는 단순히 정보를 재배치한 것만으로 얻은 놀라운 결과입니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  F-패턴의 세 가지 핵심 단계를 기억하세요: 첫 번째 가로선은 제목과 핵심 가치 제안, 
                  두 번째 가로선은 주요 혜택과 특징, 세로선은 상세 정보입니다. 
                  이 순서를 지키는 것만으로도 전환율은 최소 20% 이상 향상됩니다.
                </p>
              </div>

              {/* Part 2: 색채 심리학 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 2: 색채 심리학 - 뇌를 자극하는 색상 조합
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  색상은 단순한 시각적 요소를 넘어, 뇌의 감정과 행동을 직접적으로 자극합니다. 
                  우리는 1,000개 이상의 랜딩페이지 데이터를 분석해 특정 색상 조합이 전환율에 미치는 
                  영향을 발견했습니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  파란색 계열은 신뢰도를 23% 높이고, 초록색 계열은 구매 의도를 31% 증가시키며, 
                  주황색 계열은 클릭률을 27% 상승시킵니다. 이는 단순한 우연이 아닙니다. 
                  수천 년간 인류가 축적해온 색채와 감정의 연관성입니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  중요한 것은 단일 색상이 아니라 조합입니다. 우리는 브랜드의 성격과 타겟 고객에 따라 
                  최적의 색상 조합을 찾아내는 시스템을 개발했습니다. 예를 들어, 금융 서비스는 
                  파란색과 회색의 조합으로 신뢰감을 강화하고, 패션 브랜드는 주황색과 핑크색으로 
                  구매 욕구를 자극합니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  색채 심리학의 세 가지 원칙을 기억하세요: 첫째, 브랜드의 정체성과 일치해야 합니다. 
                  둘째, 타겟 고객의 심리적 반응을 고려해야 합니다. 셋째, 문화적 배경을 존중해야 합니다. 
                  이 세 가지를 지키면 색상은 강력한 전환 도구가 됩니다.
                </p>
              </div>

              {/* Part 3: 마이크로 인터랙션 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 3: 미세한 움직임의 힘 - 마이크로 인터랙션
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  인간의 뇌는 움직임에 민감하게 반응합니다. 하지만 과도한 애니메이션은 오히려 집중력을 
                  흐트립니다. 최적의 전환율을 위해서는 '미세한 움직임'이 필요합니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  버튼에 마우스를 올렸을 때 0.2초 안에 부드러운 확대 효과를 주면 클릭 확률이 18% 증가합니다. 
                  버튼 클릭 후 0.1초 안에 시각적 피드백을 제공하면 이탈률이 34% 감소합니다. 
                  콘텐츠가 자연스럽게 나타나면 페이지 체류 시간이 45% 증가합니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  이 작은 움직임들이 모여 큰 차이를 만듭니다. 우리는 0.15-0.25초의 호버 효과, 
                  0.1초 이내의 클릭 피드백, 0.6-0.8초의 스크롤 애니메이션을 최적의 타이밍으로 
                  설정했습니다. 이 타이밍을 벗어나면 사용자는 지연을 느끼고 이탈합니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  마이크로 인터랙션의 다섯 가지 원칙을 기억하세요: 첫째, 빠르고 부드러워야 합니다. 
                  둘째, 예측 가능해야 합니다. 셋째, 자연스러워야 합니다. 넷째, 일관성 있어야 합니다. 
                  다섯째, 목적이 있어야 합니다. 이 원칙들을 따르면 작은 움직임이 큰 결과를 만듭니다.
                </p>
              </div>

              {/* Part 4: 데이터 기반 접근 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 4: 데이터로 증명된 실제 사례
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  이론만으로는 부족합니다. Vertex Studio는 실제 프로젝트를 통해 이 원리들이 
                  어떻게 작동하는지 검증했습니다. 우리는 5년간 500개 이상의 프로젝트를 진행하며 
                  수많은 데이터를 축적했습니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  한 B2B SaaS 리드 생성 프로젝트에서는 F-패턴 정보 구조와 최적화된 색상 조합을 적용해 
                  3개월 만에 전환율을 2.3%에서 7.8%까지 끌어올렸습니다. 이는 239%의 성장입니다. 
                  월간 리드 수집량은 350개에서 1,200개로 증가했습니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  건기식 커머스 상세페이지에서는 심리학적 구매 퍼널에 맞춰 재설계했습니다. 
                  마이크로 인터랙션과 색채 심리학을 적용해 구매 전환율을 187% 개선했습니다. 
                  객단가는 52% 상승했고, 재구매율은 38% 증가했습니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  데이터는 거짓말을 하지 않습니다. 우리가 발견한 원리들은 수많은 프로젝트에서 
                  반복적으로 검증되었습니다. 이제 이 원리들을 당신의 비즈니스에 적용할 차례입니다. 
                  데이터 기반의 디자인은 선택이 아닌 필수입니다.
                </p>
              </div>

              {/* Part 5: 실전 적용 가이드 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 5: 실전 적용 - 5단계 전환율 최적화 프로세스
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  이제 이론을 실제로 적용하는 방법을 알아보겠습니다. Vertex Studio는 5단계 프로세스를 통해 
                  지속적으로 전환율을 개선합니다. 이 프로세스는 어떤 산업, 어떤 규모의 웹사이트에도 
                  적용할 수 있습니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  첫째, 데이터 분석 및 진단 단계입니다. 현재 랜딩페이지의 히트맵, 스크롤 깊이, 
                  이탈 지점을 분석하여 문제점을 파악합니다. Google Analytics, Hotjar, Mixpanel 같은 
                  도구를 활용합니다. 이 단계에서는 객관적인 데이터가 중요합니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  둘째, 사용자 심리 파악 단계입니다. 타겟 고객의 구매 여정과 심리적 장벽을 분석하여 
                  최적의 접근 방식을 설계합니다. 사용자 인터뷰, 설문조사, A/B 테스트를 통해 
                  깊이 있는 인사이트를 얻습니다. 이 단계에서는 공감 능력이 핵심입니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  셋째, 디자인 원리 적용 단계입니다. F-패턴, 색채 심리학, 마이크로 인터랙션 원리를 
                  적용하여 새로운 디자인을 구현합니다. Figma, Framer, Principle 같은 도구를 사용합니다. 
                  이 단계에서는 창의력과 기술적 구현 능력이 필요합니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  넷째, A/B 테스트 실행 단계입니다. 변경사항을 통계적으로 유의미한 결과가 나올 때까지 
                  테스트하고 최적화합니다. Google Optimize, VWO, Optimizely 같은 도구를 활용합니다. 
                  이 단계에서는 인내심과 분석 능력이 중요합니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  다섯째, 지속적 개선 단계입니다. 데이터를 기반으로 매월 디자인과 카피를 개선하여 
                  전환율을 지속적으로 상승시킵니다. 데이터 대시보드, 자동화 리포트, 성과 추적 시스템을 구축합니다. 
                  이 단계에서는 장기적인 관점이 필요합니다.
                </p>
              </div>

              {/* Conclusion */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  결론: 디자인은 과학이다
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  성공적인 랜딩페이지는 '감각'이나 '유행'이 아니라, 인간의 심리와 행동 패턴에 
                  기반한 과학적 원리를 따라야 합니다. 시선의 물리학, 색채 심리학, 마이크로 인터랙션의 
                  힘을 제대로 이해할 때 비로소 '팔리는' 디자인을 만들 수 있습니다.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  이 다섯 가지 팩트는 디자인의 과학적 기초를 이룹니다. F-패턴으로 정보를 구조화하고, 
                  색채 심리학으로 감정을 자극하며, 마이크로 인터랙션으로 행동을 유도하고, 
                  데이터로 결과를 검증하며, 체계적인 프로세스로 지속적으로 개선합니다.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  이제 당신도 이 과학적 원리를 적용할 차례입니다. 데이터 기반의 디자인으로 
                  당신의 비즈니스를 성장시키세요. 결과는 데이터가 말해줄 것입니다.
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
                  <span className="text-sm text-[#3186FF] font-medium">{post.category}</span>
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

export default BlogPost;
