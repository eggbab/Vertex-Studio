import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, User, Tag, Monitor, Zap, Code, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';

const BlogPost2: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  // 페이지 로드 후 애니메이션 시작
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
    title: "웹사이트를 멋지게 만드는 3D 기술",
    date: "2025년 11월 12일",
    category: "Technology",
    readTime: "10분",
    author: "개발팀",
    tags: ["3D", "웹 기술", "디자인"]
  };

  const relatedPosts = [
    {
      title: "전환율을 3배 높이는 디자인의 비밀",
      date: "2025년 10월 24일",
      category: "Design",
      slug: "conversion-design-physics"
    },
    {
      title: "웹 성능 최적화 완벽 가이드",
      date: "2025년 11월 28일",
      category: "Performance",
      slug: "web-performance-optimization"
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
      <section className="px-6 md:px-12 pt-32 pb-16 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {blogData.category}
              </span>
              <span className="text-gray-500 text-sm">{blogData.readTime}</span>
            </div>
            <Link 
              to="/blog" 
              className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors text-sm font-medium"
            >
              블로그 목록으로 돌아가기
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
            웹사이트를 멋지게 만드는 3D 기술
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            특별한 프로그램 없이도 웹사이트에 3D 효과를 넣을 수 있습니다. 
            어떻게 가능한지 알기 쉽게 알려드립니다.
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
              요즘 웹사이트들을 보면 정말 멋진 3D 효과들이 많습니다. 
              제품을 360도로 돌려보거나, 마우스를 움직일 때마다 그림자가 
              움직이거나, 화면이 스크롤할 때 입체로 움직이는 것들을 본 적이 
              있을 겁니다.
            </p>
            
            <p className="text-gray-600 leading-relaxed text-lg">
              과거에는 이런 효과들을 만들려면 복잡한 프로그램을 설치해야 
              했지만, 이제는 웹 브라우저만으로도 충분히 가능합니다. 
              어떻게 이런 일이 가능한지, 그리고 우리도 어떻게 따라할 수 
              있는지 알아보겠습니다.
            </p>
          </div>

          {/* Section 1: What is WebGL */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Monitor className="w-8 h-8 text-blue-600" />
              WebGL이 무엇인가요?
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              WebGL은 '웹에서 그래픽을 그리는 기술'이라는 뜻입니다. 
              컴퓨터의 그래픽 카드를 직접 사용해서 웹사이트에서 3D 
              그림을 그릴 수 있게 해주는 기술입니다.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">WebGL의 강점</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Monitor className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-700 font-medium">하드웨어 가속</p>
                  <p className="text-xs text-gray-600 mt-1">GPU를 직접 사용해 빠른 처리</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-700 font-medium">플러그인 불필요</p>
                  <p className="text-xs text-gray-600 mt-1">브라우저에서 바로 실행</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Code className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-700 font-medium">모든 브라우저 지원</p>
                  <p className="text-xs text-gray-600 mt-1">크롬, 파이어폭스 등 호환</p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              이 기술 덕분에 우리는 특별한 프로그램 없이도 웹 브라우저에서 
              3D 게임을 하거나, 제품을 입체로 보거나, 멋진 애니메이션을 
              즐길 수 있습니다. 마치 웹사이트 안에 작은 게임기가 들어있는 
              것과 같습니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              WebGL은 모든 최신 브라우저에서 지원합니다. 크롬, 파이어폭스, 
              사파리, 엣지 등 우리가 일상적으로 사용하는 모든 브라우저에서 
              작동합니다. 별도로 설치할 필요가 없습니다.
            </p>
          </div>

          {/* Section 2: Simple Examples */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">어떻게 사용할 수 있나요?</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              WebGL을 직접 사용하는 것은 조금 복잡할 수 있지만, 다행히도 
              쉽게 사용할 수 있는 도구들이 많이 있습니다. Three.js라는 
              라이브러리가 가장 유명하며, 이것을 사용하면 복잡한 과정을 
              몇 줄의 코드로 줄일 수 있습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              가장 간단한 예제는 회전하는 큐브입니다. 몇 줄의 코드만으로 
              화면에 3D 큐브를 띄우고 계속 회전하게 만들 수 있습니다. 
              이 큐브는 마우스로 조작할 수도 있습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              좀 더 응용하면 제품을 3D로 보여줄 수 있습니다. 옷 쇼핑몰에서 
              옷을 360도로 돌려보거나, 가구 매장에서 소파를 다양한 각도에서 
              보거나, 자동차 사이트에서 차를 내부까지 자세히 볼 수 있습니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              또한 데이터 시각화에도 유용합니다. 복잡한 데이터를 3D 차트로 
              보여주면 사람들이 더 쉽게 이해할 수 있습니다. 주식 차트, 
              날씨 정보, 지도 등을 입체적으로 보여줄 수 있습니다.
            </p>
          </div>

          {/* Section 3: Real World Examples */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">실제 사용 사례</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              많은 유명한 웹사이트들이 WebGL을 사용하고 있습니다. 
              구글 지도는 3D 지도를 보여주고, 애플 웹사이트는 제품을 
              입체로 보여주며, 온라인 게임 사이트들은 브라우저 안에서 
              복잡한 게임을 실행합니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              쇼핑몰에서는 옷을 가상으로 입어보거나, 가구를 내 방에 
              배치해보거나, 자동차를 모든 색상으로 바꿔보는 경험을 제공합니다. 
              이런 경험은 고객들이 구매를 결정하는 데 큰 도움이 됩니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              교육 분야에서도 많이 사용됩니다. 인체를 3D로 보여주는 
              의학 교육, 화학 분자를 입체로 보여주는 과학 교육, 역사적 
              장소를 가상으로 체험하는 역사 교육 등이 가능합니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              예술 분야에서도 창의적으로 사용됩니다. 인터랙티브 미술 
              작품, 가상 전시관, 음악과 함께 움직이는 시각 예술 등이 
              웹에서 구현됩니다.
            </p>
          </div>

          {/* Section 4: Benefits */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">어떤 장점이 있나요?</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              가장 큰 장점은 사용자 경험이 향상된다는 것입니다. 
              사람들은 평면적인 화면보다 입체적인 경험을 더 재미있어 
              합니다. 제품을 더 잘 이해할 수 있고, 더 오래 웹사이트에 
              머물게 됩니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              또한 정보를 더 효과적으로 전달할 수 있습니다. 복잡한 데이터를 
              3D로 보여주면 사람들이 더 쉽게 이해하고 기억합니다. 
              교육적인 콘텐츠에 특히 효과적입니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              경쟁 우위도 확보할 수 있습니다. 다른 웹사이트들과 차별화된 
              경험을 제공할 수 있으며, 이는 브랜드 이미지 향상과 
              고객 유치에 도움이 됩니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              기술적으로도 장점이 있습니다. 컴퓨터의 그래픽 카드를 사용하므로 
              복잡한 연산도 빠르게 처리할 수 있고, 여러 사용자가 동시에 
              사용해도 성능이 잘 유지됩니다.
            </p>
          </div>

          {/* Section 5: Getting Started */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">어떻게 시작할 수 있나요?</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              WebGL을 배우는 것은 생각보다 어렵지 않습니다. 먼저 Three.js 
              라이브러리를 익히는 것부터 시작하는 것이 좋습니다. 이 
              라이브러리는 복잡한 WebGL 기능을 쉽게 사용할 수 있게 
              도와줍니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              인터넷에 무료로 공개된 튜토리얼들이 많이 있습니다. 
              간단한 예제부터 시작해서 점차 복잡한 것들을 시도해보세요. 
              처음에는 회전하는 큐브부터 만들어보는 것이 좋습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              또한 다른 사람들이 만든 예제들을 많이 보고 분석하는 것도 
              도움이 됩니다. 어떻게 구현되었는지 코드를 보고 이해하면 
              자신만의 프로젝트를 만드는 데 영감을 얻을 수 있습니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              중요한 것은 작은 프로젝트부터 시작하는 것입니다. 
              처음부터 복잡한 것을 만들려고 하지 말고, 간단한 것부터 
                  차근차근 익혀나가세요. 실력이 쌓이면 더 큰 프로젝트도 
                  도전할 수 있게 될 것입니다.
            </p>
          </div>

          {/* Section 6: Future */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">앞으로는 어떻게 발전할까요?</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              웹에서의 3D 기술은 계속 발전하고 있습니다. 더 빠르고, 
                  더 정교하고, 더 쉽게 사용할 수 있게 될 것입니다. 
                  앞으로는 더 많은 웹사이트들이 3D 효과를 기본으로 
                  사용하게 될 것입니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              가상현실(VR)과 증강현실(AR) 기술도 웹에서 더 쉽게 
                  사용할 수 있게 될 것입니다. 특별한 기기 없이도 웹 
                  브라우저만으로 가상현실 경험을 할 수 있게 될 수 
                  있습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              인공지능과 결합되어 더 자동화된 3D 콘텐츠 생성도 
                  가능해질 것입니다. 텍스트만 입력하면 자동으로 3D 
                  모델을 만들어주거나, 사진을 3D로 변환해주는 기술들이 
                  발전하고 있습니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
                  웹과 현실의 경계가 점점 흐려지면서 웹사이트들이 더 
                  입체적이고 상호작용적인 공간으로 변화할 것입니다. 
                  지금부터 이 기술들을 익히는 것은 미래를 준비하는 
                  좋은 방법입니다.
            </p>
          </div>

          {/* Conclusion */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">기억해야 할 것들</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              WebGL은 웹에서 3D 그래픽을 구현하는 강력한 기술입니다. 
                  특별한 프로그램 없이도 웹 브라우저만으로 멋진 3D 
                  경험을 만들 수 있습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              Three.js 같은 라이브러리를 사용하면 복잡한 과정을 쉽게 
                  처리할 수 있으며, 실제로 많은 웹사이트들이 이 기술을 
                  사용하여 사용자들에게 특별한 경험을 제공하고 있습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              이 기술은 쇼핑, 교육, 예술, 게임 등 다양한 분야에서 
                  활용될 수 있으며, 앞으로 더 많은 가능성이 열릴 것입니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
                  지금부터 작은 프로젝트부터 시작해서 3D 웹 기술을 
                  익혀보세요. 미래의 웹은 더 입체적이고 흥미로울 
                  것입니다.
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
    </motion.article>
  );
};

export default BlogPost2;
