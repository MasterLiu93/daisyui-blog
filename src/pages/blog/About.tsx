import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// 粒子效果组件
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      if (canvas && canvas.parentElement) {
        const { width, height } = canvas.parentElement.getBoundingClientRect();
        setDimensions({ width, height });
        canvas.width = width;
        canvas.height = height;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 粒子参数
    const particlesArray: Particle[] = [];
    const numberOfParticles = 50;
    
    // 粒子类
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        
        // 根据当前主题颜色设置粒子颜色
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--p');
        const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--s');
        
        this.color = Math.random() > 0.5 
          ? `rgba(${primaryColor}, ${Math.random() * 0.3})`
          : `rgba(${secondaryColor}, ${Math.random() * 0.3})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // 初始化粒子
    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };
    
    // 连接粒子
    const connect = () => {
      if (!ctx) return;
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.strokeStyle = `rgba(var(--p), ${0.1 - distance/1000})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // 动画循环
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connect();
      requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={dimensions.width} 
      height={dimensions.height}
      className="absolute inset-0 z-0 opacity-40"
    />
  );
};

// 技能和工具数据
const skills = [
  { 
    category: "前端开发", 
    icon: "🌐",
    color: "primary",
    level: 90,
    items: ["React", "Vue.js", "Next.js", "TypeScript", "Tailwind CSS", "SCSS"] 
  },
  { 
    category: "后端开发", 
    icon: "🖥️",
    color: "secondary",
    level: 85,
    items: ["Node.js", "Express", "NestJS", "Django", "Flask", "GraphQL"] 
  },
  { 
    category: "数据库", 
    icon: "💾",
    color: "accent",
    level: 80,
    items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"] 
  },
  { 
    category: "DevOps", 
    icon: "⚙️",
    color: "info",
    level: 75,
    items: ["Docker", "Kubernetes", "CI/CD", "AWS", "Azure", "Linux"] 
  },
  { 
    category: "工具和方法论", 
    icon: "🛠️",
    color: "success",
    level: 70,
    items: ["Git", "Jest", "Webpack", "Agile", "TDD", "设计模式"] 
  },
];

// 工作经历
const experiences = [
  {
    period: "2023 - 至今",
    title: "高级全栈工程师",
    company: "科技创新公司",
    logo: "🚀",
    color: "primary",
    description: "负责设计和开发企业级应用，带领前端团队实施新技术栈。优化系统性能，提高用户体验。",
    achievements: [
      "重构了核心应用架构，减少50%的加载时间",
      "设计并实现了微服务架构，提升系统可扩展性",
      "引入现代化CI/CD流程，将部署时间从小时级降低到分钟级"
    ]
  },
  {
    period: "2020 - 2023",
    title: "全栈开发工程师",
    company: "互联网科技有限公司",
    logo: "💻",
    color: "secondary",
    description: "负责多个跨平台应用的开发，实现从设计到部署的全流程。使用React和Node.js构建可扩展的应用架构。",
    achievements: [
      "开发了公司核心产品，月活用户超过10万",
      "设计并实现了组件库，提升团队开发效率30%",
      "优化数据库查询，降低服务器负载40%"
    ]
  },
  {
    period: "2018 - 2020",
    title: "前端开发工程师",
    company: "数字解决方案公司",
    logo: "🎨",
    color: "accent",
    description: "使用现代JavaScript框架开发响应式Web应用，与UI/UX设计师和后端团队合作优化用户体验。",
    achievements: [
      "开发了5个大型企业客户网站",
      "实现了响应式设计，覆盖所有主流设备",
      "引入前端自动化测试，减少80%的回归bug"
    ]
  }
];

// 教育经历
const education = [
  {
    period: "2014 - 2018",
    degree: "计算机科学学士",
    school: "知名理工大学",
    logo: "🎓",
    color: "info",
    description: "主修软件工程，辅修人工智能。参与多个实验室项目，获得优秀毕业生称号。",
  },
  {
    period: "2019 - 2020",
    degree: "Web开发与云计算认证",
    school: "在线教育平台",
    logo: "📚",
    color: "success",
    description: "完成高级Web开发课程和云服务实践，获得多项技术认证。",
  }
];

const About = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("skills");
  const [scrollY, setScrollY] = useState(0);
  
  // 创建视差滚动效果
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 控制动画的变体
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut" as const
      }
    })
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 粒子效果背景 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticleBackground />
      </div>
    
      <div className="relative z-10 pt-10 pb-20 px-4">
        {/* 页面标题 - 英雄区域 */}
        <section className="relative overflow-hidden rounded-box bg-gradient-to-r from-base-300/50 to-base-100/50 backdrop-blur-sm border border-base-300/50 py-16 mb-20 shadow-lg">
          {/* 动态背景效果 */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 z-0"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          ></div>
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div 
              className="h-full w-full pattern-bg"
              style={{ transform: `translateY(${scrollY * 0.02}px)` }}
            />
          </div>
          {/* 装饰圆形 */}
          <motion.div 
            className="absolute top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl"
            animate={{
              x: [0, 10, 0],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-secondary/20 to-transparent blur-3xl"
            animate={{
              x: [0, -10, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <div className="container mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              <div className="flex flex-col items-center justify-center mb-4">
                <div className="relative mb-4">
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
                  <span className="relative z-10 text-sm font-mono py-2 px-5 rounded-full bg-base-100/50 backdrop-blur-sm border border-primary/20 shadow-xl inline-block">
                  {t('blog.about.title')}
                </span>
                <div className="absolute -inset-1 rounded-full border border-dashed border-primary/30 opacity-70 animate-[spin_15s_linear_infinite]"></div>
                <div className="absolute -inset-2 rounded-full border border-dashed border-secondary/20 opacity-50 animate-[spin_20s_linear_reverse_infinite]"></div>
              </div>
              <motion.h1 
                  className="text-5xl md:text-7xl font-bold mb-6 relative inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                Laby
                  </span>
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>
              </motion.h1>
              </div>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <motion.span 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="badge badge-lg badge-primary"
                >
                  {t('blog.about.badges.fullstack')}
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="badge badge-lg badge-secondary"
                >
                  {t('blog.about.badges.uiux')}
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="badge badge-lg badge-accent"
                >
                  {t('blog.about.badges.architect')}
                </motion.span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col lg:flex-row items-center max-w-5xl mx-auto"
            >
              <motion.div 
                className="lg:w-1/3 mb-8 lg:mb-0"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ 
                  backfaceVisibility: "hidden", 
                  WebkitFontSmoothing: "antialiased",
                  transform: "translateZ(0)"
                }}
              >
                <div className="avatar relative">
                  <div className="w-64 h-64 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-4 shadow-2xl overflow-hidden 
                  backdrop-blur-lg" style={{ transformStyle: "preserve-3d" }}>
                    {/* 旋转光晕效果 */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 z-10 mix-blend-overlay"
                      animate={{ 
                        background: [
                          "linear-gradient(135deg, rgba(var(--p), 0.3) 0%, transparent 50%, rgba(var(--s), 0.3) 100%)",
                          "linear-gradient(225deg, rgba(var(--p), 0.3) 0%, transparent 50%, rgba(var(--s), 0.3) 100%)",
                          "linear-gradient(315deg, rgba(var(--p), 0.3) 0%, transparent 50%, rgba(var(--s), 0.3) 100%)",
                          "linear-gradient(45deg, rgba(var(--p), 0.3) 0%, transparent 50%, rgba(var(--s), 0.3) 100%)",
                          "linear-gradient(135deg, rgba(var(--p), 0.3) 0%, transparent 50%, rgba(var(--s), 0.3) 100%)"
                        ] 
                      }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    {/* 边缘发光效果 */}
                    <motion.div 
                      className="absolute -inset-1 rounded-full opacity-0"
                      style={{ filter: "blur(8px)" }}
                      animate={{ 
                        opacity: [0, 0.5, 0],
                        background: [
                          "radial-gradient(circle, rgba(var(--p), 0.8) 0%, transparent 70%)",
                          "radial-gradient(circle, rgba(var(--s), 0.8) 0%, transparent 70%)",
                          "radial-gradient(circle, rgba(var(--p), 0.8) 0%, transparent 70%)"
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* 装饰元素 */}
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
                      style={{
                        backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 8px)",
                        backgroundSize: "100px 100px"
                      }}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <img src="/images/user/header.jpg" alt="Profile" className="relative z-0 w-full h-full object-cover" />
                  </div>
                  {/* 装饰光点 */}
                  <motion.div
                    className="absolute w-4 h-4 rounded-full bg-primary z-20"
                    style={{ top: '10%', right: '10%', filter: 'blur(1px)' }}
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute w-3 h-3 rounded-full bg-secondary z-20"
                    style={{ bottom: '15%', left: '12%', filter: 'blur(1px)' }}
                    animate={{ 
                      scale: [1, 1.8, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                </div>
              </motion.div>
            
              <motion.div 
                className="lg:w-2/3 lg:pl-12"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="prose prose-lg max-w-none">
                  <p className="lead text-xl">
                    {t('blog.about.intro')}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-6">
                  <a href="#" className="btn btn-primary gap-2 hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    GitHub
                  </a>
                  <a href="#" className="btn btn-secondary gap-2 hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a href="#" className="btn btn-accent gap-2 hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                    </svg>
                    Twitter
                  </a>
                  <a href="#" className="btn gap-2 hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                    </svg>
                    YouTube
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-base-100 to-transparent"></div>
        </section>

        {/* 选项卡导航 */}
        <div className="container mx-auto mb-12">
          <div className="flex justify-center">
            <div className="tabs tabs-boxed bg-base-200/50 p-1 backdrop-blur-sm">
              <a 
                className={`tab tab-lg ${activeTab === "skills" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("skills")}
              >
                {t('blog.about.skills')}
              </a>
              <a 
                className={`tab tab-lg ${activeTab === "experience" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("experience")}
              >
                {t('blog.about.experience')}
              </a>
              <a 
                className={`tab tab-lg ${activeTab === "education" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("education")}
              >
                {t('blog.about.education')}
              </a>
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="container mx-auto mb-20">
      {/* 技能部分 */}
          {activeTab === "skills" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <div>
                {skills.slice(0, 3).map((skillGroup, index) => (
                  <motion.div 
                    key={skillGroup.category}
                    custom={index} 
                    initial="hidden"
                    whileInView="visible"
              viewport={{ once: true }}
                    variants={cardVariants}
                    whileHover={{ 
                      rotateY: 5,
                      rotateX: -5,
                      scale: 1.02,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    className="card bg-base-100 shadow-xl mb-6 overflow-hidden border border-base-300/50 hover:shadow-primary/10 transition-all duration-300 transform perspective-card"
            >
              <div className="card-body">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 flex items-center justify-center text-2xl rounded-xl bg-${skillGroup.color}/10 text-${skillGroup.color}`}>
                          {skillGroup.icon}
                        </div>
                        <h3 className="card-title text-xl">{t(`skills.${skillGroup.category}`)}</h3>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span>{t('skills.proficiency')}</span>
                          <span>{skillGroup.level}%</span>
                        </div>
                        <div className="w-full bg-base-300 rounded-full h-2">
                          <motion.div 
                            className={`bg-${skillGroup.color} h-2 rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skillGroup.level}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 1.5 }}
                          ></motion.div>
                        </div>
                      </div>
                      
                <div className="flex flex-wrap gap-2 mt-2">
                  {skillGroup.items.map((skill, i) => (
                          <motion.span 
                      key={i} 
                            className={`badge badge-${skillGroup.color} badge-outline`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                    >
                      {skill}
                          </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
              
              <div className="mt-0 lg:mt-12">
                {skills.slice(3).map((skillGroup, index) => (
            <motion.div 
                    key={skillGroup.category}
                    custom={index + 3} 
                    initial="hidden"
                    whileInView="visible"
              viewport={{ once: true }}
                    variants={cardVariants}
                    whileHover={{ 
                      rotateY: 5,
                      rotateX: -5,
                      scale: 1.02,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    className="card bg-base-100 shadow-xl mb-6 overflow-hidden border border-base-300/50 hover:shadow-primary/10 transition-all duration-300 transform perspective-card"
            >
              <div className="card-body">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 flex items-center justify-center text-2xl rounded-xl bg-${skillGroup.color}/10 text-${skillGroup.color}`}>
                          {skillGroup.icon}
                        </div>
                        <h3 className="card-title text-xl">{t(`skills.${skillGroup.category}`)}</h3>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span>{t('skills.proficiency')}</span>
                          <span>{skillGroup.level}%</span>
                        </div>
                        <div className="w-full bg-base-300 rounded-full h-2">
                          <motion.div 
                            className={`bg-${skillGroup.color} h-2 rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skillGroup.level}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 1.5 }}
                          ></motion.div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skillGroup.items.map((skill, i) => (
                          <motion.span 
                            key={i} 
                            className={`badge badge-${skillGroup.color} badge-outline`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
            </motion.div>
          )}

          {/* 工作经历部分 */}
          {activeTab === "experience" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              {experiences.map((exp, index) => (
            <motion.div 
              key={index}
                  custom={index} 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                >
                  <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-300/50 hover:shadow-xl transition-all duration-300">
                    <motion.div 
                      className="absolute top-0 left-0 w-2 h-full"
                      style={{ backgroundColor: `hsl(var(--${exp.color}))` }}
                      initial={{ height: 0 }}
                      whileInView={{ height: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                    />
                    
                    <div className="card-body">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <motion.div 
                          className={`w-16 h-16 flex items-center justify-center text-3xl rounded-xl bg-${exp.color}/10 text-${exp.color} shrink-0`}
                          initial={{ scale: 0.8, rotate: -10 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ type: "spring", stiffness: 200 }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {exp.logo}
                        </motion.div>
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-1">
                            <h3 className="card-title text-xl">{t(`experience.${index}.title`, exp.title)}</h3>
                            <div className={`badge badge-${exp.color}`}>{t(`experience.${index}.period`, exp.period)}</div>
                          </div>
                          <p className="font-medium text-lg">{t(`experience.${index}.company`, exp.company)}</p>
                        </div>
                      </div>
                      
                      <p className="mt-4">{t(`experience.${index}.description`, exp.description)}</p>
                      
                      <div className="mt-4">
                        <p className="font-medium mb-2">{t('experience.achievements')}:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              className="ml-2"
                            >
                              {t(`experience.${index}.achievements.${i}`, achievement)}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* 教育背景部分 */}
          {activeTab === "education" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-8"
            >
              {education.map((edu, index) => (
                <motion.div 
                  key={index}
                  custom={index} 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                >
                  <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-300/50 hover:shadow-xl transition-all duration-300">
              <div className="card-body">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <motion.div 
                          className={`w-16 h-16 flex items-center justify-center text-3xl rounded-xl bg-${edu.color}/10 text-${edu.color} shrink-0`}
                          initial={{ scale: 0.8 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ type: "spring", stiffness: 200 }}
                          whileHover={{ 
                            scale: 1.2,
                            rotate: [0, -10, 10, -10, 10, 0],
                            transition: { duration: 0.5 }
                          }}
                        >
                          {edu.logo}
                        </motion.div>
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-1">
                            <h3 className="card-title text-xl">{t(`education.${index}.degree`, edu.degree)}</h3>
                            <div className={`badge badge-${edu.color}`}>{t(`education.${index}.period`, edu.period)}</div>
                          </div>
                          <p className="font-medium text-lg">{t(`education.${index}.school`, edu.school)}</p>
                        </div>
                      </div>
                      
                      <p className="mt-4">{t(`education.${index}.description`, edu.description)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* 证书部分 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="card bg-gradient-to-br from-base-200/80 via-base-200/60 to-base-200/90 backdrop-blur-sm shadow-lg p-6 border border-base-300/50">
                  <h3 className="text-xl font-bold mb-4 relative inline-block">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                      {t('blog.about.certificates')}
                    </span>
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondary to-primary"></div>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { year: "2022", name: "AWS 解决方案架构师认证", color: "primary" },
                      { year: "2021", name: "Google 云工程师认证", color: "secondary" },
                      { year: "2021", name: "MongoDB 数据库管理员认证", color: "accent" },
                    ].map((cert, index) => (
                      <motion.div 
                        key={index} 
                        className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.03, y: -5 }}
                      >
                        <div className="card-body p-4">
                          <div className="flex items-center gap-2">
                            <div className={`badge badge-${cert.color}`}>{cert.year}</div>
                            <h4 className="font-medium">{t(`certificates.${index}.name`, cert.name)}</h4>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

      {/* 下载简历部分 */}
        <section className="container mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card bg-gradient-to-br from-primary/5 via-base-200/70 to-secondary/5 backdrop-blur-sm shadow-xl overflow-hidden border border-base-300/50"
          >
            <div className="card-body text-center relative overflow-hidden">
              {/* 背景装饰 */}
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-secondary/10 blur-3xl"></div>
              
              {/* 装饰图形 */}
              <motion.div 
                className="absolute top-4 left-4 w-16 h-16 text-primary/10"
                animate={{ 
                  rotate: [0, 180, 180, 0],
                  scale: [1, 1.2, 0.8, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.5,16 C14.2238576,16 14,15.7761424 14,15.5 C14,15.2238576 14.2238576,15 14.5,15 L19.5,15 C19.7761424,15 20,15.2238576 20,15.5 C20,15.7761424 19.7761424,16 19.5,16 L14.5,16 Z M4.5,16 C4.22385763,16 4,15.7761424 4,15.5 C4,15.2238576 4.22385763,15 4.5,15 L9.5,15 C9.77614237,15 10,15.2238576 10,15.5 C10,15.7761424 9.77614237,16 9.5,16 L4.5,16 Z M12,20 C11.4477153,20 11,19.5522847 11,19 C11,18.4477153 11.4477153,18 12,18 C12.5522847,18 13,18.4477153 13,19 C13,19.5522847 12.5522847,20 12,20 Z M12,13 C11.4477153,13 11,12.5522847 11,12 C11,11.4477153 11.4477153,11 12,11 C12.5522847,11 13,11.4477153 13,12 C13,12.5522847 12.5522847,13 12,13 Z M12,6 C11.4477153,6 11,5.55228475 11,5 C11,4.44771525 11.4477153,4 12,4 C12.5522847,4 13,4.44771525 13,5 C13,5.55228475 12.5522847,6 12,6 Z" />
                </svg>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-4 right-8 w-24 h-24 text-secondary/10"
                animate={{ 
                  rotate: [0, -180, -180, 0],
                  scale: [1, 0.8, 1.2, 1]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6,3 L18,3 C19.6568542,3 21,4.34314575 21,6 L21,18 C21,19.6568542 19.6568542,21 18,21 L6,21 C4.34314575,21 3,19.6568542 3,18 L3,6 C3,4.34314575 4.34314575,3 6,3 Z M12,18 C8.6862915,18 6,15.3137085 6,12 C6,8.6862915 8.6862915,6 12,6 C15.3137085,6 18,8.6862915 18,12 C18,15.3137085 15.3137085,18 12,18 Z" />
                </svg>
              </motion.div>
              
              <h2 className="card-title text-3xl font-bold justify-center mb-4 relative z-10 inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                  {t('blog.about.downloadResume.title')}
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondary to-primary"></div>
              </h2>
              <p className="mb-6 max-w-2xl mx-auto relative z-10">
                {t('blog.about.downloadResume.description')}
          </p>
              <div className="flex justify-center relative z-10">
                <motion.button 
                  className="btn btn-primary gap-2 hover:scale-105 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
                  {t('blog.about.downloadResume.button')}
                </motion.button>
              </div>
        </div>
          </motion.div>
      </section>
      </div>
    </div>
  );
};

export default About; 