import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入通用翻译文件
import enCommon from './locales/common/en.json';
import zhCommon from './locales/common/zh.json';

// 导入各个页面的翻译文件
import enHome from './locales/pages/home/en.json';
import zhHome from './locales/pages/home/zh.json';
import enAbout from './locales/pages/about/en.json';
import zhAbout from './locales/pages/about/zh.json';
import enProjects from './locales/pages/projects/en.json';
import zhProjects from './locales/pages/projects/zh.json';
import enBlog from './locales/pages/blog/en.json';
import zhBlog from './locales/pages/blog/zh.json';
import enContact from './locales/pages/contact/en.json';
import zhContact from './locales/pages/contact/zh.json';

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
          home: enHome,
          about: enAbout,
          projects: enProjects,
          blog: enBlog,
          contact: enContact
        }
      },
      zh: {
        translation: {
          ...zhCommon,
          home: zhHome,
          about: zhAbout,
          projects: zhProjects,
          blog: zhBlog,
          contact: zhContact
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