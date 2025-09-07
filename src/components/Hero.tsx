import { motion, useAnimation } from 'framer-motion';
import { type ReactNode, useEffect, useState, useRef } from 'react';
import ParticleBackground from './ParticleBackground';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundStyle?: 'gradient' | 'pattern' | 'minimal' | 'particles' | '3d';
  align?: 'center' | 'left';
  height?: 'small' | 'medium' | 'large' | 'full';
  children?: ReactNode;
  badge?: string;
  decorations?: boolean;
  scrollY?: number;
  particleColor?: string;
  buttons?: Array<{
    label: string;
    to: string;
    variant: 'primary' | 'secondary' | 'outline';
    icon?: ReactNode;
  }>;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundStyle = '3d',
  align = 'center',
  height = 'full',
  children,
  badge,
  decorations = true,
  scrollY = 0,
  particleColor,
  buttons,
}) => {
  // 设置高度
  const heightClasses = {
    small: 'py-12 min-h-[40vh]',
    medium: 'py-20 min-h-[60vh]',
    large: 'py-32 min-h-[80vh]',
    full: 'py-20 min-h-screen',
  };

  // 设置对齐
  const alignClasses = {
    center: 'text-center items-center',
    left: 'text-left items-start',
  };
  
  // 动画控制器
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 计算基于scrollY的视差效果值
  const calculateParallaxEffect = () => {
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
    const maxScroll = windowHeight * 0.8;
    const currentScroll = Math.min(scrollY, maxScroll);
    const progress = currentScroll / maxScroll;
    
    const y = progress * 200;
    const opacity = 1 - (progress * 0.8);
    
    return { y, opacity };
  };
  
  const { y, opacity } = calculateParallaxEffect();
  
  // 模拟3D网格效果
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      // 计算相对于视口中心的偏移量
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // 转换为[-1, 1]范围内的值
      const x = (clientX - centerX) / centerX;
      const y = (clientY - centerY) / centerY;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // 启动入场动画
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [controls]);
  
  // 生成随机星星/光点背景
  const [stars, setStars] = useState<Array<{x: number, y: number, size: number, delay: number}>>([]);
  
  useEffect(() => {
    const generatedStars = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 5
    }));
    setStars(generatedStars);
  }, []);

  return (
    <section ref={containerRef} className={`relative ${heightClasses[height]} flex items-center overflow-hidden`}>
      {/* 背景样式 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {backgroundStyle === 'gradient' && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20" 
            style={{ 
              backgroundPosition: `${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%`,
            }}
          />
        )}

        {backgroundStyle === 'particles' && (
          <ParticleBackground 
            color={particleColor || 'hsl(var(--p))'} 
            count={150}
            opacity={0.5}
            speed={1.2}
          />
        )}
        
        {backgroundStyle === '3d' && (
          <>
            {/* 3D网格背景 */}
            <motion.div 
              className="absolute inset-0"
              style={{
                perspective: '1000px',
                perspectiveOrigin: `${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%`,
              }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(var(--color-primary-rgb), 0.15) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(var(--color-primary-rgb), 0.15) 1px, transparent 1px)`,
                  backgroundSize: '30px 30px',
                  transform: `rotateX(${mousePosition.y * 15}deg) rotateY(${-mousePosition.x * 15}deg) translateZ(0px)`,
                  opacity: 0.6,
                }}
                animate={{
                  backgroundSize: ['30px 30px', '35px 35px', '30px 30px'],
                  transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              
              {/* 彩色网格层 */}
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(var(--color-secondary-rgb), 0.07) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(var(--color-secondary-rgb), 0.07) 1px, transparent 1px)`,
                  backgroundSize: '60px 60px',
                  transform: `rotateX(${mousePosition.y * 10}deg) rotateY(${-mousePosition.x * 10}deg) translateZ(20px)`,
                  opacity: 0.4,
                }}
                animate={{
                  backgroundSize: ['60px 60px', '70px 70px', '60px 60px'],
                  transition: { duration: 10, delay: 0.5, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              
              {/* 动态交叉线 */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                style={{
                  transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${-mousePosition.x * 5}deg) translateZ(40px)`,
                }}
              >
                <motion.div
                  className="absolute h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                  style={{ width: '200%', left: '-50%', top: '30%' }}
                  animate={{
                    top: ['30%', '70%', '30%'],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute h-1 bg-gradient-to-r from-transparent via-secondary/30 to-transparent"
                  style={{ width: '200%', left: '-50%', top: '60%' }}
                  animate={{
                    top: ['60%', '20%', '60%'],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 18, delay: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute w-1 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
                  style={{ height: '200%', top: '-50%', left: '35%' }}
                  animate={{
                    left: ['35%', '65%', '35%'],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute w-1 bg-gradient-to-b from-transparent via-secondary/30 to-transparent"
                  style={{ height: '200%', top: '-50%', left: '75%' }}
                  animate={{
                    left: ['75%', '25%', '75%'],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ duration: 17, delay: 1, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
              
              {/* 星星/光点背景效果 */}
              <div className="absolute inset-0 overflow-hidden">
                {stars.map((star, index) => (
                  <motion.div
                    key={index}
                    className="absolute rounded-full bg-primary"
                    style={{
                      left: `${star.x}%`,
                      top: `${star.y}%`,
                      width: `${star.size}px`,
                      height: `${star.size}px`,
                      filter: star.size > 3 ? "blur(1px)" : "none"
                    }}
                    animate={{
                      opacity: [0.2, 0.8, 0.2],
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        "0 0 0px rgba(var(--p), 0)",
                        "0 0 5px rgba(var(--p), 0.5)",
                        "0 0 0px rgba(var(--p), 0)"
                      ]
                    }}
                    transition={{
                      duration: 3 + star.delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
              
              {/* 主发光球体 */}
              <motion.div
                className="absolute rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-secondary/30 blur-[80px]"
                style={{
                  width: '45vw',
                  height: '45vw',
                  left: '50%',
                  top: '50%',
                  x: '-50%',
                  y: '-50%',
                  transform: `translate3d(${mousePosition.x * 30}px, ${mousePosition.y * 30}px, 0)`,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* 次发光球体 */}
              <motion.div
                className="absolute rounded-full bg-gradient-to-br from-secondary/20 via-accent/10 to-primary/20 blur-[100px]"
                style={{
                  width: '35vw',
                  height: '35vw',
                  left: '30%',
                  top: '60%',
                  transform: `translate3d(${-mousePosition.x * 15}px, ${-mousePosition.y * 15}px, 0)`,
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.6, 0.4]
                }}
                transition={{ duration: 10, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* 第三发光球体 */}
              <motion.div
                className="absolute rounded-full bg-gradient-to-tr from-accent/20 via-primary/15 to-secondary/20 blur-[90px]"
                style={{
                  width: '25vw',
                  height: '25vw',
                  right: '20%',
                  top: '20%',
                  transform: `translate3d(${mousePosition.x * 20}px, ${-mousePosition.y * 20}px, 0)`,
                }}
                animate={{
                  scale: [1.1, 0.9, 1.1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 9, delay: 1, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* 光束效果 */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20"
                style={{
                  transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${-mousePosition.x * 5}deg) translateZ(10px)`
                }}
              >
                <motion.div
                  className="absolute top-[-10%] left-[30%] h-[120%] w-1 bg-gradient-to-b from-transparent via-primary to-transparent"
                  animate={{
                    left: ["30%", "70%", "30%"],
                    opacity: [0, 0.7, 0]
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute top-[-10%] left-[60%] h-[120%] w-1 bg-gradient-to-b from-transparent via-secondary to-transparent"
                  animate={{
                    left: ["60%", "20%", "60%"],
                    opacity: [0, 0.7, 0]
                  }}
                  transition={{ duration: 15, delay: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute top-[30%] left-[-10%] h-1 w-[120%] bg-gradient-to-r from-transparent via-primary to-transparent"
                  animate={{
                    top: ["30%", "70%", "30%"],
                    opacity: [0, 0.7, 0]
                  }}
                  transition={{ duration: 18, delay: 1, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute top-[70%] left-[-10%] h-1 w-[120%] bg-gradient-to-r from-transparent via-secondary to-transparent"
                  animate={{
                    top: ["70%", "30%", "70%"],
                    opacity: [0, 0.7, 0]
                  }}
                  transition={{ duration: 14, delay: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
          </>
        )}

        {backgroundStyle === 'pattern' && (
          <div className="absolute inset-0">
            {/* 网格图案 */}
            <motion.div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(var(--color-base-content-rgb), 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(var(--color-base-content-rgb), 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                transform: `translateY(${scrollY * 0.05}px)`,
              }}
            />
            
            {/* 装饰元素 */}
            {decorations && (
              <>
                <motion.div 
                  className="absolute -top-20 left-1/3 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"
                  style={{
                    transform: `translateY(${scrollY * 0.1}px)`,
                  }}
                />
                <motion.div 
                  className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-[100px]"
                  style={{
                    transform: `translateY(${-scrollY * 0.05}px)`,
                  }}
                />
              </>
            )}
          </div>
        )}
      </div>

      {/* 内容容器 */}
      <motion.div 
        className={`container mx-auto px-4 relative z-10 flex flex-col ${alignClasses[align]}`}
        initial={{ opacity: 0, y: 30 }}
        animate={controls}
        style={{ 
          transform: `translateY(${y}px)`, 
          opacity: opacity 
        }}
      >
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block mb-6 relative"
          >
            <motion.div 
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-md"
              animate={{ 
                background: [
                  "linear-gradient(45deg, rgba(var(--p), 0.3) 0%, rgba(var(--s), 0.3) 100%)",
                  "linear-gradient(135deg, rgba(var(--p), 0.3) 0%, rgba(var(--s), 0.3) 100%)",
                  "linear-gradient(225deg, rgba(var(--p), 0.3) 0%, rgba(var(--s), 0.3) 100%)",
                  "linear-gradient(315deg, rgba(var(--p), 0.3) 0%, rgba(var(--s), 0.3) 100%)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <span className="badge badge-lg px-5 py-4 text-primary-content font-medium text-adaptive relative overflow-hidden z-10 border border-primary/20 shadow-lg bg-primary/90 backdrop-blur-sm">
              {/* 发光效果 */}
              <motion.span 
                className="absolute inset-0 bg-white opacity-0"
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
              />
              
              {/* 徽章文字 */}
              <motion.span
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(255,255,255,0)",
                    "0 0 8px rgba(255,255,255,0.5)",
                    "0 0 0px rgba(255,255,255,0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              >
                {badge}
              </motion.span>
            </span>
            
            {/* 旋转装饰边框 */}
            <div className="absolute -inset-1 rounded-full border border-dashed border-primary/30 opacity-70 animate-[spin_15s_linear_infinite]"></div>
            <div className="absolute -inset-2 rounded-full border border-dashed border-secondary/20 opacity-50 animate-[spin_20s_linear_reverse_infinite]"></div>
          </motion.div>
        )}

        {/* 标题动画效果 */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              type: "spring",
              stiffness: 100
            }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl inline-block relative"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
              {title}
            </span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>
          </motion.h1>
        </div>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl mb-10 max-w-2xl text-adaptive-muted leading-relaxed"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* 按钮组 */}
        {buttons && buttons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 mt-2"
          >
            {buttons.map((button, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  scale: 1.08,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.7 + (index * 0.1),
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
              >
                <Link
                  to={button.to}
                  className={`btn ${
                    button.variant === 'primary'
                      ? 'btn-primary bg-primary text-white'
                      : button.variant === 'secondary'
                      ? 'btn-secondary bg-secondary text-white'
                      : 'btn-outline border-primary text-primary hover:bg-primary hover:text-white'
                  } px-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
                >
                  {/* 按钮内部的光效 */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/40 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  
                  {button.icon && (
                    <motion.span 
                      className="mr-2"
                      animate={{ rotate: [0, 15, 0, -15, 0] }}
                      transition={{ duration: 2, delay: 1 + index, repeat: Infinity, repeatDelay: 5 }}
                    >
                      {button.icon}
                    </motion.span>
                  )}
                  <span className="relative z-10">{button.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {children}
          </motion.div>
        )}
      </motion.div>

      {/* 滚动提示 */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-adaptive-muted text-sm mb-2">Scroll</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-primary" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* 波浪底部装饰 */}
      {backgroundStyle === 'pattern' && (
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden">
          <svg
            className="w-full text-base-100 h-12 md:h-16"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,140.83,141.14,213.84,133.6,262.43,128.93,298.65,99.4,321.39,56.44Z"
              className="fill-current"
            ></path>
          </svg>
        </div>
      )}
    </section>
  );
};

export default Hero; 