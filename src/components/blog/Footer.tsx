import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-base-200 text-base-content relative mt-16">
      <div className="divider before:bg-base-content/5 after:bg-base-content/5 mb-0"></div>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
          {/* 关于我 */}
          <div className="md:col-span-1 flex justify-center md:justify-start">
            <div className="flex items-start gap-4 max-w-xs">
              <div className="avatar">
                <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="/images/user/header.jpg" alt="Laby Avatar" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Laby</h3>
                <p className="text-sm text-base-content/70">
                  {t('footer.aboutText')}
                </p>
              </div>
            </div>
          </div>
          
          {/* 快速链接 */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h3 className="footer-title text-lg mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary transition-colors">{t('header.home')}</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">{t('header.about')}</Link></li>
              <li><Link to="/projects" className="hover:text-primary transition-colors">{t('header.projects')}</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">{t('header.blog')}</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">{t('header.contact')}</Link></li>
            </ul>
          </div>
          
          {/* 联系方式 */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h3 className="footer-title text-lg mb-4">{t('footer.contactInfo')}</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>hello@example.com</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+1 (234) 567 890</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Street, City, Country</span>
              </li>
            </ul>
          </div>
          
          {/* 订阅 */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h3 className="footer-title text-lg mb-4">{t('footer.subscribe')}</h3>
            <div className="form-control w-full max-w-xs">
              <div className="relative w-full">
                <input type="email" placeholder={t('blog.contact.subscribe.placeholder')} className="input input-bordered w-full pr-16" />
                <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">{t('footer.subscribeBtn')}</button>
              </div>
              <p className="text-sm mt-2 text-base-content/70">
                {t('blog.contact.subscribe.privacy')}
              </p>
            </div>
            
            {/* 社交媒体链接 */}
            <div className="mt-4">
              <div className="flex gap-3">
                <a href="#" className="btn btn-circle btn-sm btn-ghost hover:bg-base-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </a>
                <a href="#" className="btn btn-circle btn-sm btn-ghost hover:bg-base-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
                <a href="#" className="btn btn-circle btn-sm btn-ghost hover:bg-base-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* 微信二维码 */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h3 className="footer-title text-lg mb-4">{t('footer.wechat')}</h3>
            <div className="card bg-base-100 shadow-md">
              <div className="card-body items-center p-4">
                <img src="/images/user/WeChat.png" alt="WeChat QR Code" className="w-32 h-32 object-cover" />
                <p className="text-sm text-center mt-2">{t('footer.scanCode')}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 版权信息 */}
        <div className="mt-10 pt-6 border-t border-base-content/10 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} {t('footer.copyright')}
            </div>
            <div className="flex gap-4 text-sm">
              <Link to="/privacy" className="hover:text-primary transition-colors">{t('footer.policy')}</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">{t('footer.terms')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 