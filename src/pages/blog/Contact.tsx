import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// 社交媒体链接
const socialLinks = [
  {
    name: "GitHub",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
      </svg>
    ),
    url: "https://github.com/laby",
    color: "bg-neutral text-neutral-content"
  },
  {
    name: "LinkedIn",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
      </svg>
    ),
    url: "https://linkedin.com/in/laby",
    color: "bg-primary text-primary-content"
  },
  {
    name: "Twitter",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
      </svg>
    ),
    url: "https://twitter.com/laby_dev",
    color: "bg-secondary text-secondary-content"
  },
  {
    name: "Instagram",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
      </svg>
    ),
    url: "https://instagram.com/laby.dev",
    color: "bg-accent text-accent-content"
  }
];

const Contact = () => {
  const { t } = useTranslation();

// 联系方式数据
const contactMethods = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
      title: t('blog.contact.info.email'),
    value: "contact@laby.dev",
      action: t('blog.contact.form.sendEmail'),
      url: "mailto:contact@laby.dev",
      color: "primary",
      bg: "bg-primary/10"
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
      title: t('blog.contact.info.social'),
    value: "@laby_dev",
      action: t('blog.contact.form.followMe'),
      url: "https://twitter.com/laby_dev",
      color: "secondary",
      bg: "bg-secondary/10"
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
      title: t('blog.contact.info.phone'),
    value: "+86 123 4567 8901",
      action: t('blog.contact.form.scheduleCall'),
      url: "tel:+8612345678901",
      color: "accent",
      bg: "bg-accent/10"
  }
];

// FAQ 数据
const faqs = [
  {
      question: t('blog.contact.faq.questions.0.q'),
      answer: t('blog.contact.faq.questions.0.a')
  },
  {
      question: t('blog.contact.faq.questions.1.q'),
      answer: t('blog.contact.faq.questions.1.a')
  },
  {
      question: t('blog.contact.faq.questions.2.q'),
      answer: t('blog.contact.faq.questions.2.a')
  },
  {
      question: t('blog.contact.faq.questions.3.q'),
      answer: t('blog.contact.faq.questions.3.a')
  },
  {
      question: t('blog.contact.faq.questions.4.q'),
      answer: t('blog.contact.faq.questions.4.a')
  }
];

  // 表单状态
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  // 视差滚动效果
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // 表单处理函数
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  // 表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 在实际应用中，这里会发送表单数据到后端或邮件服务
    setSubmitting(true);
    
    setTimeout(() => {
    console.log('表单数据:', formState);
      setSubmitting(false);
      setSubmitted(true);
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
      
      // 5秒后重置提交状态
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative">
      {/* 背景效果 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-base-300/50 via-base-100/30 to-base-200/50"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(var(--p), 0.1) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          ></div>
        </div>
        <div 
          className="absolute top-20 right-10 w-96 h-96 rounded-full bg-primary opacity-5 blur-[100px]"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
        <div 
          className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-secondary opacity-5 blur-[100px]"
          style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
        ></div>
      </div>

      <div className="relative z-10 py-16 px-4">
        {/* 页面标题 - 英雄区域 */}
        <section className="relative overflow-hidden rounded-box bg-gradient-to-r from-base-300/50 to-base-100/50 backdrop-blur-sm border border-base-300/50 py-16 mb-20 shadow-xl">
          {/* 动态背景效果 */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 z-0"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          />
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
                    {t('blog.contact.badge')}
                  </motion.span>
                </div>
                
                {/* 旋转装饰边框 */}
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
                {t('blog.contact.title')}
                  </span>
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>
              </motion.h1>
              </div>
              
              <motion.p 
                className="text-lg md:text-xl mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {t('blog.contact.subtitle')}
              </motion.p>

              {/* 社交媒体链接 */}
              <div className="flex justify-center gap-3 mb-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn-circle ${social.color}`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 260, damping: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
      </motion.div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-base-100 to-transparent"></div>
        </section>

      {/* 联系方式部分 */}
      <section className="container mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <motion.div 
              key={index}
              className="card bg-base-100 shadow-lg border border-base-content/10 overflow-hidden group hover:shadow-xl transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ 
                background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.05) 100%)",
                backdropFilter: "blur(10px)"
              }}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                borderColor: "rgba(var(--s), 0.2)"
              }}
            >
              <div className="card-body items-center text-center relative overflow-hidden">
                {/* 动态装饰背景 */}
                <motion.div 
                  className="absolute top-0 right-0 w-60 h-60 rounded-full bg-secondary/10 -translate-y-20 translate-x-20 blur-2xl"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="text-secondary mb-4 p-3 rounded-full bg-secondary/10 shadow-lg flex items-center justify-center flex-col"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, 5, -5, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    {method.icon}
                    <span className="text-xs mt-1 font-medium">{method.title}</span>
                  </motion.div>
                  
                  <p className="text-lg font-medium mb-4">{method.value}</p>
                  
                  <motion.a 
                    href={method.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary hover:shadow-lg hover:shadow-secondary/30 transition-shadow duration-300 relative overflow-hidden group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                    <span className="relative z-10">{method.action}</span>
                  </motion.a>
                </div>
                
                {/* 装饰边框 */}
                <div className="absolute top-0 right-0 w-1 h-0 bg-gradient-to-b from-secondary to-primary group-hover:h-full transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 联系表单和地图部分 */}
      <section className="container mx-auto mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* 联系表单 */}
          <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card bg-base-100/90 shadow-xl border border-base-content/10 overflow-hidden backdrop-blur-sm"
              style={{ 
                backfaceVisibility: "hidden", 
                WebkitFontSmoothing: "antialiased",
                transform: "translateZ(0)"
              }}
              whileHover={{ 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                borderColor: "rgba(var(--p), 0.2)"
              }}
            >
              {/* 装饰背景 */}
              <div className="absolute inset-0 overflow-hidden opacity-40">
                <motion.div 
                  className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              
              <div className="card-body relative z-10">
                <h2 className="text-3xl font-bold mb-6 relative inline-block">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                  {t('blog.contact.form.title')}
                  </span>
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondary to-primary"></div>
                </h2>
                {submitted ? (
                  <motion.div 
                    className="text-center py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-4 text-success">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{t('blog.contact.form.success.title')}</h3>
                    <p className="text-lg">{t('blog.contact.form.success.message')}</p>
                  </motion.div>
                ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                          <span className="label-text">{t('blog.contact.form.name')}</span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="input input-bordered" 
                          placeholder={t('blog.contact.form.namePlaceholder')}
                    required 
                          disabled={submitting}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                          <span className="label-text">{t('blog.contact.form.email')}</span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="input input-bordered" 
                    placeholder="your-email@example.com"
                    required 
                          disabled={submitting}
                  />
                </div>
              </div>
              
              <div className="form-control">
                <label className="label">
                        <span className="label-text">{t('blog.contact.form.subject')}</span>
                </label>
                <select 
                  className="select select-bordered w-full" 
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                        disabled={submitting}
                >
                        <option value="">{t('blog.contact.form.subjectPlaceholder')}</option>
                        <option value="project">{t('blog.contact.form.subjectOptions.project')}</option>
                        <option value="job">{t('blog.contact.form.subjectOptions.job')}</option>
                        <option value="consulting">{t('blog.contact.form.subjectOptions.consulting')}</option>
                        <option value="other">{t('blog.contact.form.subjectOptions.other')}</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                        <span className="label-text">{t('blog.contact.form.message')}</span>
                </label>
                <textarea 
                  className="textarea textarea-bordered h-32" 
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                        placeholder={t('blog.contact.form.messagePlaceholder')}
                  required
                        disabled={submitting}
                ></textarea>
              </div>
              
              <div className="form-control mt-6">
                      <button 
                        type="submit" 
                        className={`btn btn-primary ${submitting ? 'loading' : ''}`}
                        disabled={submitting}
                      >
                        {submitting ? t('blog.contact.form.sending') : t('blog.contact.form.submit')}
                      </button>
                    </div>
                  </form>
                )}
              </div>
          </motion.div>
          
          {/* 地图或位置信息 */}
          <motion.div
              initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
              <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden mb-8">
                <div className="card-body">
                  <h2 className="text-3xl font-bold mb-6 relative inline-block">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                    {t('blog.contact.location.title')}
                    </span>
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondary to-primary"></div>
                  </h2>

                  <div className="bg-base-200/50 rounded-box h-64 mb-6 relative overflow-hidden">
              {/* 这里可以替换为实际的地图组件 */}
                    <div className="absolute inset-0" style={{
                      backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/121.4737,31.2304,12,0/800x600?access_token=pk.placeholder')",
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}></div>
                    <div className="absolute inset-0 bg-base-200/30 backdrop-blur-sm"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, type: "spring" }}
                        className="relative"
                      >
                        <div className="absolute animate-ping w-12 h-12 rounded-full bg-secondary/30"></div>
                        <div className="relative w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-secondary-content">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                        </div>
                      </motion.div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-base-100/70 backdrop-blur-sm">
                      <h3 className="text-xl font-bold">{t('blog.contact.location.office')}</h3>
                      <p>{t('blog.contact.location.address')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-gradient-to-br from-accent/10 to-secondary/10 shadow-xl border border-base-200 overflow-hidden">
                <div className="card-body">
                  <h3 className="text-xl font-bold mb-2 relative inline-block">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                    {t('blog.contact.remote.title')}
                    </span>
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondary to-primary"></div>
                  </h3>
                  <p className="mb-4">
                    {t('blog.contact.remote.description')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div className="badge badge-outline">{t('blog.contact.remote.badges.meetings')}</div>
                    <div className="badge badge-outline">{t('blog.contact.remote.badges.flexible')}</div>
                    <div className="badge badge-outline">{t('blog.contact.remote.badges.global')}</div>
                    <div className="badge badge-outline">{t('blog.contact.remote.badges.realtime')}</div>
              </div>
            </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ部分 */}
        <motion.section 
          className="container mx-auto mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                {t('blog.contact.faq.title')}
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondary to-primary"></div>
            </h2>
            <p className="max-w-2xl mx-auto">{t('blog.contact.faq.description')}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 max-w-5xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
                className="collapse collapse-plus bg-base-100 shadow-md border border-base-200 rounded-box"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <input type="checkbox" /> 
              <div className="collapse-title text-xl font-medium">
                {faq.question}
              </div>
                <div className="collapse-content prose"> 
                <p>{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
        </motion.section>

      {/* 订阅部分 */}
        <motion.section 
          className="container mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="card bg-gradient-to-r from-primary/10 via-base-200/50 to-secondary/10 shadow-xl border border-base-200 backdrop-blur-sm overflow-hidden">
            <div className="card-body p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-6 lg:mb-0">
                  <h2 className="text-3xl font-bold mb-2 relative inline-block">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                      {t('blog.contact.subscribe.title')}
                    </span>
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondary to-primary"></div>
                  </h2>
                  <p>{t('blog.contact.subscribe.description')}</p>
            </div>
            <div className="lg:w-1/2">
              <div className="flex flex-col sm:flex-row gap-2">
                    <input type="email" placeholder={t('blog.contact.subscribe.placeholder')} className="input input-bordered flex-grow shadow-inner" />
                    <motion.button 
                      className="btn btn-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('blog.contact.subscribe.button')}
                    </motion.button>
                  </div>
                  <p className="text-sm mt-2 opacity-70">
                    {t('blog.contact.subscribe.privacy')}
                  </p>
                </div>
              </div>

              {/* 装饰元素 */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-secondary/10 blur-3xl"></div>
            </div>
          </div>
        </motion.section>
        </div>
    </div>
  );
};

export default Contact; 