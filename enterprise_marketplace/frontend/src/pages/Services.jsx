import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../services/api'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const serviceIcons = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
    ),
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
]

const fallbackServices = [
  {
    title: 'Uchinjaji',
    desc: 'Huduma kamili ya uchinjaji wa wanyama — vipande maalum vinavyotayarishwa kulingana na mahitaji yako kwa usahihi na uangalifu.',
  },
  {
    title: 'Usafirishaji',
    desc: 'Usafirishaji wa haraka na wa kuaminika Mafinga na maeneo jirani. Agizo lako linawasili likiwa safi na kwa wakati.',
  },
  {
    title: 'Upishi',
    desc: 'Huduma bora ya upishi wa nyama kwa hafla, mikusanyiko, na matukio maalum. Maagizo maalum yanakaribishwa.',
  },
  {
    title: 'Uzwa Jumla',
    desc: 'Ugavi wa nyama kwa wingi kwa migahawa, hoteli, na biashara za chakula. Bei shindani.',
  },
]

function ServiceSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-6 animate-pulse space-y-3">
      <div className="w-12 h-12 bg-stone-200 rounded-lg" />
      <div className="h-5 w-1/2 bg-stone-200 rounded" />
      <div className="h-4 w-full bg-stone-200 rounded" />
      <div className="h-4 w-3/4 bg-stone-200 rounded" />
    </div>
  )
}

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/v1/services')
      .then(({ data }) => {
        setServices(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const displayServices = services.length > 0 ? services : fallbackServices

  return (
    <motion.section
      className="py-20 px-4 max-w-6xl mx-auto"
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
          Huduma Zetu
        </motion.span>
        <motion.h2
          className="text-3xl font-bold mt-2"
          variants={fadeUp}
        >
          Huduma unayoweza kuamini.
        </motion.h2>
        <motion.p
          className="text-stone-500 mt-2 max-w-xl mx-auto"
          variants={fadeUp}
        >
          Kutoka uchinjaji maalum hadi ugavi wa jumla — tunakidhi kila hitaji.
        </motion.p>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <ServiceSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div className="grid sm:grid-cols-2 gap-6" variants={stagger}>
          {displayServices.map((s, idx) => (
            <motion.div
              key={s.id || s.title || idx}
              className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm hover:shadow-lg transition-all"
              variants={fadeUp}
              whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(0,0,0,0.1)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-meat-red/10 rounded-xl flex items-center justify-center shrink-0 text-meat-red">
                  {serviceIcons[idx % serviceIcons.length].icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-stone-800">{s.title || s.name}</h3>
                  <p className="text-stone-600 text-sm mt-2 leading-relaxed">{s.description || s.desc}</p>
                  {s.price != null && (
                    <span className="inline-block mt-3 text-sm font-bold text-meat-red">
                      {s.price.toLocaleString('en-TZ')} TZS
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  )
}
