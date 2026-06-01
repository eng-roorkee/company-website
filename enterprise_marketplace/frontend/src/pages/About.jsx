import { motion } from 'framer-motion'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function About() {
  return (
    <motion.section
      className="py-20 px-4 max-w-4xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={stagger}
    >
      <motion.span
        className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold block"
        variants={fadeUp}
      >
        About Us
      </motion.span>
      <motion.h2
        className="text-3xl font-bold mt-2 mb-6"
        variants={fadeUp}
      >
        Quality meat, responsibly sourced.
      </motion.h2>

      <motion.p
        className="text-stone-600 leading-relaxed mb-6"
        variants={fadeUp}
      >
        Tuliho Meat is a premier meat provider based in Iringa, Tanzania. We specialize
        in delivering high-quality, farm-fresh meat products to households, restaurants,
        and businesses across the region.
      </motion.p>

      <motion.p
        className="text-stone-600 leading-relaxed mb-6"
        variants={fadeUp}
      >
        Our commitment to quality starts at the source. We partner with trusted local farms
        that share our values of ethical animal husbandry and sustainable practices. Every
        cut is handled with care, from pasture to plate.
      </motion.p>

      <motion.p
        className="text-stone-600 leading-relaxed"
        variants={fadeUp}
      >
        With years of experience in the meat industry, our team brings expertise and
        dedication to every order. Whether you need a single cut for dinner or wholesale
        supply for your business, Tuliho Meat delivers excellence.
      </motion.p>

      <motion.div
        className="mt-10 grid sm:grid-cols-3 gap-6 text-center"
        variants={stagger}
      >
        <motion.div
          className="bg-white p-6 rounded-lg border border-stone-200"
          variants={fadeUp}
          whileHover={{ y: -5, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="text-2xl font-bold text-meat-red">2014</div>
          <div className="text-stone-500 text-sm mt-1">Founded</div>
        </motion.div>
        <motion.div
          className="bg-white p-6 rounded-lg border border-stone-200"
          variants={fadeUp}
          whileHover={{ y: -5, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="text-2xl font-bold text-meat-red">Mafinga Iringa</div>
          <div className="text-stone-500 text-sm mt-1">Based in</div>
        </motion.div>
        <motion.div
          className="bg-white p-6 rounded-lg border border-stone-200"
          variants={fadeUp}
          whileHover={{ y: -5, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="text-2xl font-bold text-meat-red">100%</div>
          <div className="text-stone-500 text-sm mt-1">Quality Guarantee</div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
