import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../services/api'
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

const catalog = [
  {
    name: 'Nyama ya Ng\'ombe (Beef)',
    price: 12000,
    image: meatImg,
    category: 'Beef',
    matchKey: 'nyama-ya-ngombe',
  },
  {
    name: 'Utumbo (Tripe)',
    price: 8000,
    image: utumboImg,
    category: 'Beef',
    matchKey: 'utumbo',
  },
  {
    name: 'Kroiler Chicken',
    image: kuroilerImg,
    category: 'Poultry',
    matchKey: 'kroiler',
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
    matchKey: 'broiler',
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

  const displayPrice = product.variants ? selectedVariant?.price : product.price
  const displayPriceLabel = displayPrice != null ? `${displayPrice.toLocaleString('en-TZ')} TSHS` : '—'

  const handleAddToCart = () => {
    const item = product.variants
      ? { ...product, variant: selectedVariant }
      : product
    alert(`Imeongezwa kwenye kikapu:\n${item.name}${item.variant ? ` - ${item.variant.weight}` : ''}\n${displayPriceLabel}`)
  }

  const imgSrc = product.image

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm group flex flex-col"
      variants={fadeUp}
      whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(0,0,0,0.1)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        {imgSrc ? (
          <motion.img
            src={imgSrc}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6 }}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-stone-300 text-sm">
            Hakuna picha
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-meat-red text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full shadow-sm">
            {product.category || 'Bidhaa'}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-base leading-snug text-meat-dark">
          {product.name}
        </h3>

        {product.is_special_offer && (
          <span className="mt-2 self-start bg-amber-100 text-amber-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            Ofa Maalum
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
              className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2.5 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-meat-red/30 focus:border-meat-red text-stone-700"
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
          <button
            onClick={handleAddToCart}
            className="w-full bg-meat-red hover:bg-meat-red/90 text-white text-sm font-semibold uppercase tracking-wider py-2.5 rounded-lg transition-all hover:shadow-md hover:shadow-meat-red/20 active:scale-[0.98]"
          >
            Weka Kwenye Kikapu
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Products() {
  const [priceMap, setPriceMap] = useState({})
  const [offerMap, setOfferMap] = useState({})
  const [pricesLoaded, setPricesLoaded] = useState(false)

  useEffect(() => {
    api.get('/api/v1/products')
      .then(({ data }) => {
        const pm = {}
        const om = {}
        data.forEach((p) => {
          const key = p.name.toLowerCase().replace(/[^a-z]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
          pm[key] = p.price
          om[key] = p.is_special_offer
        })
        setPriceMap(pm)
        setOfferMap(om)
        setPricesLoaded(true)
      })
      .catch(() => {
        setPricesLoaded(true)
      })
  }, [])

  const products = catalog.map((item) => {
    const key = pricesLoaded ? item.matchKey : null
    let price = item.price
    let isSpecial = false

    if (key && priceMap[key] != null) {
      price = priceMap[key]
    }
    if (key && offerMap[key] != null) {
      isSpecial = offerMap[key]
    }

    if (item.variants) {
      return {
        ...item,
        variants: item.variants.map((v) => ({
          ...v,
          price: key && priceMap[`${key}-${v.weight.toLowerCase().replace(/[^a-z0-9]/g, '-')}`] != null
            ? priceMap[`${key}-${v.weight.toLowerCase().replace(/[^a-z0-9]/g, '-')}`]
            : v.price,
        })),
      }
    }

    return { ...item, price, is_special_offer: isSpecial }
  })

  return (
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
          Bidhaa Zetu
        </motion.span>
        <motion.h2
          className="text-3xl font-bold mt-2"
          variants={fadeUp}
        >
          Vipande vibichi, bei nafuu.
        </motion.h2>
        <motion.p
          className="text-stone-500 mt-2 max-w-xl mx-auto"
          variants={fadeUp}
        >
          Nyama safi ya ng'ombe na kuku — kila kipande, kila ndege, kimeshughulikiwa kwa uangalifu.
        </motion.p>
      </div>

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
