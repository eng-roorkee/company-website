import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="py-24 px-4 text-center">
      <h2 className="text-6xl font-bold text-meat-dark mb-4">404</h2>
      <p className="text-stone-600 mb-8">Page not found.</p>
      <Link to="/" className="text-meat-red font-semibold hover:text-meat-red/80 transition-colors">
        &larr; Back home
      </Link>
    </section>
  )
}
