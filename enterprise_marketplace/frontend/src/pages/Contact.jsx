export default function Contact() {
  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <span className="text-meat-red text-sm uppercase tracking-[0.2em] font-semibold">
        Contact Us
      </span>
      <h2 className="text-3xl font-bold mt-2 mb-6">Get in touch.</h2>

      <div className="grid sm:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-1">Phone</h3>
            <p className="text-stone-600">+255 672 203 073</p>
            <p className="text-stone-600">+255 754 245 863</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">WhatsApp</h3>
            <a
              href="https://wa.me/255672203073"
              target="_blank"
              rel="noopener noreferrer"
              className="text-meat-red font-semibold hover:text-meat-red/80 transition-colors"
            >
              Chat now &rarr;
            </a>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-stone-200">
          <h3 className="font-semibold mb-2">Place an Order</h3>
          <p className="text-stone-600 text-sm leading-relaxed mb-4">
            Reach out via WhatsApp or phone to place your order. We deliver fresh,
            farm-quality meat to your doorstep.
          </p>
          <a
            href="https://wa.me/255672203073?text=Hello%20Tuliho%20Meat%2C%20I%20would%20like%20to%20place%20an%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-meat-red text-white px-6 py-3 rounded font-semibold hover:bg-meat-red/90 transition-colors text-sm"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
