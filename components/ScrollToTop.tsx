import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 메인페이지로 뒤로갈 때는 브라우저 기본 스크롤 복원 사용
    if (pathname === '/') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
      return;
    }

    // 블로그 포스트 페이지에서는 스크롤 복원 비활성화
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // 즉시 스크롤을 맨 위로 강제 이동
    const forceScrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // 추가적인 강제 리셋
      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = 0;
      }
    };

    // 즉시 실행
    forceScrollToTop();
    
    // requestAnimationFrame을 사용한 강제 실행
    requestAnimationFrame(forceScrollToTop);
    
    // 여러 타이밍에서 실행하여 확실성 보장
    const timers = [
      setTimeout(forceScrollToTop, 0),
      setTimeout(forceScrollToTop, 10),
      setTimeout(forceScrollToTop, 50),
      setTimeout(forceScrollToTop, 100)
    ];

    // 페이지가 완전히 로드된 후 마지막 실행
    if (document.readyState === 'complete') {
      forceScrollToTop();
    } else {
      window.addEventListener('load', forceScrollToTop);
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      window.removeEventListener('load', forceScrollToTop);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
