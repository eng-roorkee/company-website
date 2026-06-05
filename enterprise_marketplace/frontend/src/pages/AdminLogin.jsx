import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../services/api'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post('/api/v1/auth/login', form)
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('admin', JSON.stringify(data.admin))
      navigate('/admin')
    } catch {
      setError('Jina la mtumiaji au nywila si sahihi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="max-w-sm mx-auto py-20 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold text-center mb-6">Ingia kama Msimamizi</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Jina la Mtumiaji</label>
          <input
            type="text"
            required
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-meat-red/40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Nywila</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-meat-red/40"
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <motion.button
          type="submit"
          disabled={loading}
          className="w-full bg-meat-red text-white py-2.5 rounded font-semibold text-sm hover:bg-meat-red/90 transition-colors disabled:opacity-60"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? 'Inaingia…' : 'Ingia'}
        </motion.button>
      </form>
    </motion.div>
  )
}
