import { useState } from 'react'
import { motion } from 'framer-motion'
import meatImg from '../assets/meat.webp'
import utumboImg from '../assets/utumbo.webp'
import kuroilerImg from '../assets/kuroiler-meat.webp'
import broilerImg from '../assets/broiler-chicken.webp'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const products = [
  {
    name: 'Nyama ya Ng\'ombe (Beef)',
    price: 12000,
    image: meatImg,
    isUpdated: true,
    category: 'Beef',
  },
  {
    name: 'Utumbo (Tripe)',
    price: 8000,
    image: utumboImg,
    isUpdated: true,
    category: 'Beef',
  },
  {
    name: 'Kroiler Chicken',
    image: kuroilerImg,
    category: 'Poultry',
    variants: [
      { weight: 'Kroiler Chicken (Above 2 KG)', price: 20000 },
      { weight: 'Kroiler Chicken (1.5KG - 1.9KG)', price: 18000 },
      { weight: 'Kroiler Chicken (1.1KG - 1.4KG)', price: 15000 },
    ],
  },
  {
    name: 'Broiler Chicken',
    image: broilerImg,
    category: 'Poultry',
    variants: [
      { weight: 'Broiler Chicken (1.1KG - 1.4KG)', price: 9500 },
      { weight: 'Broiler Chicken (1.5 - 2KG)', price: 11000 },
    ],
  },
]

function ProductCard({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants ? product.variants[0] : null
  )

  const displayPrice = product.variants ? selectedVariant.price : product.price
  const displayPriceLabel = `${displayPrice.toLocaleString('en-TZ')} TSHS`

  const handleAddToCart = () => {
    const item = product.variants
      ? { ...product, variant: selectedVariant }
      : product
    alert(`Imeongezwa kwenye kikapu:\n${item.name}${item.variant ? ` - ${item.variant.weight}` : ''}\n${displayPriceLabel}`)
  }

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm group flex flex-col"
      variants={fadeUp}
      whileHover={{ y: -6, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <motion.img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6 }}
          loading="lazy"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <span className="text-[11px] uppercase tracking-[0.15em] text-meat-red font-semibold">
          {product.category}
        </span>

        <h3 className="font-bold text-base mt-1 leading-snug text-meat-dark">
          {product.name}
        </h3>

        {product.isUpdated && (
          <span className="mt-2 self-start bg-amber-100 text-amber-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            Bei Mpya
          </span>
        )}

        <div className="mt-auto pt-4 space-y-3">
          {product.variants && (
            <select
              value={selectedVariant?.weight || ''}
              onChange={(e) => {
                const v = product.variants.find((v) => v.weight === e.target.value)
                if (v) setSelectedVariant(v)
              }}
              className="w-full text-sm border border-stone-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-meat-red/40 text-stone-700"
            >
              {product.variants.map((v) => (
                <option key={v.weight} value={v.weight}>
                  {v.weight}
                </option>
              ))}
            </select>
          )}

          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-meat-red">
              {displayPriceLabel}
            </span>
          </div>
{/* 
          <button
            onClick={handleAddToCart}
            className="w-full bg-meat-red hover:bg-meat-red/90 text-white text-sm font-semibold uppercase tracking-wider py-2.5 rounded-lg transition-colors"
          >
            Weka Kwenye Kikapu
          </button> */}
        </div>
      </div>
    </motion.div>
  )
}

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
        Bidhaa Zetu
      </motion.span>
      <motion.h2
        className="text-3xl font-bold mt-2 mb-2"
        variants={fadeUp}
      >
        Vipande vibichi, bei nafuu.
      </motion.h2>
      <motion.p
        className="text-stone-600 mb-12 max-w-xl"
        variants={fadeUp}
      >
        Nyama safi ya ng'ombe na kuku — kila kipande, kila ndege, kimeshughulikiwa kwa uangalifu.
      </motion.p>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={stagger}
      >
        {products.map((p) => (
          <ProductCard key={p.name} product={p} />
        ))}
      </motion.div>
    </motion.section>
  )
}
