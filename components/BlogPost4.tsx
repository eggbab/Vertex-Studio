import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, User, Tag, ShoppingBag, Store, Users, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

const BlogPost4: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const forceScrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = 0;
      }
    };

    forceScrollToTop();
    
    const timers = [
      setTimeout(forceScrollToTop, 0),
      setTimeout(forceScrollToTop, 10),
      setTimeout(forceScrollToTop, 50)
    ];

    const animationTimer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
      clearTimeout(animationTimer);
    };
  }, []);

  const blogData = {
    title: "온라인과 오프라인을 잇는 쇼핑의 미래",
    date: "2025년 10월 15일",
    category: "Business",
    readTime: "10분",
    author: "비즈니스 팀",
    tags: ["쇼핑", "옴니채널", "고객 경험"]
  };

  const relatedPosts = [
    {
      title: "전환율을 3배 높이는 디자인의 비밀",
      date: "2025년 10월 24일",
      category: "Design",
      slug: "conversion-design-physics"
    },
    {
      title: "2026년 웹 디자인: 무엇이 바뀔까요?",
      date: "2025년 12월 05일",
      category: "Trends",
      slug: "2026-design-trends"
    }
  ];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="px-6 md:px-12 pt-32 pb-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                {blogData.category}
              </span>
              <span className="text-gray-500 text-sm">{blogData.readTime}</span>
            </div>
            <Link 
              to="/blog" 
              className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors text-sm font-medium"
            >
              블로그 목록으로 돌아가기
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
            온라인과 오프라인을 잇는 쇼핑의 미래
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            성공적인 쇼핑 경험은 온라인과 오프라인이 만날 때 완성됩니다. 
            어떻게 가능한지 알아보세요.
          </p>
          
          <div className="flex items-center gap-6 text-gray-500 text-sm">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {blogData.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {blogData.date}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 md:px-12 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              요즘 사람들은 온라인으로 쇼핑하다가도 매장에 직접 가서 
              보고 구매하고, 매장에서 보다가 온라인으로 주문하기도 합니다. 
              이렇게 온라인과 오프라인을 넘나들며 쇼핑하는 것을 
              '옴니채널'이라고 부릅니다.
            </p>
            
            <p className="text-gray-600 leading-relaxed text-lg">
              성공적인 기업들은 이런 고객들의 쇼핑 습관을 잘 이해하고, 
              온라인과 오프라인이 완벽하게 연결된 경험을 제공합니다. 
              어떻게 이것이 가능한지 실제 사례를 통해 알아보겠습니다.
            </p>
          </div>

          {/* Section 1: What is Omnichannel */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-orange-600" />
              옴니채널이 무엇인가요?
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              옴니채널은 고객들이 온라인과 오프라인을 자유롭게 넘나들며 
              일관된 경험을 하도록 만드는 쇼핑 방식입니다. 고객들은 
              어디에서 쇼핑하든 똑같은 서비스와 가격, 정보를 받을 수 
              있습니다.
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">옴니채널의 특징</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Store className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-800">온라인 → 오프라인:</strong>
                    <p className="text-gray-600 text-sm mt-1">온라인 주문, 매장 픽업 가능</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShoppingBag className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-800">오프라인 → 온라인:</strong>
                    <p className="text-gray-600 text-sm mt-1">매장 보고 온라인 주문 가능</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-800">통합 고객 정보:</strong>
                    <p className="text-gray-600 text-sm mt-1">어디서든 동일한 혜택 제공</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-800">편리한 반품:</strong>
                    <p className="text-gray-600 text-sm mt-1">어디서든 쉬운 반품 처리</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              이런 경험은 고객들에게 큰 편리함을 제공합니다. 내가 원하는 
              때에 원하는 방식으로 쇼핑할 수 있기 때문입니다. 시간과 장소에 
              제약받지 않고 자유롭게 쇼핑할 수 있게 됩니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              기업 입장에서도 고객들이 더 만족하고 더 자주 구매하게 
              되어 매출이 증가합니다. 온라인과 오프라인이 서로 경쟁하는 
              것이 아니라, 함께 협력해서 고객 가치를 높이는 것입니다.
            </p>
          </div>

          {/* Section 2: Success Story */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">성공 사례: 스타일픽스</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              스타일픽스는 패션 브랜드로, 3년 전 옴니채널 전략을 도입하여 
              큰 성공을 거둔 기업입니다. 이전에는 온라인과 오프라인이 
              완전히 분리되어 있어 고객들이 많은 불편을 겪었습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              가장 큰 문제는 재고 정보가 공유되지 않는 것이었습니다. 
              온라인으로 재고가 있다고 나와도 매장에 가보면 없는 경우가 
              많았고, 반대로 매장에 있는 제품이 온라인에는 없는 경우도 
              많았습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              스타일픽스는 모든 매장과 온라인의 재고 정보를 실시간으로 
              공유하는 시스템을 구축했습니다. 이제 고객들은 어디서든 
              정확한 재고 정보를 확인할 수 있게 되었습니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              또한 고객 정보도 통합했습니다. 온라인에서 쌓은 적립금을 
              매장에서 사용할 수 있게 되고, 매장에서 구매한 내역도 온라인 
              계정에 자동으로 기록되었습니다. 고객들은 어디에서 쇼핑해도 
              자신의 정보가 유지되는 것을 확인할 수 있었습니다.
            </p>
          </div>

          {/* Section 3: Key Changes */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">어떤 변화들이 있었나요?</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              첫 번째 변화는 '클릭 앤 콜렉트' 서비스입니다. 고객들이 
              온라인으로 주문하고 가까운 매장에서 픽업할 수 있게 되었습니다. 
              배송을 기다릴 필요 없이 바로 제품을 받을 수 있어 인기가 
              많았습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              두 번째는 '무료 반품' 서비스입니다. 온라인으로 구매한 
              제품을 어떤 매장에서든 무료로 반품할 수 있게 되었습니다. 
              고객들은 구매 심리적 부담이 줄어들어 온라인 구매가 크게 
              증가했습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              세 번째는 '스마트 피팅룸'입니다. 매장 피팅룸에 태블릿을 
              설치해서 다른 색상이나 사이즈를 확인하고, 없는 제품은 
              온라인으로 주문해서 매장에서 받을 수 있게 했습니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              네 번째는 '개인화된 추천'입니다. 고객의 구매 이력을 분석해서 
              개인에게 맞는 제품을 추천하고, 매장에 방문하면 맞춤형 
              할인 쿠폰을 제공했습니다.
            </p>
          </div>

          {/* Section 4: Results */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">어떤 결과가 있었나요?</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              옴니채널 전략을 도입한 후 스타일픽스의 매출은 67% 
              증가했습니다. 온라인 매출은 120%나 늘었고, 오프라인 
              매출도 35% 증가했습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              고객 만족도도 크게 향상되었습니다. 고객 만족도 점수가 
              42점에서 61점으로 45%나 상승했습니다. 특히 20대 
              고객들의 만족도 향상이 두드러졌습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              온라인과 오프라인을 모두 이용하는 고객들의 구매 금액은 
              한 곳만 이용하는 고객들보다 2.3배 더 높았습니다. 
              채널을 넘나들며 쇼핑하는 고객들이 더 많은 돈을 쓰는 
              것입니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              또한 재고 비용도 28% 줄었습니다. 모든 매장의 재고를 
              효율적으로 관리하고, 필요한 곳에 재고를 옮길 수 있게 
              되었기 때문입니다.
            </p>
          </div>

          {/* Section 5: Key Success Factors */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">성공의 비결은 무엇인가요?</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              첫 번째 비결은 '고객 중심'이었습니다. 모든 결정을 
              고객의 관점에서 내렸습니다. 고객들이 어떤 불편을 겪고, 
              무엇을 원하는지를 먼저 파악하고 그에 맞춰 시스템을 
              개선했습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              두 번째는 '데이터 통합'이었습니다. 온라인과 오프라인의 
              모든 데이터를 하나로 합쳐서 고객에 대한 360도 뷰를 
              만들었습니다. 이를 통해 개인화된 서비스를 제공할 수 
              있었습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              세 번째는 '직원 교육'이었습니다. 매장 직원들에게 온라인 
              시스템 사용법을 교육하고, 온라인 주문을 처리하는 방법을 
              가르쳤습니다. 직원들이 변화를 이해하고 지지하는 것이 
              중요했습니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              네 번째는 '점진적 변화'였습니다. 모든 것을 한 번에 
              바꾸려고 하지 않고, 작은 성공부터 시작해서 점차 
              확산했습니다. 먼저 몇 개 매장에서 시도해보고 성공하면 
              전체로 확대하는 방식이었습니다.
            </p>
          </div>

          {/* Section 6: Lessons for Others */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">다른 기업들을 위한 조언</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              옴니채널은 큰 기업만 할 수 있는 것이 아닙니다. 
              작은 가게도 시작할 수 있습니다. 먼저 온라인과 오프라인의 
              재고 정보를 통합하는 것부터 시작해보세요.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              기술 투자만으로는 충분하지 않습니다. 조직 문화와 
              직원들의 마음가짐 변화가 더 중요합니다. 온라인팀과 
              오프라인팀이 서로 협력하고, 함께 고객을 위해 일하는 
              문화를 만들어야 합니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              고객들의 피드백을 적극적으로 들어야 합니다. 어떤 
              불편이 있고, 어떤 서비스를 원하는지 계속 물어보고 
              개선해야 합니다. 고객들이 직접 원하는 것이 최고의 
              옴니채널 전략입니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              마지막으로 인내심을 가지세요. 옴니채널은 하룻밤 사이에 
              완성되는 것이 아닙니다. 몇 년에 걸쳐 점진적으로 
              개선해나가는 장기적인 과정입니다. 작은 성공들을 
              쌓아가면서 나아가야 합니다.
            </p>
          </div>

          {/* Conclusion */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">기억해야 할 것들</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              옴니채널은 온라인과 오프라인을 연결해서 고객들에게 
              더 나은 쇼핑 경험을 제공하는 방식입니다. 고객들은 
              어디에서든 일관된 서비스를 받을 수 있게 됩니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              성공적인 옴니채널은 기술 투자를 넘어서 고객 중심의 
              사고와 조직 문화 변화를 필요로 합니다. 모든 팀이 
              함께 협력해서 고객 가치를 높여야 합니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              스타일픽스의 사례에서 볼 수 있듯이, 잘 구현된 옴니채널은 
              매출 증가와 고객 만족도 향상으로 이어집니다. 고객들이 
              더 만족하고 더 자주 구매하게 됩니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              미래의 쇼핑은 온라인과 오프라인의 경계가 더 흐려질 
              것입니다. 지금부터 옴니채널을 준비하는 기업들이 미래의 
              성공을 이끌어갈 것입니다.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
            {blogData.tags.map((tag, index) => (
              <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="px-6 md:px-12 pt-16 pb-20 bg-gray-50">
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
    </motion.article>
  );
};

export default BlogPost4;
