import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, User, Tag, TrendingUp, Zap, Eye, Brain, CheckCircle, AlertTriangle, ShoppingBag } from 'lucide-react';

const BlogPost3: React.FC = () => {
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
    title: "2026년 웹 디자인: 무엇이 바뀔까요?",
    date: "2025년 12월 05일",
    category: "Trends",
    readTime: "8분",
    author: "디자인 리서치팀",
    tags: ["트렌드", "디자인", "미래"]
  };

  const relatedPosts = [
    {
      title: "전환율을 3배 높이는 디자인의 비밀",
      date: "2025년 10월 24일",
      category: "Design",
      slug: "conversion-design-physics"
    },
    {
      title: "웹사이트를 멋지게 만드는 3D 기술",
      date: "2025년 11월 12일",
      category: "Technology",
      slug: "webgl-depth-technology"
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
      <section className="px-6 md:px-12 pt-32 pb-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {blogData.category}
              </span>
              <span className="text-gray-500 text-sm">{blogData.readTime}</span>
            </div>
            <Link 
              to="/blog" 
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium"
            >
              블로그 목록으로 돌아가기
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
            2026년 웹 디자인: 무엇이 바뀔까요?
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            웹 디자인의 미래를 알아보세요. 2026년에는 어떤 변화들이 
            우리를 기다리고 있을까요?
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
              웹 디자인은 계속 변화하고 있습니다. 10년 전의 웹사이트와 
              지금의 웹사이트는 완전히 다릅니다. 그렇다면 1년 후인 2026년에는 
              어떤 변화들이 우리를 기다리고 있을까요?
            </p>
            
            <p className="text-gray-600 leading-relaxed text-lg">
              이 글에서는 전문가들의 예측과 현재의 기술 발전을 바탕으로 
              2026년에 웹 디자인에서 어떤 변화들이 일어날지 알기 쉽게 
              설명해드립니다.
            </p>
          </div>

          {/* Section 1: More 3D and Movement */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              더 많은 3D와 움직임
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              2026년에는 웹사이트들이 더 입체적으로 변할 것입니다. 
              평면적인 화면을 넘어서 공간감이 느껴지는 디자인들이 많아질 
              것입니다. 마우스를 움직일 때마다 그림자가 따라 움직이고, 
              스크롤할 때마다 요소들이 3D로 움직이는 경험을 더 많이 
              보게 될 것입니다.
            </p>

            <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-lg mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-bold text-gray-900">3D 디자인의 활용 분야</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <ShoppingBag className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-700 font-medium">쇼핑몰</p>
                  <p className="text-xs text-gray-600 mt-1">360도 제품 뷰</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Brain className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-700 font-medium">교육</p>
                  <p className="text-xs text-gray-600 mt-1">3D 모델 학습</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Eye className="w-8 h-8 text-pink-600" />
                  </div>
                  <p className="text-sm text-gray-700 font-medium">여행</p>
                  <p className="text-xs text-gray-600 mt-1">가상 체험</p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              이런 변화는 기술 발전 덕분입니다. 웹 브라우저들이 더 
              강력해져서 복잡한 3D 그래픽도 쉽게 처리할 수 있게 되었습니다. 
              또한 컴퓨터와 스마트폰의 성능도 좋아져서 이런 효과들이 
              부드럽게 작동합니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              하지만 너무 과한 효과는 피해야 합니다. 사용자들이 불편하지 
              않도록 적절한 수준에서 3D 효과를 사용하는 것이 중요합니다. 
              목적은 사용자 경험을 향상시키는 것이지, 단순히 화려하게 
              보여주는 것이 아닙니다.
            </p>
          </div>

          {/* Section 2: AI Helps Design */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-600" />
              AI가 디자인을 도와줘요
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              인공지능이 디자인 과정에 더 많이 참여하게 될 것입니다. 
              디자이너들이 아이디어를 내면 AI가 여러 버전의 디자인을 
              자동으로 만들어주고, 어떤 디자인이 더 효과적인지 데이터를 
              바탕으로 알려줄 것입니다.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">AI 디자인 도우미의 역할</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-800">자동 디자인 생성:</strong>
                    <p className="text-gray-600 text-sm mt-1">아이디어를 여러 버전으로 확장</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-800">개인화된 디자인:</strong>
                    <p className="text-gray-600 text-sm mt-1">사용자 취향에 맞춰 자동 조정</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-800">콘텐츠 생성:</strong>
                    <p className="text-gray-600 text-sm mt-1">이미지 합성, 텍스트 요약</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-800">효과 분석:</strong>
                    <p className="text-gray-600 text-sm mt-1">데이터 기반 최적화 제안</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              또한 AI가 사용자들의 행동을 분석해서 개인화된 디자인을 
              제공할 것입니다. 각 사람의 취향과 습관에 맞춰서 웹사이트의 
              레이아웃, 색상, 글씨 크기 등을 자동으로 조정해줄 것입니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              하지만 AI가 디자이너를 대체하지는 않습니다. AI는 도구일 
              뿐이고, 최종적인 창의적인 결정은 여전히 사람이 내려야 합니다. 
              좋은 디자인은 기술을 넘어 사람의 감성을 이해해야 하기 
              때문입니다.
            </p>
          </div>

          {/* Section 3: Voice and Gesture Control */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">목소리와 제스처로 제어하기</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              마우스와 키보드만으로 웹을 사용하는 시대가 끝나갑니다. 
              2026년에는 목소리로 명령하고, 손짓으로 제어하는 것이 더 
              일반적이 될 것입니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              "다음 페이지로 넘어가"라고 말하면 페이지가 바뀌고, 손을 
              흔들면 제품이 360도로 돌아갑니다. 눈으로 버튼을 보면 
              자동으로 클릭되기도 합니다. 이런 기술들이 이미 개발되고 있으며 
              2026년에는 더 보편화될 것입니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              이런 변화는 특히 장애인들에게 큰 도움이 됩니다. 
              손을 사용하기 어려운 사람들은 목소리로 웹을 탐색할 수 있고, 
              시각 장애인들은 음성 피드백을 통해 더 편리하게 웹을 
              사용할 수 있습니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              또한 모든 사람들에게 더 편리한 경험을 제공합니다. 
              요리하면서 레시피를 볼 때 손이 더러워져도 목소리로 페이지를 
              넘길 수 있고, 운전하면서도 안전하게 웹을 사용할 수 있습니다.
            </p>
          </div>

          {/* Section 4: Dark Mode and Personalization */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">다크 모드와 개인화</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              다크 모드가 선택이 아닌 기본이 될 것입니다. 대부분의 
              웹사이트들이 밝은 모드와 어두운 모드를 모두 제공하고, 
              사용자들이 선호하는 모드를 자동으로 기억해줄 것입니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              더 나아가 각 사람의 눈 건강 상태에 맞춰서 글씨 크기, 
              색상 대비, 화면 밝기 등을 자동으로 조정해주는 기능도 
              일반화될 것입니다. 노인들을 위한 큰 글씨 모드, 
              색맹인들을 위한 특별한 색상 모드 등이 기본으로 제공됩니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              콘텐츠도 개인화됩니다. 각 사람의 관심사와 지식 수준에 
              맞춰서 글의 내용과 설명 방식이 달라집니다. 초보자에게는 
              쉬운 용어로 설명하고, 전문가에게는 깊이 있는 내용을 
              제공합니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              이런 개인화는 사용자들이 웹사이트에서 더 오래 머물고, 
              더 많은 것을 배우고, 더 만족스러운 경험을 하게 만듭니다. 
              모두에게 똑같은 경험을 제공하는 것이 아니라, 각 사람에게 
              최적의 경험을 제공하는 것이 목표입니다.
            </p>
          </div>

          {/* Section 5: Faster and Simpler */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">더 빠르고 더 간단하게</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              기술이 발전할수록 웹사이트들은 더 빨라지고 더 간단해집니다. 
              2026년에는 대부분의 웹사이트가 1초 안에 로딩될 것입니다. 
              사람들은 더 이상 로딩을 기다리지 않아도 됩니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              디자인도 더 간단해집니다. 불필요한 요소들은 모두 사라지고, 
              정말 중요한 것들만 남게 됩니다. 사람들은 원하는 것을 더 
              쉽고 빠르게 찾을 수 있게 됩니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              모바일 중심의 디자인이 더욱 강화됩니다. 모바일에서 
              불편했던 경험들이 모두 개선되고, 모바일에서 더 편리한 
              기능들이 많이 생깁니다. 이제는 모바일이 주요 플랫폼이 
              완전히 자리 잡게 됩니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              또한 웹사이트들이 서로 더 잘 연결됩니다. 한 웹사이트에서 
              다른 웹사이트의 기능을 쉽게 사용할 수 있게 되고, 데이터도 
              더 원활하게 공유됩니다. 사용자들은 여러 웹사이트를 
              오가며 일관된 경험을 하게 됩니다.
            </p>
          </div>

          {/* Section 6: What This Means for Us */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">우리에게 무엇을 의미할까요?</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              이런 변화들은 우리에게 새로운 기회와 도전을 동시에 
              제공합니다. 디자이너들은 새로운 기술들을 배우고 적응해야 
              하지만, 더 창의적이고 효과적인 디자인을 만들 수 있게 됩니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              기업들은 더 나은 사용자 경험을 제공해야 경쟁에서 이길 수 
              있습니다. 단순히 예쁜 디자인을 넘어서, 사용자들이 정말 
              원하는 것을 제공하고 문제를 해결해주는 웹사이트들이 성공하게 
              될 것입니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              사용자들은 더 편리하고 즐거운 웹 경험을 하게 됩니다. 
              원하는 것을 더 쉽게 찾고, 더 빠르게 얻고, 더 개인화된 
              서비스를 받게 됩니다. 웹이 우리 삶의 더 중요한 부분이 
              될 것입니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              중요한 것은 변화에 열려있는 자세입니다. 기술이 어떻게 
              발전하든, 결국 중요한 것은 사람들을 위한 디자인입니다. 
              새로운 기술들을 사람들을 돕는 방향으로 사용하는 것이 
              핵심입니다.
            </p>
          </div>

          {/* Conclusion */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">기억해야 할 것들</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              2026년의 웹 디자인은 더 입체적이고, 더 지능적이고, 
              더 개인화될 것입니다. 3D 효과와 AI 기술이 일반화되고, 
              목소리와 제스처로 제어하는 것이 보편화될 것입니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              하지만 기술 발전보다 중요한 것은 사용자 경험입니다. 
              어떤 기술을 사용하든 사람들이 편리하고 즐겁게 사용할 수 
              있어야 합니다. 기술은 사람을 위한 도구일 뿐입니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              이런 변화들을 두려워할 필요는 없습니다. 오히려 새로운 
              가능성으로 생각하고, 배우고 도전해야 합니다. 미래의 웹은 
              더 흥미롭고 더 유용할 것입니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              지금부터 미래의 트렌드들을 관심 있게 지켜보고, 작은 
              프로젝트부터 시도해보세요. 변화의 흐름에 동참하는 것이 
              미래를 준비하는 가장 좋은 방법입니다.
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
                  <span className="text-sm text-purple-600 font-medium">{post.category}</span>
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

export default BlogPost3;
