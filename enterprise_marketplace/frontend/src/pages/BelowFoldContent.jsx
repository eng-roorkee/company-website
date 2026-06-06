import { motion, useMotionValue, useAnimationFrame } from 'framer-motion'
import { useEffect, useRef } from 'react'
import meatImg from '../assets/meat.webp'
import meat1Img from '../assets/meat1.webp'
import cowImg from '../assets/cow.webp'
import cow1Img from '../assets/cow1.webp'
import cow3Img from '../assets/cow3.webp'
import mainiImg from '../assets/maini.webp'
import maini2Img from '../assets/maini2.webp'
import utumboImg from '../assets/utumbo.webp'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const galleryImages = [meatImg, cowImg, meat1Img, cow1Img, maini2Img, cow3Img, utumboImg, mainiImg]

const features = [
  {
    title: 'Vipande vya Nyama',
    images: [meatImg, cowImg, cow1Img],
    desc: 'Ribeye, T-bone, fillet, nyama ya kusaga, na nyama ya kitoweo  inayolishwa nyasi, inayotoka hapa kwetu.',
  },
  {
    title: 'Kuku ',
    images: [maini2Img, mainiImg],
    desc: 'Kuku wa broiler,na kloiler zaidi safi na kushughulikiwa kwa uangalifu.',
  },
  {
    title: 'Bidhaa Maalum',
    images: [utumboImg, meat1Img, cow3Img],
    desc: 'Russian sausage, beef Vienna, vifurushi vya barbeque kitu kwa kila meza.',
  },
]

function ScrollingStrip({ images, direction = 1, speed = 0.5 }) {
  const x = useMotionValue(0)
  const hovered = useRef(false)
  const totalRef = useRef(0)

  useEffect(() => {
    totalRef.current = window.innerWidth * 2
  }, [])

  useAnimationFrame((_, delta) => {
    if (hovered.current) return
    let newX = x.get() + direction * speed * (delta / 16)
    if (direction > 0 && newX >= 0) newX = -totalRef.current
    else if (direction < 0 && newX <= -totalRef.current) newX = 0
    x.set(newX)
  })

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => { hovered.current = true }}
      onMouseLeave={() => { hovered.current = false }}
    >
      <motion.div className="flex gap-6" style={{ x }}>
        {[...images, ...images].map((src, i) => (
          <div
            key={i}
            className="shrink-0 overflow-hidden rounded-2xl bg-stone-100 shadow-sm"
            style={{ width: 260, height: 190 }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function BelowFoldContent() {
  return (
    <>
      <motion.section
        className="py-20 px-4 max-w-3xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={stagger}
      >
        <motion.span
          className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold block"
          variants={fadeUp}
        >
          Sauti ya Wateja
        </motion.span>
        <motion.blockquote
          className="mt-6 text-lg sm:text-xl text-stone-600 italic leading-relaxed"
          variants={fadeUp}
        >
          &ldquo;Ubora wa nyama haulinganishwi. Safi, imekatwa vizuri, na kufikishwa kwa wakati.
          Tuliho Meat imekuwa msambazaji wetu wa tegemeo.&rdquo;
        </motion.blockquote>
        <motion.p className="mt-4 text-stone-500 text-sm" variants={fadeUp}>
          &mdash; Michael Owen, Iringa
        </motion.p>
      </motion.section>

      <section className="py-20 bg-white overflow-hidden border-y border-stone-100">
        <motion.div
          className="px-4 max-w-6xl mx-auto mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
        >
          <motion.span
            className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold block"
            variants={fadeUp}
          >
            Kutoka kwenye Nyumba ya Picha Zetu
          </motion.span>
          <motion.h2
            className="text-3xl font-bold mt-2 text-meat-dark"
            variants={fadeUp}
          >
            Nyama safi, picha safi.
          </motion.h2>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <ScrollingStrip images={galleryImages} direction={1} speed={0.3} />
        </div>
      </section>

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
            Aina Zetu
          </motion.span>
          <motion.h2
            className="text-3xl font-bold mt-2 text-meat-dark"
            variants={fadeUp}
          >
            Vipande bora, kila wakati.
          </motion.h2>
        </div>
        <motion.div
          className="grid sm:grid-cols-3 gap-8"
          variants={stagger}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-stone-200 group"
              variants={fadeUp}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={f.images[0]}
                  alt={f.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 text-meat-dark">{f.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="relative bg-meat-dark text-white py-20 px-4 text-center overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={stagger}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(128,25,25,0.15),transparent_70%)]" />
        <motion.div className="relative max-w-2xl mx-auto" variants={fadeUp}>
          <h2 className="text-3xl font-bold">Weka Agizo Lako Leo</h2>
          <p className="mt-3 text-stone-300">Wasiliana nasi kupitia WhatsApp au kutupigia simu.</p>
          <motion.a
            href="https://wa.me/255672203073"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-meat-red text-white px-10 py-3.5 rounded font-semibold hover:bg-meat-red/90 transition-all hover:shadow-lg hover:shadow-meat-red/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ongea kwenye WhatsApp
          </motion.a>
        </motion.div>
      </motion.section>
    </>
  )
}
