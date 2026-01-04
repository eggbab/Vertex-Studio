import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, User, Tag, Eye, Brain, Target, TrendingUp, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';

const BlogPost1: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 즉시 스크롤을 맨 위로 강제 이동
    const forceScrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = 0;
      }
    };

    // 즉시 실행
    forceScrollToTop();
    
    // 여러 타이밍에서 실행
    const timers = [
      setTimeout(forceScrollToTop, 0),
      setTimeout(forceScrollToTop, 10),
      setTimeout(forceScrollToTop, 50)
    ];

    // 페이지 로드 후 애니메이션 시작
    const animationTimer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
      clearTimeout(animationTimer);
    };
  }, []);

  const blogData = {
    title: "전환율을 3배 높이는 디자인의 비밀",
    date: "2025년 10월 24일",
    category: "Design",
    readTime: "12분",
    author: "디자인 팀",
    tags: ["디자인", "전환율", "사용자 경험"]
  };

  const relatedPosts = [
    {
      title: "웹 성능 최적화 완벽 가이드",
      date: "2025년 11월 28일",
      category: "Performance",
      slug: "web-performance-optimization"
    },
    {
      title: "2026년 웹 디자인 트렌드",
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
      <section className="px-6 md:px-12 pt-32 pb-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {blogData.category}
              </span>
              <span className="text-gray-500 text-sm">{blogData.readTime}</span>
            </div>
            <Link 
              to="/blog" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              블로그 목록으로 돌아가기
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
            전환율을 3배 높이는 디자인의 비밀
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            사람들이 웹사이트에서 어떻게 행동하는지 이해하면, 
            더 많은 사람들이 원하는 행동을 하도록 만들 수 있습니다.
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
              왜 어떤 웹사이트는 사람들이 쉽게 물건을 사고, 어떤 웹사이트는 
              사람들이 그냥 떠나버릴까요? 그 차이는 바로 디자인에 있습니다. 
              좋은 디자인은 사람들이 원하는 것을 쉽게 찾게 하고, 불안감을 
              없애주며, 마침내 구매 버튼을 누르게 만듭니다.
            </p>
            
            <p className="text-gray-600 leading-relaxed text-lg">
              이 글에서는 사람들이 웹사이트를 볼 때 어떻게 생각하고 행동하는지 
              알기 쉽게 설명하고, 바로 적용할 수 있는 디자인 팁들을 알려드립니다. 
              복잡한 이론은 잠시 잊고, 실제로 효과가 있는 간단한 원리들에 
              집중해보겠습니다.
            </p>
          </div>

          {/* Section 1: How People See */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Eye className="w-8 h-8 text-blue-600" />
              사람들은 어떻게 웹사이트를 볼까요?
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              사람들이 웹페이지를 볼 때는 신기한 습관이 있습니다. 대부분의 
              사람들은 페이지를 왼쪽 위부터 오른쪽 아래로 'F'자 모양으로 
              읽어내려갑니다. 이건 수십 년간 변하지 않는 사람들의 자연스러운 
              습관입니다.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Brain className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">F-패턴 읽기 순서</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-full h-2 bg-blue-600 rounded mb-2"></div>
                  <p className="text-sm text-gray-700">첫 번째 가로선<br/>(80% 집중)</p>
                </div>
                <div className="text-center">
                  <div className="w-3/4 h-2 bg-blue-400 rounded mb-2 ml-auto"></div>
                  <p className="text-sm text-gray-700">두 번째 가로선<br/>(50% 집중)</p>
                </div>
                <div className="text-center">
                  <div className="w-1/2 h-2 bg-blue-300 rounded mb-2 ml-auto"></div>
                  <p className="text-sm text-gray-700">세로선<br/>(30% 집중)</p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              그래서 가장 중요한 정보는 왼쪽 위에 있어야 합니다. 회사 로고, 
              중요한 메뉴, 핵심 제목들이 이 위치에 있어야 사람들이 금방 
              알아볼 수 있습니다. 오른쪽 아래에는 덜 중요한 정보들을 
              배치하는 것이 좋습니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              또한 사람들은 스크롤을 그다지 좋아하지 않습니다. 화면에 바로 
              보이는 정보만으로도 무엇을 할 수 있는지 알아야 합니다. 중요한 
              내용이 화면 밑에 숨어있으면 대부분의 사람들은 그냥 떠나버립니다.
            </p>
          </div>

          {/* Section 2: Making People Feel Safe */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Target className="w-8 h-8 text-green-600" />
              사람들이 안심하게 만들기
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              인터넷에서 물건을 사거나 정보를 입력할 때 사람들은 불안감을 
              느낍니다. 내 돈이 안전할까? 내 정보가 유출되지 않을까? 이런 
              걱정을 없애주는 것이 디자이너의 중요한 역할입니다.
            </p>

            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">신뢰를 주는 요소들</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-800">고객 후기:</strong>
                    <p className="text-gray-600 text-sm mt-1">실제 사용자들의 긍정적인 경험을 보여주기</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-800">안전 결제:</strong>
                    <p className="text-gray-600 text-sm mt-1">익숙한 결제 시스템 로고와 보안 표시</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-800">명확한 가격:</strong>
                    <p className="text-gray-600 text-sm mt-1">숨겨진 비용 없이 투명한 가격 제시</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-800">연락 정보:</strong>
                    <p className="text-gray-600 text-sm mt-1">전화번호, 주소 등 명확한 연락처</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              가장 효과적인 방법은 신뢰할 수 있다는 것을 보여주는 것입니다. 
              고객들의 후기, 전문가의 인증, 안전 결제 시스템 로고, 
              명확한 환불 정책 등을 보여주면 사람들이 좀 더 안심하게 됩니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              또한 가격을 명확하게 보여주는 것도 중요합니다. 숨겨진 비용이 
              있다는 느낌을 주면 사람들은 불안해하며 구매를 포기합니다. 
              모든 비용을 투명하게 보여주고, 추가 비용이 없다는 것을 
              명확히 알려주세요.
            </p>
          </div>

          {/* Section 3: Simple is Better */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-yellow-600" />
              간단할수록 좋습니다
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              사람들은 복잡한 것을 싫어합니다. 너무 많은 선택지가 있으면 
              어떤 것을 골라야 할지 모르고 결국 아무것도 선택하지 않습니다. 
              이를 '선택의 역설'이라고 부릅니다.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-lg mb-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                <h3 className="text-lg font-bold text-gray-900">선택의 역설 실험</h3>
              </div>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-red-600 mb-2">3%</div>
                <p className="text-gray-700">24개 잼 선택지일 때 구매율</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">30%</div>
                <p className="text-gray-700">6개 잼 선택지일 때 구매율</p>
              </div>
              <p className="text-sm text-gray-600 mt-4">선택지가 4분의 1로 줄어들자 구매율이 10배 증가!</p>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              그래서 선택지를 줄이는 것이 중요합니다. 예를 들어 셔츠를 
              판매한다면 100가지 색상을 보여주는 것보다 인기 있는 10가지 
              색상만 보여주는 것이 더 효과적입니다. 사람들이 쉽게 결정할 
              수 있게 도와주는 것입니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              글도 간단해야 합니다. 어려운 단어, 긴 문장, 복잡한 설명은 
              사람들이 읽기를 포기하게 만듭니다. 초등학생도 이해할 수 
              있을 정도로 쉽게 쓰는 것이 가장 좋습니다.
            </p>
          </div>

          {/* Section 4: Buttons People Want to Click */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">누르고 싶은 버튼 만들기</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              버튼은 웹사이트에서 가장 중요한 요소 중 하나입니다. 사람들이 
                  버튼을 보고 "이걸 눌러야겠다"고 느끼게 만들어야 합니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              좋은 버튼은 눈에 잘 띄어야 합니다. 주변과 다른 색깔을 사용하고, 
                  충분히 크게 만들고, 누르기 쉬운 위치에 있어야 합니다. 
                  작고 어두운 버튼은 사람들이 못 보고 지나갑니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              버튼의 글씨도 중요합니다. "제출"보다는 "지금 바로 시작하기"처럼 
                  구체적이고 긍정적인 문구가 더 효과적입니다. 사람들이 버튼을 
                  눌렀을 때 무슨 일이 일어날지 명확하게 알려주어야 합니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              또한 버튼은 하나만 있어야 합니다. 페이지에 중요한 버튼이 
                  여러 개 있으면 사람들이 어떤 것을 눌러야 할지 혼란스러워합니다. 
                  가장 중요한 행동 하나에만 크고 눈에 띄는 버튼을 만드세요.
            </p>
          </div>

          {/* Section 5: Mobile Matters */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">모바일이 더 중요합니다</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              이제 사람들은 컴퓨터보다 스마트폰으로 더 많이 인터넷을 사용합니다. 
                  그래서 모바일에서 보기 좋은 디자인이 필수적입니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              모바일에서는 글씨가 작으면 안 됩니다. 사람들이 확대하지 않고도 
                  편안하게 읽을 수 있을 정도로 글씨를 크게 만들어야 합니다. 
                  또한 버튼들도 손가락으로 쉽게 누를 수 있을 만큼 커야 합니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              화면이 작기 때문에 불필요한 것들은 모두 없애야 합니다. 
                  가장 중요한 정보와 기능만 남기고 나머지는 과감히 삭제하세요. 
                  사람들은 작은 화면에서 복잡한 것을 처리하기 싫어합니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              로딩 속도도 중요합니다. 모바일에서는 인터넷이 느릴 수 있으니 
                  페이지가 빨리 뜨게 만들어야 합니다. 사람들은 3초 이상 
                  기다리면 대부분 떠나버립니다.
            </p>
          </div>

          {/* Section 6: Testing and Improving */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">테스트하고 개선하기</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              좋은 디자인은 하룻밤 사이에 만들어지지 않습니다. 계속해서 
                  테스트하고 개선해야 합니다. 실제 사람들이 어떻게 사용하는지 
                  보고 문제점을 찾아서 수정해야 합니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              가장 간단한 방법은 친구나 가족에게 웹사이트를 사용하게 해보는 
                  것입니다. 그들이 어디에서 어려움을 겪는지 지켜보고 어떤 
                  질문을 하는지 들어보세요. 예상치 못한 문제들을 발견할 수 
                  있습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              또한 숫자를 확인하는 것도 중요합니다.多少人가 페이지를 방문하고, 
                 多少人가 구매 버튼을 누르고,多少人가 페이지 중간에 떠나는지 
                  확인하세요. 이 숫자들을 통해 무엇을 개선해야 할지 알 수 
                  있습니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              작은 변화들을 하나씩 테스트해보세요. 버튼 색깔을 바꾸거나, 
                  문구를 수정하거나, 레이아웃을 조정하는 작은 변화들이 
                  전환율을 크게 높일 수 있습니다. 항상 데이터로 확인하고 
                  더 나은 방향으로 개선해나가세요.
            </p>
          </div>

          {/* Conclusion */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">기억해야 할 것들</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              좋은 디자인은 사람들을 이해하는 것에서 시작합니다. 사람들이 
                  어떻게 생각하고, 무엇을 원하고, 어떤 것을 두려워하는지 
                  알아야 합니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              중요한 것은 왼쪽 위에 배치하고, 사람들이 안심할 수 있는 
                  요소들을 보여주고, 선택지를 단순하게 만들고, 누르고 싶은 
                  버튼을 만드는 것입니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              또한 모바일 사용자를 잊지 말고, 계속해서 테스트하고 개선해야 
                  합니다. 이런 원리들을 따르면 사람들이 더 오래 머물고, 더 
                  많은 행동을 하고, 결국 더 많은 가치를 창출하게 될 것입니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              디자인은 어려운 기술이 아닙니다. 사람들을 생각하는 마음과 
                  조금의 지식만 있으면 누구나 더 나은 디자인을 만들 수 있습니다. 
                  오늘부터 이 간단한 원리들을 적용해보세요.
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
                  <span className="text-sm text-blue-600 font-medium">{post.category}</span>
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

export default BlogPost1;
