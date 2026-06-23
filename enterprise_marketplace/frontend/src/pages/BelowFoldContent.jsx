import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from 'framer-motion'
import { Link } from 'react-router-dom'
import api from '../services/api'

// Core assets
import meatImg from '../assets/meat.webp'
import meat1Img from '../assets/meat1.webp'
import cowImg from '../assets/cow.webp'
import cow1Img from '../assets/cow1.webp'
import cow3Img from '../assets/cow3.webp'
import mainiImg from '../assets/maini.webp'
import maini2Img from '../assets/maini2.webp'
import utumboImg from '../assets/utumbo.webp'

// Recipe assets (newly generated)
import recipeSteakImg from '../assets/recipe-steak.png'
import recipeStewImg from '../assets/recipe-stew.png'
import recipeBbqImg from '../assets/recipe-bbq.png'
import recipeSkewersImg from '../assets/recipe-skewers.png'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

const galleryImages = [meatImg, cowImg, meat1Img, cow1Img, maini2Img, cow3Img, utumboImg, mainiImg]

const oldFeatures = [
  {
    title: 'Vipande vya Nyama',
    images: [meatImg, cowImg, cow1Img],
    desc: 'Ribeye, T-bone, fillet, nyama ya kusaga, na nyama ya kitoweo inayolishwa nyasi, inayotoka hapa kwetu.',
  },
  {
    title: 'Kuku',
    images: [maini2Img, mainiImg],
    desc: 'Kuku wa broiler, na kuroiler zaidi safi na kushughulikiwa kwa uangalifu.',
  },
  {
    title: 'Bidhaa Maalum',
    images: [utumboImg, meat1Img, cow3Img],
    desc: 'Russian sausage, beef Vienna, vifurushi vya barbeque kitu kwa kila meza.',
  },
]

// 1. Amazon-Style Shop by Category banners data
const categories = [
  {
    title: 'Nyama ya Ng\'ombe Bora',
    subtitle: 'Vipande safi vilivyochaguliwa kwa mikono',
    image: meatImg,
    link: '/products',
    badge: 'Maarufu Zaidi',
    gridClass: 'md:col-span-2',
  },
  {
    title: 'Kuku Safi wa Shambani',
    subtitle: 'Broiler & Kroiler bora',
    image: maini2Img,
    link: '/products',
    badge: '100% Organiki',
    gridClass: 'md:col-span-1',
  },
  {
    title: 'Utumbo na Bidhaa Maalum',
    subtitle: 'Viungo asili kwa ladha halisi',
    image: utumboImg,
    link: '/products',
    badge: 'Ofa Maalum',
    gridClass: 'md:col-span-1',
  },
  {
    title: 'Vifurushi vya Familia & BBQ',
    subtitle: 'Chaguo kamili kwa sherehe na sikukuu',
    image: cow3Img,
    link: '/products',
    badge: 'Thamani Bora',
    gridClass: 'md:col-span-2',
  },
]

// 2. Featured / Best Seller Products (Amazon style)
const featuredProducts = [
  { name: 'Nyama ya Ng\'ombe (Beef Filet)', price: '12,000 TZS', image: meatImg },
  { name: 'Kroiler Chicken (Above 2 KG)', price: '20,000 TZS', image: maini2Img },
  // { name: 'Broiler Chicken (1.5 - 2KG)', price: '11,000 TZS', image: mainiImg },
  { name: 'Utumbo Safi (Beef Tripe)', price: '8,000 TZS', image: utumboImg },
]

// 3. Rotating Testimonials
const testimonials = [
  {
    quote: "Ubora wa nyama haulinganishwi. Safi, imekatwa vizuri, na kufikishwa kwa wakati. Tuliho Meat imekuwa msambazaji wetu wa tegemeo wa kila siku.",
    author: "Michael Owen",
    role: "Mpishi Mkuu, Iringa Hotel",
    stars: 5,
  },
  {
    quote: "Kuku wao wa Kroiler ni watamu sana na wana ukubwa unaoridhisha sana. Tangu nianze kununua hapa, familia yangu hawataki nyama nyingine kabisa!",
    author: "Grace Mushi",
    role: "Mama wa Nyumbani, Mafinga",
    stars: 5,
  },
  {
    quote: "Huduma yao ya wateja kupitia WhatsApp ni ya haraka sana. Ninaagiza asubuhi na kufikishiwa mlangoni kwangu kabla ya saa sita mchana. Safi sana!",
    author: "Josephat Kessy",
    role: "Mmiliki wa Mgahawa, Iringa",
    stars: 5,
  },
]

// 4. Recipe ideas (Zummo style)
const recipes = [
  {
    title: 'Steak ya Ng\'ombe ya Kuchoma',
    desc: 'Jinsi ya kupika steak laini na yenye ladha nzuri kwa kutumia vipande vyetu vya Ribeye au T-Bone.',
    image: recipeSteakImg,
    prepTime: 'Dakika 25',
    difficulty: 'Rahisi',
  },
  {
    title: 'Mchuzi wa Nyama Maalum',
    desc: 'Mchuzi mzito wa nyama ya ng\'ombe ya Tuliho iliyochemshwa taratibu na mboga za majani.',
    image: recipeStewImg,
    prepTime: 'Dakika 45',
    difficulty: 'Kawaida',
  },
  {
    title: 'BBQ Mishkaki yenye Viungo asilia',
    desc: 'Siri ya kutengeneza mishkaki laini ya nyama ya ng\'ombe na kuku kwa ajili ya sherehe yako ya nyumbani.',
    image: recipeSkewersImg,
    prepTime: 'Dakika 30',
    difficulty: 'Rahisi',
  },
  {
    title: 'Platter Kubwa ya Nyama Choma',
    desc: 'Changanyiko wa soseji, mbavu za ng\'ombe, na kuku wa kuchoma ukiwa na michuzi mitamu ya pembeni.',
    image: recipeBbqImg,
    prepTime: 'Saa 1',
    difficulty: 'Kati',
  },
]

// Custom Scrolling Gallery component
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
      className="overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseEnter={() => { hovered.current = true }}
      onMouseLeave={() => { hovered.current = false }}
    >
      <motion.div className="flex gap-6" style={{ x }}>
        {[...images, ...images, ...images].map((src, i) => (
          <motion.div
            key={i}
            className="shrink-0 overflow-hidden rounded-2xl bg-stone-100 shadow-md group relative"
            style={{ width: 300, height: 210 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white text-xs font-semibold uppercase tracking-wider">Ubora Wetu Kila Siku</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default function BelowFoldContent() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Auto rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    try {
      await api.post('/api/v1/newsletter', { email })
      setSubscribed(true)
      setEmail('')
    } catch {
      if (!confirm('Tumeshindwa kusajili barua pepe yako. Tafadhali jaribu tena.')) return
    }
  }

  return (
    <div className="space-y-0 overflow-hidden">

      {/* 1. Trust Badges Strip (Amazon/Zummo style) */}
      <section className="bg-white border-y border-stone-200/80 py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-meat-red/10 flex items-center justify-center text-meat-red mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="font-bold text-sm text-meat-dark">100% Nyama Safi</h4>
            <p className="text-xs text-stone-500 mt-1">Bila kemikali wala vihifadhi</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-meat-red/10 flex items-center justify-center text-meat-red mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-bold text-sm text-meat-dark">Bei Nafuu Kabisa</h4>
            <p className="text-xs text-stone-500 mt-1">Viwango bora vya bei sokoni</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-meat-red/10 flex items-center justify-center text-meat-red mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="font-bold text-sm text-meat-dark">Kutoka Mashamba ya Ndani</h4>
            <p className="text-xs text-stone-500 mt-1">Tunasaidia wafugaji wa hapa Iringa</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-meat-red/10 flex items-center justify-center text-meat-red mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="font-bold text-sm text-meat-dark">Usafirishaji wa Haraka</h4>
            <p className="text-xs text-stone-500 mt-1">Inafika ikiwa safi mlangoni kwako</p>
          </div>
        </div>
      </section>

      {/* 2. Shop by Category (Amazon Grid Style) */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
        >
          <span className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold block">Chagua Aina</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 text-meat-dark">Nunua Kwa Jamii</h2>
          <div className="section-divider mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              className={`relative overflow-hidden rounded-3xl h-[260px] md:h-[320px] group shadow-lg ${cat.gridClass}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-meat-red text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {cat.badge}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl sm:text-2xl font-bold leading-tight">{cat.title}</h3>
                <p className="text-stone-300 text-xs sm:text-sm mt-1">{cat.subtitle}</p>
                <Link
                  to={cat.link}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-meat-gold hover:text-white transition-colors mt-4"
                >
                  Nunua Sasa
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Our Story / Brand Heritage (Zummo Style) */}
      <section className="py-20 bg-stone-100/60 border-y border-stone-200/40 relative">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleUp}
          >
            <div className="absolute -inset-3 bg-meat-red/10 rounded-3xl -rotate-2 scale-[1.02] -z-10" />
            <div className="overflow-hidden rounded-3xl shadow-xl aspect-[4/3]">
              <img
                src={cowImg}
                alt="Brand Heritage"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-stone-100 hidden sm:block">
              <div className="text-center">
                <span className="text-4xl font-extrabold text-meat-red">10+</span>
                <span className="block text-xs uppercase tracking-widest font-semibold text-stone-500 mt-1">Miaka ya Uzoefu</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold block" variants={fadeUp}>
              Kuhusu Tuliho Meat
            </motion.span>
            <motion.h2 className="text-3xl sm:text-4xl font-extrabold text-meat-dark" variants={fadeUp}>
              Urithi wa Ladha Halisi, Nyama ya Kweli.
            </motion.h2>
            <div className="w-16 h-1 bg-meat-red rounded" />
            <motion.p className="text-stone-600 text-sm sm:text-base leading-relaxed" variants={fadeUp}>
              Tuliho Meat ilianza na maono rahisi: kuwaletea wakazi wa Iringa na maeneo jirani bidhaa za nyama zenye viwango vya juu zaidi vya usafi na ubora. Tunashirikiana kwa karibu sana na wafugaji wa ndani wanaolisha wanyama wao kwa majani asilia, kuhakikisha unapata ladha halisi na nyama yenye afya bora.
            </motion.p>
            <motion.p className="text-stone-600 text-sm sm:text-base leading-relaxed" variants={fadeUp}>
              Kila kipande cha nyama kinatayarishwa kwa uangalifu na wataalamu wetu, na kufungwa kwenye vifungashio salama. Huu si tu ugavi wa nyama, ni dhamira yetu ya kuleta furaha na afya kwenye meza ya familia yako.
            </motion.p>
            <motion.div className="pt-4" variants={fadeUp}>
              <Link
                to="/about"
                className="bg-meat-dark hover:bg-meat-red text-white px-8 py-3.5 rounded-xl font-semibold uppercase tracking-wider text-xs transition-all duration-300 shadow-md inline-flex items-center gap-2"
              >
                Soma Story Yetu
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Featured Best Sellers Showcase (Amazon style carousel-ish grid) */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <span className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold block">Zinazopendwa Sasa</span>
            <h2 className="text-3xl font-extrabold mt-1 text-meat-dark">Bidhaa Maarufu Zaidi</h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold uppercase tracking-wider text-meat-red hover:text-meat-dark transition-colors inline-flex items-center gap-1.5 mt-4 sm:mt-0"
          >
            Tazama Zote
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xl border border-stone-200/60 overflow-hidden shadow-sm group flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6, boxShadow: '0 12px 24px rgba(0,0,0,0.08)' }}
            >
              <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-white/95 backdrop-blur-sm text-[10px] text-meat-red font-bold uppercase px-2 py-0.5 rounded-full shadow-sm">
                    Best Seller
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-sm sm:text-base text-meat-dark line-clamp-1">{p.name}</h3>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="text-meat-red font-bold text-sm sm:text-base">{p.price}</span>
                  <a
                    href={`https://wa.me/255672203073?text=Habari%20Tuliho%20Meat%2C%20ningependa%20kuagiza%20${p.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-meat-red/10 text-meat-red hover:bg-meat-red hover:text-white p-2 rounded-lg transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>



      {/* 6. Photo Gallery (existing scrolling strip) */}
      <section className="py-20 bg-white overflow-hidden border-y border-stone-200/40">
        <motion.div
          className="px-4 max-w-6xl mx-auto mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <span className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold block">Picha Zetu</span>
          <h2 className="text-3xl font-extrabold mt-2 text-meat-dark">Mazingira na Bidhaa Salama</h2>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <ScrollingStrip images={galleryImages} direction={1} speed={0.3} />
        </div>
      </section>

      {/* 7. Product Catalog / Standard Categories (existing features list) */}
      <motion.section
        className="py-20 px-4 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <div className="text-center mb-12">
          <motion.span className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold block" variants={fadeUp}>
            Huduma Zetu za Nyama
          </motion.span>
          <h2 className="text-3xl font-extrabold mt-2 text-meat-dark" variants={fadeUp}>
            Dhamana ya Ubora Katika Kila Kipande
          </h2>
          <div className="section-divider mt-4 animate-pulse" />
        </div>
        <motion.div className="grid sm:grid-cols-3 gap-8" variants={stagger}>
          {oldFeatures.map((f, idx) => (
            <motion.div
              key={f.title}
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-stone-200/60 group flex flex-col h-full"
              variants={fadeUp}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="relative h-52 overflow-hidden bg-stone-100">
                <motion.img
                  src={f.images[0]}
                  alt={f.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-lg mb-2 text-meat-dark group-hover:text-meat-red transition-colors">{f.title}</h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6 flex-1">{f.desc}</p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-meat-red hover:text-meat-dark transition-colors mt-auto"
                >
                  Tazama Bidhaa Hizi &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* 8. Interactive Testimonials Carousel (Zummo style expansion) */}
      <section className="py-20 bg-stone-100/60 border-y border-stone-200/40 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <span className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold block">Maoni ya Wateja</span>
          <h2 className="text-3xl font-extrabold mt-2 mb-12 text-meat-dark">Tunachoambiwa Na Wateja</h2>

          <div className="relative h-[220px] sm:h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                className="absolute w-full space-y-6"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {/* Stars */}
                <div className="flex justify-center gap-1">
                  {[...Array(testimonials[activeTestimonial].stars)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-500 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-base sm:text-xl text-stone-700 italic leading-relaxed max-w-2xl mx-auto">
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-bold text-meat-dark text-sm sm:text-base">{testimonials[activeTestimonial].author}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{testimonials[activeTestimonial].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeTestimonial === i ? 'bg-meat-red w-6' : 'bg-stone-300 hover:bg-stone-400'}`}
                aria-label={`Maoni ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

       9. Recipe Ideas / Serving Suggestions Section (Zummo Style)
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold block">Mawazo ya Jikoni</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 text-meat-dark">Mapishi & Matumizi ya Nyama</h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-3 max-w-lg mx-auto">Gundua jinsi ya kuandaa chakula kitamu kwa kutumia bidhaa bora za Tuliho Meat.</p>
          <div className="section-divider mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xcompll overflow-hidden shadow-sm border border-stone-200/60 group hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-stone-100 relative">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 text-white text-[10px] font-medium">
                  <svg className="w-3.5 h-3.5 text-meat-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {recipe.prepTime}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[10px] font-bold text-meat-accent uppercase tracking-widest block mb-1">
                  Urahisi: {recipe.difficulty}
                </span>
                <h3 className="font-bold text-base text-meat-dark group-hover:text-meat-red transition-colors line-clamp-1 mb-2">
                  {recipe.title}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                  {recipe.desc}
                </p>
                <a
                  href="https://wa.me/255672203073?text=Habari%20Tuliho%20Meat%2C%20naomba%20ushauri%20na%20mapendekezo%20ya%20nyama"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-wider text-meat-red group-hover:text-meat-dark transition-colors inline-flex items-center gap-1 mt-auto"
                >
                  Soma Recipe
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 10. Modern Newsletter Sign up (Zummo style glassmorphism) */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-meat-dark text-white p-8 md:p-16">
          <div className="absolute inset-0 bg-cover bg-center opacity-10 bg-no-repeat" style={{ backgroundImage: `url(${cow1Img})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-meat-red/40 via-transparent to-meat-accent/40" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <span className="text-meat-gold text-xs uppercase tracking-[0.2em] font-semibold block">Jarida Letu</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">Jiunge Na Wateja Wetu Wanaopata Ofa Maalum Kila Wiki</h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
              Sajili barua pepe yako sasa kupokea taarifa za punguzo la bei, mapishi mapya, na ujio wa bidhaa mpya.
            </p>

            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <input
                    type="email"
                    required
                    placeholder="Weka Email yako hapa"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-meat-dark rounded-xl px-5 py-3.5 border border-white/20 focus:border-white focus:outline-none transition-all placeholder:text-stone-400 text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-meat-red hover:bg-white hover:text-meat-red text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all duration-300 active:scale-[0.98] shadow-lg shadow-meat-red/20 shrink-0"
                  >
                    Sajili Sasa
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  className="bg-white/10 border border-white/20 rounded-2xl p-6 max-w-md mx-auto"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <svg className="w-10 h-10 text-meat-gold mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="font-bold text-lg">Asante Sana!</h4>
                  <p className="text-xs text-stone-300 mt-1">Umesajiliwa kikamilifu kwenye jarida letu la ofa.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 11. Large Parallax Action CTA Section (enhanced existing) */}
      <motion.section
        className="relative bg-meat-dark text-white py-24 px-4 text-center overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={stagger}
      >
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${meat1Img})` }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(128,25,25,0.3),transparent_70%)]" />

        <div className="relative max-w-2xl mx-auto space-y-6">
          <motion.h2 className="text-3.5xl sm:text-5xl font-extrabold leading-tight text-white" variants={fadeUp}>
            Weka Agizo Lako Leo
          </motion.h2>
          <motion.p className="text-stone-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed" variants={fadeUp}>
            Agiza sasa na uletewe nyama safi na salama popote ulipo Mafinga na Iringa mjini.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center pt-6" variants={fadeUp}>
            <motion.a
              href="https://wa.me/255672203073?text=Habari%20Tuliho%20Meat%2C%20ningependa%20kuagiza%20nyama"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-meat-red text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-10 py-4 rounded-xl hover:bg-meat-red/90 transition-all shadow-xl shadow-meat-red/25 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Agiza Kwenye WhatsApp
            </motion.a>
            <motion.a
              href="tel:+255672203073"
              className="border border-white/30 hover:border-white text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-10 py-4 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Tupigie Simu Sasa
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
