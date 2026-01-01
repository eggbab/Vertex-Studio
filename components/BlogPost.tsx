import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, User, ArrowUpRight, TrendingUp, BarChart3, Eye } from 'lucide-react';

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
      category: "Engineering"
    },
    {
      title: "2026년 웹 디자인 트렌드: 중력을 거스르다",
      date: "2025년 12월 05일",
      category: "Trends"
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
              {/* Section 1 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  시선의 물리학: F-패턴을 활용한 정보 전달
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
                <p className="text-gray-600 leading-relaxed">
                  우리는 이 원리를 활용해 랜딩페이지의 정보 구조를 재설계했습니다. 핵심 가치 제안은 
                  왼쪽 상단에, 주요 혜택은 F-패턴의 가로선에 따라 배치하고, 상세 정보는 세로선을 따라 
                    자연스럽게 노출시킵니다.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  색채 심리학: 뇌를 자극하는 색상 조합
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  색상은 단순한 시각적 요소를 넘어, 뇌의 감정과 행동을 직접적으로 자극합니다. 
                  우리는 1,000개 이상의 랜딩페이지 데이터를 분석해 특정 색상 조합이 전환율에 미치는 
                  영향을 발견했습니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
                    <h3 className="font-bold mb-2">파란색 계열</h3>
                    <p className="text-sm opacity-90">신뢰도 23% 상승, 전환율 15% 개선</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
                    <h3 className="font-bold mb-2">초록색 계열</h3>
                    <p className="text-sm opacity-90">구매 의도 31% 상승, 이탈률 18% 감소</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white">
                    <h3 className="font-bold mb-2">주황색 계열</h3>
                    <p className="text-sm opacity-90">클릭률 27% 상승, 응답률 22% 개선</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  중요한 것은 단일 색상이 아니라 조합입니다. 우리는 브랜드의 성격과 타겟 고객에 따라 
                  최적의 색상 조합을 찾아내는 시스템을 개발했습니다.
                </p>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  미세한 움직임의 힘: 마이크로 인터랙션
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  인간의 뇌는 움직임에 민감하게 반응합니다. 하지만 과도한 애니메이션은 오히려 집중력을 
                  흐트립니다. 최적의 전환율을 위해서는 '미세한 움직임'이 필요합니다.
                </p>
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h4 className="font-bold text-gray-900 mb-4">전환율을 높이는 3가지 마이크로 인터랙션</h4>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#3186FF] rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>호버 효과:</strong> 버튼에 마우스를 올렸을 때 0.2초 안에 부드러운 확대 효과를 주면 클릭 확률이 18% 증가
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#3186FF] rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>로딩 상태:</strong> 버튼 클릭 후 0.1초 안에 시각적 피드백을 제공하면 이탈률이 34% 감소
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#3186FF] rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>스크롤 효과:</strong> 콘텐츠가 자연스럽게 나타나면 페이지 체류 시간이 45% 증가
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  데이터로 증명된 실제 사례
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  이론만으로는 부족합니다. Vertex Studio는 실제 프로젝트를 통해 이 원리들이 
                  어떻게 작동하는지 검증했습니다.
                </p>
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">B2B SaaS 리드 생성 프로젝트</h4>
                        <p className="text-gray-600 mb-3">
                          기존 랜딩페이지의 전환율이 2.3%에 그쳤습니다. 우리는 F-패턴 정보 구조와 
                          최적화된 색상 조합을 적용해 3개월 만에 7.8%까지 끌어올렸습니다.
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-green-600 font-medium">전환율 239% 상승</span>
                          <span className="text-gray-400">|</span>
                          <span className="text-gray-500">리드 수집 월 350개 증가</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">건기식 커머스 상세페이지</h4>
                        <p className="text-gray-600 mb-3">
                          제품 설명만 길었던 기존 페이지를 심리학적 구매 퍼널에 맞춰 재설계했습니다. 
                          마이크로 인터랙션과 색채 심리학을 적용해 구매 전환율을 크게 개선했습니다.
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-blue-600 font-medium">구매율 187% 상승</span>
                          <span className="text-gray-400">|</span>
                          <span className="text-gray-500">ROAS 200% 개선</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    당신의 랜딩페이지도 전환율을 3배 높일 수 있습니다
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Vertex Studio는 데이터 기반의 디자인 원리를 적용해 수많은 기업의 성공을 도왔습니다.
                    이제 당신의 차례입니다.
                  </p>
                  <button className="px-8 py-4 bg-[#111827] text-white font-bold rounded-full hover:bg-black transition-all hover:scale-105 shadow-xl">
                    무료 디자인 진단 받기
                  </button>
                </div>
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
              <Link key={index} to="/blog/conversion-design-physics" className="group block bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg">
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
