import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-meat-dark text-stone-400 text-sm pt-16 pb-12 mt-auto border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* 1. Brand Section */}
        <div className="space-y-4">
          <Link to="/" className="text-2xl font-bold tracking-widest uppercase text-white">
            Tuliho<span className="text-meat-red"> Meat</span>
          </Link>
          <p className="leading-relaxed text-stone-400 text-xs sm:text-sm">
            Nyama bora, yenye ubora. Vipande safi vya shambani vinavyotayarishwa kwa viwango vya juu vya usafi na kuletwa mlangoni kwako.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-stone-800 text-white hover:bg-meat-red transition-colors flex items-center justify-center" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-stone-800 text-white hover:bg-meat-red transition-colors flex items-center justify-center" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h4v-9h3.615L17 8h-4V6.157C13 5.37 13.5 5 14.385 5H17V0h-3.977C9.31 0 9 1.624 9 3.767V8z"/>
              </svg>
            </a>
            <a href="https://wa.me/255672203073" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-stone-800 text-white hover:bg-meat-red transition-colors flex items-center justify-center" aria-label="WhatsApp">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase tracking-widest text-xs">Viungo vya Haraka</h4>
          <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
            <Link to="/" className="hover:text-white transition-colors">Nyumbani</Link>
            <Link to="/products" className="hover:text-white transition-colors">Bidhaa</Link>
            <Link to="/services" className="hover:text-white transition-colors">Huduma</Link>
            <Link to="/about" className="hover:text-white transition-colors">Kuhusu Sisi</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Wasiliana Nasi</Link>
          </div>
        </div>

        {/* 3. Business Hours */}
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase tracking-widest text-xs">Saa za Kazi</h4>
          <div className="space-y-2 text-xs sm:text-sm">
            <p><span className="font-semibold text-stone-300">Jumatatu - Jumamosi:</span> 7:00 AM - 7:00 PM</p>
            <p><span className="font-semibold text-stone-300">Jumapili:</span> Imefungwa</p>
            <p className="text-stone-500 pt-2">Tunapokea maagizo ya WhatsApp masaa 24/7.</p>
          </div>
        </div>

        {/* 4. Contact & Map */}
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase tracking-widest text-xs">Mawasiliano & Eneo</h4>
          <div className="space-y-2.5 text-xs sm:text-sm">
            <p className="flex items-center gap-2">
              <svg className="w-4 h-4 text-meat-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +255 672 203 073
            </p>
            <p className="flex items-center gap-2">
              <svg className="w-4 h-4 text-meat-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Mafinga - Iringa, Tanzania
            </p>
            <div className="pt-2">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-meat-gold hover:text-white transition-colors"
              >
                Fungua Kwenye Google Maps &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyrights */}
      <div className="max-w-6xl mx-auto px-4 mt-16 pt-8 border-t border-stone-800 text-xs flex flex-col sm:flex-row justify-between items-center gap-4 text-stone-500">
        <p>&copy; {new Date().getFullYear()} Tuliho Meat. Haki zote zimehifadhiwa.</p>
        <p>Inaendeshwa kwa Usalama na Upendo.</p>
      </div>
    </footer>
  )
}
