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
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Nyama Bora/)
    expect(screen.getByText('Tazama Bidhaa')).toBeInTheDocument()
    expect(screen.getByText('Agiza kupitia WhatsApp')).toBeInTheDocument()
  })

  it('Home shows stats', () => {
    renderPage(Home)
    expect(screen.getByText('10+')).toBeInTheDocument()
    expect(screen.getByText('Miaka ya Biashara')).toBeInTheDocument()
  })

  it('Products renders heading', () => {
    renderPage(Products)
    expect(screen.getByText('Vipande vibichi, bei nafuu.')).toBeInTheDocument()
  })

  it('Services renders heading', () => {
    renderPage(Services)
    expect(screen.getByText('Huduma unayoweza kuamini.')).toBeInTheDocument()
  })

  it('About renders heading', () => {
    renderPage(About)
    expect(screen.getByText('Nyama bora, inayotoka kwa uwajibikaji.')).toBeInTheDocument()
  })

  it('Contact renders heading', () => {
    renderPage(Contact)
    expect(screen.getByText('Wasiliana nasi.')).toBeInTheDocument()
  })

  it('AdminLogin renders heading', () => {
    renderPage(AdminLogin)
    expect(screen.getByText('Ingia kama Msimamizi')).toBeInTheDocument()
  })

  it('NotFound shows 404', () => {
    renderPage(NotFound)
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Ukurasa haukupatikana.')).toBeInTheDocument()
  })
})
