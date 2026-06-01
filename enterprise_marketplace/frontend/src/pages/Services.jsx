const services = [
  {
    title: 'Butchering',
    desc: 'Full animal butchering service — custom cuts prepared to your specifications with precision and care.',
  },
  {
    title: 'Delivery',
    desc: 'Fast, reliable delivery across Arusha and surrounding areas. Your order arrives fresh and on time.',
  },
  {
    title: 'Catering',
    desc: 'Premium meat catering for events, gatherings, and special occasions. Custom orders welcome.',
  },
  {
    title: 'Wholesale',
    desc: 'Bulk meat supply for restaurants, hotels, and food service businesses. Competitive pricing.',
  },
]

export default function Services() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <span className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold">
        Our Services
      </span>
      <h2 className="text-3xl font-bold mt-2 mb-2">Service you can trust.</h2>
      <p className="text-stone-600 mb-12 max-w-xl">
        From custom butchering to wholesale supply — we serve every need.
      </p>

      <div className="grid sm:grid-cols-2 gap-8">
        {services.map((s) => (
          <div key={s.title} className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
            <p className="text-stone-600 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
