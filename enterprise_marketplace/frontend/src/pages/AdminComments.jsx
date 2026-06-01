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

export default function AdminComments() {
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const params = filter === 'pending' ? { approved: false } : {}
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
    if (!confirm('Delete this comment?')) return
    try {
      await api.delete(`/api/v1/comments/${id}`)
      await load()
    } catch {}
  }

  if (loading) return <p className="text-stone-400 text-sm">Loading comments…</p>

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Comments</h2>
        <div className="flex gap-2 text-sm">
          {['all', 'pending', 'approved'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded capitalize transition-colors ${
                filter === f
                  ? 'bg-meat-red text-white font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {comments.length === 0 ? (
        <motion.p className="text-stone-400 text-sm" variants={fadeUp}>
          No comments found.
        </motion.p>
      ) : (
        <motion.div className="space-y-3" variants={stagger}>
          {comments.map((c) => (
            <motion.div
              key={c.id}
              className="bg-white border border-stone-200 rounded-lg p-4"
              variants={fadeUp}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm">{c.author_name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      c.is_approved
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {c.is_approved ? 'Approved' : 'Pending'}
                    </span>
                    <span className="text-xs text-stone-400">
                      on product #{c.product_id}
                    </span>
                  </div>
                  <p className="text-stone-600 text-sm mt-2">{c.content}</p>
                  <p className="text-xs text-stone-400 mt-1">
                    {new Date(c.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {!c.is_approved && (
                    <button
                      onClick={() => handleApprove(c.id)}
                      className="text-xs bg-green-600 text-white px-3 py-1.5 rounded font-medium hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-xs bg-red-600 text-white px-3 py-1.5 rounded font-medium hover:bg-red-700 transition-colors"
                  >
                    Delete
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
