import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import api from '../services/api'
import Products from '../pages/Products'

function renderPage() {
  return render(
    <MemoryRouter>
      <Products />
    </MemoryRouter>
  )
}

const apiProducts = [
  {
    id: 1,
    name: 'Nyama Mbuzi',
    description: 'Goat meat',
    price: 18000,
    image_url: '/static/uploads/goat.jpg',
    category: 'Goat',
    is_special_offer: false,
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Nyama Kondoo',
    description: 'Lamb meat special',
    price: 22000,
    image_url: null,
    category: 'Lamb',
    is_special_offer: true,
    created_at: '2025-06-02T00:00:00Z',
    updated_at: '2025-06-02T00:00:00Z',
  },
]

describe('Products page', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('renders heading and description', () => {
    renderPage()
    expect(screen.getByText('Vipande vibichi, bei nafuu.')).toBeInTheDocument()
    expect(screen.getByText('Bidhaa Zetu')).toBeInTheDocument()
  })

  it('renders fallback hardcoded products when API fails', async () => {
    vi.spyOn(api, 'get').mockRejectedValue(new Error('Network error'))

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Nyama ya Ng\'ombe (Beef)')).toBeInTheDocument()
    })
    expect(screen.getByText('Utumbo (Tripe)')).toBeInTheDocument()
    expect(screen.getByText('Kroiler Chicken')).toBeInTheDocument()
    expect(screen.getByText('Broiler Chicken')).toBeInTheDocument()
  })

  it('renders API products when fetch succeeds', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({ data: apiProducts })

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Nyama Mbuzi')).toBeInTheDocument()
    })
    expect(screen.getByText('Nyama Kondoo')).toBeInTheDocument()
  })

  it('displays prices from API products', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({ data: apiProducts })

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('18,000 TSHS')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.getByText('22,000 TSHS')).toBeInTheDocument()
    })
  })

  it('displays categories from API products (lowercase in jsdom)', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({ data: apiProducts })

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Goat')).toBeInTheDocument()
    })
    expect(screen.getByText('Lamb')).toBeInTheDocument()
  })

  it('shows special offer badge for products marked as offer', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({ data: apiProducts })

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Bei Mpya')).toBeInTheDocument()
    })
  })

  it('renders "Weka Kwenye Kikapu" for each API product', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({ data: [apiProducts[0]] })

    renderPage()

    await waitFor(() => {
      expect(screen.queryAllByText('Weka Kwenye Kikapu')).toHaveLength(1)
    })
  })

  it('shows "Hakuna picha" placeholder when image_url is null', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({ data: [apiProducts[1]] })

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Hakuna picha')).toBeInTheDocument()
    })
  })

  it('shows image for API product with image_url', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({ data: apiProducts })

    renderPage()

    await waitFor(() => {
      const imgs = screen.getAllByRole('img')
      const goatImg = imgs.find((img) => img.getAttribute('src')?.includes('goat.jpg'))
      expect(goatImg).toBeTruthy()
    })
  })

  it('renders variant selector from fallback data', async () => {
    vi.spyOn(api, 'get').mockRejectedValue(new Error('Offline'))

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Kroiler Chicken')).toBeInTheDocument()
    })

    const selects = screen.getAllByRole('combobox')
    expect(selects.length).toBeGreaterThanOrEqual(2)
  })

  it('calls API on mount', async () => {
    const mockGet = vi.spyOn(api, 'get').mockResolvedValue({ data: [] })

    renderPage()

    await waitFor(() => {
      expect(mockGet).toHaveBeenCalledWith('/api/v1/products')
    })
  })
})
