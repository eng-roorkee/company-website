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
    title: 'Butchering',
    desc: 'Full animal butchering service — custom cuts prepared to your specifications with precision and care.',
  },
  {
    title: 'Delivery',
    desc: 'Fast, reliable delivery across Mafinga and surrounding areas. Your order arrives fresh and on time.',
  },
  {
    title: 'Catering',
    desc: 'Premium meat catering for events, gatherings, and special occasions. Custom orders welcome.',
  },
  {
    title: 'Wholesale',
    desc: 'Bulk meat supply for restaurants, hotels, and food service businesses. Competitive pricing.',
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
        Our Services
      </motion.span>
      <motion.h2
        className="text-3xl font-bold mt-2 mb-2"
        variants={fadeUp}
      >
        Service you can trust.
      </motion.h2>
      <motion.p
        className="text-stone-600 mb-12 max-w-xl"
        variants={fadeUp}
      >
        From custom butchering to wholesale supply — we serve every need.
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
