import { motion } from 'framer-motion'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Contact() {
  return (
    <motion.section
      className="py-20 px-4 max-w-4xl mx-auto"
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
              <h3 className="font-semibold">WhatsApp</h3>
            </div>
            <a
              href="https://wa.me/255672203073"
              target="_blank"
              rel="noopener noreferrer"
              className="text-meat-red font-semibold hover:text-meat-red/80 transition-colors ml-13"
            >
              Ongea sasa &rarr;
            </a>
          </div>
        </motion.div>
        <motion.div
          className="bg-white p-8 rounded-xl border border-stone-200 hover:shadow-lg transition-all"
          variants={fadeUp}
          whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(0,0,0,0.1)' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-meat-red/10 rounded-lg flex items-center justify-center text-meat-red">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h3 className="font-semibold">Weka Agizo</h3>
          </div>
          <p className="text-stone-600 text-sm leading-relaxed mb-6">
            Wasiliana kupitia WhatsApp au Simu. Tunatoa nyama safi,
            bora ya shambani mpaka mlangoni kwako.
          </p>
          <motion.a
            href="https://wa.me/255672203073?text=Hello%20Tuliho%20Meat%2C%20I%20would%20like%20to%20place%20an%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-meat-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-meat-red/90 transition-all hover:shadow-md hover:shadow-meat-red/20 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Agiza kwenye WhatsApp
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
