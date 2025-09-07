import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import About from './pages/About'
import Contact from './pages/Contact'

// ScrollToTop组件：在路由变化时滚动到页面顶部
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // 使用setTimeout确保DOM更新后再滚动
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'instant' // 使用instant而不是smooth，避免滚动动画
      });
    }, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/projects" element={<Layout><Projects /></Layout>} />
        <Route path="/blog" element={<Layout><Blog /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
      </Routes>
    </>
  )
}

export default App
