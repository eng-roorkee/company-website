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
  const [history, setHistory] = useState([])
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

  if (loading) return (
    <div className="flex items-center justify-center py-16">
      <svg className="animate-spin h-6 w-6 text-meat-red" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    </div>
  )

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <div className="mb-6">
        <motion.h2 className="text-2xl font-bold text-stone-800" variants={fadeUp}>Bei za Bidhaa</motion.h2>
        <motion.p className="text-stone-500 text-sm mt-1" variants={fadeUp}>Rekebisha bei kwa haraka kwa kutumia vivutio</motion.p>
      </div>

      <motion.div className="space-y-3" variants={stagger}>
        {products.map((p) => (
          <motion.div
            key={p.id}
            className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition-shadow"
            variants={fadeUp}
          >
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[180px]">
                <p className="font-semibold text-stone-800">{p.name}</p>
                {p.category && <p className="text-xs text-stone-400 mt-0.5">{p.category}</p>}
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-xl font-bold text-meat-red">{p.price.toLocaleString('en-TZ')} TZS</span>
                {p.is_special_offer && (
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded-full">Ofa</span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                {quickAdjustments.map((amt) => (
                  <button
                    key={`up-${amt}`}
                    onClick={() => handleQuickAdjust(p, amt)}
                    className="bg-green-50 text-green-700 hover:bg-green-100 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors"
                    title={`+${amt} TZS`}
                  >
                    +{amt.toLocaleString('en-TZ')}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                {quickAdjustments.map((amt) => (
                  <button
                    key={`dn-${amt}`}
                    onClick={() => handleQuickAdjust(p, -amt)}
                    className="bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors"
                    title={`-${amt} TZS`}
                  >
                    -{amt.toLocaleString('en-TZ')}
                  </button>
                ))}
              </div>

              <button
                onClick={() => openHistory(p)}
                className="flex items-center gap-1.5 text-xs text-meat-red hover:text-meat-red/80 font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-meat-red/5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Historia
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {historyProduct && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setHistoryProduct(null)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-lg w-full max-h-[75vh] overflow-y-auto shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-meat-red/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-meat-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-800">Historia ya Bei</h3>
                    <p className="text-sm text-stone-500">{historyProduct.name}</p>
                  </div>
                </div>
                <button onClick={() => setHistoryProduct(null)}
                  className="w-8 h-8 rounded-lg hover:bg-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                {historyLoading ? (
                  <div className="flex justify-center py-8">
                    <svg className="animate-spin h-5 w-5 text-meat-red" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  </div>
                ) : history.length === 0 ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <svg className="w-10 h-10 text-stone-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-stone-400 text-sm">Hakuna historia ya mabadiliko ya bei.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {history.map((h) => (
                      <div key={h.id} className="flex items-center justify-between p-3 rounded-lg bg-stone-50 border border-stone-100">
                        <div className="flex items-center gap-3">
                          <span className="text-stone-400 line-through text-sm">{h.old_price.toLocaleString('en-TZ')} TZS</span>
                          <svg className="w-4 h-4 text-meat-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                          <span className="text-meat-red font-semibold">{h.new_price.toLocaleString('en-TZ')} TZS</span>
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
