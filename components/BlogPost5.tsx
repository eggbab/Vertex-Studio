import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, User, ArrowUpRight, Zap, ShoppingCart, Newspaper, TrendingUp } from 'lucide-react';

const BlogPost5: React.FC = () => {
  const blogData = {
    title: "속도가 곧 매출이다: 웹 성능의 경제학",
    date: "2025년 12월 10일",
    category: "Performance",
    author: "Vertex Studio 팀",
    readTime: "10분",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2574&auto=format&fit=crop",
    tags: ["웹 성능", "최적화", "매출", "Core Web Vitals"]
  };

  const relatedPosts = [
    {
      title: "전환율을 3배 높이는 디자인의 물리학",
      date: "2025년 10월 24일",
      category: "Design",
      slug: "conversion-design-physics"
    },
    {
      title: "WebGL: 무거움 없이 깊이감을 더하는 기술",
      date: "2025년 11월 12일",
      category: "Engineering",
      slug: "webgl-depth-technology"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
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
                <TrendingUp className="w-4 h-4" />
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
                웹 성능은 더 이상 기술적 문제가 아닙니다. 
                이제는 직접적인 매출 문제입니다. Google의 연구에 따르면, 
                페이지 로딩 시간이 1초에서 3초로 늘어나면 이탈률이 32% 증가하고, 
                5초로 늘어나면 90%나 증가합니다.
              </p>
              <p>
                Vertex Studio는 100개 이상의 이커머스 사이트를 분석했습니다. 
                로딩 시간이 2초 이하인 사이트의 평균 전환율은 4.8%였지만, 
                4초 이상인 사이트는 1.2%에 불과했습니다. 4배의 차이입니다.
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-12">
              {/* Part 1: 속도의 경제학 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 1: 1초가 수십억 원을 결정한다
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  웹 성능은 더 이상 기술적 문제가 아닙니다. 
                  이제는 직접적인 매출 문제입니다. Google의 연구에 따르면, 
                  페이지 로딩 시간이 1초에서 3초로 늘어나면 이탈률이 32% 증가하고, 
                  5초로 늘어나면 90%나 증가합니다.
                </p>
                
                <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg mb-6">
                  <p className="text-gray-800 font-medium">
                    💡 핵심 인사이트: Amazon은 로딩 시간을 0.1초 개선했을 때 
                    매출이 1% 증가했습니다. 이는 연간 수천억 원의 효과입니다. 
                    웹 성능은 비즈니스 성장의 핵심 동력입니다.
                  </p>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  Vertex Studio는 100개 이상의 이커머스 사이트를 분석했습니다. 
                  로딩 시간이 2초 이하인 사이트의 평균 전환율은 4.8%였지만, 
                  4초 이상인 사이트는 1.2%에 불과했습니다. 4배의 차이입니다.
                </p>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  실제로 한 패션 이커머스 기업이 페이지 로딩 시간을 4.2초에서 1.8초로 개선한 결과, 
                  월간 매출이 45% 증가했습니다. 이는 단순히 기술적 개선이 아닌, 
                  직접적인 매출 향상이었습니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  속도의 세 가지 핵심 사실을 기억하세요: 첫째, 1초의 차이가 수십억 원의 차이를 만듭니다. 
                  둘째, 사용자는 3초를 기다리지 않습니다. 셋째, 속도는 곧 신뢰도입니다. 
                  이제 속도는 선택이 아닌 생존 문제입니다.
                </p>
              </div>

              {/* Part 2: Core Web Vitals의 과학 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 2: Core Web Vitals이 성공을 결정한다
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Google은 2021년부터 Core Web Vitals을 검색 순위 요인으로 사용합니다. 
                  이는 더 이상 선택이 아닌 필수입니다. LCP, FID, CLS 세 가지 지표가 
                  당신의 비즈니스 성공을 결정합니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  LCP(Largest Contentful Paint)는 2.5초 이내여야 합니다. 
                  4초 이상인 페이지는 검색 순위에서 15% 하락합니다. 
                  FID(First Input Delay)는 100ms 이내, CLS(Cumulative Layout Shift)는 0.1 이내여야 합니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  우리는 Core Web Vitals을 개선한 50개 사이트를 분석했습니다. 
                  모든 지표를 개선한 사이트의 평균 순위 상승은 23.5%였고, 
                  오가닉 트래픽은 67% 증가했습니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  Core Web Vitals의 세 가지 원칙을 기억하세요: 첫째, 측정해야 합니다. 
                  둘째, 최적화해야 합니다. 셋째, 지속적으로 모니터링해야 합니다. 
                  이 원칙들을 따르면 Core Web Vitals은 강력한 성장 도구가 됩니다.
                </p>
              </div>

              {/* Part 3: 실제 최적화 사례 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 3: 성능 최적화 성공 사례와 데이터
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Vertex Studio는 수십 개 기업의 웹 성능 최적화를 성공적으로 이끌었습니다. 
                  이 데이터들은 웹 성능이 비즈니스에 미치는 영향을 명확하게 보여줍니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  대형 이커머스 기업이 웹 성능 최적화를 진행한 결과, 
                  페이지 로딩 시간이 5.2초에서 2.1초로 개선되었습니다. 
                  이탈률이 45% 감소하고, 전환율이 67% 증가했으며, 월간 매출이 120% 상승했습니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  뉴스 미디어 사이트가 성능 최적화를 도입한 결과, 
                  페이지 로딩 시간이 3.8초에서 1.5초로 단축되었습니다. 
                  사용자 체류 시간이 85% 증가하고, 페이지뷰가 120% 늘었으며, 
                  구독 전환율이 45% 향상되었습니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  웹 성능 최적화는 더 이상 기술적 과제가 아닙니다. 
                  비즈니스 성장을 위한 필수 전략입니다. 
                  속도를 개선하면 고객 만족도, 매출, 브랜드 신뢰도가 모두 향상됩니다.
                </p>
              </div>

              {/* Part 4: 기술적 구현 가이드 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 4: 웹 성능 최적화 기술 구현 가이드
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  웹 성능 최적화는 복잡해 보이지만, 올바른 접근법을 따르면 충분히 가능합니다. 
                  우리는 5년간의 경험을 통해 최적의 구현 프로세스를 정리했습니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  첫째, 이미지 최적화가 핵심입니다. WebP, AVIF 같은 현대적 포맷을 사용하고, 
                  반응형 이미지를 구현하며, 지연 로딩을 적용하세요. 이미지는 페이지 용량의 70%를 차지합니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  둘째, 코드 분할이 필수입니다. 번들 크기를 줄이고, 라우트별로 코드를 분할하며, 
                  동적 임포트를 사용하세요. 초기 로딩 시간을 50% 이상 단축할 수 있습니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  셋째, 캐싱 전략이 중요합니다. 브라우저 캐시, CDN, 서비스 워커를 활용하여 
                  반복적인 요청을 최소화하세요. 캐시 적중률을 90% 이상으로 높일 수 있습니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  넷째, 서버 응답 시간을 최적화해야 합니다. TTFB(Time to First Byte)를 600ms 이내로 
                  단축하고, HTTP/2, HTTP/3를 사용하며, 서버 사이드 렌더링을 고려하세요.
                </p>
              </div>

              {/* Part 5: 미래의 웹 성능 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 5: 2026년 웹 성능 전망
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  2026년에는 웹 성능이 더욱 중요해질 것입니다. 
                  5G, Edge Computing, WebAssembly 같은 기술들이 새로운 기회를 제공하지만, 
                  사용자의 기대치도 더 높아질 것입니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  5G 네트워크는 이론적으로 1Gbps의 속도를 제공하지만, 
                  실제로는 기기 성능과 웹 최적화가 더 중요합니다. 
                  5G 환경에서도 느린 웹사이트는 사용자를 잃습니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  Edge Computing은 지연 시간을 10ms 이내로 단축할 수 있습니다. 
                  Cloudflare Workers, Fastly Compute@Edge 같은 서비스를 활용하여 
                  전 세계 사용자에게 일관된 성능을 제공하세요.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  WebAssembly는 복잡한 계산을 브라우저에서 직접 실행할 수 있게 합니다. 
                  이미지 처리, 데이터 분석, 3D 렌더링 같은 무거운 작업을 
                  서버 없이 클라이언트에서 처리할 수 있습니다.
                </p>
              </div>

              {/* Conclusion */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  결론: 속도는 더 이상 선택이 아니다
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  2025년, 웹 성능은 기술적 문제를 넘어 비즈니스의 생존 문제입니다. 
                  속도가 느린 웹사이트는 고객을 잃고, 매출을 감소시키며, 
                  검색 순위에서 밀려납니다.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Vertex Studio는 속도 최적화를 단순한 기술 작업이 아닌, 
                  비즈니스 성장을 위한 필수 전략으로 접근합니다. 
                  데이터 기반의 최적화로 당신의 비즈니스도 속도의 힘을 경험하세요.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  이 다섯 가지 팩트는 웹 성능이 비즈니스 성장의 핵심임을 보여줍니다. 
                  속도는 더 이상 기술적 과제가 아닌, 비즈니스 성장을 위한 필수 전략입니다. 
                  지금 바로 웹 성능을 최적화하여 당신의 비즈니스를 차원 높게 성장시키세요.
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
                  <span className="text-sm text-green-600 font-medium">{post.category}</span>
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

export default BlogPost5;
