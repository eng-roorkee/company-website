import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

function renderAt(path) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  )
}

describe('App routing', () => {
  it('renders Home at /', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Premium Meat/)
  })

  it('renders Products at /products', () => {
    renderAt('/products')
    expect(screen.getByText('Premium meat cuts.')).toBeInTheDocument()
  })

  it('renders Services at /services', () => {
    renderAt('/services')
    expect(screen.getByText('Service you can trust.')).toBeInTheDocument()
  })

  it('renders About at /about', () => {
    renderAt('/about')
    expect(screen.getByText('Quality meat, responsibly sourced.')).toBeInTheDocument()
  })

  it('renders Contact at /contact', () => {
    renderAt('/contact')
    expect(screen.getByText('Get in touch.')).toBeInTheDocument()
  })

  it('renders Admin login page at /admin (no auth)', () => {
    localStorage.removeItem('token')
    renderAt('/admin')
    expect(screen.getByText('Admin Login')).toBeInTheDocument()
  })

  it('renders 404 for unknown routes', () => {
    renderAt('/nonexistent')
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('Navbar is present on every page', () => {
    renderAt('/products')
    const brand = screen.getAllByText((_, el) => el.tagName === 'A' && el.textContent === 'Tuliho Meat')
    expect(brand.length).toBeGreaterThanOrEqual(1)
  })
})
