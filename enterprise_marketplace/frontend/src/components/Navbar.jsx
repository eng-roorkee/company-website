import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

const links = [
  { to: '/', label: 'Nyumbani' },
  { to: '/products', label: 'Bidhaa' },
  { to: '/services', label: 'Huduma' },
  { to: '/about', label: 'Kuhusu' },
  { to: '/contact', label: 'Wasiliana' },
]

function CartBadge() {
  const { items, open, setOpen, updateQty, removeItem, totalItems, totalPrice } = useCart()
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open, setOpen])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-meat-cream/80 hover:text-white transition-colors"
        aria-label="Kikapu cha manunuzi"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-meat-red text-white text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full min-w-[18px] min-h-[18px]">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden z-50"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-3 border-b border-stone-100">
              <h3 className="font-bold text-meat-dark text-sm">Kikapu chako ({totalItems})</h3>
            </div>

            {items.length === 0 ? (
              <div className="px-4 py-8 text-center text-stone-400 text-sm">
                Kikapu kiko wazi
              </div>
            ) : (
              <>
                <div className="max-h-64 overflow-y-auto px-4 py-2 space-y-3">
                  {items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 border-b border-stone-100 pb-3 last:border-0">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-meat-dark truncate">{item.name}</p>
                        {item.variant && (
                          <p className="text-xs text-stone-500 truncate">{item.variant.weight}</p>
                        )}
                        <p className="text-sm font-bold text-meat-red mt-1">
                          {((item.variant?.price ?? item.price ?? 0) * item.qty).toLocaleString('en-TZ')} TSHS
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => updateQty(i, -1)}
                          className="w-7 h-7 rounded border border-stone-200 text-stone-600 text-sm hover:bg-stone-50"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-sm font-semibold text-meat-dark">{item.qty}</span>
                        <button
                          onClick={() => updateQty(i, 1)}
                          className="w-7 h-7 rounded border border-stone-200 text-stone-600 text-sm hover:bg-stone-50"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(i)}
                          className="w-7 h-7 rounded border border-stone-200 text-stone-400 hover:text-meat-red hover:border-meat-red/30 text-sm ml-1"
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 py-3 border-t border-stone-100 space-y-2">
                  <div className="flex justify-between text-sm font-bold text-meat-dark">
                    <span>Jumla</span>
                    <span>{totalPrice.toLocaleString('en-TZ')} TSHS</span>
                  </div>
                  <a
                    href={`https://wa.me/255672203073?text=${encodeURIComponent(
                      'Habari Tuliho Meat, ningependa kuagiza:\n' +
                      items.map((i) =>
                        `- ${i.name}${i.variant ? ` (${i.variant.weight})` : ''} x${i.qty} = ${((i.variant?.price ?? i.price ?? 0) * i.qty).toLocaleString('en-TZ')} TSHS`
                      ).join('\n') +
                      `\n\nJumla: ${totalPrice.toLocaleString('en-TZ')} TSHS`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-meat-red text-white text-center text-sm font-bold uppercase tracking-wider py-2.5 rounded-lg hover:bg-meat-red/90 transition-colors"
                  >
                    Agiza kupitia WhatsApp
                  </a>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`bg-meat-dark text-white sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'shadow-2xl shadow-black/30' : 'shadow-lg'
      }`}
    >
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
          className="hidden font-bold lg:flex items-center gap-8 text-sm uppercase tracking-widest"
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

        <div className="flex items-center gap-3">
          <CartBadge />

          <motion.a
            href="https://wa.me/255672203073"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex bg-meat-red hover:bg-meat-red/90 text-white text-sm font-semibold uppercase tracking-wider px-5 py-2.5 rounded transition-all hover:shadow-md hover:shadow-meat-red/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Wasiliana kupitia WhatsApp
          </motion.a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Fungua menyu"
          >
            <span className={`block h-0.5 w-6 bg-meat-cream transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-meat-cream transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-meat-cream transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
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
                  onClick={() => setMenuOpen(false)}
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
                Wasiliana kupitia WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
