import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, User, Tag, Eye, Keyboard, Headphones, CheckCircle, AlertCircle } from 'lucide-react';

const BlogPost6: React.FC = () => {
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
    title: "모두를 위한 웹사이트 만들기",
    date: "2025년 11월 20일",
    category: "Accessibility",
    readTime: "8분",
    author: "디자인팀",
    tags: ["접근성", "웹디자인", "포용성"]
  };

  const relatedPosts = [
    {
      title: "전환율을 3배 높이는 디자인의 비밀",
      date: "2025년 10월 24일",
      category: "Design",
      slug: "conversion-design-physics"
    },
    {
      title: "웹사이트 속도 높이는 간단한 방법",
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
      <section className="px-6 md:px-12 pt-32 pb-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                {blogData.category}
              </span>
              <span className="text-gray-500 text-sm">{blogData.readTime}</span>
            </div>
            <Link 
              to="/blog" 
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors text-sm font-medium"
            >
              블로그 목록으로 돌아가기
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
            모두를 위한 웹사이트 만들기
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            장애 여부와 상관없이 모든 사람이 웹사이트를 
            편리하게 사용할 수 있게 만드는 방법을 알아보세요.
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
              웹사이트를 만들 때 우리는 건강한 사람들을 생각하며 
              디자인합니다. 하지만 시각 장애인, 청각 장애인, 신체 
              장애인들을 위한 배려는 어떻게 하고 있을까요?
            </p>
            
            <p className="text-gray-600 leading-relaxed text-lg">
              좋은 웹사이트는 모든 사람이 사용할 수 있어야 합니다. 
              이것이 '웹 접근성'의 핵심입니다. 접근성은 특정 사람들을 
              위한 특별한 기능이 아니라, 모두를 위한 기본적인 
              요구사항입니다.
            </p>
          </div>

          {/* Section 1: Why Accessibility Matters */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Eye className="w-8 h-8 text-indigo-600" />
              왜 접근성이 중요한가요?
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              전 세계 인구의 15%가 장애를 가지고 있습니다. 여러분의 
              웹사이트를 방문하는 사람들 중에도 장애인들이 분명히 
              있습니다. 그들이 웹사이트를 사용하지 못한다면 여러분은 
              고객의 15%를 잃는 것입니다.
            </p>

            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-lg mb-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-6 h-6 text-indigo-600" />
                <h3 className="text-lg font-bold text-gray-900">접근성이 필요한 사람들</h3>
              </div>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-indigo-600 mb-2">15%</div>
                <p className="text-gray-700">전 세계 인구 중 장애인 비율</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Eye className="w-8 h-8 text-indigo-600" />
                  </div>
                  <p className="text-sm text-gray-700 font-medium">시각 장애</p>
                  <p className="text-xs text-gray-600 mt-1">색맹, 저시력 등</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Headphones className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-700 font-medium">청각 장애</p>
                  <p className="text-xs text-gray-600 mt-1">난청 등</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Keyboard className="w-8 h-8 text-pink-600" />
                  </div>
                  <p className="text-sm text-gray-700 font-medium">신체 장애</p>
                  <p className="text-xs text-gray-600 mt-1">마우스 사용 불가 등</p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              하지만 접근성은 장애인만을 위한 것이 아닙니다. 
              노인들, 임시 부상을 입은 사람들, 느린 인터넷을 
              사용하는 사람들도 접근성 있는 웹사이트에서 혜택을 
              봅니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              또한 법적 요구사항이기도 합니다. 많은 국가에서 
              웹사이트 접근성을 법으로 규정하고 있으며, 지키지 
              않으면 법적 처벌을 받을 수 있습니다.
            </p>
          </div>

          {/* Section 2: Visual Accessibility */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">시각적 접근성</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              시각 장애인들을 위한 가장 기본적인 것은 충분한 색상 
              대비입니다. 글자와 배경의 색상 대비가 충분하지 않으면 
              저시력자들이 글을 읽기 어렵습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              일반적으로 흰색 배경에 검은색 글자가 가장 좋습니다. 
              회색 배경에 흰색 글자처럼 대비가 낮은 조합은 피해야 
              합니다. 온라인 도구들을 사용하여 색상 대비를 
              확인할 수 있습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              글자 크기도 중요합니다. 너무 작은 글자는 모든 
              사람들이 읽기 어렵습니다. 최소 16픽셀 이상의 크기를 
              사용하고, 사용자들이 글자 크기를 확대할 수 있게 
              해야 합니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              이미지에는 대체 텍스트를 제공해야 합니다. 스크린 
              리더를 사용하는 시각 장애인들은 이미지를 볼 수 없으므로 
                  대체 텍스트로 이미지의 내용을 이해합니다.
            </p>
          </div>

          {/* Section 3: Keyboard Navigation */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">키보드 사용</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              일부 사람들은 마우스를 사용할 수 없습니다. 신체 
              장애인들이나 손을 다친 사람들은 키보드만으로 웹사이트를 
              사용해야 합니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              모든 인터랙티브 요소는 키보드로 접근할 수 있어야 
              합니다. 버튼, 링크, 폼 요소들을 Tab 키로 이동하고 
              Enter 키로 활성화할 수 있게 만들어야 합니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              포커스 표시도 명확해야 합니다. 현재 어떤 요소가 
              선택되어 있는지 시각적으로 명확하게 보여주어야 합니다. 
              테두리나 배경색 변화로 포커스를 표시할 수 있습니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              키보드 사용 순서도 논리적이어야 합니다. 페이지의 
              내용이 나타나는 순서대로 키보드로 이동할 수 있어야 
              합니다.
            </p>
          </div>

          {/* Section 4: Content Structure */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">콘텐츠 구조</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              잘 구조화된 HTML은 접근성의 기본입니다. 제목, 
              단락, 리스트를 올바르게 사용하면 스크린 리더 사용자들이 
              콘텐츠의 구조를 이해할 수 있습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              제목 태그를 계층적으로 사용해야 합니다. h1을 메인 
              제목으로 사용하고, h2, h3, h4 순서대로 사용하여 
              콘텐츠의 계층 구조를 나타내야 합니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              링크 텍스트도 명확해야 합니다. "여기를 클릭하세요"처럼 
              맥락 없는 링크 텍스트는 피하고, "2024년 연간 보고서 
                  다운로드"처럼 명확한 링크 텍스트를 사용해야 합니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              폼 요소에는 레이블을 제공해야 합니다. 입력 필드가 
              무엇을 위한 것인지 명확하게 설명하는 레이블이 있어야 
              합니다.
            </p>
          </div>

          {/* Section 5: Testing */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">테스트 방법</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              접근성을 개선하려면 먼저 현재 상태를 테스트해야 
              합니다. 여러 가지 방법으로 접근성을 테스트할 수 
              있습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              가장 간단한 방법은 키보드만으로 웹사이트를 사용해보는 
              것입니다. 마우스를 사용하지 않고 모든 기능을 사용할 수 
              있는지 확인해보세요.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              스크린 리더를 사용해보는 것도 좋습니다. 무료 스크린 
              리더를 설치하고 웹사이트를 탐색해보면 시각 장애인들의 
                  경험을 이해할 수 있습니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              자동화 도구들도 도움이 됩니다. axe, WAVE, Lighthouse 
              같은 도구들을 사용하여 접근성 문제들을 자동으로 
              찾을 수 있습니다.
            </p>
          </div>

          {/* Section 6: Common Mistakes */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">흔한 실수들</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              이미지에 대체 텍스트를 제공하지 않는 것이 가장 흔한 
              실수입니다. 모든 의미 있는 이미지에는 적절한 대체 
              텍스트가 필요합니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              색상만으로 정보를 전달하는 것도 문제입니다. 
              색맹인들은 색상 차이를 구분하지 못하므로 색상뿐만 
              아니라 텍스트나 아이콘으로도 정보를 전달해야 합니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              자동 재생 비디오나 오디오도 문제가 될 수 있습니다. 
              자동으로 재생되면 스크린 리더 사용자들이 방해를 
              받습니다. 사용자가 직접 재생할 수 있게 해야 합니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              복잡한 캡차도 피해야 합니다. 사용자들이 캡차를 
                  통과하지 못하면 콘텐츠에 접근할 수 없습니다. 간단하고 
                  명확한 캡차를 사용하세요.
            </p>
          </div>

          {/* Conclusion */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">기억해야 할 것들</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              웹 접근성은 선택이 아닌 필수입니다. 모든 사람이 
              웹사이트를 사용할 수 있게 만드는 것은 디자이너와 
              개발자의 책임입니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              충분한 색상 대비, 키보드 내비게이션, 명확한 콘텐츠 
              구조, 적절한 대체 텍스트가 접근성의 핵심입니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              접근성은 한 번의 작업으로 끝나는 것이 아닙니다. 
              지속적으로 테스트하고 개선해야 합니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              모두를 위한 웹사이트를 만드는 것은 올바른 일이며, 
              비즈니스에도 도움이 됩니다. 더 많은 사람들이 
              웹사이트를 사용할 수 있게 만드세요.
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
    </motion.article>
  );
};

export default BlogPost6;
