import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, User, Tag, Zap, Image, Server, Smartphone, CheckCircle, AlertTriangle } from 'lucide-react';

const BlogPost5: React.FC = () => {
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
    title: "웹사이트 속도 높이는 간단한 방법",
    date: "2025년 11월 28일",
    category: "Performance",
    readTime: "9분",
    author: "개발팀",
    tags: ["속도", "최적화", "웹"]
  };

  const relatedPosts = [
    {
      title: "웹사이트를 멋지게 만드는 3D 기술",
      date: "2025년 11월 12일",
      category: "Technology",
      slug: "webgl-depth-technology"
    },
    {
      title: "온라인과 오프라인을 잇는 쇼핑의 미래",
      date: "2025년 10월 15일",
      category: "Business",
      slug: "omnichannel-strategy"
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
            웹사이트 속도 높이는 간단한 방법
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            느린 웹사이트 때문에 고객들을 잃지 마세요. 
            오늘 당장 적용할 수 있는 속도 개선 팁들입니다.
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
              웹사이트가 3초 이상 로딩되면 대부분의 사람들은 그냥 
              떠나버립니다. 연구에 따르면 로딩 속도가 1초 느려질 때마다 
              전환율은 7%씩 감소합니다. 속도는 단순한 기술 문제가 
              아니라 비즈니스의 성패를 좌우하는 중요한 요소입니다.
            </p>
            
            <p className="text-gray-600 leading-relaxed text-lg">
              다행히 웹사이트 속도를 높이는 것은 어렵지 않습니다. 
              몇 가지 간단한 원리만 알면 누구나 손쉽게 개선할 수 있습니다. 
              이 글에서는 복잡한 기술 없이도 바로 적용할 수 있는 
              실용적인 팁들을 알려드립니다.
            </p>
          </div>

          {/* Section 1: Images */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Image className="w-8 h-8 text-green-600" />
              이미지 최적화
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              이미지는 웹사이트에서 가장 많은 용량을 차지하는 요소입니다. 
              대부분의 웹사이트에서 전체 용량의 50-70%가 이미지입니다. 
              그래서 이미지를 최적화하는 것이 속도 개선에 가장 효과적입니다.
            </p>

            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-bold text-gray-900">이미지 최적화 효과</h3>
              </div>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-green-600 mb-2">70%</div>
                <p className="text-gray-700">용량 감소 효과</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Image className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-700 font-medium">크기 조정</p>
                  <p className="text-xs text-gray-600 mt-1">필요한 크기만 사용</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-700 font-medium">압축</p>
                  <p className="text-xs text-gray-600 mt-1">품질 유지하며 용량 감소</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-700 font-medium">최신 포맷</p>
                  <p className="text-xs text-gray-600 mt-1">WebP, AVIF 사용</p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              가장 간단한 방법은 이미지 크기를 줄이는 것입니다. 
              필요한 크기보다 더 큰 이미지를 사용하지 마세요. 웹사이트에 
              표시될 크기에 맞게 이미지를 리사이즈하세요. 예를 들어 
              500픽셀 너비로 표시될 이미지라면 2000픽셀짜리 원본을 
              사용할 필요가 없습니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              이미지 포맷도 중요합니다. JPEG는 사진에 좋고, PNG는 
              투명 배경이 필요한 이미지에 좋습니다. 최신 포맷인 WebP는 
              JPEG보다 25-35% 더 작은 용량으로 같은 품질을 제공합니다.
            </p>
          </div>

          {/* Section 2: Caching */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">캐싱 활용하기</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              캐싱은 한 번 다운로드한 파일을 다시 다운로드하지 않고 
              컴퓨터에 저장해서 사용하는 기술입니다. 이를 통해 반복 
              방문 시 로딩 속도를 크게 향상시킬 수 있습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              브라우저 캐시를 설정하면 CSS, JavaScript, 이미지 같은 
              파일들을 사용자 컴퓨터에 저장할 수 있습니다. 다음에 방문할 때 
              이 파일들을 다시 다운로드할 필요 없이 바로 사용할 수 있습니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              CDN(Content Delivery Network)도 큰 도움이 됩니다. 
              전 세계에 분산된 서버에서 콘텐츠를 제공하면 지리적 거리로 
              인한 지연을 줄일 수 있습니다. 사용자와 가장 가까운 
              서버에서 파일을 받게 되므로 속도가 빨라집니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              캐시 만료 기간도 적절히 설정해야 합니다. 자주 바뀌지 
              않는 파일들은 길게 설정하고, 자주 바뀌는 파일들은 짧게 
              설정하여 최신 콘텐츠를 제공하면서도 속도를 유지해야 합니다.
            </p>
          </div>

          {/* Section 3: Code Optimization */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">코드 최적화</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              CSS와 JavaScript 코드도 최적화해야 합니다. 불필요한 
              코드를 제거하고, 파일을 압축하고, 여러 파일을 하나로 
              합치면 로딩 속도가 향상됩니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              CSS와 JavaScript 파일을 압축(minify)하면 파일 크기를 
              20-30% 줄일 수 있습니다. 공백, 주석, 불필요한 문자들을 
              제거하는 간단한 과정입니다. 대부분의 빌드 도구들이 
              자동으로 이 작업을 해줍니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              여러 개의 작은 파일보다는 하나의 큰 파일이 더 효율적입니다. 
              파일을 요청하는 횟수가 줄어들기 때문입니다. 하지만 너무 
              큰 파일은 오히려 해가 될 수 있으니 적절한 크기로 
              나누는 것이 좋습니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              JavaScript는 페이지 하단에 배치하는 것이 좋습니다. 
              페이지가 먼저 로딩되고 나서 JavaScript가 실행되게 하면 
              사용자들이 콘텐츠를 더 빨리 볼 수 있습니다.
            </p>
          </div>

          {/* Section 4: Server Performance */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">서버 성능</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              아무리 프론트엔드를 최적화해도 서버가 느리면 소용이 
              없습니다. 서버 응답 시간은 200밀리초 이내가 이상적입니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              좋은 호스팅을 사용하는 것이 중요합니다. 저렴한 공유 
              호스팅은 다른 사이트와 자원을 공유하므로 속도가 
              느려질 수 있습니다. VPS나 클라우드 호스팅을 고려해보세요.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              데이터베이스 쿼리도 최적화해야 합니다. 느린 쿼리가 
              있다면 인덱스를 추가하거나 쿼리를 개선하여 속도를 
              높일 수 있습니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              서버 캐싱도 중요합니다. 자주 요청되는 데이터를 
              메모리에 캐싱하면 데이터베이스 조회 없이 빠르게 
              응답할 수 있습니다.
            </p>
          </div>

          {/* Section 5: Mobile Optimization */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">모바일 최적화</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              이제 대부분의 트래픽은 모바일에서 발생합니다. 모바일에서 
             의 경험을 최적화하는 것이 필수적입니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              모바일에서는 네트워크가 느릴 수 있으므로 파일 크기를 더 
              작게 만들어야 합니다. 특히 이미지와 비디오 파일 크기를 
              줄이는 것이 중요합니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              반응형 이미지를 사용하세요. 화면 크기에 맞는 적절한 
              이미지를 제공하여 불필요한 데이터 전송을 줄일 수 있습니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              터치 이벤트도 최적화해야 합니다. 클릭 이벤트보다 터치 
              이벤트가 더 빠르게 반응하게 만들어 사용자 경험을 
              향상시킬 수 있습니다.
            </p>
          </div>

          {/* Section 6: Testing */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">테스트와 측정</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              개선을 위해서는 먼저 현재 상태를 측정해야 합니다. 
              PageSpeed Insights, GTmetrix, WebPageTest 같은 도구들을 
              사용하여 웹사이트 속도를 측정해보세요.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              Core Web Vitals 지표들을 확인하세요. LCP(가장 큰 
              콘텐츠 로딩 시간), FID(첫 상호작용 지연 시간), 
              CLS(레이아웃 변화)가 중요합니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              실제 사용자들의 경험도 측정해야 합니다. Real User 
              Monitoring(RUM) 도구를 사용하여 실제 사용자들의 속도 
              데이터를 수집하고 분석하세요.
            </p>

            <p className="text-gray-600 leading-relaxed">
              개선 후에는 다시 측정하여 효과를 확인하세요. A/B 테스트를 
              통해 어떤 개선이 효과적인지 검증할 수도 있습니다.
            </p>
          </div>

          {/* Conclusion */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">기억해야 할 것들</h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              웹사이트 속도는 사용자 경험과 비즈니스 성공에 직접적인 
              영향을 미칩니다. 느린 사이트는 고객을 잃고 매출을 
              감소시킵니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              이미지 최적화, 캐싱, 코드 최적화, 서버 성능 개선, 
              모바일 최적화가 속도 향상의 핵심입니다.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              측정하고 개선하는 과정을 지속적으로 반복해야 합니다. 
              한 번의 개선으로 끝나는 것이 아니라 계속해서 모니터링하고 
              최적화해야 합니다.
            </p>

            <p className="text-gray-600 leading-relaxed">
              작은 개선들이 모여 큰 변화를 만듭니다. 오늘부터 하나씩 
              적용해보세요. 사용자들은 더 빠른 경험에 감사할 것입니다.
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

export default BlogPost5;
