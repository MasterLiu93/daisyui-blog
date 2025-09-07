import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Footer from './Footer';
import LanguageSwitcher from './LanguageSwitcher';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [currentTheme, setCurrentTheme] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // 主题列表
  const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", 
  "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", 
  "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", 
  "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"
];

  // 初始化和设置主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setCurrentTheme(savedTheme);

    // 监听滚动事件，当页面向下滚动超过300px时显示返回顶部按钮
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // 设置主题
  const setTheme = (theme: string) => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    setCurrentTheme(theme);
  };

  // 滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 导航栏 */}
      <header className="bg-base-100 shadow-md sticky top-0 z-50">
        <div className="navbar container mx-auto">
            <div className="navbar-start">
              <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${menuOpen ? 'block' : 'hidden'}`} onClick={() => setMenuOpen(false)}>
                <li onClick={(e) => e.stopPropagation()}><Link to="/" className={location.pathname === '/' ? 'active' : ''}>{t('header.home')}</Link></li>
                <li onClick={(e) => e.stopPropagation()}><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>{t('header.about')}</Link></li>
                <li onClick={(e) => e.stopPropagation()}><Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>{t('header.projects')}</Link></li>
                <li onClick={(e) => e.stopPropagation()}><Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>{t('header.blog')}</Link></li>
                <li onClick={(e) => e.stopPropagation()}><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>{t('header.contact')}</Link></li>
              </ul>
            </div>
            <Link to="/" className="flex items-center">
              <img src="/images/user/logo.jpg" alt="Laby Logo" className="h-10 w-10 mr-2" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Laby Blog</span>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li onClick={(e) => e.stopPropagation()}>
                <Link to="/" className={`flex items-center gap-1 ${location.pathname === '/' ? 'text-primary' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {t('header.home')}
                </Link>
              </li>
              <li onClick={(e) => e.stopPropagation()}>
                <Link to="/about" className={`flex items-center gap-1 ${location.pathname === '/about' ? 'text-primary' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {t('header.about')}
                </Link>
              </li>
              <li onClick={(e) => e.stopPropagation()}>
                <Link to="/projects" className={`flex items-center gap-1 ${location.pathname === '/projects' ? 'text-primary' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  {t('header.projects')}
                </Link>
              </li>
              <li onClick={(e) => e.stopPropagation()}>
                <Link to="/blog" className={`flex items-center gap-1 ${location.pathname === '/blog' ? 'text-primary' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  {t('header.blog')}
                </Link>
              </li>
              <li onClick={(e) => e.stopPropagation()}>
                <Link to="/contact" className={`flex items-center gap-1 ${location.pathname === '/contact' ? 'text-primary' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {t('header.contact')}
                </Link>
              </li>
            </ul>

              </div>
          <div className="navbar-end flex items-center gap-2">
            <LanguageSwitcher />
            
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-sm btn-ghost text-base-content">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                </svg>
                <span className="ml-1 text-adaptive">{t('header.chooseTheme')}</span>
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 z-[1] max-h-96 overflow-y-auto">
                {themes.map((theme) => (
                  <li key={theme}>
                    <a
                      className={`text-base-content ${currentTheme === theme ? "active" : ""}`}
                      onClick={() => setTheme(theme)}
                    >
                      <span className="capitalize">{theme}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* 导航栏末尾按钮 */}
            
            <Link to="/contact" className="btn btn-primary btn-sm hidden md:flex text-primary-content hover:brightness-110 hover:shadow-md">
              {t('common.contactMe')}
            </Link>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="flex-1">
            {children}
      </main>

      {/* 页脚 */}
      <Footer />
      
      {/* 返回顶部按钮 */}
      {showScrollTop && (
        <motion.button 
          className="fixed bottom-6 right-6 btn btn-circle btn-primary"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                        </svg>
        </motion.button>
          )}
    </div>
  );
};

export default Layout; 