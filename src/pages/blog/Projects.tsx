import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// 定义项目类型
interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  color: string;
  techStack: string[];
  demoUrl: string;
  repoUrl: string;
  categories: string[];
}

const Projects = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollY, setScrollY] = useState(0);

  // 使用useMemo缓存项目数据，只在t函数变化时重新计算
  const projects = useMemo(() => [
  {
    id: 1,
      title: t('blog.projects.items.project1.title'),
      subtitle: t('blog.projects.items.project1.subtitle'),
      description: t('blog.projects.items.project1.description'),
      longDescription: t('blog.projects.items.project1.longDescription'),
      image: "/images/projects/project-1.jpg",
      color: "primary",
      techStack: ['React', 'Node.js', 'MongoDB', 'MQTT', 'Express'],
      demoUrl: 'https://demo.example.com/smarthome',
      repoUrl: 'https://github.com/example/smart-home',
      categories: ['web', 'iot']
  },
  {
    id: 2,
      title: t('blog.projects.items.project2.title'),
      subtitle: t('blog.projects.items.project2.subtitle'),
      description: t('blog.projects.items.project2.description'),
      longDescription: t('blog.projects.items.project2.longDescription'),
      image: "/images/projects/project-2.jpg",
      color: "secondary",
      techStack: ['Next.js', 'React', 'Stripe', 'MongoDB', 'Tailwind CSS'],
      demoUrl: 'https://demo.example.com/ecommerce',
      repoUrl: 'https://github.com/example/ecommerce',
      categories: ['web']
  },
  {
    id: 3,
      title: t('blog.projects.items.project3.title'),
      subtitle: t('blog.projects.items.project3.subtitle'),
      description: t('blog.projects.items.project3.description'),
      longDescription: t('blog.projects.items.project3.longDescription'),
      image: "/images/projects/project-3.jpg",
      color: "accent",
      techStack: ['React Native', 'Firebase', 'Expo', 'Health API'],
      demoUrl: 'https://demo.example.com/health-app',
      repoUrl: 'https://github.com/example/health-tracker',
      categories: ['mobile']
  },
  {
    id: 4,
      title: t('blog.projects.items.project4.title'),
      subtitle: t('blog.projects.items.project4.subtitle'),
      description: t('blog.projects.items.project4.description'),
      longDescription: t('blog.projects.items.project4.longDescription'),
      image: "/images/projects/project-4.jpg",
      color: "info",
      techStack: ['Python', 'Flask', 'NLTK', 'spaCy', 'Transformers', 'Docker'],
      demoUrl: 'https://demo.example.com/nlp-api',
      repoUrl: 'https://github.com/example/nlp-service',
      categories: ['ai']
  },
  {
    id: 5,
      title: t('blog.projects.items.project5.title'),
      subtitle: t('blog.projects.items.project5.subtitle'),
      description: t('blog.projects.items.project5.description'),
      longDescription: t('blog.projects.items.project5.longDescription'),
      image: "/images/projects/project-5.jpg",
      color: "success",
      techStack: ['Solidity', 'React', 'Ethers.js', 'Hardhat', 'IPFS'],
      demoUrl: 'https://demo.example.com/voting',
      repoUrl: 'https://github.com/example/blockchain-voting',
      categories: ['blockchain']
  },
  {
    id: 6,
      title: t('blog.projects.items.project6.title'),
      subtitle: t('blog.projects.items.project6.subtitle'),
      description: t('blog.projects.items.project6.description'),
      longDescription: t('blog.projects.items.project6.longDescription'),
      image: "/images/projects/project-6.jpg",
      color: "warning",
      techStack: ['React', 'Node.js', 'Socket.IO', 'MongoDB', 'Draft.js', 'CRDT'],
      demoUrl: 'https://demo.example.com/collab-editor',
      repoUrl: 'https://github.com/example/collaborative-editor',
      categories: ['web']
    }
  ], [t]);

  // 分类选项，同样使用useMemo缓存避免重新创建
  const categories = useMemo(() => [
    { id: "all", name: t('blog.projects.filter.all'), icon: "🌟" },
    { id: "web", name: t('blog.projects.filter.web'), icon: "🌐" },
    { id: "mobile", name: t('blog.projects.filter.mobile'), icon: "📱" },
    { id: "ai", name: t('blog.projects.filter.ai'), icon: "🧠" },
    { id: "blockchain", name: t('blog.projects.filter.blockchain'), icon: "⛓️" },
    { id: "iot", name: t('blog.projects.filter.iot'), icon: "📡" }
  ], [t]);

  // 初始化过滤项目
  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);
  
  // 添加滚动效果
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // 过滤项目
  useEffect(() => {
    if (searchTerm === "" && selectedCategory === "all") {
      setFilteredProjects(projects);
      return;
    }
    
    const filtered = projects.filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || project.categories.includes(selectedCategory);
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredProjects(filtered);
  }, [searchTerm, selectedCategory, projects]);
  
  // 处理项目点击
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };
  
  // 处理关闭模态窗口
  const handleCloseModal = () => {
    setSelectedProject(null);
  };
  
  // 容器和项目动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* 背景效果 */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(var(--color-base-content-rgb), 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(var(--color-base-content-rgb), 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translateY(${scrollY * 0.05}px)`
          }}
        />
        
        {/* 装饰元素 */}
        <div 
          className="absolute top-40 -left-20 w-96 h-96 rounded-full bg-primary/10 blur-[120px] opacity-30"
          style={{ transform: `translate(${scrollY * 0.02}px, ${-scrollY * 0.01}px)` }}
        />
        <div 
          className="absolute bottom-40 -right-20 w-96 h-96 rounded-full bg-secondary/10 blur-[120px] opacity-30"
          style={{ transform: `translate(${-scrollY * 0.02}px, ${scrollY * 0.01}px)` }}
        />
      </div>

      {/* 英雄区域 */}
      <div className="relative py-12 md:py-16">
        {/* 装饰效果 */}
        <div className="absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
        <motion.div 
          className="absolute top-10 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-40 -left-20 w-64 h-64 rounded-full bg-gradient-to-tr from-secondary/20 to-transparent blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, delay: 1, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex flex-col items-center justify-center mb-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative inline-block mb-4"
            >
              {/* 发光背景效果 */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-xl"></div>
              
              {/* 徽章 */}
              <div className="relative px-6 py-2 rounded-full border border-primary/30 bg-base-100/50 backdrop-blur-sm shadow-xl">
                <motion.span 
                  className="text-primary font-medium"
                  animate={{
                    color: ['hsl(var(--p))', 'hsl(var(--s))', 'hsl(var(--p))']
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {t('blog.projects.badge')}
                </motion.span>
              </div>
              
              {/* 旋转装饰边框 */}
              <div className="absolute -inset-1 rounded-full border border-dashed border-primary/30 opacity-70 animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute -inset-2 rounded-full border border-dashed border-secondary/20 opacity-50 animate-[spin_25s_linear_reverse_infinite]"></div>
              <motion.div 
                className="absolute -inset-3 rounded-full border border-dotted border-accent/20 opacity-40"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl md:text-6xl font-bold mb-6 relative inline-block"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
              {t('blog.projects.title')}
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>
            </motion.h1>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-adaptive-muted mb-8 max-w-2xl mx-auto"
            >
              {t('blog.projects.subtitle')}
            </motion.p>
            
            {/* 装饰线条 */}
            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto opacity-70"
              animate={{
                width: ['8rem', '12rem', '8rem'],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>

      {/* 筛选和搜索部分 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="container mx-auto px-4 mb-12"
      >
        <div className="bg-base-200/60 backdrop-blur-sm p-4 rounded-box shadow-md border border-base-content/5 mx-auto max-w-4xl">
          {/* 分类选项卡 */}
          <div className="flex flex-wrap items-center mb-4 gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`btn btn-sm ${
                  selectedCategory === category.id ? "btn-primary" : "btn-ghost"
                } shadow-lg backdrop-blur-sm`}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-1.5 text-xl animate-pulse">{category.icon}</span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
          
          {/* 搜索框 */}
          <div className="flex">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={t('blog.projects.searchPlaceholder')}
                className="input input-bordered w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 btn btn-sm btn-circle btn-ghost"
                  onClick={() => setSearchTerm("")}
                >
                  ×
                </button>
              )}
            </div>
            <button className="btn btn-square btn-primary ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
      </motion.div>

      {/* 项目网格 */}
      <div className="container mx-auto px-4 pb-20">
          <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="card bg-base-100 shadow-lg border border-base-content/10 overflow-hidden group hover:shadow-xl transition-all duration-500"
                style={{ 
                  background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.05) 100%)",
                  backdropFilter: "blur(10px)",
                }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  borderColor: "rgba(var(--s), 0.2)"
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15 
                }}
              >
                <figure className="relative h-48 overflow-hidden">
                  {/* 图片加载 */}
                  <motion.div 
                    className="w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                  >
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                    {/* 渐变叠加层 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70"></div>
                    
                    {/* 悬停光效 */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-secondary/20 to-primary/20 mix-blend-overlay"></div>
                  </motion.div>
                  
                  {/* 装饰边框 */}
                  <div className="absolute top-0 right-0 w-1 h-0 bg-gradient-to-b from-secondary to-primary group-hover:h-full transition-all duration-500"></div>
                </figure>
                
                <div className="absolute top-4 right-4">
                  {project.techStack.slice(0, 1).map((tag, index) => (
                    <span key={index} className="badge badge-sm badge-secondary badge-outline hover:scale-110 transition-transform duration-300">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="card-body relative z-10">
                  <h2 className="card-title text-adaptive group-hover:text-secondary transition-colors duration-300">
                    {project.title}
                    <div className="badge badge-secondary">{project.categories[0]}</div>
                  </h2>
                  <p className="text-adaptive-muted">{project.subtitle}</p>
                  <p className="text-sm text-adaptive-muted">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.techStack.slice(0, 3).map((tag, index) => (
                      <span key={index} className="badge badge-sm badge-secondary badge-outline hover:scale-110 transition-transform duration-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <button 
                      className="btn btn-sm btn-secondary hover:shadow-lg hover:shadow-secondary/30 transition-shadow duration-300 relative overflow-hidden group"
                      onClick={() => handleProjectClick(project)}
                    >
                      {/* 按钮内部光效 */}
                      <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                      <span className="relative z-10">{t('common.viewDetails')}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 relative z-10 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline"
                      >
                        {t('common.viewDemo')}
                      </a>
                    )}
                    {project.repoUrl && (
                      <a 
                        href={project.repoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline btn-square"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="col-span-full text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-base-content/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold mb-2 text-adaptive">{t('blog.projects.notFound.title')}</h3>
                <p className="text-adaptive-muted mb-4">{t('blog.projects.notFound.description')}</p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                    setSelectedCategory("all");
                setSearchTerm("");
              }}
            >
                  {t('common.resetFilters')}
            </button>
          </div>
            </motion.div>
        )}
        </motion.div>
      </div>

      {/* 联系我部分 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 mb-20"
      >
        <div className="relative card bg-gradient-to-br from-base-200/70 to-base-100/70 backdrop-blur-sm shadow-xl border border-base-content/10 max-w-3xl mx-auto overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 70% 30%, hsla(var(--p), 0.4) 0%, transparent 50%),
                                  radial-gradient(circle at 30% 70%, hsla(var(--s), 0.4) 0%, transparent 50%)`,
                filter: 'blur(60px)'
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          <div className="card-body text-center relative z-10">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold justify-center mb-2 relative inline-block"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
              {t('blog.projects.cooperation.title')}
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondary to-primary"></div>
            </motion.h2>
            
            <motion.p 
              className="max-w-lg mx-auto mb-6 text-adaptive-muted"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('blog.projects.cooperation.description')}
            </motion.p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link to="/contact" className="btn btn-primary shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  {t('blog.projects.cooperation.cta')}
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="btn btn-outline shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  {t('blog.projects.cooperation.githubCta')}
                </a>
              </motion.div>
            </motion.div>
            
            {/* 装饰元素 */}
            <motion.div 
              className="absolute top-4 left-4 w-16 h-16 text-primary/5 pointer-events-none"
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
          </div>
        </div>
      </motion.div>

      {/* 项目详情模态窗口 */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="modal-box max-w-3xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleCloseModal}>✕</button>
              
              <div className="relative h-56 md:h-64 overflow-hidden rounded-t-lg -mt-6 -mx-6">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className={`badge badge-${selectedProject.color} mb-2`}>{selectedProject.categories[0]}</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{selectedProject.title}</h2>
                  <p className="text-lg text-white/80">{selectedProject.subtitle}</p>
                </div>
              </div>
              
              <div className="py-6">
                <p className="mb-6 text-adaptive-muted leading-relaxed">{selectedProject.longDescription}</p>
                
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2 text-adaptive">{t('blog.projects.techstack')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tag, index) => (
                      <span key={index} className={`badge badge-${selectedProject.color} badge-outline`}>{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 justify-end">
                  {selectedProject.demoUrl && (
                    <a 
                      href={selectedProject.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      {t('common.viewDemo')}
                    </a>
                  )}
                  
                  {selectedProject.repoUrl && (
                    <a 
                      href={selectedProject.repoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                      {t('common.sourceCode')}
                    </a>
                  )}
                </div>
      </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects; 