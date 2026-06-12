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
      <div className="text-center mb-12">
        <motion.span
          className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold block"
          variants={fadeUp}
        >
          Kuhusu Sisi
        </motion.span>
        <motion.h2
          className="text-3xl font-bold mt-2"
          variants={fadeUp}
        >
          Nyama bora, inayotoka kwa uwajibikaji.
        </motion.h2>
      </div>

      <motion.div className="space-y-5 max-w-3xl mx-auto" variants={stagger}>
        <motion.p
          className="text-stone-600 leading-relaxed"
          variants={fadeUp}
        >
          Tuliho Meat ni mtoa huduma bora wa nyama makao yake makuu Iringa, Tanzania. Tunabobea
          katika kuwasilisha bidhaa za nyama safi za shambani zenye ubora wa juu kwa kaya, migahawa,
          na biashara kote mkoani.
        </motion.p>

        <motion.p
          className="text-stone-600 leading-relaxed"
          variants={fadeUp}
        >
          Kujitolea kwetu kwa ubora kunaanzia kwenye chanzo. Tunashirikiana na mashamba ya ndani yanayoaminika
          ambayo yanashiriki maadili yetu ya ufugaji bora na mazoea endelevu. Kila
          kipande kinashughulikiwa kwa uangalifu, kutoka shambani hadi mezani.
        </motion.p>

        <motion.p
          className="text-stone-600 leading-relaxed"
          variants={fadeUp}
        >
          Kwa miaka ya uzoefu katika tasnia ya nyama, timu yetu inaleta utaalamu na
          kujitolea kwa kila agizo. Iwe unahitaji kipande kimoja cha chakula cha jioni au ugavi wa jumla
          kwa biashara yako, Tuliho Meat inatoa ubora wa hali ya juu.
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-12 grid sm:grid-cols-3 gap-6"
        variants={stagger}
      >
        <motion.div
          className="bg-white p-8 rounded-xl border border-stone-200 text-center hover:shadow-lg transition-all"
          variants={fadeUp}
          whileHover={{ y: -5, boxShadow: '0 16px 32px rgba(0,0,0,0.1)' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="text-3xl font-bold text-meat-red">2014</div>
          <div className="text-stone-500 text-sm mt-1.5">Ilianzishwa</div>
        </motion.div>
        <motion.div
          className="bg-white p-8 rounded-xl border border-stone-200 text-center hover:shadow-lg transition-all"
          variants={fadeUp}
          whileHover={{ y: -5, boxShadow: '0 16px 32px rgba(0,0,0,0.1)' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="text-3xl font-bold text-meat-red">Mafinga Iringa</div>
          <div className="text-stone-500 text-sm mt-1.5">Makao Yake</div>
        </motion.div>
        <motion.div
          className="bg-white p-8 rounded-xl border border-stone-200 text-center hover:shadow-lg transition-all"
          variants={fadeUp}
          whileHover={{ y: -5, boxShadow: '0 16px 32px rgba(0,0,0,0.1)' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="text-3xl font-bold text-meat-red">100%</div>
          <div className="text-stone-500 text-sm mt-1.5">Dhamana ya Ubora</div>
        </motion.div>
      </motion.div>

      <motion.div className="mt-16 max-w-3xl mx-auto" variants={stagger}>
        <motion.span
          className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold block"
          variants={fadeUp}
        >
          Mwanzilishi
        </motion.span>
        <motion.h2
          className="text-3xl font-bold mt-2 mb-6"
          variants={fadeUp}
        >
          Dickson Nyahi
        </motion.h2>
        <motion.p
          className="text-stone-600 leading-relaxed mb-3 text-lg font-medium"
          variants={fadeUp}
        >
          Mwanzilishi & Mwenye Biashara
        </motion.p>
        <motion.p
          className="text-stone-600 leading-relaxed"
          variants={fadeUp}
        >
          Dickson Nyahi ndiye mwanzilishi na mmiliki wa Tuliho Meat. Kwa maono ya kuleta
          nyama bora na safi kwa jamii ya Iringa na Tanzania kwa ujumla, amejenga biashara
          inayotanguliza ubora, uadilifu, na huduma kwa wateja. Uongozi wake umeleta
          mageuzi katika sekta ya nyama, kuhakikisha kila kipande kinachofika kwa wateja
          ni cha ubora wa juu.
        </motion.p>
      </motion.div>
    </motion.section>
  )
}
