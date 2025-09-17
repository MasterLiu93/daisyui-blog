import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getUserInfo, removeToken, removeUserInfo } from '../../api/system/auth';
import type { PermissionInfo } from '../../api/system/auth';
import PageTransition from './PageTransition';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
  children: ReactNode;
}

interface MenuItem {
  name: string;
  path: string;
  icon: string;
  children?: MenuItem[];
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<PermissionInfo | null>(null);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const [currentTheme, setCurrentTheme] = useState<string>('');
  const [searchValue, setSearchValue] = useState('');

  // 主题列表
  const themes = [
    "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", 
    "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", 
    "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", 
    "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"
  ];

  useEffect(() => {
    // Get user info from localStorage
    const user = getUserInfo();
    setUserInfo(user);

    // 获取保存的主题
    const savedTheme = localStorage.getItem('theme') || 'corporate';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setCurrentTheme(savedTheme);

    // 检测屏幕尺寸，在小屏幕上默认关闭侧边栏
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // 初始化时执行一次
    handleResize();

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 当路由变化时关闭移动端菜单
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const menuItems: MenuItem[] = [
    { 
      name: t('system.layout.dashboard'), 
      path: '/system/dashboard', 
      icon: 'i-tabler-dashboard' 
    },
    { 
      name: t('system.layout.systemManagement'),
      path: '/system/management',
      icon: 'i-tabler-settings-2',
      children: [
        { 
      name: t('system.layout.users'), 
      path: '/system/users', 
      icon: 'i-tabler-users' 
    },
    { 
      name: t('system.layout.roles'), 
      path: '/system/roles', 
      icon: 'i-tabler-shield' 
    },
    { 
      name: t('system.layout.departments'), 
      path: '/system/departments', 
      icon: 'i-tabler-building' 
    },
    { 
      name: t('system.layout.menus'), 
      path: '/system/menus', 
      icon: 'i-tabler-menu-2' 
    },
    { 
      name: t('system.layout.dictionaries'), 
      path: '/system/dictionaries', 
      icon: 'i-tabler-book' 
        }
      ]
    },
    { 
      name: t('system.layout.settings'), 
      path: '/system/settings', 
      icon: 'i-tabler-settings', 
      children: [
        { 
          name: t('system.layout.profile'), 
          path: '/system/profile', 
          icon: 'i-tabler-user' 
        }
      ] 
    }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // 如果是在移动端，同时关闭移动端菜单
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMenu = (path: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const handleLogout = () => {
    // In a real app, you would call the logout API
    // try {
    //   await authApi.logout();
    // } catch (error) {
    //   console.error('Logout failed:', error);
    // }

    // Remove token and user info
    removeToken();
    removeUserInfo();

    // Redirect to login page
    navigate('/system/login');
  };

  const isActive = (path: string) => {
    if (path === '/system/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // 设置主题
  const setTheme = (theme: string) => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    setCurrentTheme(theme);
  };

  // 获取用户角色
  const getUserRoles = () => {
    if (!userInfo) return [];
    return userInfo.roles || [];
  };

  // 获取用户显示名称
  const getUserDisplayName = () => {
    if (!userInfo) return '用户';
    return userInfo.user?.nickname || userInfo.user?.username || '用户';
  };

  // 获取用户头像
  const getUserAvatar = () => {
    return userInfo?.user?.avatar || '';
  };

  // 获取用户名首字母
  const getUserInitial = () => {
    if (!userInfo) return 'U';
    return userInfo.user?.nickname?.[0] || userInfo.user?.username?.[0] || 'U';
  };

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isMenuActive = isActive(item.path);
      const isExpanded = expandedMenus[item.path] || isMenuActive;
      
      return (
        <li key={item.path} className={`mb-1 w-full ${hasChildren ? 'menu-parent' : ''}`}>
          {hasChildren ? (
            <>
              <div 
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 w-full
                  ${isMenuActive ? 'bg-primary text-primary-content font-medium shadow-md' : 'hover:bg-base-200'}`}
                onClick={() => toggleMenu(item.path)}
              >
                <div className="flex items-center">
                  <span className={`${item.icon} w-5 h-5 mr-3`}></span>
                  {isSidebarOpen && <span>{item.name}</span>}
                </div>
                {isSidebarOpen && (
                  <span className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                )}
              </div>
              {isExpanded && isSidebarOpen && (
                <ul className="pl-4 mt-1 space-y-1 border-l-2 border-primary/20 ml-3 w-full">
                  {item.children?.map(child => (
                    <li key={child.path} className="w-full">
                      <Link 
                        to={child.path} 
                        className={`flex items-center p-2 rounded-lg transition-all duration-200 w-full
                          ${location.pathname === child.path 
                            ? 'bg-primary/10 text-primary font-medium' 
                            : 'hover:bg-base-200'}`}
                      >
                        <span className={`${child.icon} w-4 h-4 mr-2`}></span>
                        <span>{child.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <Link 
              to={item.path} 
              className={`flex items-center p-3 rounded-lg transition-all duration-200 w-full
                ${isMenuActive 
                  ? 'bg-primary text-primary-content font-medium shadow-md' 
                  : 'hover:bg-base-200'}`}
            >
              <span className={`${item.icon} w-5 h-5 mr-3`}></span>
              {isSidebarOpen && <span>{item.name}</span>}
            </Link>
          )}
        </li>
      );
    });
  };

  // 移动端菜单
  const renderMobileMenu = () => {
    return (
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed inset-y-0 left-0 w-64 bg-base-100 transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-4 border-b border-base-200">
            <div className="flex justify-between items-center">
              <Link to="/system/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-content font-bold text-lg">
                  L
                </div>
                <span className="text-lg font-semibold">
                  <span className="text-primary">Laby</span>
                  <span>System</span>
                </span>
              </Link>
              <button 
                className="btn btn-sm btn-ghost btn-circle" 
                onClick={toggleMobileMenu}
                aria-label="关闭菜单"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-base-content/50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder={t('system.layout.search')}
                  className="block w-full pl-10 pr-3 py-2 text-sm bg-base-200/50 border border-base-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              
              <ul className="menu menu-md space-y-1.5 text-base-content w-full">
                {renderMenuItems(menuItems)}
              </ul>
            </div>
          </div>
          
          <div className="p-4 border-t border-base-200 space-y-3">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-base-200/50">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full bg-primary/10">
                  {getUserAvatar() ? (
                    <img src={getUserAvatar()} alt="User Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-base font-bold text-primary">
                      {getUserInitial()}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <p className="font-medium line-clamp-1">{getUserDisplayName()}</p>
                <p className="text-xs text-base-content/70">{getUserRoles()[0] || '无角色'}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Link to="/system/profile" className="btn btn-sm btn-outline w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {t('system.layout.profile')}
              </Link>
              <button onClick={handleLogout} className="btn btn-sm btn-outline btn-error w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {t('system.layout.logout')}
              </button>
            </div>
            
            <div className="divider text-xs text-base-content/50 my-2">{t('system.layout.chooseTheme')}</div>
            
            <div className="grid grid-cols-3 gap-2">
              {['light', 'dark', 'corporate', 'emerald', 'synthwave', 'retro'].map(theme => (
                <button
                  key={theme}
                  className={`h-10 rounded-md flex flex-col items-center justify-center border transition-all hover:scale-105 ${currentTheme === theme ? 'border-primary shadow-md scale-105' : 'border-base-200'}`}
                  onClick={() => setTheme(theme)}
                  data-theme={theme}
                >
                  <div className="flex gap-1 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                  </div>
                  <span className="text-xs capitalize">{theme}</span>
                </button>
              ))}
            </div>
            
            <div className="divider text-xs text-base-content/50 my-2">{t('system.layout.languageSettings')}</div>
            
            <div className="flex items-center justify-center gap-2">
              <button
                className={`btn btn-sm ${i18n.language === 'zh' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => i18n.changeLanguage('zh')}
              >
                中文
              </button>
              <button
                className={`btn btn-sm ${i18n.language === 'en' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => i18n.changeLanguage('en')}
              >
                English
              </button>
            </div>
            
            <div className="divider text-xs text-base-content/50 my-2">博客导航</div>
            
            <div className="flex flex-col gap-2">
              <Link to="/" className={`btn btn-sm ${location.pathname === '/' ? 'btn-primary text-primary-content' : 'btn-outline'} w-full flex items-center justify-start gap-2`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {t('header.home')}
              </Link>
              <Link to="/about" className={`btn btn-sm ${location.pathname === '/about' ? 'btn-primary text-primary-content' : 'btn-outline'} w-full flex items-center justify-start gap-2`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {t('header.about')}
              </Link>
              <Link to="/projects" className={`btn btn-sm ${location.pathname === '/projects' ? 'btn-primary text-primary-content' : 'btn-outline'} w-full flex items-center justify-start gap-2`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                {t('header.projects')}
              </Link>
              <Link to="/blog" className={`btn btn-sm ${location.pathname === '/blog' ? 'btn-primary text-primary-content' : 'btn-outline'} w-full flex items-center justify-start gap-2`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                {t('header.blog')}
              </Link>
              <Link to="/contact" className={`btn btn-sm ${location.pathname === '/contact' ? 'btn-primary text-primary-content' : 'btn-outline'} w-full flex items-center justify-start gap-2`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t('header.contact')}
              </Link>
              <Link to="/system/dashboard" className="btn btn-sm btn-accent text-accent-content w-full flex items-center justify-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                System
              </Link>
            </div>
            
            <div className="text-center text-xs text-base-content/50 pt-2">
              <p>{t('system.layout.version')} v1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-base-100">
      {/* 侧边栏 - 桌面版 */}
      <aside 
        className={`fixed inset-y-0 left-0 z-20 flex flex-col transition-all duration-300 ease-in-out transform bg-base-200 border-r border-base-300 shadow-lg lg:shadow-none lg:translate-x-0 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* 侧边栏头部 */}
        <div className={`flex items-center h-16 px-4 border-b border-base-300 ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
          {isSidebarOpen ? (
            <Link to="/system/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-content font-bold text-lg">
                L
              </div>
              <span className="text-lg font-semibold">
                <span className="text-primary">Laby</span>
                <span>System</span>
              </span>
            </Link>
          ) : (
            <Link to="/system/dashboard" className="flex items-center justify-center">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-content font-bold text-xl">
                L
              </div>
            </Link>
          )}
          
          {isSidebarOpen && (
            <button 
              className="p-1.5 rounded-md hover:bg-base-300"
              onClick={toggleSidebar}
              aria-label="收起侧边栏"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          )}
        </div>
        
        {/* 侧边栏菜单 */}
        <div className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1.5">
            {menuItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isMenuActive = isActive(item.path);
              const isExpanded = expandedMenus[item.path] || isMenuActive;
              
              return (
                <li key={item.path} className="w-full">
                  {hasChildren ? (
                    <div className="w-full">
                      <button
                        onClick={() => toggleMenu(item.path)}
                        className={`flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isMenuActive 
                            ? 'bg-primary text-primary-content font-medium' 
                            : 'hover:bg-base-300 text-base-content'
                        } ${!isSidebarOpen && 'justify-center'}`}
                      >
                        <span className={`${item.icon} w-5 h-5 ${isSidebarOpen && 'mr-3'}`}></span>
                        {isSidebarOpen && (
                          <>
                            <span className="flex-1 text-left">{item.name}</span>
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </>
                        )}
                      </button>
                      
                      {isExpanded && isSidebarOpen && (
                        <ul className="pl-4 mt-1 space-y-1 border-l-2 border-primary/20 ml-3">
                          {item.children?.map(child => (
                            <li key={child.path} className="w-full">
                              <Link 
                                to={child.path} 
                                className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                                  location.pathname === child.path 
                                    ? 'bg-primary/10 text-primary font-medium' 
                                    : 'hover:bg-base-300 text-base-content'
                                }`}
                              >
                                <span className={`${child.icon} w-4 h-4 mr-2`}></span>
                                <span>{child.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link 
                      to={item.path} 
                      className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${
                        isMenuActive 
                          ? 'bg-primary text-primary-content font-medium' 
                          : 'hover:bg-base-300 text-base-content'
                      } ${!isSidebarOpen && 'justify-center'}`}
                    >
                      <span className={`${item.icon} w-5 h-5 ${isSidebarOpen && 'mr-3'}`}></span>
                      {isSidebarOpen && <span>{item.name}</span>}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        
        {/* 侧边栏底部 */}
        <div className="p-4 border-t border-base-300">
          {isSidebarOpen ? (
            <div className="flex items-center justify-between">
              <div className="text-xs text-base-content/70">
                <p>Laby System</p>
                <p>v1.0.0</p>
              </div>
              <button 
                className="p-1.5 rounded-md hover:bg-base-300"
                onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
              >
                {currentTheme === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button 
                className="p-1.5 rounded-md hover:bg-base-300"
                onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
              >
                {currentTheme === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* 主内容区域 */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* 顶部导航栏 */}
        <header className="z-30 flex items-center justify-between h-16 px-4 py-2 bg-base-100 border-b border-base-200 shadow-sm">
          {/* 左侧 - 移动端菜单按钮和面包屑 */}
          <div className="flex items-center space-x-3">
            {/* 移动端菜单按钮 */}
            <button 
              className="p-2 rounded-md lg:hidden hover:bg-base-200"
              onClick={toggleMobileMenu}
              aria-label="打开菜单"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* 桌面端侧边栏切换按钮 */}
            <button 
              className="hidden p-2 rounded-md lg:block hover:bg-base-200"
              onClick={toggleSidebar}
              aria-label={isSidebarOpen ? "收起侧边栏" : "展开侧边栏"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isSidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* 中间 - 导航链接 */}
          <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            <Link to="/" className={`btn btn-sm btn-ghost ${location.pathname === '/' ? 'text-primary' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {t('header.home')}
            </Link>
            <Link to="/about" className={`btn btn-sm btn-ghost ${location.pathname === '/about' ? 'text-primary' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {t('header.about')}
            </Link>
            <Link to="/projects" className={`btn btn-sm btn-ghost ${location.pathname === '/projects' ? 'text-primary' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {t('header.projects')}
            </Link>
            <Link to="/blog" className={`btn btn-sm btn-ghost ${location.pathname === '/blog' ? 'text-primary' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              {t('header.blog')}
            </Link>
            <Link to="/contact" className={`btn btn-sm btn-ghost ${location.pathname === '/contact' ? 'text-primary' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t('header.contact')}
            </Link>
            <Link to="/system/dashboard" className="btn btn-sm text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              System
            </Link>
          </div>
          
          {/* 右侧 - 搜索、通知和用户菜单 */}
          <div className="flex items-center space-x-2">
            {/* 搜索框 */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-base-content/50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder={t('system.layout.searchPlaceholder')}
                className="w-40 py-1.5 pl-10 pr-3 text-sm bg-base-200/50 border border-base-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary lg:w-48"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            
            {/* 主题切换 */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-sm btn-ghost text-base-content">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                </svg>
                <span className="ml-1 text-adaptive">{t('header.chooseTheme')}</span>
              </div>
              <div tabIndex={0} className="dropdown-content p-4 shadow-lg bg-base-100 rounded-box w-80 z-[1] max-h-96 overflow-y-auto">
                <h3 className="text-center font-bold mb-3 pb-2 border-b border-base-300">{t('header.chooseTheme')}</h3>
                <div className="grid grid-cols-3 gap-3">
                  {themes.map((theme) => (
                    <button
                      key={theme}
                      className={`relative overflow-hidden h-24 rounded-lg flex flex-col items-center justify-center border-2 transition-all hover:scale-105 hover:shadow-md ${currentTheme === theme ? 'border-primary shadow-md scale-105' : 'border-base-300'}`}
                      onClick={() => setTheme(theme)}
                      data-theme={theme}
                    >
                      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-base-100 to-base-300"></div>
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="flex gap-1 mb-1">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                          <div className="w-3 h-3 rounded-full bg-secondary"></div>
                          <div className="w-3 h-3 rounded-full bg-accent"></div>
                        </div>
                        <div className="flex gap-1 mb-2">
                          <div className="w-3 h-3 rounded-full bg-neutral"></div>
                          <div className="w-3 h-3 rounded-full bg-base-content opacity-70"></div>
                        </div>
                        <span className="text-xs font-medium capitalize bg-base-100 px-2 py-1 rounded-full">{theme}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 国际化语言切换 */}
            <LanguageSwitcher />
            
            {/* 通知 */}
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>
              <div tabIndex={0} className="dropdown-content z-[1] mt-1 w-80 max-h-[70vh] overflow-y-auto shadow-xl bg-base-100 rounded-lg">
                <div className="p-3 border-b border-base-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{t('system.layout.notifications')}</h3>
                    <button className="text-xs text-primary hover:underline">{t('system.layout.markAllRead')}</button>
                  </div>
                </div>
                <div className="divide-y divide-base-200">
                  <div className="p-3 hover:bg-base-200 cursor-pointer">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">系统更新通知</p>
                        <p className="text-xs text-base-content/70">系统将于今晚22:00进行例行维护</p>
                        <p className="mt-1 text-xs text-base-content/50">10分钟前</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-base-200 cursor-pointer">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">操作成功</p>
                        <p className="text-xs text-base-content/70">您的账户信息已更新</p>
                        <p className="mt-1 text-xs text-base-content/50">30分钟前</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2 text-center border-t border-base-200">
                  <button className="text-xs text-primary hover:underline">{t('system.layout.viewAll')}</button>
                </div>
              </div>
            </div>
            
            {/* 用户菜单 */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="flex items-center space-x-2 cursor-pointer">
                <div className="avatar">
                  <div className="w-9 h-9 rounded-full ring-1 ring-primary/30 ring-offset-base-100 ring-offset-1">
                    {getUserAvatar() ? (
                      <img src={getUserAvatar()} alt="User Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-base font-medium bg-primary/10 text-primary">
                        {getUserInitial()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium line-clamp-1">{getUserDisplayName()}</p>
                  <p className="text-xs text-base-content/70 line-clamp-1">{getUserRoles()[0] || '无角色'}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu shadow-xl bg-base-100 rounded-lg w-60 mt-1">
                <div className="p-3 border-b border-base-200">
                  <p className="font-medium">{getUserDisplayName()}</p>
                  <p className="mt-1 text-xs text-base-content/70">{userInfo?.user?.username || ''}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {getUserRoles().map((role, index) => (
                      <span key={index} className="badge badge-sm badge-primary">{role}</span>
                    ))}
                    {(!getUserRoles() || getUserRoles().length === 0) && (
                      <span className="badge badge-sm">无角色</span>
                    )}
                  </div>
                </div>
                <li>
                  <Link to="/system/profile" className="flex gap-2 p-2.5 hover:bg-base-200 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{t('system.layout.profile')}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/system/settings" className="flex gap-2 p-2.5 hover:bg-base-200 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{t('system.layout.systemSettings')}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="flex gap-2 p-2.5 hover:bg-base-200 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>{t('system.layout.backToBlog')}</span>
                  </Link>
                </li>
                <div className="border-t border-base-200 mt-1 pt-1">
                  <li>
                    <button onClick={handleLogout} className="flex gap-2 p-2.5 text-error hover:bg-error/10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>{t('system.layout.logout')}</span>
                    </button>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </header>
        
        {/* 主要内容 */}
        <main className="flex-1 p-0 overflow-x-hidden overflow-y-auto bg-base-100">
          <div className="container p-4 mx-auto md:p-6">
            <div className="max-w-[1600px] mx-auto">
              <PageTransition>
                {children}
              </PageTransition>
            </div>
          </div>
        </main>
      </div>
      
      {/* 移动端菜单遮罩 */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </div>
  );
};

export default Layout; 