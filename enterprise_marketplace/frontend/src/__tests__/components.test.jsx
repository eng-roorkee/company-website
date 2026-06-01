import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton'
import Layout from '../components/Layout'

describe('Navbar', () => {
  beforeEach(() => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
  })

  it('renders brand name', () => {
    expect(screen.getByText((_, el) => el.tagName === 'A' && el.textContent === 'Tuliho Meat')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
})

describe('Footer', () => {
  beforeEach(() => {
    render(<MemoryRouter><Footer /></MemoryRouter>)
  })

  it('renders copyright with current year', () => {
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(year.toString()))).toBeInTheDocument()
  })

  it('renders phone numbers', () => {
    expect(screen.getByText('+255 672 203 073')).toBeInTheDocument()
    expect(screen.getByText('+255 754 245 863')).toBeInTheDocument()
  })
})

describe('WhatsAppFloatingButton', () => {
  beforeEach(() => {
    render(<MemoryRouter><WhatsAppFloatingButton /></MemoryRouter>)
  })

  it('renders a WhatsApp link', () => {
    const link = screen.getByLabelText('Chat on WhatsApp')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href')
    expect(link.getAttribute('href')).toContain('wa.me/255672203073')
  })

  it('opens in new tab', () => {
    const link = screen.getByLabelText('Chat on WhatsApp')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})

describe('Layout', () => {
  it('renders Navbar and Footer', () => {
    render(<MemoryRouter><Layout /></MemoryRouter>)
    const brand = screen.getAllByText((_, el) => el.tagName === 'A' && el.textContent === 'Tuliho Meat')
    expect(brand.length).toBeGreaterThanOrEqual(1)
    expect(screen.getByLabelText('Chat on WhatsApp')).toBeInTheDocument()
  })
})
