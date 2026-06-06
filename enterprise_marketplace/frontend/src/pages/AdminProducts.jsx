import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api, { API_BASE_URL } from '../services/api'

const emptyForm = {
  name: '', description: '', price: '', category: '', image_url: '', is_special_offer: false,
}

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef(null)

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
      if (editing?.id) {
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

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const { data } = await api.post('/api/v1/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setForm({ ...form, image_url: data.url })
    } catch {
      alert('Upload imeshindwa. Tafadhali jaribu tena.')
    } finally {
      setUploading(false)
    }
  }

  const toggleOffer = async (p) => {
    try {
      await api.put(`/api/v1/products/${p.id}`, { is_special_offer: !p.is_special_offer })
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-stone-800">Bidhaa</h2>
          <p className="text-stone-500 text-sm mt-1">Simamia orodha ya bidhaa zote</p>
        </div>
        {editing && (
          <button onClick={reset} className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-stone-100">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Nyuma
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {editing ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="bg-white border border-stone-200 rounded-xl p-6 space-y-5 max-w-lg mb-8 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <svg className="w-5 h-5 text-meat-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <h3 className="font-semibold text-stone-800">{editing?.id ? 'Hariri Bidhaa' : 'Ongeza Bidhaa'}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-stone-600 mb-1.5">Jina *</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-meat-red/30 focus:border-meat-red transition-all bg-stone-50" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-stone-600 mb-1.5">Maelezo</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-meat-red/30 focus:border-meat-red transition-all bg-stone-50" rows={3} />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">Bei *</label>
                <input required type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-meat-red/30 focus:border-meat-red transition-all bg-stone-50" />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">Kategoria</label>
                <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-meat-red/30 focus:border-meat-red transition-all bg-stone-50" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-stone-600 mb-1.5">Picha</label>
                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleFileUpload} className="hidden" />
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                    className="border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm hover:bg-stone-50 transition-colors disabled:opacity-50 flex items-center gap-2">
                    <svg className="w-4 h-4 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {uploading ? 'Inapakia…' : 'Chagua Picha'}
                  </button>
                  {form.image_url && (
                    <span className="text-xs text-stone-500 truncate max-w-[200px]">{form.image_url.split('/').pop()}</span>
                  )}
                </div>
                {form.image_url && (
                  <img src={form.image_url.startsWith('http') ? form.image_url : `${API_BASE_URL}${form.image_url}`}
                    alt="Preview" className="mt-2 w-32 h-24 object-cover rounded-lg border border-stone-200" />
                )}
                <div className="mt-2">
                  <label className="block text-xs font-medium text-stone-500 mb-1.5">Au weka URL ya nje</label>
                  <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    className="w-full border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-meat-red/30 focus:border-meat-red transition-all bg-stone-50" />
                </div>
              </div>
              <div className="col-span-2 flex items-center gap-2.5">
                <input type="checkbox" id="offer" checked={form.is_special_offer}
                  onChange={(e) => setForm({ ...form, is_special_offer: e.target.checked })}
                  className="w-4 h-4 rounded border-stone-300 text-meat-red focus:ring-meat-red/30" />
                <label htmlFor="offer" className="text-sm font-medium text-meat-accent">Ofa Maalum</label>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit"
                className="bg-meat-red text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-meat-red/90 transition-colors shadow-sm">
                {editing?.id ? 'Sasisha' : 'Unda'}
              </button>
              <button type="button" onClick={reset}
                className="text-stone-500 px-5 py-2.5 rounded-lg text-sm hover:bg-stone-100 transition-colors">
                Ghairi
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.button
            key="add-btn"
            onClick={() => setEditing({})}
            className="mb-6 bg-meat-red text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-meat-red/90 transition-colors shadow-sm flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Ongeza Bidhaa
          </motion.button>
        )}
      </AnimatePresence>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-xl border border-stone-200">
          <svg className="w-12 h-12 text-stone-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p className="text-stone-400 text-sm">Hakuna bidhaa bado.</p>
          <button onClick={() => setEditing({})} className="mt-3 text-sm text-meat-red hover:text-meat-red/80 font-medium">
            Ongeza bidhaa ya kwanza
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-50 text-left text-stone-500 text-xs uppercase tracking-wider">
                  <th className="px-5 py-3.5 font-semibold">Jina</th>
                  <th className="px-5 py-3.5 font-semibold">Kategoria</th>
                  <th className="px-5 py-3.5 font-semibold">Bei</th>
                  <th className="px-5 py-3.5 font-semibold">Ofa</th>
                  <th className="px-5 py-3.5 font-semibold">Vitendo</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={`border-t border-stone-100 hover:bg-stone-50/50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-stone-50/30'}`}>
                    <td className="px-5 py-3.5 font-medium text-stone-800">{p.name}</td>
                    <td className="px-5 py-3.5">
                      {p.category ? (
                        <span className="bg-stone-100 text-stone-600 text-xs px-2.5 py-1 rounded-lg font-medium">{p.category}</span>
                      ) : (
                        <span className="text-stone-400">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-stone-700">{p.price ? `${p.price.toFixed(2)} TZS` : '—'}</td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => toggleOffer(p)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                          p.is_special_offer
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
                        }`}>
                        {p.is_special_offer ? 'Ipo Kwenye Ofa' : 'Kawaida'}
                      </button>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button onClick={() => startEdit(p)}
                          className="text-xs font-medium text-meat-red hover:bg-meat-red/5 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Hariri
                        </button>
                        <button onClick={() => handleDelete(p.id)}
                          className="text-xs font-medium text-red-600 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Futa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  )
}
