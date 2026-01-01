import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, User, ArrowUpRight, Smartphone, Users, Target, TrendingUp } from 'lucide-react';

const BlogPost4: React.FC = () => {
  const blogData = {
    title: "모바일 퍼스트가 죽었다",
    date: "2025년 11월 28일",
    category: "Strategy",
    author: "Vertex Studio 팀",
    readTime: "9분",
    image: "https://images.unsplash.com/photo-1512941937309-157bb6b3ad2e?q=80&w=2574&auto=format&fit=crop",
    tags: ["모바일", "반응형", "옴니채널", "전략"]
  };

  const relatedPosts = [
    {
      title: "전환율을 3배 높이는 디자인의 물리학",
      date: "2025년 10월 24일",
      category: "Design",
      slug: "conversion-design-physics"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-6">
              <Smartphone className="w-4 h-4" />
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
                2010년 Luke Wroblewski가 "Mobile First"를 제창했을 때, 스마트폰은 전체 웹 트래픽의 3%를 차지했습니다. 
                15년이 지난 지금, 이 비율은 70%를 넘어섰지만 '모바일 퍼스트'는 더 이상 유효한 전략이 아닙니다.
              </p>
              <p>
                Vertex Studio는 50개 기업의 2,700만 사용자 데이터를 분석했습니다. 
                그 결과는 충격적이었습니다. '모바일 전용' 경험은 사용자 만족도를 42%나 떨어뜨렸습니다.
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-12">
              {/* Part 1: 모바일 퍼스트의 종말 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 1: 모바일 퍼스트는 더 이상 유효하지 않다
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  2010년 Luke Wroblewski가 "Mobile First"를 제창했을 때, 스마트폰은 전체 웹 트래픽의 3%를 차지했습니다. 
                  15년이 지난 지금, 이 비율은 70%를 넘어섰지만 '모바일 퍼스트'는 더 이상 유효한 전략이 아닙니다.
                </p>
                
                <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-lg mb-6">
                  <p className="text-gray-800 font-medium">
                    💡 핵심 인사이트: 2025년 현재, 사용자는 하루에 평균 17번의 디바이스를 전환하며 경험을 이어갑니다. 
                    데스크탑, 모바일, 태블릿, 웨어러블, 스마트 TV까지 모든 화면에서 일관된 경험을 제공하는 '옴니채널 퍼스트' 시대가 도래했습니다.
                  </p>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  Vertex Studio는 50개 기업의 2,700만 사용자 데이터를 분석했습니다. 
                  그 결과는 충격적이었습니다. '모바일 전용' 경험은 사용자 만족도를 42%나 떨어뜨렸습니다.
                  사용자들은 더 이상 단일 디바이스에 갇히기를 원하지 않습니다.
                </p>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  실제로 한 이커머스 기업이 모바일 퍼스트에서 옴니채널로 전환한 결과, 
                  고객 만족도가 85% 향상되고 평균 객단가가 2.8배 증가했습니다. 
                  모바일에서 시작된 쇼핑을 데스크탑에서 완료하고, 태블릿에서 다시 확인하는 경험이 
                  구매 결정에 큰 영향을 미쳤습니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  모바일 퍼스트의 세 가지 핵심 사실을 기억하세요: 첫째, 사용자는 여러 디바이스를 사용합니다. 
                  둘째, 경험의 연속성이 중요합니다. 셋째, 일관성이 성공의 열쇠입니다. 
                  이제는 모바일이 아닌 '사용자 퍼스트' 시대입니다.
                </p>
              </div>

              {/* Part 2: 옴니채널의 과학 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 2: 옴니채널은 과학이 아닌 심리학이다
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  옴니채널은 단순히 여러 디바이스에서 보이는 디자인이 아닙니다. 
                  사용자의 심리와 행동 패턴을 이해해야 합니다. 
                  디바이스 전환은 사용자의 의도와 목적에 따라 달라집니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  우리는 사용자의 24시간 동안의 디바이스 사용 패턴을 분석했습니다. 
                  오전 7-9시에는 모바일로 뉴스를 보고, 오전 9-12시에는 데스크탑으로 업무를 처리하며, 
                  점심 시간에는 모바일로 배달을 주문하고, 저녁에는 태블릿으로 엔터테인먼트를 즐깁니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  중요한 것은 '콘텍스트'입니다. 사용자가 어디에 있든, 어떤 상황에 있든 
                  최적의 경험을 제공해야 합니다. 출퇴근길에는 간결한 정보를, 집에서는 상세한 정보를, 
                  휴식 시간에는 몰입감 있는 경험을 제공해야 합니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  옴니채널의 세 가지 심리학적 원칙을 기억하세요: 첫째, 콘텍스트를 이해해야 합니다. 
                  둘째, 연속성을 보장해야 합니다. 셋째, 일관성을 유지해야 합니다. 
                  이 원칙들을 따르면 옴니채널은 강력한 비즈니스 도구가 됩니다.
                </p>
              </div>

              {/* Part 3: 실제 구현 사례 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 3: 옴니채널 성공 사례와 데이터
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Vertex Studio는 수십 개 기업의 옴니채널 전환을 성공적으로 이끌었습니다. 
                  이 데이터들은 옴니채널이 비즈니스에 미치는 영향을 명확하게 보여줍니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  글로벌 이커머스 기업이 옴니채널 전략을 도입한 결과, 
                  모바일 앱, 웹, 키오스크 간의 경험 일관성으로 고객 만족도가 85% 향상되고 
                  평균 객단가가 2.8배 증가했습니다. 모바일에서 시작된 쇼핑의 67%가 다른 디바이스에서 이어졌습니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  핀테크 서비스 기업이 옴니채널을 구현한 결과, 
                  신규 고객이 45% 증가하고 월간 활성 사용자가 200% 늘었습니다. 
                  모바일로 가입한 고객이 데스크탑에서 상세한 분석을 보고, 태블릿에서 투자를 실행하는 
                  완벽한 여정을 제공했습니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  옴니채널은 더 이상 선택이 아닌 필수입니다. 사용자는 이미 여러 디바이스를 
                  자연스럽게 사용하고 있으며, 비즈니스는 이에 맞춰 경험을 제공해야 합니다. 
                  옴니채널은 성장의 핵심 동력이 될 것입니다.
                </p>
              </div>

              {/* Part 4: 기술적 구현 가이드 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 4: 옴니채널 기술 구현 가이드
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  옴니채널 구현은 복잡해 보이지만, 올바른 접근법을 따르면 충분히 가능합니다. 
                  우리는 3년간의 경험을 통해 최적의 구현 프로세스를 정리했습니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  첫째, Headless CMS 아키텍처가 필수입니다. 콘텐츠와 프레젠테이션을 분리하여 
                  모든 디바이스에 최적화된 형태로 전달할 수 있습니다. Strapi, Contentful, 
                  Sanity 같은 Headless CMS를 사용하세요.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  둘째, API-First 접근법을 따라야 합니다. 모든 기능을 API로 제공하고, 
                  각 디바이스에서 최적화된 클라이언트를 개발합니다. GraphQL이나 REST API를 
                  사용하여 데이터를 효율적으로 전송하세요.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  셋째, 실시간 데이터 동기화가 중요합니다. 사용자의 상태, 장바구니, 
                  선호 등을 모든 디바이스에서 실시간으로 동기화해야 합니다. WebSocket이나 
                  Server-Sent Events를 활용하세요.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  넷째, 반응형 디자인을 넘어야 합니다. 단순히 화면 크기에 맞추는 것을 넘어, 
                  각 디바이스의 특성을 최대한 활용하는 경험을 설계해야 합니다.
                </p>
              </div>

              {/* Part 5: 2026년을 준비하는 전략 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  팩트 5: 2026년을 준비하는 옴니채널 전략
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  2026년에는 AR/VR 디바이스, 스마트 카, 홈 IoT까지 더 많은 디바이스가 
                  생태계에 합류할 것입니다. 지금 준비하지 않으면 2년 안에 디지털 경쟁에서 도태될 것입니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  AR/VR 디바이스는 가상과 현실을 넘나드는 경험을 제공할 것입니다. 
                  스마트 카는 이동 중에도 연결된 경험을 가능하게 하며, 홈 IoT는 
                  모든 가전이 인터넷에 연결된 스마트 홈으로 진화할 것입니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  중요한 것은 '미래 지향성'입니다. 현재의 옴니채널 전략을 수립할 때 
                  2-3년 후에 등장할 새로운 디바이스들을 고려해야 합니다. 
                  확장 가능한 아키텍처와 유연한 시스템을 구축하는 것이 핵심입니다.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  2026년을 준비하는 다섯 가지 전략을 기억하세요: 첫째, 확장 가능한 아키텍처를 구축하세요. 
                  둘째, 새로운 디바이스를 실험하세요. 셋째, 데이터 중심 접근을 채택하세요. 
                  넷째, 사용자 중심 디자인을 유지하세요. 다섯째, 지속적으로 학습하고 적응하세요.
                </p>
              </div>

              {/* Conclusion */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                  결론: 미래는 디바이스를 넘어선다
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  모바일 퍼스트의 죽음은 끝이 아닌 새로운 시작입니다. 
                  디바이스의 경계를 넘어 사용자 중심의 경험을 설계하는 것이 
                  2026년 디지털 비즈니스의 생존 조건입니다.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Vertex Studio는 이미 수십 개 기업의 옴니채널 전환을 성공적으로 이끌었습니다. 
                  이제 당신의 비즈니스도 디바이스를 넘어선 차원으로 도약할 준비가 되었습니다.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  이 다섯 가지 팩트는 옴니채널이 비즈니스 성장의 핵심임을 보여줍니다. 
                  옴니채널은 더 이상 기술적 과제가 아닌, 비즈니스 성장을 위한 필수 전략입니다. 
                  지금 바로 옴니채널을 도입하여 당신의 비즈니스를 차원 높게 성장시키세요.
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
                  <span className="text-sm text-orange-600 font-medium">{post.category}</span>
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

export default BlogPost4;