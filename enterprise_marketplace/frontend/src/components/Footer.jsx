import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-meat-dark text-meat-muted text-sm py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-between gap-8">
        <div>
          <h4 className="text-white font-semibold mb-3 uppercase tracking-widest text-xs">Tuliho Meat</h4>
          <p className="leading-relaxed max-w-xs">Premium meat, rooted in quality. Farm-fresh cuts delivered to your doorstep.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 uppercase tracking-widest text-xs">Quick Links</h4>
          <div className="flex flex-col gap-1.5">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/products" className="hover:text-white transition-colors">Products</Link>
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 uppercase tracking-widest text-xs">Contact</h4>
          <p>+255 672 203 073</p>
          <p>+255 754 245 863</p>
          <p className="mt-2">&copy; {new Date().getFullYear()} Tuliho Meat.</p>
        </div>
      </div>
    </footer>
  )
}
