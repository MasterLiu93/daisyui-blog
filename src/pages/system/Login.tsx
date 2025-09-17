import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi, setToken, setUserInfo } from '../../api/system/auth';
import { handleApiError } from '../../api/system/request';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Login = () => {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentTheme, setCurrentTheme] = useState<string>('');
  
  const navigate = useNavigate();

  // 主题列表
  const themes = [
    "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", 
    "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", 
    "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", 
    "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"
  ];

  // 初始化和设置主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'corporate';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setCurrentTheme(savedTheme);
  }, []);

  // 设置主题
  const setTheme = (theme: string) => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    setCurrentTheme(theme);
  };

  // 切换语言
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError(username ? t('system.login.errors.passwordRequired') : t('system.login.errors.usernameRequired'));
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Call the login API
      const result = await authApi.login({ username, password });
      
      // Store token and user info
      setToken(result);
      
      // Get user info
      const userInfo = await authApi.getUserInfo();
      setUserInfo(userInfo);
      
      // If remember me is checked, store in session storage
      if (rememberMe) {
        sessionStorage.setItem('rememberMe', 'true');
      }
      
      // Redirect to dashboard
      navigate('/system/dashboard');
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  // 粒子动画效果
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 10 + 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10
  }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-base-300 via-base-200 to-base-300 relative overflow-hidden">
      {/* 粒子动画背景 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary opacity-20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50
              ],
              y: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50
              ],
              scale: [0.8, 1.2, 0.9, 1.1, 1],
              opacity: [0.1, 0.3, 0.2, 0.3, 0.1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      {/* 装饰图形 */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-secondary/20 to-transparent rounded-tr-full z-0"></div>

      {/* 主题切换和语言切换按钮 */}
      <div className="fixed top-4 right-4 flex gap-2 z-10">
        {/* 主题切换 */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-sm btn-ghost text-base-content bg-base-100/70 backdrop-blur-md hover:bg-base-100/90 transition-all duration-300 shadow-md hover:shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
            </svg>
            <span className="ml-1 text-adaptive">{t('system.login.chooseTheme', { ns: 'common' })}</span>
          </div>
          <div tabIndex={0} className="dropdown-content p-4 shadow-lg bg-base-100 rounded-box w-80 z-[20] max-h-96 overflow-y-auto">
            <h3 className="text-center font-bold mb-3 pb-2 border-b border-base-300">{t('system.login.chooseTheme', { ns: 'common' })}</h3>
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

        {/* 语言切换 */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-sm btn-ghost text-base-content bg-base-100/70 backdrop-blur-md hover:bg-base-100/90 transition-all duration-300 shadow-md hover:shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
            </svg>
            <span className="ml-1 text-adaptive">{i18n.language === 'zh' ? '中文' : 'English'}</span>
          </div>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 z-[20]">
            <li>
              <button 
                className={`text-base-content ${i18n.language === 'zh' ? 'active' : ''}`} 
                onClick={() => changeLanguage('zh')}
              >
                中文
              </button>
            </li>
            <li>
              <button 
                className={`text-base-content ${i18n.language === 'en' ? 'active' : ''}`} 
                onClick={() => changeLanguage('en')}
              >
                English
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* 返回博客按钮 */}
      <div className="fixed top-4 left-4 z-10">
        <Link to="/" className="btn btn-sm btn-ghost text-base-content bg-base-100/70 backdrop-blur-md hover:bg-base-100/90 transition-all duration-300 shadow-md hover:shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="ml-1 hidden md:inline">{t('system.login.backToBlog', { ns: 'common' })}</span>
        </Link>
      </div>

      {/* 登录卡片 */}
      <div className="container mx-auto px-4 z-5 relative">
        <div className="flex flex-col md:flex-row max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
          {/* 左侧图片区域 */}
          <motion.div 
            className="w-full md:w-1/2 bg-gradient-to-br from-primary to-secondary p-12 text-primary-content flex flex-col justify-center items-center hidden md:flex"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm mx-auto mb-6 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </motion.div>
              <motion.h1 
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Laby System
              </motion.h1>
              <motion.p 
                className="text-lg opacity-80 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {t('system.login.welcome')}
              </motion.p>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-white/60"></div>
                  <div className="w-3 h-3 rounded-full bg-white/80"></div>
                  <div className="w-2 h-2 rounded-full bg-white/60"></div>
                </div>
                <p className="text-sm opacity-70 max-w-xs mx-auto">
                  {t('system.login.securityMessage', { defaultValue: "Secure management system for your business" })}
                </p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* 右侧登录表单 */}
          <motion.div 
            className="w-full md:w-1/2 bg-base-100 p-8 md:p-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="max-w-md mx-auto">
              <div className="text-center md:text-left mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  <span className="text-primary">Laby</span>System
                </h2>
                <p className="text-base-content/70">{t('system.login.title')}</p>
              </div>
              
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="alert alert-error mb-6 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </motion.div>
              )}
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">{t('system.login.username')}</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-content/50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <input 
                      type="text" 
                      placeholder={t('system.login.username')} 
                      className="input input-bordered w-full pl-10 bg-base-200/50 focus:bg-base-100 transition-colors duration-300" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={loading}
                      autoFocus
                    />
                  </div>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">{t('system.login.password')}</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-content/50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input 
                      type="password" 
                      placeholder={t('system.login.password')} 
                      className="input input-bordered w-full pl-10 bg-base-200/50 focus:bg-base-100 transition-colors duration-300" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="label cursor-pointer inline-flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="checkbox checkbox-sm checkbox-primary" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={loading}
                    />
                    <span className="label-text">{t('system.login.rememberMe')}</span>
                  </label>
                  <a href="#" className="text-sm link link-hover text-primary">{t('system.login.forgotPassword')}</a>
                </div>
                
                <div className="form-control mt-8">
                  <button 
                    type="submit" 
                    className="btn btn-primary w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        {t('system.login.loggingIn')}
                      </>
                    ) : t('system.login.login')}
                  </button>
                </div>
              </form>
              
              <div className="divider my-8">{t('system.login.or', { ns: 'common' })}</div>
              
              <div className="text-center space-y-4">
                <Link to="/system/register" className="btn btn-outline btn-primary w-full">
                  {t('system.login.register')}
                </Link>
                
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <button className="btn btn-circle btn-sm btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                  </button>
                  <button className="btn btn-circle btn-sm btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
                  </button>
                  <button className="btn btn-circle btn-sm btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                  </button>
                </div>
                
                <p className="text-sm text-base-content/70 mt-6">
                  {t('system.login.termsNotice', { ns: 'common', defaultValue: "By continuing, you agree to our" })} 
                  <a href="#" className="link link-primary ml-1">{t('system.login.termsOfService', { ns: 'common' })}</a> {t('system.login.and', { ns: 'common' })} 
                  <a href="#" className="link link-primary">{t('system.login.privacyPolicy', { ns: 'common' })}</a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login; 