import { motion } from 'framer-motion'
import meatImg from '../assets/meat.webp'
import meat1Img from '../assets/meat1.webp'
import cowImg from '../assets/cow.webp'
import cow1Img from '../assets/cow1.webp'
import cow3Img from '../assets/cow3.webp'
import maini2Img from '../assets/maini2.webp'
import utumboImg from '../assets/utumbo.webp'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const productImages = [
  meatImg, cowImg, cow1Img, meat1Img, cow3Img, maini2Img,
  meatImg, cowImg, cow1Img, utumboImg, cow3Img, maini2Img,
]

const products = [
  { name: 'Oxtail Meat', category: 'Beef', image: '/placeholder.jpg' },
  { name: 'T-Bone Steak', category: 'Beef', image: '/placeholder.jpg' },
  { name: 'Beef Mince', category: 'Beef', image: '/placeholder.jpg' },
  { name: 'Russian Sausage', category: 'Specialty', image: '/placeholder.jpg' },
  { name: 'Beef Stew', category: 'Beef', image: '/placeholder.jpg' },
  { name: 'Beef Fillet', category: 'Beef', image: '/placeholder.jpg' },
  { name: 'Barbeque Pack', category: 'Specialty', image: '/placeholder.jpg' },
  { name: 'Sato Fish', category: 'Fish', image: '/placeholder.jpg' },
  { name: 'Broiler Chicken', category: 'Poultry', image: '/placeholder.jpg' },
  { name: 'Beef Vienna', category: 'Specialty', image: '/placeholder.jpg' },
  { name: 'Rib Eye', category: 'Beef', image: '/placeholder.jpg' },
  { name: 'Fillet Sangara', category: 'Fish', image: '/placeholder.jpg' },
]

export default function Products() {
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
        Our Products
      </motion.span>
      <motion.h2
        className="text-3xl font-bold mt-2 mb-2"
        variants={fadeUp}
      >
        Premium meat cuts.
      </motion.h2>
      <motion.p
        className="text-stone-600 mb-12 max-w-xl"
        variants={fadeUp}
      >
        Every cut sourced fresh, handled with care, and delivered to your door.
      </motion.p>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={stagger}
      >
        {products.map((p, i) => (
          <motion.div
            key={p.name}
            className="bg-white rounded-lg overflow-hidden border border-stone-200 shadow-sm group"
            variants={fadeUp}
            whileHover={{ y: -6, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="relative h-48 overflow-hidden bg-stone-200">
              <motion.img
                src={productImages[i]}
                alt={p.name}
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <span className="text-xs uppercase tracking-widest text-meat-red font-semibold">
                {p.category}
              </span>
              <h3 className="font-semibold text-lg mt-1">{p.name}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
