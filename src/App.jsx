import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';

import AdminLogin from './components/admin/adminlogin';
import ProtectedAdmin from './components/admin/ProtectedAdmin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminBlog from './pages/admin/AdminBlog';
import AdminMessages from './pages/admin/AdminMessages';
import AdminPortfolio from './pages/admin/AdminPortfolio';
import AdminBanners from './pages/admin/AdminBanners';
import AdminSubscriptions from './pages/admin/AdminSubscriptions';
import AdminSettings from './pages/admin/AdminSettings';

const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const t = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 280);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function AppShell() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className="m-0 min-h-screen bg-[#050505]">
      {!isAdmin && <CustomCursor />}
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <Suspense fallback={<div className="min-h-[50vh] bg-[#050505]" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<CaseStudy />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={(
              <ProtectedAdmin>
                <AdminLayout />
              </ProtectedAdmin>
            )}
          >
            <Route index element={<AdminDashboard />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="portfolio" element={<AdminPortfolio />} />
            <Route path="banners" element={<AdminBanners />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="subscriptions" element={<AdminSubscriptions />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isAdmin && <Footer />}
      {!isAdmin && <ChatBot />}
    </div>
  );
}

export default function App() {
  return <AppShell />;
}
