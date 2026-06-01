export default function Products() {
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

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <span className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold">
        Our Products
      </span>
      <h2 className="text-3xl font-bold mt-2 mb-2">Premium meat cuts.</h2>
      <p className="text-stone-600 mb-12 max-w-xl">
        Every cut sourced fresh, handled with care, and delivered to your door.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.name}
            className="bg-white rounded-lg overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-48 bg-stone-200 flex items-center justify-center text-stone-400 text-sm">
              Image
            </div>
            <div className="p-5">
              <span className="text-xs uppercase tracking-widest text-meat-red font-semibold">
                {p.category}
              </span>
              <h3 className="font-semibold text-lg mt-1">{p.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
