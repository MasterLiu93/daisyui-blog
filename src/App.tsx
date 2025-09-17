import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
// Blog imports
import BlogLayout from './components/blog/Layout'
import Home from './pages/blog/Home'
import Projects from './pages/blog/Projects'
import Blog from './pages/blog/Blog'
import About from './pages/blog/About'
import Contact from './pages/blog/Contact'

// System imports
import SystemLayout from './components/system/Layout'
import Dashboard from './pages/system/Dashboard'
import Users from './pages/system/Users'
import Roles from './pages/system/Roles'
import Departments from './pages/system/Departments'
import Menus from './pages/system/Menus'
import Dictionaries from './pages/system/Dictionaries'
import Login from './pages/system/Login'
import Register from './pages/system/Register'
import AuthGuard from './components/system/AuthGuard'

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
        {/* Blog Routes */}
        <Route path="/" element={<BlogLayout><Home /></BlogLayout>} />
        <Route path="/projects" element={<BlogLayout><Projects /></BlogLayout>} />
        <Route path="/blog" element={<BlogLayout><Blog /></BlogLayout>} />
        <Route path="/about" element={<BlogLayout><About /></BlogLayout>} />
        <Route path="/contact" element={<BlogLayout><Contact /></BlogLayout>} />
        
        {/* System Routes */}
        <Route path="/system/login" element={<Login />} />
        <Route path="/system/register" element={<Register />} />
        <Route path="/system/dashboard" element={<AuthGuard><SystemLayout><Dashboard /></SystemLayout></AuthGuard>} />
        <Route path="/system/users" element={<AuthGuard><SystemLayout><Users /></SystemLayout></AuthGuard>} />
        <Route path="/system/roles" element={<AuthGuard><SystemLayout><Roles /></SystemLayout></AuthGuard>} />
        <Route path="/system/departments" element={<AuthGuard><SystemLayout><Departments /></SystemLayout></AuthGuard>} />
        <Route path="/system/menus" element={<AuthGuard><SystemLayout><Menus /></SystemLayout></AuthGuard>} />
        <Route path="/system/dictionaries" element={<AuthGuard><SystemLayout><Dictionaries /></SystemLayout></AuthGuard>} />
      </Routes>
    </>
  )
}

export default App
