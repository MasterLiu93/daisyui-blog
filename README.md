# Laby Blog

一个现代化、响应式的个人博客和作品集网站，使用React、TypeScript和Tailwind CSS构建。支持中英文切换，具有丰富的动画效果和主题定制功能。

[English](README-EN.md) | 中文

## ✨ 功能特点

- 🌓 浅色/深色模式切换与多种预设主题（28种主题）
- 🌍 完整的多语言支持 (中文、英文)，按页面模块化组织翻译文件
- 📱 全响应式设计，适配各种屏幕尺寸（移动设备、平板、桌面）
- ✨ 高级动画和交互效果（滚动动画、悬停效果、页面转场）
- 🎨 基于DaisyUI的可自定义主题颜色系统
- 📝 完整的博客系统（文章列表、分类、标签、搜索）
- 🖼️ 项目作品集展示（筛选、详情模态框）
- 📊 数据可视化与技能展示组件
- 📞 功能完整的联系表单
- 🔍 全站内容搜索功能
- 🧩 严格的模块化组件设计
- 🌐 粒子动画背景和3D技术栈展示

## 🛠️ 详细技术栈

### 核心技术
- **React 18.2.0**: 用于构建用户界面的JavaScript库
- **TypeScript 5.2.2**: 添加静态类型检查的JavaScript超集
- **Vite 7.1.4**: 现代前端构建工具，提供极速的开发服务器和优化的构建
- **Node.js 20+**: 运行环境

### 样式与UI
- **Tailwind CSS 3.4.1**: 实用程序优先的CSS框架
- **DaisyUI 5.1.7**: 基于Tailwind的组件库，提供28种可定制主题
- **PostCSS 8.4.36**: CSS转换工具
- **Autoprefixer 10.4.17**: 自动添加CSS前缀

### 路由与状态管理
- **React Router 6.22.3**: 声明式路由管理
- **React Hooks**: 状态管理与生命周期控制
  - useState: 组件状态管理
  - useEffect: 副作用处理
  - useRef: DOM引用与值持久化
  - useMemo: 计算结果缓存优化
  - useCallback: 函数引用优化

### 动画与交互
- **Framer Motion 11.0.8**: 用于React的动画库
  - 页面过渡动画
  - 滚动触发动画
  - 手势响应
  - 高级路径动画

### 国际化
- **react-i18next 14.1.0**: React国际化库
- **i18next 23.10.1**: 底层国际化框架
- **i18next-browser-languagedetector 7.2.0**: 浏览器语言检测

### 开发工具
- **ESLint 9.0.0**: 代码质量检查
- **TypeScript ESLint 7.4.0**: TypeScript代码规范检查
- **Vite Plugin React 3.3.1**: React集成优化

### 特殊功能实现
- **Canvas API**: 用于粒子背景效果
- **Intersection Observer API**: 实现滚动触发动画
- **Web Animations API**: 增强动画性能

## 📦 安装

1. 克隆仓库

```bash
git clone https://github.com/MasterLiu93/daisyui-blog.git
cd laby-blog
```

2. 安装依赖

```bash
npm install
```

3. 启动开发服务器

```bash
npm run dev
```

4. 构建生产版本

```bash
npm run build
```

## 🚀 使用方法

### 项目结构

```
laby-blog/
  |- public/              # 静态资源
  |   |- images/          # 图片资源
  |     |- blog/          # 博客图片
  |     |- projects/      # 项目图片
  |     |- user/          # 用户相关图片
  |- src/
      |- components/      # 可复用组件
      |   |- CounterSection.tsx      # 数字计数器组件
      |   |- Footer.tsx             # 页脚组件
      |   |- Hero.tsx               # 英雄区组件
      |   |- LanguageSwitcher.tsx   # 语言切换器
      |   |- Layout.tsx             # 布局组件
      |   |- ParticleBackground.tsx # 粒子背景
      |   |- SectionTitle.tsx       # 章节标题组件
      |   |- SkillsShowcase.tsx     # 技能展示组件
      |   |- TechStackGlobe.tsx     # 技术栈3D地球组件
      |   |- TestimonialsCarousel.tsx # 评价轮播组件
      |- pages/           # 页面组件
      |   |- Home.tsx     # 首页
      |   |- About.tsx    # 关于页
      |   |- Projects.tsx # 项目页
      |   |- Blog.tsx     # 博客页
      |   |- Contact.tsx  # 联系页
      |- i18n/            # 国际化文件
      |   |- locales/     # 翻译文件
      |       |- common/  # 通用翻译
      |       |- pages/   # 页面特定翻译
      |         |- home/       # 首页翻译
      |         |- about/      # 关于页翻译
      |         |- projects/   # 项目页翻译
      |         |- blog/       # 博客页翻译
      |         |- contact/    # 联系页翻译
      |- assets/          # 其他资源
      |- App.tsx          # 应用根组件
      |- main.tsx         # 入口文件
```

### 功能模块详解

#### 1. 主题系统
使用DaisyUI提供的主题机制，支持28种预设主题和自定义主题。主题切换通过localStorage持久化存储用户偏好。

```typescript
// 主题切换示例代码
const setTheme = (theme: string) => {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
};
```

#### 2. 国际化系统
基于react-i18next构建的多语言系统，采用模块化组织方式：

```
i18n/
  |- index.ts            # 配置和初始化
  |- locales/            # 翻译文件
      |- common/         # 通用翻译
        |- en.json       # 英文通用
        |- zh.json       # 中文通用
      |- pages/          # 页面特定翻译
        |- home/         # 首页翻译
          |- en.json     # 英文
          |- zh.json     # 中文
        |- about/        # 以此类推...
```

#### 3. 动画系统
使用Framer Motion和CSS实现多种动画效果：
- 滚动触发动画
- 悬停交互效果
- 页面转场动画
- 粒子背景效果
- 3D技术栈展示

#### 4. 响应式布局
使用Tailwind的响应式类确保在所有设备上良好显示：
- 移动优先设计
- 断点系统 (sm, md, lg, xl, 2xl)
- 栅格布局和弹性盒模型

### 自定义内容

1. **个人信息**: 修改 `src/i18n/locales/` 目录下的翻译文件以更新个人信息。

2. **项目和博客**: 在 `src/i18n/locales/pages/projects/` 和 `src/i18n/locales/pages/blog/` 中更新项目和博客内容。

3. **图片**: 在 `public/images/` 目录中替换图片资源。

4. **主题颜色**: 修改 DaisyUI 主题配置以自定义颜色方案。

### 国际化详解

本项目使用 react-i18next 进行国际化管理，采用模块化组织方式：

```typescript
// i18n配置示例
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
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
    fallbackLng: 'zh',
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });
```

要添加新语言，请复制现有翻译文件并进行翻译，然后在 `src/i18n/index.ts` 中注册新的语言。

## 📸 屏幕截图

以下是应用的主要页面截图，展示了整体设计风格和功能实现：

![首页截图](/public/images/system/Home.png)

![关于页截图](/public/images/system/About.png)

![项目展示页截图](/public/images/system/Projects.png)

![博客页截图](/public/images/system/Blog.png)

![联系页截图](/public/images/system/Contact.png)

## 🔧 高级配置

### 自定义主题

本项目使用 DaisyUI 进行主题管理，支持多种预设主题和自定义主题：

```typescript
// tailwind.config.js 示例
module.exports = {
  // ...其他配置
  daisyui: {
    themes: [
      "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", 
      "synthwave", "retro", "cyberpunk", "valentine", "halloween", 
      "garden", "forest", "aqua", "lofi", "pastel", "fantasy", 
      "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", 
      "business", "acid", "lemonade", "night", "coffee", "winter"
    ],
  },
}
```

要修改主题配置，请参考 DaisyUI 文档: https://daisyui.com/docs/themes/

### 添加新页面

1. 在 `src/pages/` 创建新的页面组件
2. 在 `src/App.tsx` 中添加新的路由
3. 在国际化文件中添加相应的翻译内容

### 性能优化

项目已实施多种性能优化措施：
- React.memo 用于避免不必要的重渲染
- useMemo/useCallback 用于优化计算密集型操作
- 图片懒加载
- 动态导入组件
- Vite构建优化

## 🤝 贡献

欢迎提交 Pull Request 或创建 Issue！

## 📄 许可

[MIT](LICENSE)
