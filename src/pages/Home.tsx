import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import SkillsShowcase from "../components/SkillsShowcase";
import CounterSection from "../components/CounterSection";
import TechStackGlobe from "../components/TechStackGlobe";

const Home = () => {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);
  
  // 监听滚动位置 - 改进后的滚动监听
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // 项目数据
  const projects = [
  {
    id: 1,
      title: t('home.projects.items.project1.title', '智能家居控制系统'),
      description: t('home.projects.items.project1.description', '基于React和Node.js的智能家居控制平台'),
      image: "/images/projects/project-1.jpg",
      tags: ['React', 'Node.js', 'IoT'],
      link: '/projects',
  },
  {
    id: 2,
      title: t('home.projects.items.project2.title', '电子商务平台'),
      description: t('home.projects.items.project2.description', '基于Next.js和Stripe的现代电子商务平台'),
      image: "/images/projects/project-2.jpg",
      tags: ['Next.js', 'React', 'E-commerce'],
      link: '/projects',
  },
  {
    id: 3,
      title: t('home.projects.items.project3.title', '健康追踪应用'),
      description: t('home.projects.items.project3.description', 'React Native构建的健康追踪应用'),
      image: "/images/projects/project-3.jpg",
      tags: ['React Native', 'Mobile', 'Health'],
      link: '/projects',
  }
];

  // 博客文章数据
  const blogPosts = [
    {
      id: 1,
      title: t('home.blog.posts.post1.title', 'React中的状态管理最佳实践'),
      excerpt: t('home.blog.posts.post1.excerpt', '探索不同的状态管理解决方案，从Context API到Redux和Zustand'),
      image: "/images/blog/blog-1.jpg",
      date: '2023-11-24',
      tags: ['React', 'State Management'],
      link: '/blog',
    },
    {
      id: 2,
      title: t('home.blog.posts.post2.title', 'TypeScript高级类型和模式'),
      excerpt: t('home.blog.posts.post2.excerpt', '深入TypeScript的类型系统，掌握高级类型和设计模式'),
      image: "/images/blog/blog-2.jpg",
      date: '2023-12-03',
      tags: ['TypeScript', 'JavaScript'],
      link: '/blog',
    },
    {
      id: 3,
      title: t('home.blog.posts.post3.title', 'CSS布局技术的演变'),
      excerpt: t('home.blog.posts.post3.excerpt', '从表格到Flexbox和Grid，CSS布局技术的发展历程'),
      image: "/images/blog/blog-3.jpg",
      date: '2024-01-15',
      tags: ['CSS', 'Frontend'],
      link: '/blog',
    }
  ];

  // 技能数据
  const skills = [
    { name: "React", level: 95, color: "hsl(193, 95%, 68%)" },
    { name: "TypeScript", level: 90, color: "hsl(217, 91%, 60%)" },
    { name: "Node.js", level: 85, color: "hsl(142, 76%, 36%)" },
    { name: "GraphQL", level: 80, color: "hsl(300, 85%, 60%)" },
    { name: "Next.js", level: 88, color: "hsl(0, 0%, 0%)" },
    { name: "Vue.js", level: 75, color: "hsl(153, 47%, 49%)" },
    { name: "UI/UX Design", level: 70, color: "hsl(262, 83%, 58%)" },
    { name: "DevOps", level: 65, color: "hsl(27, 98%, 54%)" },
  ];
  
  // 数字指标数据
  const counterItems = [
    {
      value: 5,
      label: t('home.counter.yearsExperience'),
      suffix: "+",
      color: "hsl(var(--p))",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      value: 50,
      label: t('home.counter.projectsCompleted'),
      suffix: "+",
      color: "hsl(var(--s))",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      value: 99,
      label: t('home.counter.satisfactionRate'),
      suffix: "%",
      color: "hsl(var(--a))",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      )
    },
    {
      value: 20,
      label: t('home.counter.clientsServed'),
      suffix: "+",
      color: "hsl(var(--p))",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
  ];
  
  // 客户评价数据
  const testimonialItems = [
    {
      id: 1,
      name: t('home.testimonials.people.zhang'),
      role: t('home.testimonials.roles.ceo'),
      company: t('home.testimonials.companies.tech'),
      content: t('home.testimonials.items.testimonial1'),
      rating: 5,
      image: "/images/user/header.jpg"
    },
    {
      id: 2,
      name: t('home.testimonials.people.wang'),
      role: t('home.testimonials.roles.productManager'),
      company: t('home.testimonials.companies.digital'),
      content: t('home.testimonials.items.testimonial2'),
      rating: 5,
      image: "/images/user/header.jpg"
    },
    {
      id: 3,
      name: t('home.testimonials.people.li'),
      role: t('home.testimonials.roles.cto'),
      company: t('home.testimonials.companies.smart'),
      content: t('home.testimonials.items.testimonial3'),
      rating: 5,
      image: "/images/user/header.jpg"
    }
  ];

  // 技术栈数据
  const techStack = [
    { name: "React", color: "hsl(193, 95%, 68%)" },
    { name: "Vue", color: "hsl(153, 47%, 49%)" },
    { name: "TypeScript", color: "hsl(217, 91%, 60%)" },
    { name: "JavaScript", color: "hsl(51, 100%, 50%)" },
    { name: "Node.js", color: "hsl(142, 76%, 36%)" },
    { name: "GraphQL", color: "hsl(300, 85%, 60%)" },
    { name: "Next.js", color: "hsl(0, 0%, 20%)" },
    { name: "Redux", color: "hsl(280, 67%, 45%)" },
    { name: "MongoDB", color: "hsl(120, 67%, 35%)" },
    { name: "Express", color: "hsl(204, 67%, 45%)" },
    { name: "Tailwind CSS", color: "hsl(199, 89%, 48%)" },
    { name: "Framer Motion", color: "hsl(341, 100%, 67%)" },
    { name: "Three.js", color: "hsl(0, 0%, 0%)" },
    { name: "WebGL", color: "hsl(186, 100%, 41%)" },
    { name: "Firebase", color: "hsl(36, 100%, 50%)" },
    { name: "REST API", color: "hsl(200, 100%, 50%)" },
    { name: "CI/CD", color: "hsl(344, 78%, 48%)" },
    { name: "Git", color: "hsl(11, 100%, 50%)" },
    { name: "Docker", color: "hsl(201, 100%, 40%)" },
    { name: "Jest", color: "hsl(336, 91%, 54%)" }
  ];

  return (
    <div className="min-h-screen">
      <Hero
        title={t('home.hero.title')}
        subtitle={t('home.hero.description')}
        badge={t('home.hero.badge')}
        backgroundStyle="3d"
        height="full"
        scrollY={scrollY}
        buttons={[
          {
            label: t('home.hero.cta'),
            to: "/projects",
            variant: "primary",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )
          },
          {
            label: t('home.hero.contactCta'),
            to: "/contact",
            variant: "outline",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            )
          }
        ]}
      />

      {/* 特色项目部分 */}
      <section className="py-20 bg-base-100 relative">
        {/* 装饰背景元素 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl"
            style={{
              transform: `translateX(${scrollY * 0.05}px)`,
              opacity: Math.max(0, 0.5 - scrollY * 0.0005),
            }}
          />
          <div 
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-secondary/10 to-transparent blur-3xl"
            style={{
              transform: `translateX(${-scrollY * 0.05}px)`,
              opacity: Math.max(0, 0.5 - scrollY * 0.0002),
            }}
          />
        </div>
        
        <div className="container mx-auto px-4">
          {/* 项目展示 */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                {t('home.projects.subtitle', '我们的作品集')}
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>
            </h2>
            <p className="text-adaptive-muted max-w-2xl mx-auto">
              {t('home.projects.description', 'Browse our selected projects showcasing our expertise and creativity across various domains')}
            </p>
          </div>

          {/* 项目卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="card bg-base-100 shadow-lg border border-base-content/10 overflow-hidden hover:shadow-xl transition-all duration-500 group"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.05) 100%)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <figure className="relative h-52 overflow-hidden">
                  <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-700">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* 渐变叠加层 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70"></div>
                    
                    {/* 悬停光效 */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-secondary/20 to-primary/20 mix-blend-overlay"></div>
                  </div>
                  
                  {/* 装饰边框 */}
                  <div className="absolute top-0 right-0 w-1 h-0 bg-gradient-to-b from-secondary to-primary group-hover:h-full transition-all duration-500"></div>
                </figure>
                <div className="card-body relative z-10">
                  <h3 className="card-title text-2xl text-adaptive group-hover:text-secondary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-adaptive-muted text-base mt-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="badge badge-sm badge-secondary badge-outline hover:scale-110 transition-transform duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="card-actions justify-end mt-4">
                    <Link 
                      to={project.link} 
                      className="btn btn-secondary btn-sm hover:shadow-lg hover:shadow-secondary/30 transition-shadow duration-300 relative overflow-hidden group"
                    >
                      {/* 按钮内部光效 */}
                      <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                      <span className="relative z-10">{t('common.viewDetails')}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 relative z-10 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link 
              to="/projects" 
              className="btn btn-outline border-secondary text-secondary hover:bg-secondary hover:text-base-100 hover:border-secondary gap-2"
            >
              {t('home.projects.viewAllButton')}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 技术栈展示部分 */}
      <section className="py-20 relative overflow-hidden bg-base-100">
        {/* 背景装饰元素 */}
        <div 
          className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 70% 30%, hsla(var(--p), 0.4) 0%, transparent 50%),
                              radial-gradient(circle at 30% 70%, hsla(var(--s), 0.4) 0%, transparent 50%)`,
            filter: 'blur(60px)'
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          {/* 技术栈 */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                {t('home.techStack.title', '技术栈')}
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>
            </h2>
            <p className="text-adaptive-muted max-w-2xl mx-auto">
              {t('home.techStack.description', 'I use modern technology stacks to build powerful and scalable applications')}
            </p>
          </div>

          <div className="relative">
            <TechStackGlobe 
              items={techStack} 
              radius={230}
              opacity={0.9}
              speed={0.7}
              height="600px"
            />
          </div>
        </div>

        {/* 底部波浪装饰 */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden">
          <svg
            className="w-full text-base-200 h-16 md:h-24"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              className="fill-current"
              opacity=".25"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              className="fill-current"
              opacity=".5"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="fill-current"
            ></path>
          </svg>
        </div>
      </section>

      {/* 统计数据部分 */}
      <section className="py-20 bg-base-100 relative">
        <div className="container mx-auto px-4">
          {/* 删除这个SectionTitle组件 */}
          {/* <SectionTitle 
            badge="home.stats.badge"
            title="home.stats.title"
            description="home.stats.description"
            badgeColor="secondary"
          /> */}
          
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                {t('home.stats.title', '成就与数据')}
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>
            </h2>
            <p className="text-adaptive-muted max-w-2xl mx-auto">
              {t('home.stats.description', 'Rich experience and project outcomes from years of professional development')}
            </p>
          </div>

          <CounterSection 
            items={counterItems}
            columns={4}
            animationDuration={1.5}
            className="mt-8"
          />
        </div>
      </section>

      {/* 技能展示部分 */}
      <section className="py-20 bg-base-200 relative">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-3xl"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-tl from-secondary/5 to-primary/5 blur-3xl"></div>
          <div className="absolute inset-0 opacity-10">
            <div 
              className="h-full w-full pattern-bg"
              style={{ transform: `translateY(${scrollY * 0.02}px)` }}
            />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* 删除这个SectionTitle组件 */}
          {/* <SectionTitle 
            badge="home.skills.badge"
            title="home.skills.title"
            description="home.skills.description"
            badgeColor="accent"
            animationDelay={0.1}
          /> */}

          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                {t('home.skills.title', '专业技能')}
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>
            </h2>
            <p className="text-adaptive-muted max-w-2xl mx-auto">
              {t('home.skills.description', 'I master various frontend and backend technologies to build high-quality full-stack applications')}
            </p>
          </div>

          <div>
            <SkillsShowcase skills={skills} />
          </div>


        </div>
      </section>
      
      {/* 博客文章部分 */}
      <section className="py-20 bg-base-100 relative">
        {/* 背景效果 */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-0 right-0 w-full h-full opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 80% 20%, hsla(var(--p), 0.4) 0%, transparent 40%)`,
              filter: 'blur(70px)'
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-full h-full opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, hsla(var(--s), 0.4) 0%, transparent 40%)`,
              filter: 'blur(70px)'
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* 删除这个SectionTitle组件 */}
          {/* <SectionTitle 
            badge="home.blog.badge"
            title="home.blog.title"
            description="home.blog.description"
            badgeColor="primary"
            titleGradient={true}
          /> */}

          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                {t('home.blog.title', '最新资讯')}
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>
            </h2>
            <p className="text-adaptive-muted max-w-2xl mx-auto">
              {t('home.blog.description', 'Stay updated with industry trends, technology insights, and our professional perspectives')}
            </p>
          </div>

          {/* 博客文章网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="card bg-base-100 shadow-lg border border-base-content/10 overflow-hidden hover:shadow-xl transition-all duration-500 group"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.05) 100%)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <figure className="relative h-52 overflow-hidden">
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
                  <div className="absolute top-4 right-4 bg-base-100/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-secondary/20 shadow-lg hover:shadow-secondary/20 hover:scale-105 transition-all duration-300">
                    {post.date}
                  </div>
                </figure>
                <div className="card-body relative z-10">
                  <h3 className="card-title text-xl text-adaptive group-hover:text-secondary transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-adaptive-muted text-base mt-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i} 
                        className="badge badge-sm badge-secondary badge-outline hover:scale-110 transition-transform duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="card-actions justify-end mt-4">
                    <Link 
                      to={post.link} 
                      className="btn btn-secondary btn-sm hover:shadow-lg hover:shadow-secondary/30 transition-shadow duration-300 relative overflow-hidden group"
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
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link 
              to="/blog" 
              className="btn btn-outline border-secondary hover:bg-secondary text-secondary hover:text-base-100 hover:border-secondary gap-2 btn-lanxi"
            >
              {t('home.blog.viewAllButton')}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 推荐内容/推荐客户评价 */}
      <section className="py-20 bg-base-200 relative overflow-hidden">
        {/* 光斑背景效果 */}
        <div className="absolute inset-0 spotlight" style={{ '--x': '50%', '--y': '50%' } as React.CSSProperties} />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* 删除这个SectionTitle组件 */}
          {/* <SectionTitle 
            badge="home.testimonials.badge"
            title="home.testimonials.title"
            description="home.testimonials.description"
            badgeColor="secondary"
            titleGradient={true}
            className="mb-16"
          /> */}

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                {t('home.testimonials.title', '客户评价')}
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>
            </h2>
            <p className="text-adaptive-muted max-w-2xl mx-auto">
              {t('home.testimonials.description', 'Authentic reviews and feedback from our partners')}
            </p>
          </div>

          <div>
            <TestimonialsCarousel 
              testimonials={testimonialItems}
              autoplay={true}
              interval={7000}
            />
          </div>
        </div>
      </section>

      {/* 联系部分 - 置底CTA */}
      <section className="py-20 bg-base-100 relative">
        {/* 渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col items-center">
              <span className="badge badge-accent px-5 py-3 text-accent-content animate-pulse mb-4">{t('home.contact.badge')}</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                  {t('home.contact.title')}
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>
              </h2>
            </div>
            <p className="text-xl text-adaptive-muted mb-10 max-w-2xl mx-auto">
              {t('home.contact.description')}
            </p>
            <div className="inline-block">
              <Link 
                to="/contact" 
                className="btn btn-primary btn-lg px-10 py-3 text-lg shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 btn-lanxi relative overflow-hidden group"
              >
                {/* 按钮内部光效 */}
                <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                <span className="relative z-10">{t('home.contact.buttonText')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 