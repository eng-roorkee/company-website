import { Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import coverpage from '../assets/coverpage.webp'
import coverpage1 from '../assets/coverpage1.webp'

const BelowFoldContent = lazy(() => import('./BelowFoldContent'))

const stats = [
  { label: 'Miaka ya Biashara', value: '10+' },
  { label: 'Vipande Bora', value: '25+' },
  { label: 'Wateja Wenye Furaha', value: '5,000+' },
  { label: 'Ushirikiano wa Mashamba', value: '12' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
}

export default function Home() {
  return (
    <>
      <style>{`
        .hero-cover { background-image: url(${coverpage}); }
        @media (max-width: 767px) {
          .hero-cover { background-image: url(${coverpage1}); }
        }
      `}</style>
      <section className="hero-cover relative text-white text-center bg-cover bg-center">
        <motion.div
          className="absolute inset-0 bg-meat-dark/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="relative z-10 py-24 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.span
              className="text-meat-accent text-sm uppercase tracking-[0.2em] font-semibold block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Nyama Safi Shambani · Tangu 2005
            </motion.span>
            <motion.h1
              className="text-4xl sm:text-5xl font-bold mt-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Nyama Bora,<br />Yenye Ubora.
            </motion.h1>
            <motion.p
              className="mt-4 text-stone-300 text-lg max-w-xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Tuliho Meat tunatoa huduma bora ya nyama safi mpaka mlangoni kwako.
              Ubora unaouonja, huduma unayoiiamini.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <Link
                to="/products"
                className="bg-meat-red text-white px-8 py-3 rounded font-semibold hover:bg-meat-red/90 transition-all hover:shadow-lg hover:shadow-meat-red/25"
              >
                Tazama Bidhaa
              </Link>
              <a
                href="https://wa.me/255672203073?text=Habari%20Tuliho%20Meat%2C%20ningependa%20kuagiza."
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white text-white px-8 py-3 rounded font-semibold hover:bg-white/10 transition-colors"
              >
                Agiza kupitia WhatsApp
              </a>
            </motion.div>
          </div>
          <motion.div
            className="max-w-6xl mx-auto mt-16 px-4 grid grid-cols-2 sm:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.8 } } }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-2xl font-bold text-meat-accent">{s.value}</div>
                <div className="text-stone-400 text-sm mt-1 uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Suspense fallback={<div className="py-20 text-center text-stone-500">Inapakia...</div>}>
        <BelowFoldContent />
      </Suspense>
    </>
  )
}
