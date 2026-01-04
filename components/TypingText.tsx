import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const words = ["구매 전환율 350% 상승", "이탈률 0%에 도전", "매출로 직결되는 디자인", "설득의 심리학 적용"];

const TypingText: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, []);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, Math.random() * 350));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="inline-flex items-center text-gray-500 font-medium text-sm md:text-base">
      우리의 목표는 단 하나,&nbsp;
      <span className="text-[#3186FF] relative font-bold">
        {`${words[index].substring(0, subIndex)}`}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="absolute -right-1 top-0 bottom-0 w-[2px] bg-black inline-block ml-1"
        />
      </span>
    </span>
  );
};

export default TypingText;