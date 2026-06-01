import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import coverpage from '../assets/coverpage.jpg'
import meatImg from '../assets/meat.jpg'
import meat1Img from '../assets/meat1.jpg'
import cowImg from '../assets/cow.jpg'
import cow1Img from '../assets/cow1.jpg'
import cow3Img from '../assets/cow3.jpg'
import mainiImg from '../assets/maini.jpg'
import maini2Img from '../assets/maini2.jpg'
import utumboImg from '../assets/utumbo.jpg'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const stats = [
  { label: 'Years in Business', value: '10+' },
  { label: 'Premium Cuts', value: '25+' },
  { label: 'Happy Customers', value: '5,000+' },
  { label: 'Farm Partnerships', value: '12' },
]

const galleryImages = [meatImg, cowImg, meat1Img, cow1Img, maini2Img, cow3Img, utumboImg, mainiImg]

const features = [
  {
    title: 'Beef Cuts',
    images: [meatImg, cowImg, cow1Img],
    desc: 'Ribeye, T-bone, fillet, mince, and stew meat — grass-fed, locally sourced.',
  },
  {
    title: 'Poultry & Fish',
    images: [maini2Img, mainiImg],
    desc: 'Broiler chicken, sató fish, and more — fresh and handled with care.',
  },
  {
    title: 'Specialty Products',
    images: [utumboImg, meat1Img, cow3Img],
    desc: 'Russian sausage, beef Vienna, barbeque packs — something for every table.',
  },
]

function GalleryCard({ src }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg aspect-[4/3] bg-stone-800"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.04 }}
    >
      <motion.img
        src={src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={loaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
      {!loaded && (
        <div className="absolute inset-0 bg-stone-700 animate-pulse" />
      )}
    </motion.div>
  )
}

export default function Home() {
  return (
    <>
      <section
        className="relative text-white text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${coverpage})` }}
      >
        <div className="absolute inset-0 bg-meat-dark/70" />
        <div className="relative z-10 py-24 px-4">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.span
              className="text-meat-accent text-sm uppercase tracking-[0.2em] font-semibold block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Farm-Fresh · Since 2014
            </motion.span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-4 leading-tight">
              Premium Meat,<br />Rooted in Quality.
            </h1>
            <motion.p
              className="mt-4 text-stone-300 text-lg max-w-xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Tuliho Meat delivers farm-fresh premium cuts to your doorstep.
              Quality you can taste, service you can trust.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link
                to="/products"
                className="bg-meat-red text-white px-8 py-3 rounded font-semibold hover:bg-meat-red/90 transition-colors"
              >
                View Products
              </Link>
              <a
                href="https://wa.me/255672203073?text=Hello%20Tuliho%20Meat%2C%20I%20would%20like%20to%20place%20an%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white text-white px-8 py-3 rounded font-semibold hover:bg-white/10 transition-colors"
              >
                Order via WhatsApp
              </a>
            </motion.div>
          </motion.div>
          <motion.div
            className="max-w-6xl mx-auto mt-16 px-4 grid grid-cols-2 sm:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp}>
                <div className="text-2xl font-bold text-meat-accent">{s.value}</div>
                <div className="text-stone-400 text-sm mt-1 uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
          Customer Voice
        </motion.span>
        <motion.blockquote
          className="mt-6 text-lg sm:text-xl text-stone-600 italic leading-relaxed"
          variants={fadeUp}
        >
          &ldquo;The quality of the meat is unmatched. Fresh, properly cut, and delivered on time.
          Tuliho Meat has become our go-to supplier.&rdquo;
        </motion.blockquote>
        <motion.p className="mt-4 text-stone-500 text-sm" variants={fadeUp}>
          &mdash; Michael Owen, Iringa
        </motion.p>
      </motion.section>

      <motion.section
        className="py-16 px-4 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={stagger}
      >
        <motion.span
          className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold block"
          variants={fadeUp}
        >
          From Our Gallery
        </motion.span>
        <motion.h2
          className="text-3xl font-bold mt-2 mb-10 text-meat-dark"
          variants={fadeUp}
        >
          Fresh cuts, captured fresh.
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          variants={stagger}
        >
          {galleryImages.map((src, i) => (
            <GalleryCard key={i} src={src} />
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="py-16 px-4 max-w-6xl mx-auto border-t border-stone-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={stagger}
      >
        <motion.span
          className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold block"
          variants={fadeUp}
        >
          Our Range
        </motion.span>
        <motion.h2
          className="text-3xl font-bold mt-2 mb-10 text-meat-dark"
          variants={fadeUp}
        >
          Quality cuts, every time.
        </motion.h2>
        <motion.div
          className="grid sm:grid-cols-3 gap-8"
          variants={stagger}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-stone-200 group"
              variants={fadeUp}
              whileHover={{ y: -8, boxShadow: '0 16px 32px rgba(0,0,0,0.12)' }}
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
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="bg-meat-dark text-white py-16 px-4 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={stagger}
      >
        <motion.div className="max-w-2xl mx-auto" variants={fadeUp}>
          <h2 className="text-2xl font-bold">Place Your Order Today</h2>
          <p className="mt-2 text-stone-300">Reach out on WhatsApp or give us a call.</p>
          <motion.a
            href="https://wa.me/+255672203073"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-meat-red text-white px-8 py-3 rounded font-semibold hover:bg-meat-red/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Chat on WhatsApp
          </motion.a>
        </motion.div>
      </motion.section>
    </>
  )
}
