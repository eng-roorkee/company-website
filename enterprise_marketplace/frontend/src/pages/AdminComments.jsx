import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import api from '../services/api'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

const filters = [
  { key: 'zote', label: 'Zote', icon: 'all' },
  { key: 'zinazosubiri', label: 'Zinazosubiri', icon: 'pending' },
  { key: 'zilizokubaliwa', label: 'Zilizokubaliwa', icon: 'approved' },
]

export default function AdminComments() {
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('zote')
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const params = filter === 'zinazosubiri' ? { approved: false } : {}
      const { data } = await api.get('/api/v1/comments', { params })
      setComments(data)
    } catch {} finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => { load() }, [load])

  const handleApprove = async (id) => {
    try {
      await api.put(`/api/v1/comments/${id}/approve`)
      await load()
    } catch {}
  }

  const handleDelete = async (id) => {
    if (!confirm('Futa maoni haya?')) return
    try {
      await api.delete(`/api/v1/comments/${id}`)
      await load()
    } catch {}
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <motion.h2 className="text-2xl font-bold text-stone-800" variants={fadeUp}>Maoni</motion.h2>
          <motion.p className="text-stone-500 text-sm mt-1" variants={fadeUp}>Simamia maoni ya wateja</motion.p>
        </div>
        <motion.div className="flex gap-1.5 bg-stone-100 p-1 rounded-lg" variants={fadeUp}>
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-all ${
                filter === f.key
                  ? 'bg-white text-stone-800 shadow-sm'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>
      </div>

      {comments.length === 0 ? (
        <motion.div
          className="bg-white rounded-xl border border-stone-200 p-12 text-center"
          variants={fadeUp}
        >
          <svg className="w-12 h-12 text-stone-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-stone-400 text-sm">Hakuna maoni yaliyopatikana.</p>
        </motion.div>
      ) : (
        <motion.div className="space-y-3" variants={stagger}>
          {comments.map((c) => (
            <motion.div
              key={c.id}
              className="bg-white rounded-xl border border-stone-200 p-5 hover:shadow-sm transition-shadow"
              variants={fadeUp}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center flex-wrap gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-full bg-meat-red/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-meat-red">
                        {c.author_name?.charAt(0).toUpperCase() || '?'}
                      </span>
                    </div>
                    <span className="font-semibold text-sm text-stone-800">{c.author_name}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                      c.is_approved
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {c.is_approved ? 'Imekubaliwa' : 'Inasubiri'}
                    </span>
                    <span className="text-xs text-stone-400">
                      Bidhaa #{c.product_id}
                    </span>
                    <span className="text-xs text-stone-400">
                      {new Date(c.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed">{c.content}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {!c.is_approved && (
                    <button onClick={() => handleApprove(c.id)}
                      className="flex items-center gap-1 text-xs bg-green-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Kubali
                    </button>
                  )}
                  <button onClick={() => handleDelete(c.id)}
                    className="flex items-center gap-1 text-xs bg-red-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-sm">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Futa
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
