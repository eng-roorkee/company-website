import { Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import coverpage from '../assets/coverpage.webp'

const BelowFoldContent = lazy(() => import('./BelowFoldContent'))

const stats = [
  { label: 'Years in Business', value: '10+' },
  { label: 'Premium Cuts', value: '25+' },
  { label: 'Happy Customers', value: '5,000+' },
  { label: 'Farm Partnerships', value: '12' },
]

export default function Home() {
  return (
    <>
      <section
        className="relative text-white text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${coverpage})` }}
      >
        <div className="absolute inset-0 bg-meat-dark/70" />
        <div className="relative z-10 py-24 px-4">
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <span className="text-meat-accent text-sm uppercase tracking-[0.2em] font-semibold block animate-fade-in [animation-delay:200ms] [animation-fill-mode:backwards]">
              Farm-Fresh · Since 2014
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-4 leading-tight">
              Premium Meat,<br />Rooted in Quality.
            </h1>
            <p className="mt-4 text-stone-300 text-lg max-w-xl mx-auto leading-relaxed animate-fade-in [animation-delay:400ms] [animation-fill-mode:backwards]">
              Tuliho Meat delivers farm-fresh premium cuts to your doorstep.
              Quality you can taste, service you can trust.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-in-up [animation-delay:600ms] [animation-fill-mode:backwards]">
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
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-16 px-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={s.label} className="animate-fade-in-up [animation-delay:800ms] [animation-fill-mode:backwards]" style={{ animationDelay: `${800 + i * 150}ms` }}>
                <div className="text-2xl font-bold text-meat-accent">{s.value}</div>
                <div className="text-stone-400 text-sm mt-1 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-20 text-center text-stone-500">Loading...</div>}>
        <BelowFoldContent />
      </Suspense>
    </>
  )
}
