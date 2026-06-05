import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Fast Loading Public Pages
import Home from './pages/Home'
import Products from './pages/Products'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// Lazy Load Admin Modules (Code-Splitting for enterprise performance)
const AdminLayout = lazy(() => import('./pages/Admin'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const AdminPrices = lazy(() => import('./pages/AdminPrices'))
const AdminProducts = lazy(() => import('./pages/AdminProducts'))
const AdminComments = lazy(() => import('./pages/AdminComments'))

// A simple production-ready loading fallback
const PageLoader = () => <div className="text-center p-10">Inaanzisha kipindi salama...</div>

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        
        {/* CUSTOMER-FACING ROOT: Wraps public header and footer */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* AUTHENTICATION ENTRY: Completely separate from public design system */}
        <Route path="admin/login" element={<AdminLogin />} />

        {/* SECURE ADMINISTRATIVE SHELL: Isolated from public layout */}
        <Route path="admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="prices" element={<AdminPrices />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="comments" element={<AdminComments />} />
          </Route>
        </Route>

      </Routes>
    </Suspense>
  )
}
