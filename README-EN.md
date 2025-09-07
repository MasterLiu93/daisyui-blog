# Laby Blog

A modern, responsive personal blog and portfolio website built with React, TypeScript, and Tailwind CSS. Features multi-language support, rich animations, and theme customization.

[中文](README.md) | English

## ✨ Features

- 🌓 Light/Dark mode toggle with 28 preset themes
- 🌍 Complete multi-language support (English, Chinese) with modular translation files
- 📱 Fully responsive design for all screen sizes (mobile, tablet, desktop)
- ✨ Advanced animations and interactions (scroll animations, hover effects, page transitions)
- 🎨 DaisyUI-based customizable theme color system
- 📝 Complete blog system (post listing, categories, tags, search)
- 🖼️ Project portfolio display (filtering, detail modals)
- 📊 Data visualization and skills showcase components
- 📞 Fully functional contact form
- 🔍 Sitewide content search functionality
- 🧩 Strict modular component design
- 🌐 Particle animation backgrounds and 3D tech stack display

## 🛠️ Detailed Tech Stack

### Core Technologies
- **React 18.2.0**: JavaScript library for building user interfaces
- **TypeScript 5.2.2**: JavaScript superset with static type checking
- **Vite 7.1.4**: Modern frontend build tool providing lightning-fast dev server and optimized builds
- **Node.js 20+**: Runtime environment

### Styling & UI
- **Tailwind CSS 3.4.1**: Utility-first CSS framework
- **DaisyUI 5.1.7**: Tailwind-based component library with 28 customizable themes
- **PostCSS 8.4.36**: CSS transformation tool
- **Autoprefixer 10.4.17**: Automatic CSS prefix addition

### Routing & State Management
- **React Router 6.22.3**: Declarative routing management
- **React Hooks**: State management and lifecycle control
  - useState: Component state management
  - useEffect: Side effect handling
  - useRef: DOM references and value persistence
  - useMemo: Computation result caching optimization
  - useCallback: Function reference optimization

### Animation & Interaction
- **Framer Motion 11.0.8**: Animation library for React
  - Page transition animations
  - Scroll-triggered animations
  - Gesture responses
  - Advanced path animations

### Internationalization
- **react-i18next 14.1.0**: React internationalization library
- **i18next 23.10.1**: Underlying internationalization framework
- **i18next-browser-languagedetector 7.2.0**: Browser language detection

### Development Tools
- **ESLint 9.0.0**: Code quality checking
- **TypeScript ESLint 7.4.0**: TypeScript code standardization checking
- **Vite Plugin React 3.3.1**: React integration optimization

### Special Feature Implementation
- **Canvas API**: Used for particle background effects
- **Intersection Observer API**: Implementing scroll-triggered animations
- **Web Animations API**: Enhanced animation performance

## 📦 Installation

1. Clone the repository

```bash
git clone https://github.com/MasterLiu93/daisyui-blog.git
cd laby-blog
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

## 🚀 Usage

### Project Structure

```
laby-blog/
  |- public/              # Static assets
  |   |- images/          # Image resources
  |     |- blog/          # Blog images
  |     |- projects/      # Project images
  |     |- user/          # User-related images
  |- src/
      |- components/      # Reusable components
      |   |- CounterSection.tsx      # Number counter component
      |   |- Footer.tsx              # Footer component
      |   |- Hero.tsx                # Hero section component
      |   |- LanguageSwitcher.tsx    # Language switcher
      |   |- Layout.tsx              # Layout component
      |   |- ParticleBackground.tsx  # Particle background
      |   |- SectionTitle.tsx        # Section title component
      |   |- SkillsShowcase.tsx      # Skills showcase component
      |   |- TechStackGlobe.tsx      # Tech stack 3D globe component
      |   |- TestimonialsCarousel.tsx # Testimonials carousel component
      |- pages/           # Page components
      |   |- Home.tsx     # Home page
      |   |- About.tsx    # About page
      |   |- Projects.tsx # Projects page
      |   |- Blog.tsx     # Blog page
      |   |- Contact.tsx  # Contact page
      |- i18n/            # Internationalization files
      |   |- locales/     # Translation files
      |       |- common/  # Common translations
      |       |- pages/   # Page-specific translations
      |         |- home/       # Home page translations
      |         |- about/      # About page translations
      |         |- projects/   # Projects page translations
      |         |- blog/       # Blog page translations
      |         |- contact/    # Contact page translations
      |- assets/          # Other assets
      |- App.tsx          # Root application component
      |- main.tsx         # Entry file
```

### Feature Module Details

#### 1. Theme System
Uses DaisyUI's theme mechanism, supporting 28 preset themes and custom themes. Theme switching is persisted via localStorage for user preferences.

```typescript
// Theme switching example code
const setTheme = (theme: string) => {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
};
```

#### 2. Internationalization System
Multi-language system built on react-i18next, organized in a modular way:

```
i18n/
  |- index.ts            # Configuration and initialization
  |- locales/            # Translation files
      |- common/         # Common translations
        |- en.json       # English common
        |- zh.json       # Chinese common
      |- pages/          # Page-specific translations
        |- home/         # Home page translations
          |- en.json     # English
          |- zh.json     # Chinese
        |- about/        # And so on...
```

#### 3. Animation System
Various animation effects implemented using Framer Motion and CSS:
- Scroll-triggered animations
- Hover interaction effects
- Page transition animations
- Particle background effects
- 3D tech stack display

#### 4. Responsive Layout
Using Tailwind's responsive classes to ensure good display on all devices:
- Mobile-first design
- Breakpoint system (sm, md, lg, xl, 2xl)
- Grid layout and flexbox models

### Customizing Content

1. **Personal Information**: Modify translation files in `src/i18n/locales/` directory to update personal information.

2. **Projects and Blog Posts**: Update project and blog content in `src/i18n/locales/pages/projects/` and `src/i18n/locales/pages/blog/`.

3. **Images**: Replace image assets in the `public/images/` directory.

4. **Theme Colors**: Modify the DaisyUI theme configuration to customize the color scheme.

### Internationalization in Detail

The project uses react-i18next for internationalization management, organized in a modular fashion:

```typescript
// i18n configuration example
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

To add a new language, copy existing translation files and translate them, then register the new language in `src/i18n/index.ts`.

## 📸 Screenshots

Below are screenshots of the main pages, showcasing the overall design style and implemented features:

![Home Page](/public/images/system/Home.png)

![About Page](/public/images/system/About.png)

![Projects Page](/public/images/system/Projects.png)

![Blog Page](/public/images/system/Blog.png)

![Contact Page](/public/images/system/Contact.png)

## 🔧 Advanced Configuration

### Customizing Themes

This project uses DaisyUI for theme management, supporting multiple preset themes and custom themes:

```typescript
// tailwind.config.js example
module.exports = {
  // ...other configurations
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

To modify the theme configuration, refer to the DaisyUI documentation: https://daisyui.com/docs/themes/

### Adding New Pages

1. Create a new page component in `src/pages/`
2. Add a new route in `src/App.tsx`
3. Add corresponding translation content in the internationalization files

### Performance Optimizations

The project has implemented various performance optimization measures:
- React.memo for avoiding unnecessary re-renders
- useMemo/useCallback for optimizing computation-intensive operations
- Image lazy loading
- Dynamic component imports
- Vite build optimizations

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request or create an Issue!

## 📄 License

[MIT](LICENSE) 