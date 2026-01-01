import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const blogs = [
  {
    title: "전환율을 3배 높이는 디자인의 물리학",
    date: "2025년 10월 24일",
    category: "Design",
    image: "https://images.unsplash.com/photo-1614726365723-49cfae9278b7?q=80&w=2576&auto=format&fit=crop"
  },
  {
    title: "WebGL: 무거움 없이 깊이감을 더하는 기술",
    date: "2025년 11월 12일",
    category: "Engineering",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop"
  },
  {
    title: "2026년 웹 디자인 트렌드: 중력을 거스르다",
    date: "2025년 12월 05일",
    category: "Trends",
    image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2576&auto=format&fit=crop"
  }
];

const BlogSection: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-white border-t border-gray-100 relative z-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">최신 인사이트</h2>
          <button className="text-gray-500 hover:text-gray-900 transition-colors border border-gray-200 px-6 py-2 rounded-full hover:bg-gray-50 font-medium">
            블로그 전체보기
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <a href="#" key={i} className="group block">
              <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative border border-gray-100 shadow-sm">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-medium text-gray-900 rounded-full border border-gray-100 shadow-sm">
                    {blog.category}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight break-keep">
                {blog.title}
              </h3>
              <div className="flex items-center justify-between text-gray-500 text-sm mt-4">
                <span>{blog.date}</span>
                <span className="flex items-center gap-1 group-hover:text-gray-900 transition-colors font-medium">
                  아티클 읽기 <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;