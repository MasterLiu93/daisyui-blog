import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入通用翻译文件
import enCommon from './locales/common/en.json';
import zhCommon from './locales/common/zh.json';

// 导入blog页面的翻译文件
import enBlogHome from './locales/pages/blog/home/en.json';
import zhBlogHome from './locales/pages/blog/home/zh.json';
import enBlogAbout from './locales/pages/blog/about/en.json';
import zhBlogAbout from './locales/pages/blog/about/zh.json';
import enBlogProjects from './locales/pages/blog/projects/en.json';
import zhBlogProjects from './locales/pages/blog/projects/zh.json';
import enBlogBlog from './locales/pages/blog/blog/en.json';
import zhBlogBlog from './locales/pages/blog/blog/zh.json';
import enBlogContact from './locales/pages/blog/contact/en.json';
import zhBlogContact from './locales/pages/blog/contact/zh.json';

// 导入system页面的翻译文件
import enSystemDashboard from './locales/pages/system/dashboard/en.json';
import zhSystemDashboard from './locales/pages/system/dashboard/zh.json';
import enSystemUsers from './locales/pages/system/users/en.json';
import zhSystemUsers from './locales/pages/system/users/zh.json';
import enSystemRoles from './locales/pages/system/roles/en.json';
import zhSystemRoles from './locales/pages/system/roles/zh.json';
import enSystemDept from './locales/pages/system/dept/en.json';
import zhSystemDept from './locales/pages/system/dept/zh.json';
import enSystemMenu from './locales/pages/system/menu/en.json';
import zhSystemMenu from './locales/pages/system/menu/zh.json';
import enSystemDict from './locales/pages/system/dict/en.json';
import zhSystemDict from './locales/pages/system/dict/zh.json';
import enSystemLogin from './locales/pages/system/login/en.json';
import zhSystemLogin from './locales/pages/system/login/zh.json';
import enSystemRegister from './locales/pages/system/register/en.json';
import zhSystemRegister from './locales/pages/system/register/zh.json';
import enSystemCommon from './locales/pages/system/common/en.json';
import zhSystemCommon from './locales/pages/system/common/zh.json';

// 初始化i18next
i18n
  // 使用语言检测器
  .use(LanguageDetector)
  // 将i18next传递给react-i18next
  .use(initReactI18next)
  // 初始化i18next
  .init({
    resources: {
      en: {
        translation: {
          ...enCommon,
          // Blog namespace
          blog: {
            home: enBlogHome,
            about: enBlogAbout,
            projects: enBlogProjects,
            blog: enBlogBlog,
            contact: enBlogContact
          },
          // System namespace
          system: {
            common: enSystemCommon,
            dashboard: enSystemDashboard,
            users: enSystemUsers,
            roles: enSystemRoles,
            dept: enSystemDept,
            menu: enSystemMenu,
            dict: enSystemDict,
            login: enSystemLogin,
            register: enSystemRegister
          }
        }
      },
      zh: {
        translation: {
          ...zhCommon,
          // Blog namespace
          blog: {
            home: zhBlogHome,
            about: zhBlogAbout,
            projects: zhBlogProjects,
            blog: zhBlogBlog,
            contact: zhBlogContact
          },
          // System namespace
          system: {
            common: zhSystemCommon,
            dashboard: zhSystemDashboard,
            users: zhSystemUsers,
            roles: zhSystemRoles,
            dept: zhSystemDept,
            menu: zhSystemMenu,
            dict: zhSystemDict,
            login: zhSystemLogin,
            register: zhSystemRegister
          }
        }
      }
    },
    fallbackLng: 'zh', // 默认语言
    debug: import.meta.env.DEV, // 在开发模式下启用调试
    
    interpolation: {
      escapeValue: false, // 不转义React中的值
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n; 