import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const nav = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/comments', label: 'Comments' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const admin = JSON.parse(localStorage.getItem('admin') || 'null')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('admin')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-[60vh] flex">
      <aside className="w-56 bg-meat-dark text-meat-cream/80 shrink-0 hidden sm:flex flex-col">
        <div className="px-5 py-6 border-b border-meat-muted/30">
          <p className="text-white font-bold tracking-widest uppercase text-sm">Tuliho Admin</p>
          {admin && <p className="text-xs mt-1 text-meat-muted">{admin.username}</p>}
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((n) => {
            const active = n.end ? pathname === n.to : pathname.startsWith(n.to)
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`block px-3 py-2 rounded text-sm transition-colors ${
                  active ? 'bg-meat-red text-white font-semibold' : 'hover:bg-meat-red/20 hover:text-white'
                }`}
              >
                {n.label}
              </Link>
            )
          })}
        </nav>
        <div className="px-3 py-4 border-t border-meat-muted/30">
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded text-sm text-meat-cream/60 hover:bg-meat-red/20 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="sm:hidden flex items-center justify-between bg-meat-dark px-4 py-3">
          <span className="text-white text-sm font-semibold">Tuliho Admin</span>
          <div className="flex gap-3 text-xs">
            {nav.map((n) => {
              const active = n.end ? pathname === n.to : pathname.startsWith(n.to)
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`px-3 py-1.5 rounded transition-colors ${
                    active ? 'bg-meat-red text-white font-semibold' : 'text-meat-cream/60'
                  }`}
                >
                  {n.label}
                </Link>
              )
            })}
            <button onClick={handleLogout} className="text-meat-cream/60 hover:text-white">Exit</button>
          </div>
        </div>
        <motion.div
          className="p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  )
}
