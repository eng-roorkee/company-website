export default function About() {
  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <span className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold">
        About Us
      </span>
      <h2 className="text-3xl font-bold mt-2 mb-6">Quality meat, responsibly sourced.</h2>

      <p className="text-stone-600 leading-relaxed mb-6">
        Tuliho Meat is a premier meat provider based in Arusha, Tanzania. We specialize
        in delivering high-quality, farm-fresh meat products to households, restaurants,
        and businesses across the region.
      </p>

      <p className="text-stone-600 leading-relaxed mb-6">
        Our commitment to quality starts at the source. We partner with trusted local farms
        that share our values of ethical animal husbandry and sustainable practices. Every
        cut is handled with care, from pasture to plate.
      </p>

      <p className="text-stone-600 leading-relaxed">
        With years of experience in the meat industry, our team brings expertise and
        dedication to every order. Whether you need a single cut for dinner or wholesale
        supply for your business, Tuliho Meat delivers excellence.
      </p>

      <div className="mt-10 grid sm:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-lg border border-stone-200">
          <div className="text-2xl font-bold text-meat-red">2014</div>
          <div className="text-stone-500 text-sm mt-1">Founded</div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-stone-200">
          <div className="text-2xl font-bold text-meat-red">Arusha</div>
          <div className="text-stone-500 text-sm mt-1">Based in</div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-stone-200">
          <div className="text-2xl font-bold text-meat-red">100%</div>
          <div className="text-stone-500 text-sm mt-1">Quality Guarantee</div>
        </div>
      </div>
    </section>
  )
}
