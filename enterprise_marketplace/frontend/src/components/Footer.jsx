import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-meat-dark text-meat-muted text-sm py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-between gap-8">
        <div>
          <h4 className="text-white font-semibold mb-3 uppercase tracking-widest text-xs">Tuliho Meat</h4>
          <p className="leading-relaxed max-w-xs">Nyama bora, yenye ubora. Vipande vya shambani safi vinakuja mpaka mlangoni kwako.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 uppercase tracking-widest text-xs">Viungo vya Haraka</h4>
          <div className="flex flex-col gap-1.5">
            <Link to="/" className="hover:text-white transition-colors">Nyumbani</Link>
            <Link to="/products" className="hover:text-white transition-colors">Bidhaa</Link>
            <Link to="/services" className="hover:text-white transition-colors">Huduma</Link>
            <Link to="/about" className="hover:text-white transition-colors">Kuhusu</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Wasiliana</Link>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 uppercase tracking-widest text-xs">Mawasiliano</h4>
          <p>+255 672 203 073</p>
          <p>+255 754 245 863</p>
          <p className="mt-2">&copy; {new Date().getFullYear()} Tuliho Meat.</p>
        </div>
      </div>
    </footer>
  )
}
