import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative pt-24 pb-12 px-6 z-10 bg-white border-t border-gray-100">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          
          {/* Left: Brand & Main Contact */}
          <div className="flex-1">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-display text-3xl font-bold tracking-tighter mb-6 text-gray-900"
            >
              VERTEX STUDIO
            </motion.h2>
            
            <p className="text-gray-500 mb-8 max-w-sm leading-relaxed text-sm">
              데이터와 심리학을 결합하여<br/>
              비즈니스의 성장을 가속화합니다.
            </p>
            
            <a 
              href="mailto:contact@vertexstudio.kr"
              className="inline-block text-base font-medium border-b border-gray-300 pb-0.5 text-gray-900 hover:text-[#3186FF] hover:border-[#3186FF] transition-colors cursor-hover"
            >
              contact@vertexstudio.kr
            </a>
          </div>

          {/* Right: Links */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-8 w-full md:w-auto">
            <div>
              <h5 className="text-gray-900 uppercase tracking-widest text-[11px] font-bold mb-4">Social</h5>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#3186FF] transition-colors cursor-hover">Instagram</a></li>
                <li><a href="#" className="hover:text-[#3186FF] transition-colors cursor-hover">LinkedIn</a></li>
                <li><a href="#" className="hover:text-[#3186FF] transition-colors cursor-hover">Youtube</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-gray-900 uppercase tracking-widest text-[11px] font-bold mb-4">Legal</h5>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#3186FF] transition-colors cursor-hover">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#3186FF] transition-colors cursor-hover">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-100 mb-8"></div>

        {/* Bottom: Business Info - Explicitly Added */}
        <div className="flex flex-col gap-4 text-[11px] leading-relaxed text-gray-400 font-light">
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 gap-x-4 flex-wrap">
             <span className="font-bold text-gray-600">Vertex Studio (버텍스 스튜디오)</span>
             <span className="hidden md:inline w-px h-2.5 bg-gray-300"></span>
             <span>대표자: 홍길동</span>
             <span className="hidden md:inline w-px h-2.5 bg-gray-300"></span>
             <span>사업자등록번호: 123-45-67890</span>
             <span className="hidden md:inline w-px h-2.5 bg-gray-300"></span>
             <span>통신판매업신고: 2025-서울강남-0000호</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 gap-x-4 flex-wrap">
             <span>주소: 서울특별시 강남구 테헤란로 123, Vertex Tower 10층</span>
             <span className="hidden md:inline w-px h-2.5 bg-gray-300"></span>
             <span>개인정보관리책임자: 홍길동</span>
             <span className="hidden md:inline w-px h-2.5 bg-gray-300"></span>
             <span>Tel: 02-1234-5678</span>
             <span className="hidden md:inline w-px h-2.5 bg-gray-300"></span>
             <span>Email: contact@vertexstudio.kr</span>
          </div>

          <div className="mt-4 text-gray-300">
            © {new Date().getFullYear()} Vertex Studio. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;