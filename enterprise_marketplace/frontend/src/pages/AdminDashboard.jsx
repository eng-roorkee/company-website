import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../services/api'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      <motion.h2 className="text-2xl font-bold mb-6" variants={fadeUp}>Dashboard</motion.h2>

      <motion.div className="grid sm:grid-cols-3 gap-4 mb-10" variants={stagger}>
        <motion.div
          className="bg-white rounded-lg border border-stone-200 p-5"
          variants={fadeUp}
        >
          <div className="text-2xl font-bold text-meat-red">{productCount}</div>
          <div className="text-stone-500 text-sm mt-1">Products</div>
        </motion.div>
        <motion.div
          className="bg-white rounded-lg border border-stone-200 p-5"
          variants={fadeUp}
        >
          <div className="text-2xl font-bold text-meat-accent">{pendingCount}</div>
          <div className="text-stone-500 text-sm mt-1">Pending Comments</div>
        </motion.div>
        <motion.div
          className="bg-white rounded-lg border border-stone-200 p-5"
          variants={fadeUp}
        >
          <div className="text-2xl font-bold text-meat-dark">{pageViews}</div>
          <div className="text-stone-500 text-sm mt-1">Page Views</div>
        </motion.div>
      </motion.div>

      <motion.div className="grid sm:grid-cols-2 gap-6" variants={stagger}>
        <motion.div className="bg-white rounded-lg border border-stone-200 p-5" variants={fadeUp}>
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Link to="/admin/products" className="block text-sm text-meat-red hover:text-meat-red/80 transition-colors">
              &rarr; Manage Products
            </Link>
            <Link to="/admin/comments" className="block text-sm text-meat-red hover:text-meat-red/80 transition-colors">
              &rarr; Moderate Comments {pendingCount > 0 && `(${pendingCount} pending)`}
            </Link>
          </div>
        </motion.div>

        <motion.div className="bg-white rounded-lg border border-stone-200 p-5" variants={fadeUp}>
          <h3 className="font-semibold mb-3">Recent Activity</h3>
          {interactions.length === 0 ? (
            <p className="text-stone-400 text-sm">No activity yet.</p>
          ) : (
            <ul className="space-y-1.5 text-sm text-stone-600">
              {interactions.map((i) => (
                <li key={i.id}>
                  <span className="text-meat-muted text-xs">{new Date(i.created_at).toLocaleDateString()}</span>
                  {' '}&mdash;{' '}
                  <span className="capitalize">{i.action.replace('_', ' ')}</span> on{' '}
                  <span className="font-medium">{i.page}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
