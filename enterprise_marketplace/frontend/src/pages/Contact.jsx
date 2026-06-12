import { useState } from 'react'
import { motion } from 'framer-motion'
import api from '../services/api'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSending(true)
    try {
      await api.post('/api/v1/contact', form)
      setSent(true)
      setForm({ name: '', email: '', message: '' })
    } catch {
      setError('Tumeshindwa kutuma ujumbe. Tafadhali jaribu tena.')
    } finally {
      setSending(false)
    }
  }

  return (
    <motion.section
      className="py-20 px-4 max-w-5xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={stagger}
    >
      <div className="text-center mb-12">
        <motion.span
          className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold block"
          variants={fadeUp}
        >
          Wasiliana Nasi
        </motion.span>
        <motion.h2
          className="text-3xl font-bold mt-2"
          variants={fadeUp}
        >
          Wasiliana nasi.
        </motion.h2>
      </div>

      <motion.div
        className="grid sm:grid-cols-2 gap-8"
        variants={stagger}
      >
        <motion.div className="space-y-6" variants={fadeUp}>
          <div className="bg-white p-6 rounded-xl border border-stone-200 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-meat-red/10 rounded-lg flex items-center justify-center text-meat-red">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <h3 className="font-semibold">Simu</h3>
            </div>
            <p className="text-stone-600 ml-13">+255 672 203 073</p>
            <p className="text-stone-600 ml-13">+255 754 245 863</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-stone-200 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-meat-red/10 rounded-lg flex items-center justify-center text-meat-red">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 className="font-semibold">Barua Pepe</h3>
            </div>
            <p className="text-stone-600 ml-13">info@tuliho.co.tz</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-stone-200 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-meat-red/10 rounded-lg flex items-center justify-center text-meat-red">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold">Mahali</h3>
            </div>
            <p className="text-stone-600 ml-13">Mafinga, Mkabala na Stand Kuu</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-stone-200 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-meat-red/10 rounded-lg flex items-center justify-center text-meat-red">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold">Saa za Kazi</h3>
            </div>
            <p className="text-stone-600 ml-13">Jumatatu - Jumamosi: 8:00 AM - 6:00 PM</p>
          </div>
        </motion.div>

        <motion.div className="space-y-6" variants={fadeUp}>
          {sent ? (
            <motion.div
              className="bg-white p-8 rounded-xl border border-stone-200 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-bold text-lg text-meat-dark">Asante!</h3>
              <p className="text-stone-600 text-sm mt-2">Ujumbe wako umetumwa. Tutakujibu haraka iwezekanavyo.</p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 text-meat-red text-sm font-semibold hover:underline"
              >
                Tuma ujumbe mwingine
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-xl border border-stone-200 space-y-5"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-meat-red/10 rounded-lg flex items-center justify-center text-meat-red">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h3 className="font-semibold">Tuma Ujumbe</h3>
              </div>

              {error && (
                <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>
              )}

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Jina Lako *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-meat-red/30 focus:border-meat-red"
                  placeholder="Michael Owen"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Barua Pepe *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-meat-red/30 focus:border-meat-red"
                  placeholder="info@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Ujumbe *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-meat-red/30 focus:border-meat-red resize-none"
                  placeholder="Andika ujumbe wako hapa..."
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-meat-red hover:bg-meat-red/90 disabled:bg-stone-400 text-white font-semibold uppercase tracking-wider py-3 rounded-lg transition-all text-sm"
              >
                {sending ? 'Inatuma...' : 'Tuma Ujumbe'}
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>

      <motion.div className="mt-12" variants={fadeUp}>
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
          <iframe
            title="Mafinga Location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=35.0167%2C-7.3000%2C35.1167%2C-7.2000&amp;layer=mapnik&amp;marker=-7.2500%2C35.0667"
            width="100%"
            height="350"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="px-6 py-3 bg-stone-50 text-center text-sm text-stone-500">
            Mafinga, Tanzania &middot; Mkabala na Stand Kuu
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
