import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Products from '../pages/Products'
import Services from '../pages/Services'
import About from '../pages/About'
import Contact from '../pages/Contact'
import AdminLogin from '../pages/AdminLogin'
import NotFound from '../pages/NotFound'

function renderPage(Component) {
  render(<MemoryRouter><Component /></MemoryRouter>)
}

describe('Page components', () => {
  it('Home renders hero heading and CTA', () => {
    renderPage(Home)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Premium Meat/)
    expect(screen.getByText('View Products')).toBeInTheDocument()
    expect(screen.getByText('Order via WhatsApp')).toBeInTheDocument()
  })

  it('Home shows stats', () => {
    renderPage(Home)
    expect(screen.getByText('10+')).toBeInTheDocument()
    expect(screen.getByText('Years in Business')).toBeInTheDocument()
  })

  it('Products renders heading', () => {
    renderPage(Products)
    expect(screen.getByText('Fresh cuts, fair prices.')).toBeInTheDocument()
  })

  it('Services renders heading', () => {
    renderPage(Services)
    expect(screen.getByText('Service you can trust.')).toBeInTheDocument()
  })

  it('About renders heading', () => {
    renderPage(About)
    expect(screen.getByText('Quality meat, responsibly sourced.')).toBeInTheDocument()
  })

  it('Contact renders heading', () => {
    renderPage(Contact)
    expect(screen.getByText('Get in touch.')).toBeInTheDocument()
  })

  it('AdminLogin renders heading', () => {
    renderPage(AdminLogin)
    expect(screen.getByText('Admin Login')).toBeInTheDocument()
  })

  it('NotFound shows 404', () => {
    renderPage(NotFound)
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Page not found.')).toBeInTheDocument()
  })
})
