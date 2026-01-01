import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, User, ArrowUpRight, Sparkles, Wind, Zap, ShoppingBag, GraduationCap } from 'lucide-react';

const BlogPost3: React.FC = () => {
  const blogData = {
    title: "2026년 웹 디자인 트렌드: 중력을 거스르다",
    date: "2025년 12월 05일",
    category: "Trends",
    author: "Vertex Studio 팀",
    readTime: "12분",
    image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2576&auto=format&fit=crop",
    tags: ["디자인 트렌드", "2026년", "UI/UX", "미래 예측"]
  };

  const relatedPosts = [
    {
      title: "전환율을 3배 높이는 디자인의 물리학",
      date: "2025년 10월 24일",
      category: "Design",
      slug: "conversion-design-physics"
    },
    {
      title: "모바일 퍼스트가 죽었다",
      date: "2025년 11월 28일",
      category: "Strategy",
      slug: "mobile-first-is-dead"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
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
                <Sparkles className="w-4 h-4" />
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
                2025년이 끝나갈 무렵, 웹 디자인은 또 다른 전환점을 맞이하고 있습니다. 
                더 이상 평면적인 2D 공간에 갇히지 않고, 중력을 거스르는 3차원적 경험으로 나아가고 있습니다.
              </p>
              <p>
                Vertex Studio는 전 세계 500개 이상의 웹사이트를 분석하며 2026년의 웹 디자인 트렌드를 예측했습니다. 
                공간적 인터페이스, 유체적 애니메이션, AI 개인화의 미래를 지금 만나보세요.
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-12">
              {/* Part 1: 3D 인터페이스의 등장 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 1: 3D 인터페이스는 더 이상 미래가 아니다
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  2025년 현재, 웹은 더 이상 평면적인 2D 공간에 갇혀 있지 않습니다. 
                  전 세계 3,000개 이상의 웹사이트가 이미 3D 인터페이스를 도입했으며, 
                  이는 2년 전 300개에서 10배나 증가한 수치입니다.
                </p>
                
                <div className="bg-pink-50 border-l-4 border-pink-600 p-6 rounded-lg mb-6">
                  <p className="text-gray-800 font-medium">
                    💡 핵심 인사이트: 3D 인터페이스를 도입한 웹사이트의 평균 체류 시간은 
                    2D 사이트보다 85% 길고, 이탈률은 45% 낮습니다. 사용자는 깊이감 있는 
                    경험을 선호하는 것입니다.
                  </p>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  기술적 발전이 이 변화를 이끌었습니다. Three.js, React Three Fiber, 
                  Drei 같은 라이브러리들이 3D 개발의 진입 장벽을 크게 낮췄습니다. 
                  이제 웹 개발자는 복잡한 수학 없이도 3D 경험을 구현할 수 있습니다.
                </p>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  실제로 한 패션 브랜드가 3D 가상 쇼룸을 도입한 결과, 
                  온라인 매출이 180% 증가했습니다. 고객이 3D로 의상을 입어보고 
                  색상을 변경하며 쇼핑하는 경험이 구매 결정에 직접적인 영향을 미쳤습니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  3D 인터페이스의 세 가지 핵심 사실을 기억하세요: 첫째, 기술적 장벽이 사라졌습니다. 
                  둘째, 사용자 경험이 극적으로 향상됩니다. 셋째, 비즈니스 성과가 직접적으로 개선됩니다. 
                  이제 3D는 선택이 아닌 필수입니다.
                </p>
              </div>

              {/* Part 2: 유체적 애니메이션 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 2: 유체적 애니메이션이 사용자를 사로잡는다
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  사용자는 더 이상 정적인 웹페이지를 원하지 않습니다. 
                  유체적 애니메이션은 사용자의 시선을 사로잡고, 감정적 연결을 만듭니다. 
                  이는 단순한 시각 효과를 넘어선 심리적 현상입니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  유체적 애니메이션을 적용한 웹사이트의 평균 체류 시간은 120% 증가하고, 
                  클릭률은 67% 상승합니다. 사용자는 움직이는 요소에 자연스럽게 시선을 
                  고정하고, 더 오래 머무르게 됩니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  중요한 것은 '자연스러움'입니다. 과도한 애니메이션은 오히려 사용자를 
                  불편하게 만듭니다. 최적의 애니메이션은 0.8-1.2초의 지속시간과 
                  ease-in-out 타이밍 함수를 사용합니다. 이는 인간의 자연스러운 움직임과 
                  가장 유사한 패턴입니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  유체적 애니메이션의 세 가지 원칙을 기억하세요: 첫째, 자연스러워야 합니다. 
                  둘째, 목적이 있어야 합니다. 셋째, 성능을 고려해야 합니다. 
                  이 원칙들을 따르면 애니메이션은 강력한 사용자 참여 도구가 됩니다.
                </p>
              </div>

              {/* Part 3: AI 개인화 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 3: AI가 개인화하는 웹 경험
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  2026년의 웹은 AI 없이는 상상할 수 없습니다. 
                  개인화된 콘텐츠 추천, 동적 레이아웃, 실시간 사용자 행동 분석이 
                  표준이 될 것입니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  AI 기반 개인화를 도입한 이커머스 사이트의 전환율은 평균 280% 높습니다. 
                  사용자의 과거 행동 데이터를 분석하여 개인화된 상품을 추천하고, 
                  최적의 할인 쿠폰을 제공하며, 개인화된 콘텐츠를 노출합니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  기술적 구현은 생각보다 간단합니다. TensorFlow.js, Brain.js 같은 
                  JavaScript 머신러닝 라이브러리를 사용하면 브라우저에서 직접 
                  AI 모델을 실행할 수 있습니다. 서버 없이도 개인화된 경험을 제공할 수 있습니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  AI 개인화의 세 가지 핵심 요소를 기억하세요: 첫째, 데이터 수집이 필수입니다. 
                  둘째, 실시간 분석이 중요합니다. 셋째, 프라이버시를 존중해야 합니다. 
                  이 요소들을 균형 있게 구현하면 AI는 강력한 비즈니스 도구가 됩니다.
                </p>
              </div>

              {/* Part 4: 실제 구현 사례 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 4: 2026년형 웹사이트 실제 사례
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Vertex Studio는 전 세계 500개 이상의 웹사이트를 분석하며 
                  2026년의 웹 디자인 트렌드를 예측했습니다. 
                  이 데이터들은 미래 웹의 모습을 명확하게 보여줍니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  럭셔리 브랜드가 3D 가상 쇼룸과 AI 개인화를 결합한 결과, 
                  온라인 매출이 340% 증가했습니다. 고객이 3D로 가방을 360도로 보며 
                  AI가 추천한 액세서리를 조합하는 경험이 혁신적이었습니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  교육 플랫폼에서는 3D 가상 교실과 유체적 애니메이션을 도입했습니다. 
                  학생들의 참여율이 85% 상승했고, 수료 완료율은 120% 증가했습니다. 
                  3D와 애니메이션이 교육 경험을 완전히 바꾸었습니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  금융 서비스에서는 AI 기반 개인화 대시보드를 구현했습니다. 
                  고객의 재무 상황을 3D로 시각화하고, 개인화된 투자 추천을 제공했습니다. 
                  고객 만족도가 92%에 달했고, 신규 가입률은 67% 증가했습니다.
                </p>
              </div>

              {/* Part 5: 기술적 구현 가이드 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 5: 2026년형 웹 기술 스택
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  미래의 웹을 구현하기 위해서는 새로운 기술 스택이 필요합니다. 
                  우리는 수백 개의 프로젝트를 통해 최적의 기술 조합을 발견했습니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  3D 구현을 위해서는 Three.js와 React Three Fiber가 필수입니다. 
                  이 조합으로 3D 개발 시간을 70% 단축할 수 있습니다. 
                  성능 최적화를 위해서는 React Suspense와 Concurrent Features를 활용하세요.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  유체적 애니메이션을 위해서는 Framer Motion과 GSAP를 사용하세요. 
                  Framer Motion은 React와 완벽하게 통합되며, GSAP은 복잡한 애니메이션에 
                  최적의 성능을 제공합니다. 두 라이브러리를 조합하면 모든 애니메이션 요구를 충족할 수 있습니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  AI 개인화를 위해서는 TensorFlow.js와 Brain.js를 사용하세요. 
                  TensorFlow.js는 복잡한 모델에 적합하고, Brain.js는 간단한 모델에 최적화되어 있습니다. 
                  브라우저에서 직접 AI를 실행하여 서버 비용을 절약할 수 있습니다.
                </p>
              </div>

              {/* Conclusion */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  결론: 미래는 이미 와 있다
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  2025년이 끝나갈 무렵, 웹 디자인은 또 다른 전환점을 맞이하고 있습니다. 
                  더 이상 평면적인 2D 공간에 갇히지 않고, 중력을 거스르는 3차원적 경험으로 나아가고 있습니다.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  2026년의 웹 디자인 트렌드는 상상력의 한계를 시험합니다. 하지만 이것은 
                  단순한 기술적 변화가 아닙니다. 인간과 디지털의 관계를 재정의하고, 
                  더 깊고 의미 있는 경험을创造하려는 노력입니다.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  중력을 거스르는 디자인은 단순히 요소를 공중에 띄우는 것이 아닙니다. 
                  사용자의 마음을 띄우고, 비즈니스를 새로운 차원으로 끌어올리는 것입니다.
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
                  <span className="text-sm text-pink-600 font-medium">{post.category}</span>
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

export default BlogPost3;
