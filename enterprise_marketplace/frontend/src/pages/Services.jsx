import { motion } from 'framer-motion'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const services = [
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

export default function Services() {
  return (
    <motion.section
      className="py-20 px-4 max-w-6xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={stagger}
    >
      <motion.span
        className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold block"
        variants={fadeUp}
      >
        Huduma Zetu
      </motion.span>
      <motion.h2
        className="text-3xl font-bold mt-2 mb-2"
        variants={fadeUp}
      >
        Huduma unayoweza kuamini.
      </motion.h2>
      <motion.p
        className="text-stone-600 mb-12 max-w-xl"
        variants={fadeUp}
      >
        Kutoka uchinjaji maalum hadi ugavi wa jumla — tunakidhi kila hitaji.
      </motion.p>

      <motion.div
        className="grid sm:grid-cols-2 gap-8"
        variants={stagger}
      >
        {services.map((s) => (
          <motion.div
            key={s.title}
            className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm"
            variants={fadeUp}
            whileHover={{ y: -5, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
            <p className="text-stone-600 text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
