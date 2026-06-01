import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-meat-dark text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/" className="text-xl font-bold tracking-widest uppercase">
            Tuliho<span className="text-meat-red"> Meat</span>
          </Link>
        </motion.div>

        <motion.div
          className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-widest"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                isActive
                  ? 'text-meat-red font-semibold'
                  : 'text-meat-cream/80 hover:text-white transition-colors'
              }
            >
              {l.label}
            </NavLink>
          ))}
        </motion.div>

        <motion.a
          href="https://wa.me/255672203073"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex bg-meat-red hover:bg-meat-red/90 text-white text-sm font-semibold uppercase tracking-wider px-5 py-2.5 rounded transition-colors"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact via WhatsApp
        </motion.a>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-meat-cream transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-meat-cream transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-meat-cream transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden bg-meat-dark border-t border-meat-muted/30 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-4 py-6 text-sm uppercase tracking-widest">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-meat-red font-semibold'
                      : 'text-meat-cream/80 hover:text-white transition-colors'
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <a
                href="https://wa.me/255672203073"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-meat-red hover:bg-meat-red/90 text-white text-sm font-semibold uppercase tracking-wider px-5 py-2.5 rounded transition-colors mt-2"
              >
                Contact via WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
