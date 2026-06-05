import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../services/api'

const quickAdjustments = [500, 1000, 2000, 5000]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export default function AdminPrices() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [history, setHistory] = useState({})
  const [historyProduct, setHistoryProduct] = useState(null)
  const [historyLoading, setHistoryLoading] = useState(false)

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/api/v1/products')
      setProducts(data)
    } catch {} finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const updatePrice = async (product, newPrice) => {
    if (newPrice < 0) return
    try {
      await api.put(`/api/v1/products/${product.id}`, { price: newPrice })
      await load()
    } catch {}
  }

  const handleQuickAdjust = (product, amount) => {
    const newPrice = Math.max(0, product.price + amount)
    updatePrice(product, newPrice)
  }

  const openHistory = async (product) => {
    setHistoryProduct(product)
    setHistoryLoading(true)
    try {
      const { data } = await api.get(`/api/v1/price-history/${product.id}`)
      setHistory(data)
    } catch {} finally {
      setHistoryLoading(false)
    }
  }

  if (loading) return <p className="text-stone-400 text-sm">Inapakia bei...</p>

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <motion.h2 className="text-2xl font-bold mb-6" variants={fadeUp}>Bei za Bidhaa</motion.h2>

      <motion.div className="space-y-3" variants={stagger}>
        {products.map((p) => (
          <motion.div
            key={p.id}
            className="bg-white border border-stone-200 rounded-lg p-4 flex flex-wrap items-center gap-4"
            variants={fadeUp}
          >
            <div className="flex-1 min-w-[160px]">
              <p className="font-semibold text-sm">{p.name}</p>
              <p className="text-xs text-stone-400">{p.category || '—'}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-meat-red">{p.price.toLocaleString('en-TZ')} TZS</span>
              {p.is_special_offer && (
                <span className="bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded-full">Ofa</span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {quickAdjustments.map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleQuickAdjust(p, amt)}
                  className="bg-green-50 text-green-700 hover:bg-green-100 text-xs font-semibold px-2 py-1 rounded transition-colors"
                  title={`+${amt} TZS`}
                >
                  +{amt.toLocaleString('en-TZ')}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              {quickAdjustments.map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleQuickAdjust(p, -amt)}
                  className="bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold px-2 py-1 rounded transition-colors"
                  title={`-${amt} TZS`}
                >
                  -{amt.toLocaleString('en-TZ')}
                </button>
              ))}
            </div>

            <button
              onClick={() => openHistory(p)}
              className="text-xs text-meat-red hover:text-meat-red/80 font-medium transition-colors"
            >
              Historia
            </button>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {historyProduct && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setHistoryProduct(null)}
          >
            <motion.div
              className="bg-white rounded-lg max-w-lg w-full max-h-[70vh] overflow-y-auto p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Historia ya Bei - {historyProduct.name}</h3>
                <button
                  onClick={() => setHistoryProduct(null)}
                  className="text-stone-400 hover:text-stone-600 text-xl leading-none"
                >
                  &times;
                </button>
              </div>

              {historyLoading ? (
                <p className="text-stone-400 text-sm">Inapakia historia...</p>
              ) : history.length === 0 ? (
                <p className="text-stone-400 text-sm">Hakuna historia ya mabadiliko ya bei.</p>
              ) : (
                <div className="space-y-2">
                  {history.map((h) => (
                    <div key={h.id} className="flex items-center justify-between text-sm border-b border-stone-100 pb-2">
                      <div>
                        <span className="text-stone-500 line-through mr-2">{h.old_price.toLocaleString('en-TZ')} TZS</span>
                        <span className="text-meat-red font-semibold">&rarr; {h.new_price.toLocaleString('en-TZ')} TZS</span>
                      </div>
                      <span className="text-xs text-stone-400">
                        {new Date(h.changed_at).toLocaleDateString('sw-TZ', {
                          day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
