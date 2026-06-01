import { Link } from 'react-router-dom'

const stats = [
  { label: 'Years in Business', value: '10+' },
  { label: 'Premium Cuts', value: '25+' },
  { label: 'Happy Customers', value: '5,000+' },
  { label: 'Farm Partnerships', value: '12' },
]

const features = [
  {
    title: 'Beef Cuts',
    desc: 'Ribeye, T-bone, fillet, mince, and stew meat — grass-fed, locally sourced.',
  },
  {
    title: 'Poultry & Fish',
    desc: 'Broiler chicken, sató fish, and more — fresh and handled with care.',
  },
  {
    title: 'Specialty Products',
    desc: 'Russian sausage, beef Vienna, barbeque packs — something for every table.',
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-meat-dark text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-meat-accent text-sm uppercase tracking-[0.2em] font-semibold">
            Farm-Fresh · Since 2014
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-4 leading-tight">
            Premium Meat,<br />Rooted in Quality.
          </h1>
          <p className="mt-4 text-stone-300 text-lg max-w-xl mx-auto leading-relaxed">
            Tuliho Meat delivers farm-fresh premium cuts to your doorstep.
            Quality you can taste, service you can trust.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
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
      </section>

      {/* Stats */}
      <section className="bg-meat-dark border-t border-meat-muted/30">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-meat-accent">{s.value}</div>
              <div className="text-stone-400 text-sm mt-1 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-4 max-w-3xl mx-auto text-center">
        <span className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold">Customer Voice</span>
        <blockquote className="mt-6 text-lg sm:text-xl text-stone-600 italic leading-relaxed">
          &ldquo;The quality of the meat is unmatched. Fresh, properly cut, and delivered on time.
          Tuliho Meat has become our go-to supplier.&rdquo;
        </blockquote>
        <p className="mt-4 text-stone-500 text-sm">&mdash; A loyal customer, Arusha</p>
      </section>

      {/* Features */}
      <section className="py-16 px-4 max-w-6xl mx-auto border-t border-stone-200">
        <span className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold">Our Range</span>
        <h2 className="text-3xl font-bold mt-2 mb-10 text-meat-dark">
          Quality cuts, every time.
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-meat-dark text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold">Place Your Order Today</h2>
          <p className="mt-2 text-stone-300">Reach out on WhatsApp or give us a call.</p>
          <a
            href="https://wa.me/255672203073"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-meat-red text-white px-8 py-3 rounded font-semibold hover:bg-meat-red/90 transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
