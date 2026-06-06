import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../services/api'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const stats = [
  { key: 'products', label: 'Bidhaa', icon: 'box' },
  { key: 'pending', label: 'Maoni Yanasubiri', icon: 'chat' },
  { key: 'views', label: 'Matembezi ya Ukurasa', icon: 'eye' },
]

const icons = {
  box: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  chat: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  eye: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
}

const colorMap = [
  { bg: 'bg-red-50', text: 'text-meat-red', ring: 'ring-red-100' },
  { bg: 'bg-amber-50', text: 'text-meat-accent', ring: 'ring-amber-100' },
  { bg: 'bg-stone-800', text: 'text-stone-800', ring: 'ring-stone-200' },
]

export default function AdminDashboard() {
  const [pendingCount, setPendingCount] = useState(0)
  const [interactions, setInteractions] = useState([])
  const [productCount, setProductCount] = useState(0)

  useEffect(() => {
    Promise.all([
      api.get('/api/v1/comments', { params: { approved: false } }),
      api.get('/api/v1/interactions'),
      api.get('/api/v1/products'),
    ]).then(([comments, ints, products]) => {
      setPendingCount(comments.data.length)
      setInteractions(ints.data.slice(0, 6))
      setProductCount(products.data.length)
    }).catch(() => {})
  }, [])

  const pageViews = interactions.filter((i) => i.action === 'page_view').length
  const values = [productCount, pendingCount, pageViews]

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <motion.h1 className="text-2xl font-bold text-stone-800" variants={fadeUp}>Dashibodi</motion.h1>
          <motion.p className="text-stone-500 text-sm mt-1" variants={fadeUp}>Karibu tena, msimamizi</motion.p>
        </div>
      </div>

      <motion.div className="grid sm:grid-cols-3 gap-5 mb-10" variants={stagger}>
        {stats.map((s, i) => (
          <motion.div
            key={s.key}
            className="bg-white rounded-xl border border-stone-200 p-5 hover:shadow-md transition-shadow"
            variants={fadeUp}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className={`text-3xl font-bold ${colorMap[i].text}`}>{values[i]}</div>
                <div className="text-stone-500 text-sm mt-1">{s.label}</div>
              </div>
              <div className={`${colorMap[i].bg} p-2.5 rounded-lg ${colorMap[i].ring} ring-1`}>
                <span className={colorMap[i].text}>{icons[s.icon]}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          className="bg-white rounded-xl border border-stone-200 p-6"
          variants={fadeUp}
        >
          <div className="flex items-center gap-2 mb-5">
            <svg className="w-5 h-5 text-meat-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="font-semibold text-stone-800">Vitendo vya Haraka</h3>
          </div>
          <div className="space-y-2">
            {[
              { to: '/admin/prices', label: 'Rekebisha Bei', desc: 'Sasisha bei za bidhaa sokoni' },
              { to: '/admin/products', label: 'Simamia Bidhaa', desc: 'Ongeza au hariri bidhaa' },
              { to: '/admin/comments', label: `Simamia Maoni ${pendingCount > 0 ? `(${pendingCount} yanasubiri)` : ''}`, desc: 'Kubali au futa maoni ya wateja' },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-stone-50 transition-colors group"
              >
                <div>
                  <p className="text-sm font-medium text-stone-700 group-hover:text-meat-red transition-colors">{item.label}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{item.desc}</p>
                </div>
                <svg className="w-4 h-4 text-stone-300 group-hover:text-meat-red transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl border border-stone-200 p-6"
          variants={fadeUp}
        >
          <div className="flex items-center gap-2 mb-5">
            <svg className="w-5 h-5 text-meat-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="font-semibold text-stone-800">Shughuli za Hivi Karibuni</h3>
          </div>
          {interactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <svg className="w-10 h-10 text-stone-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="text-stone-400 text-sm">Hakuna shughuli bado.</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {interactions.map((i) => (
                <li key={i.id} className="flex items-center gap-3 text-sm py-1.5 border-b border-stone-100 last:border-0">
                  <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="capitalize text-stone-700">{i.action.replace('_', ' ')}</span>
                    <span className="text-stone-400 mx-1">kwenye</span>
                    <span className="font-medium text-stone-600">{i.page}</span>
                  </div>
                  <span className="text-xs text-stone-400 shrink-0">
                    {new Date(i.created_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
