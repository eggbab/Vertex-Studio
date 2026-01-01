import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, Tag, Search, Filter, TrendingUp } from 'lucide-react';

const BlogMain: React.FC = () => {
  const allBlogs = [
    {
      title: "전환율을 3배 높이는 디자인의 물리학",
      date: "2025년 10월 24일",
      category: "Design",
      image: "https://images.unsplash.com/photo-1559028012-c72a97b19c7e?q=80&w=2574&auto=format&fit=crop",
      excerpt: "대부분의 웹사이트는 방문자의 90%를 놓치고 있습니다. 이는 디자인이 아름답지 않아서가 아니라, 인간의 심리와 행동 패턴을 제대로 이해하지 못했기 때문입니다. Vertex Studio는 5년간의 데이터 분석을 통해 전환율을 3배 높이는 디자인 원리를 발견했습니다. 이 글에서는 F-패턴 시선 흐름, 색채 심리학, 마이크로 인터랙션의 과학적 원리를 실제 사례와 함께 깊이 있게 다룹니다.",
      readTime: "8분",
      slug: "conversion-design-physics",
      tags: ["전환율", "UX 디자인", "심리학", "데이터 분석"]
    },
    {
      title: "WebGL: 무거움 없이 깊이감을 더하는 기술",
      date: "2025년 11월 12일",
      category: "Engineering",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2574&auto=format&fit=crop",
      excerpt: "웹에서 3D 경험을 구현할 때 가장 큰 걸림돌은 '성능'입니다. 사용자는 1초의 지연도 용납하지만, 풍부한 3D 경험은 수많은 계산 자원을 필요로 합니다. WebGL은 이 딜레마를 해결하는 강력한 도구입니다. 우리는 3년간 WebGL을 활용해 수십 개의 프로젝트를 완성하며 무거움 없이 깊이감을 더하는 기술의 비밀을 풀어냈습니다.",
      readTime: "10분",
      slug: "webgl-depth-technology",
      tags: ["WebGL", "3D", "성능 최적화", "웹 기술"]
    },
    {
      title: "2026년 웹 디자인 트렌드: 중력을 거스르다",
      date: "2025년 12월 05일",
      category: "Trends",
      image: "https://images.unsplash.com/photo-1621839673055-66132adfcd3c?q=80&w=2574&auto=format&fit=crop",
      excerpt: "2025년이 끝나갈 무렵, 웹 디자인은 또 다른 전환점을 맞이하고 있습니다. 더 이상 평면적인 2D 공간에 갇히지 않고, 중력을 거스르는 3차원적 경험으로 나아가고 있습니다. Vertex Studio는 전 세계 500개 이상의 웹사이트를 분석하며 2026년의 디자인 트렌드를 예측했습니다. 공간적 인터페이스, 유체적 애니메이션, AI 개인화의 미래를 지금 만나보세요.",
      readTime: "12분",
      slug: "2026-design-trends",
      tags: ["디자인 트렌드", "2026년", "UI/UX", "미래 예측"]
    },
    {
      title: "모바일 퍼스트가 죽었다",
      date: "2025년 11월 28일",
      category: "Strategy",
      image: "https://images.unsplash.com/photo-1512941937309-157bb6b3ad2e?q=80&w=2574&auto=format&fit=crop",
      excerpt: "'모바일 퍼스트'는 더 이상 유효한 전략이 아닙니다. 2025년 현재, 사용자는 하루에 평균 17번의 디바이스를 전환하며 경험을 이어갑니다. 데스크탑, 모바일, 태블릿, 웨어러블, 스마트 TV까지 모든 화면에서 일관된 경험을 제공하는 '옴니채널 퍼스트' 시대가 도래했습니다. 이 글에서는 디바이스 경계를 넘나드는 디자인 전략과 실전 구현 사례를 상세히 분석합니다.",
      readTime: "9분",
      slug: "mobile-first-is-dead",
      tags: ["모바일", "반응형", "옴니채널", "전략"]
    },
    {
      title: "속도가 곧 매출이다: 웹 성능의 경제학",
      date: "2025년 10월 15일",
      category: "Performance",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2574&auto=format&fit=crop",
      excerpt: "페이지 로딩 시간이 1초 증가할 때마다 전환율은 7% 감소합니다. 반대로 로딩 속도를 0.1초 개선하면 매출이 1% 증가합니다. 웹 성능은 더 이상 기술적 문제가 아니라 비즈니스의 핵심입니다. Vertex Studio는 1,000개 이상의 사이트를 최적화하며 속도와 매출의 상관관계를 데이터로 증명했습니다. Core Web Vitals, 이미지 최적화, CDN 전략의 모든 것을 다룹니다.",
      readTime: "11분",
      slug: "speed-equals-revenue",
      tags: ["웹 성능", "Core Web Vitals", "최적화", "매출"]
    },
    {
      title: "접근성이 곸경쟁력이다: 포용적 디자인의 비즈니스 가치",
      date: "2025년 12월 20일",
      category: "Accessibility",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2574&auto=format&fit=crop",
      excerpt: "전 세계 15억 명의 장애인이 디지털 세계에서 배제되고 있습니다. 이는 단순히 윤리적 문제가 아니라, 수조 원의 시장 기회를 놓치는 비즈니스적 손실입니다. 접근성을 준수하는 웹사이트는 시장을 20% 확장하고, 브랜드 평판을 높이며, 법적 리스크를 줄입니다. WCAG 2.1, ARIA, 키보드 내비게이션부터 실제 구현 노하우까지 포용적 디자인의 모든 것을 공유합니다.",
      readTime: "13분",
      slug: "accessibility-competitiveness",
      tags: ["접근성", "WCAG", "포용적 디자인", "브랜드"]
    }
  ];

  const categories = ["전체", "Design", "Engineering", "Trends", "Strategy", "Performance", "Accessibility"];
  const [selectedCategory, setSelectedCategory] = React.useState("전체");
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredBlogs = allBlogs.filter(blog => {
    const matchesCategory = selectedCategory === "전체" || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Design": return "bg-blue-50 text-blue-600";
      case "Engineering": return "bg-purple-50 text-purple-600";
      case "Trends": return "bg-pink-50 text-pink-600";
      case "Strategy": return "bg-orange-50 text-orange-600";
      case "Performance": return "bg-green-50 text-green-600";
      case "Accessibility": return "bg-indigo-50 text-indigo-600";
      default: return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-gray-900 hover:text-[#3186FF] transition-colors">
              <span className="font-medium">홈으로</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Vertex Studio Blog</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6 leading-tight tracking-tighter">
              디자인과 기술의
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3186FF] via-purple-600 to-pink-600">
                무한한 가능성
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Vertex Studio가 탐구하는 디지털 혁신의 최전선. 
              데이터 기반의 인사이트와 실전 경험을 공유합니다.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="블로그 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-[#3186FF] transition-colors"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-6 md:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-[#111827] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Filter className="w-4 h-4" />
              <span>{filteredBlogs.length}개의 글</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <motion.article
                key={blog.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group"
              >
                <Link to={`/blog/${blog.slug}`} className="block">
                  {/* Image */}
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 ${getCategoryColor(blog.category)} rounded-full text-xs font-medium border border-white/20 shadow-sm backdrop-blur-sm`}>
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{blog.date}</span>
                      </div>
                      <span>•</span>
                      <span>{blog.readTime} 읽기</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#3186FF] transition-colors leading-tight line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-gray-600 line-clamp-3 leading-relaxed text-sm">
                      {blog.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          #{tag}
                        </span>
                      ))}
                      {blog.tags.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          +{blog.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[#3186FF] font-medium group-hover:gap-3 transition-all">
                      <span>더 읽기</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-600">다른 검색어나 카테고리를 시도해보세요.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-6 md:px-12 pt-16 pb-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#3186FF] to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              최신 디자인 트렌드를
              <br />
              가장 먼저 만나보세요
            </h2>
            <p className="text-lg mb-8 opacity-90">
              매주 최신 인사이트와 실용적인 팁을 이메일로 받아보세요.
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="이메일 주소"
                className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-white/70 focus:outline-none focus:bg-white/30 transition-colors"
              />
              <button className="px-6 py-3 bg-white text-[#3186FF] font-bold rounded-full hover:bg-gray-100 transition-colors">
                구독하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogMain;
