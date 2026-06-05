import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../services/api'

const emptyForm = {
  name: '', description: '', price: '', category: '', image_url: '', is_special_offer: false,
}

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/api/v1/products')
      setProducts(data)
    } catch {} finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const reset = () => { setForm(emptyForm); setEditing(null) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { ...form, price: parseFloat(form.price) || 0 }
    try {
      if (editing) {
        await api.put(`/api/v1/products/${editing.id}`, payload)
      } else {
        await api.post('/api/v1/products', payload)
      }
      reset()
      await load()
    } catch {}
  }

  const startEdit = (p) => {
    setForm({
      name: p.name || '',
      description: p.description || '',
      price: p.price?.toString() || '',
      category: p.category || '',
      image_url: p.image_url || '',
      is_special_offer: p.is_special_offer || false,
    })
    setEditing(p)
  }

  const handleDelete = async (id) => {
    if (!confirm('Futa bidhaa hii?')) return
    try {
      await api.delete(`/api/v1/products/${id}`)
      await load()
    } catch {}
  }

  const toggleOffer = async (p) => {
    try {
      await api.put(`/api/v1/products/${p.id}`, { is_special_offer: !p.is_special_offer })
      await load()
    } catch {}
  }

  if (loading) return <p className="text-stone-400 text-sm">Inapakia bidhaa…</p>

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Bidhaa</h2>
        {editing && (
          <button onClick={reset} className="text-sm text-stone-500 hover:text-stone-700 transition-colors">
            &larr; Nyuma
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {editing ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="bg-white border border-stone-200 rounded-lg p-5 space-y-4 max-w-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-semibold">{editing ? 'Hariri Bidhaa' : 'Ongeza Bidhaa'}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-stone-600 mb-1">Jina *</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-meat-red/40" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-stone-600 mb-1">Maelezo</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-meat-red/40" rows={3} />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Bei *</label>
                <input required type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-meat-red/40" />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Kategoria</label>
                <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-meat-red/40" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-stone-600 mb-1">URL ya Picha</label>
                <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  className="w-full border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-meat-red/40" />
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <input type="checkbox" id="offer" checked={form.is_special_offer}
                  onChange={(e) => setForm({ ...form, is_special_offer: e.target.checked })}
                  className="accent-meat-red" />
                <label htmlFor="offer" className="text-sm text-meat-accent font-medium">Ofa Maalum</label>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit"
                className="bg-meat-red text-white px-5 py-2 rounded text-sm font-semibold hover:bg-meat-red/90 transition-colors">
                {editing ? 'Sasisha' : 'Unda'}
              </button>
              <button type="button" onClick={reset}
                className="text-stone-500 px-5 py-2 rounded text-sm hover:text-stone-700 transition-colors">
                Ghairi
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.button
            key="add-btn"
            onClick={() => setEditing({})}
            className="mb-6 bg-meat-red text-white px-4 py-2 rounded text-sm font-semibold hover:bg-meat-red/90 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            + Ongeza Bidhaa
          </motion.button>
        )}
      </AnimatePresence>

      {products.length === 0 ? (
        <p className="text-stone-400 text-sm">Hakuna bidhaa bado.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-left text-stone-500 text-xs uppercase tracking-widest">
                <th className="pb-3 pr-4">Jina</th>
                <th className="pb-3 pr-4">Kategoria</th>
                <th className="pb-3 pr-4">Bei</th>
                <th className="pb-3 pr-4">Ofa</th>
                <th className="pb-3 pr-4">Vitendo</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-stone-100">
                  <td className="py-3 pr-4 font-medium">{p.name}</td>
                  <td className="py-3 pr-4 text-stone-500">{p.category || '—'}</td>
                  <td className="py-3 pr-4">{p.price ? `${p.price.toFixed(2)} TZS` : '—'}</td>
                  <td className="py-3 pr-4">
                    <button
                      onClick={() => toggleOffer(p)}
                      className={`text-xs px-2 py-1 rounded font-medium transition-colors ${
                        p.is_special_offer
                          ? 'bg-meat-accent/20 text-meat-accent'
                          : 'bg-stone-100 text-stone-400'
                      }`}
                    >
                      {p.is_special_offer ? 'Ipo Kwenye Ofa' : 'Kawaida'}
                    </button>
                  </td>
                  <td className="py-3 flex gap-2">
                    <button onClick={() => startEdit(p)}
                      className="text-xs text-meat-red hover:text-meat-red/80 transition-colors">
                      Hariri
                    </button>
                    <button onClick={() => handleDelete(p.id)}
                      className="text-xs text-red-600 hover:text-red-800 transition-colors">
                      Futa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  )
}
