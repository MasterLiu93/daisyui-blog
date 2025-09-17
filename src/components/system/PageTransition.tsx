import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { Variants } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
  type?: 'fade' | 'slide' | 'scale' | 'flip' | 'none';
}

// 定义不同类型的动画效果
const animations = {
  fade: {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.05 },
  },
  flip: {
    initial: { opacity: 0, rotateX: -10 },
    in: { opacity: 1, rotateX: 0 },
    out: { opacity: 0, rotateX: 10 },
  },
  none: {
    initial: {},
    in: {},
    out: {},
  },
};

const PageTransition = ({ children, type = 'slide' }: PageTransitionProps) => {
  const location = useLocation();
  
  // 获取当前动画配置
  const animation = animations[type];
  
  // 根据路径深度调整动画持续时间
  const pathDepth = location.pathname.split('/').filter(Boolean).length;
  const duration = Math.max(0.2, Math.min(0.4, 0.2 + pathDepth * 0.05));
  
  // 创建动画变体
  const pageVariants: Variants = {
    initial: animation.initial,
    in: animation.in,
    out: animation.out,
  };
  
  // 创建动画过渡配置
  const pageTransition = {
    type: 'tween' as const,
    ease: 'easeInOut' as const,
    duration,
  };
  
  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ 
        position: 'relative',
        width: '100%',
        height: '100%',
        perspective: type === 'flip' ? 1200 : undefined
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 