import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const announcements = [
  '🔥 Ofa Maalum: Nyama ya Ng\'ombe 12,000 TZS/KG — Agiza Leo!',
  '🚚 Usafirishaji Bure kwa Maagizo Zaidi ya 50,000 TZS Mafinga',
  '🐔 Kuku Mpya wa Kroiler — Safi Kutoka Shambani Kila Siku',
  ' Wateja 5,000+ Wanaotuamini — Jiunge Nao Leo!',
]

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  if (dismissed) return null

  return (
    <div className="bg-gradient-to-r from-meat-red via-meat-red/95 to-meat-accent text-white text-xs sm:text-sm relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            className="text-center font-medium tracking-wide"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            {announcements[index]}
          </motion.p>
        </AnimatePresence>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1"
          aria-label="Funga tangazo"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {/* Shimmer overlay effect */}
      <div className="absolute inset-0 animate-shimmer pointer-events-none" />
    </div>
  )
}
