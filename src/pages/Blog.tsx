import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// 博客文章类型定义
interface BlogPost {
  id: number;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  readTime: number;
  views: number;
  likes: number;
  featured: boolean;
  category: string;
  tags: string[];
}

// 博客文章卡片组件
const BlogPostCard: React.FC<{
  post: BlogPost;
  featured?: boolean;
  delay?: number;
}> = ({ post, featured = false, delay = 0 }) => {
  const { t } = useTranslation();
  
  // 设置动画变体
  const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
        delay
      }
    }
  };
  
  return (
    <motion.div
      variants={itemAnimation}
      className={`card bg-base-100 shadow-lg border border-base-content/10 overflow-hidden group hover:shadow-xl transition-all duration-500 ${
        featured ? 'md:flex md:flex-row h-full' : ''
      }`}
      style={{ 
        background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.05) 100%)",
        backdropFilter: "blur(10px)",
      }}
      whileHover={{
        y: -5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        borderColor: "rgba(var(--s), 0.2)"
      }}
      transition={{
        y: { type: "spring", stiffness: 300, damping: 15 },
        boxShadow: { duration: 0.2 }
      }}
    >
      <figure className={`relative ${featured ? 'md:w-2/5' : 'h-48'} overflow-hidden`}>
        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-700">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          
          {/* 渐变叠加层 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70"></div>
        
          {/* 悬停光效 */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-secondary/20 to-primary/20 mix-blend-overlay"></div>
        </div>
        
        {/* 装饰边框 */}
        <div className="absolute top-0 right-0 w-1 h-0 bg-gradient-to-b from-secondary to-primary group-hover:h-full transition-all duration-500"></div>
        
        {/* 日期标签 */}
        <div className="absolute top-3 right-3 bg-base-100/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-secondary/20 shadow-lg hover:shadow-secondary/20 hover:scale-105 transition-all duration-300">
          {post.date}
        </div>
      </figure>

      <div className={`card-body relative z-10 ${featured ? 'md:w-3/5' : ''}`}>
        {post.featured && !featured && (
          <div className="badge badge-secondary mb-2">{t('blog.featured')}</div>
        )}
        <h2 className="card-title text-adaptive group-hover:text-secondary transition-colors duration-300">
          {post.title}
        </h2>
        <p className="text-adaptive-muted">{post.subtitle}</p>
        {featured && (
          <p className="text-adaptive-muted mt-2 hidden md:block">{post.excerpt}</p>
        )}
        
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="badge badge-sm badge-secondary badge-outline hover:scale-110 transition-transform duration-300">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center text-sm mt-3 text-adaptive-muted">
          <div className="flex items-center gap-2">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime} {t('blog.readTime')}
            </span>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {post.views}
            </span>
          </div>
          <Link
            to={`/blog/${post.id}`}
            className="btn btn-sm btn-secondary btn-outline hover:shadow-lg hover:shadow-secondary/30 transition-shadow duration-300 relative overflow-hidden group"
          >
            {/* 按钮内部光效 */}
            <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
            <span className="relative z-10">{t('common.readMore')}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 relative z-10 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Blog = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [scrollY, setScrollY] = useState(0);
  
  // 监听滚动
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 博客文章数据
  const blogPosts: BlogPost[] = [
  {
    id: 1,
      title: t('blog.posts.post1.title'),
      subtitle: t('blog.posts.post1.subtitle'),
      excerpt: t('blog.posts.post1.excerpt'),
      content: t('blog.posts.post1.content'),
      author: "Alex Mitchell",
      date: "2023-11-24",
      image: "/images/blog/blog-1.jpg", // 使用本地图片
      readTime: 7,
      views: 1248,
      likes: 86,
      featured: true,
    category: "frontend",
      tags: ["React", "Redux", "State Management", "Performance"]
  },
  {
    id: 2,
      title: t('blog.posts.post2.title'),
      subtitle: t('blog.posts.post2.subtitle'),
      excerpt: t('blog.posts.post2.excerpt'),
      content: t('blog.posts.post2.content'),
      author: "Sarah Johnson",
      date: "2023-12-03",
      image: "/images/blog/blog-2.jpg", // 使用本地图片
      readTime: 9,
      views: 952,
      likes: 74,
    featured: true,
      category: "frontend",
      tags: ["TypeScript", "JavaScript", "Design Patterns", "Type Safety"]
  },
  {
    id: 3,
      title: t('blog.posts.post3.title'),
      subtitle: t('blog.posts.post3.subtitle'),
      excerpt: t('blog.posts.post3.excerpt'),
      content: t('blog.posts.post3.content'),
      author: "Maria Garcia",
      date: "2024-01-15",
      image: "/images/blog/blog-3.jpg", // 使用本地图片
      readTime: 6,
      views: 783,
      likes: 63,
      featured: false,
    category: "frontend",
      tags: ["CSS", "Flexbox", "Grid", "Responsive Design"]
  },
  {
    id: 4,
      title: t('blog.posts.post4.title'),
      subtitle: t('blog.posts.post4.subtitle'),
      excerpt: t('blog.posts.post4.excerpt'),
      content: t('blog.posts.post4.content'),
      author: "David Wang",
      date: "2024-02-02",
      image: "/images/blog/blog-4.jpg", // 使用本地图片
      readTime: 8,
      views: 1047,
      likes: 91,
      featured: false,
    category: "frontend",
      tags: ["Next.js", "React", "Server Components", "Performance"]
  },
  {
    id: 5,
      title: t('blog.posts.post5.title'),
      subtitle: t('blog.posts.post5.subtitle'),
      excerpt: t('blog.posts.post5.excerpt'),
      content: t('blog.posts.post5.content'),
      author: "James Wilson",
      date: "2024-01-18",
      image: "/images/blog/blog-5.jpg", // 使用本地图片
      readTime: 11,
      views: 1320,
      likes: 105,
    featured: false,
      category: "frontend",
      tags: ["Performance", "Web Vitals", "Optimization", "User Experience"]
  },
  {
    id: 6,
      title: t('blog.posts.post6.title'),
      subtitle: t('blog.posts.post6.subtitle'),
      excerpt: t('blog.posts.post6.excerpt'),
      content: t('blog.posts.post6.content'),
      author: "Emily Chen",
      date: "2024-02-12",
      image: "/images/blog/blog-6.jpg", // 使用本地图片
      readTime: 8,
      views: 892,
      likes: 78,
      featured: false,
      category: "ai",
      tags: ["AI", "GitHub Copilot", "ChatGPT", "Productivity"]
  },
  {
    id: 7,
      title: t('blog.posts.post7.title'),
      subtitle: t('blog.posts.post7.subtitle'),
      excerpt: t('blog.posts.post7.excerpt'),
      content: t('blog.posts.post7.content'),
      author: "Thomas Brown",
      date: "2023-12-18",
      image: "/images/blog/blog-7.jpg", // 使用本地图片
      readTime: 10,
      views: 756,
      likes: 68,
    featured: false,
      category: "frontend",
      tags: ["Micro-Frontend", "Architecture", "Module Federation", "Web Components"]
  },
  {
    id: 8,
      title: t('blog.posts.post8.title'),
      subtitle: t('blog.posts.post8.subtitle'),
      excerpt: t('blog.posts.post8.excerpt'),
      content: t('blog.posts.post8.content'),
      author: "Anna Martinez",
      date: "2024-01-28",
      image: "/images/blog/blog-8.jpg", // 使用本地图片
      readTime: 9,
      views: 683,
      likes: 57,
      featured: false,
    category: "frontend",
      tags: ["WebAssembly", "Performance", "Rust", "JavaScript"]
  },
  {
    id: 9,
      title: t('blog.posts.post9.title'),
      subtitle: t('blog.posts.post9.subtitle'),
      excerpt: t('blog.posts.post9.excerpt'),
      content: t('blog.posts.post9.content'),
      author: "Michael Lee",
      date: "2024-02-08",
      image: "/images/blog/blog-9.jpg", // 使用本地图片
      readTime: 12,
      views: 942,
      likes: 83,
    featured: false,
      category: "security",
      tags: ["Security", "XSS", "CSRF", "Authentication", "Authorization"]
  }
];

  // 文章类别列表
const categories = [
    { id: 'all', name: t('projects.filters.all') },
    { id: 'frontend', name: t('blog.categories.frontend') },
    { id: 'backend', name: t('blog.categories.backend') },
    { id: 'design', name: t('blog.categories.design') },
    { id: 'ai', name: t('blog.categories.ai') },
    { id: 'security', name: t('blog.categories.security') }
  ];

  // 过滤文章
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // 获取精选文章
  const featuredPosts = blogPosts.filter(post => post.featured);
  
  // 获取标签列表和数量
  const getTags = () => {
    const tagsMap = new Map();
    blogPosts.forEach(post => {
      post.tags.forEach(tag => {
        if (tagsMap.has(tag)) {
          tagsMap.set(tag, tagsMap.get(tag) + 1);
        } else {
          tagsMap.set(tag, 1);
    }
      });
    });
    return Array.from(tagsMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  };
  
  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
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
        
      {/* 博客页面内容 */}
      <div className="container mx-auto px-4 py-12">
        {/* 页面标题 */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 relative"
          >
            {/* 装饰效果 */}
            <motion.div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3] 
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <div className="flex flex-col items-center justify-center">
            <div className="inline-block relative mb-4">
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
              <div className="relative px-5 py-2 rounded-full border border-primary/30 bg-base-100/50 backdrop-blur-sm shadow-lg z-10">
                <motion.span 
                  className="font-medium text-sm"
                  animate={{
                    color: ['hsl(var(--p))', 'hsl(var(--s))', 'hsl(var(--p))']
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {t('blog.badge')}
                </motion.span>
              </div>
              
              {/* 旋转装饰边框 */}
              <div className="absolute -inset-1 rounded-full border border-dashed border-primary/30 opacity-70 animate-[spin_15s_linear_infinite]"></div>
              <div className="absolute -inset-2 rounded-full border border-dashed border-secondary/20 opacity-50 animate-[spin_20s_linear_reverse_infinite]"></div>
            </div>
            
            <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
              {t('blog.title')}
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>
            </motion.h1>
            </div>
            
            <motion.p
              className="text-lg text-adaptive-muted max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('blog.subtitle')}
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
          </motion.div>
      
        {/* 精选文章部分 */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                {t('blog.featuredPosts')}
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondary to-primary"></div>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post, index) => (
              <BlogPostCard
                key={post.id}
                post={post}
                featured={true}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 博客文章列表 */}
          <div className="lg:col-span-2">
            {/* 过滤控制 */}
            <div className="mb-8 p-4 bg-base-200/60 backdrop-blur-sm rounded-box border border-base-content/5 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                      key={category.id}
                      className={`btn btn-sm ${
                        activeCategory === category.id ? 'btn-secondary' : 'btn-ghost'
                      }`}
                      onClick={() => setActiveCategory(category.id)}
              >
                      {category.name}
              </button>
            ))}
          </div>
                
                <div className="relative flex-grow max-w-xs">
                  <input
                    type="text"
                    placeholder={t('blog.searchPlaceholder')}
                    className="input input-bordered w-full pr-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                        <button 
                      className="absolute right-12 top-1/2 transform -translate-y-1/2 text-lg font-bold text-base-content/60 hover:text-base-content"
                      onClick={() => setSearchTerm('')}
                        >
                      &times;
                        </button>
                  )}
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                </div>

            {/* 文章列表 */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <BlogPostCard
                    key={post.id}
                    post={post}
                    delay={index * 0.05}
                  />
                ))
              ) : (
                <div className="col-span-full p-8 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-base-content/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  <h3 className="text-xl font-bold mb-2 text-adaptive">{t('common.notFound')}</h3>
                  <p className="text-adaptive-muted mb-4">
                    {activeCategory !== 'all' ? '尝试选择不同的类别或调整搜索条件' : '尝试调整搜索条件'}
                  </p>
                  <button 
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchTerm('');
                    }}
                    className="btn btn-secondary hover:shadow-lg hover:shadow-secondary/30 transition-shadow duration-300 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                    <span className="relative z-10">{t('common.resetFilters')}</span>
                  </button>
                </div>
              )}
            </motion.div>
            </div>
            
            {/* 侧边栏 */}
          <div className="space-y-8">
                {/* 关于作者 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="card bg-base-100 shadow-lg border border-base-content/10"
              whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              style={{ 
                background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.05) 100%)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="card-body">
                <h3 className="text-xl font-bold mb-4 relative inline-block">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                  {t('blog.about.title')}
                  </span>
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondary to-primary"></div>
                </h3>
                
                <div className="flex items-center mb-4">
                  <div className="avatar">
                    <motion.div 
                      className="w-16 h-16 rounded-full overflow-hidden ring ring-primary ring-offset-2 ring-offset-base-100"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <div className="relative w-full h-full">
                        {/* 发光边框效果 */}
                        <motion.div 
                          className="absolute inset-0 rounded-full opacity-0"
                          style={{ filter: "blur(2px)" }}
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
                        <img src="/images/user/header.jpg" alt="Laby" className="w-full h-full object-cover" />
                      </div>
                    </motion.div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-adaptive">Laby</h4>
                    <p className="text-sm text-adaptive-muted">{t('blog.about.description')}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  {[
                    { 
                      name: 'GitHub', 
                      url: '#',
                      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    },
                    {
                      name: 'Twitter',
                      url: '#',
                      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    },
                    {
                      name: 'LinkedIn',
                      url: '#',
                      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    }
                  ].map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.url}
                      className="btn btn-sm btn-circle btn-ghost"
                      aria-label={platform.name}
                    >
                      {platform.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
      
            {/* 分类列表 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="card bg-base-100 shadow-lg border border-base-content/5"
            >
              <div className="card-body">
                <h3 className="text-xl font-bold mb-4 relative inline-block">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                    {t('blog.title')}
                  </span>
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondary to-primary"></div>
                </h3>
                <div className="space-y-2">
                  {categories.filter(cat => cat.id !== 'all').map((category) => (
                    <button
                      key={category.id}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeCategory === category.id
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'hover:bg-base-200/60'
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* 标签云 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="card bg-base-100 shadow-lg border border-base-content/5"
            >
              <div className="card-body">
                <h3 className="text-xl font-bold mb-4 relative inline-block">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                    {t('blog.popularTags')}
                  </span>
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondary to-primary"></div>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getTags().map(([tag, count]) => (
                    <button
                      key={tag}
                      onClick={() => setSearchTerm(tag)}
                      className="badge badge-outline py-3 px-3 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                    >
                      {tag} ({count})
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* 订阅表单 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="card shadow-lg border border-base-content/10 overflow-hidden"
              whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              {/* 装饰背景 */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-base-100/70 to-secondary/10 z-0" />
                
                {/* 动态背景光效 */}
                <motion.div 
                  className="absolute top-0 right-0 w-full h-full opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 70% 30%, hsla(var(--p), 0.4) 0%, transparent 50%),
                                      radial-gradient(circle at 30% 70%, hsla(var(--s), 0.4) 0%, transparent 50%)`,
                    filter: 'blur(60px)'
                  }}
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 8, repeat: Infinity, ease: "easeInOut" } 
                  }}
                />
              </div>
              
              <div className="card-body relative z-10">
                <motion.h3 
                  className="text-xl font-bold mb-2 relative inline-block"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                  {t('blog.subscribeTitle')}
                  </span>
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondary to-primary"></div>
                </motion.h3>
                
                <p className="text-sm text-adaptive-muted mb-4">
                  {t('blog.subscribeDescription')}
                </p>
                
                <div className="flex">
                  <input
                    type="email"
                    placeholder="your-email@example.com"
                    className="input input-bordered flex-1 rounded-r-none shadow-sm focus:shadow-md transition-shadow duration-300"
                  />
                  <motion.button 
                    className="btn btn-primary rounded-l-none shadow-md"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {t('blog.subscribeButton')}
                  </motion.button>
                </div>
                
                {/* 装饰元素 */}
                <motion.div 
                  className="absolute bottom-2 right-2 w-8 h-8 text-primary/5 pointer-events-none"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.86 12.48a1 1 0 0 0-.86-.48H18a1 1 0 0 0 0 2h1.44a7.9 7.9 0 0 1-13.43 3H7a1 1 0 0 0 0-2H3a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0v-1.29a10 10 0 0 0 17-6.71 1 1 0 0 0 .86-1.52z"/>
                    <path d="M21 6V4.71a10 10 0 0 0-17 6.69 1 1 0 0 0 0 .2 1 1 0 0 0 .86.6H5a1 1 0 0 0 0-2H3.56a7.9 7.9 0 0 1 13.49-3H16a1 1 0 0 0 0 2h4a1 1 0 0 0 1-1V6a1 1 0 0 0-2 0z"/>
                  </svg>
                </motion.div>
              </div>
            </motion.div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Blog; 