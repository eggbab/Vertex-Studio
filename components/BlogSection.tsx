import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const blogs = [
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
  },
  {
    title: "2026년 웹 디자인 트렌드: 중력을 거스르다",
    date: "2025년 12월 05일",
    category: "Trends",
    slug: "2026-design-trends"
  }
];

const BlogSection: React.FC = () => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Design": return "bg-blue-50 text-blue-600";
      case "Engineering": return "bg-purple-50 text-purple-600";
      case "Trends": return "bg-pink-50 text-pink-600";
      default: return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-white border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">최신 인사이트</h2>
          <Link to="/blog" className="text-gray-500 hover:text-gray-900 transition-colors border border-gray-200 px-6 py-2 rounded-full hover:bg-gray-50 font-medium">
            블로그 전체보기
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <Link to={`/blog/${blog.slug}`} key={i} className="group block p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
              <div className="mb-4">
                <span className={`px-3 py-1 ${getCategoryColor(blog.category)} rounded-full text-xs font-medium`}>
                  {blog.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                {blog.title}
              </h3>
              <div className="text-gray-500 text-sm">
                {blog.date}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;