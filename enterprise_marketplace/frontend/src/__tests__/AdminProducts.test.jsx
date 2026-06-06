import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import api from '../services/api'
import AdminProducts from '../pages/AdminProducts'

const fakeProducts = [
  {
    id: 1,
    name: 'Nyama ya Ng\'ombe',
    price: 12000,
    description: 'Premium beef',
    category: 'Beef',
    image_url: '/static/uploads/beef.jpg',
    is_special_offer: false,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Kuku wa Kienyeji',
    price: 15000,
    description: null,
    category: 'Poultry',
    image_url: null,
    is_special_offer: true,
    created_at: '2025-01-02T00:00:00Z',
    updated_at: '2025-01-02T00:00:00Z',
  },
]

function renderPage() {
  return render(
    <MemoryRouter>
      <AdminProducts />
    </MemoryRouter>
  )
}

describe('AdminProducts', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'test-token')
  })

  afterEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('shows loading state initially', () => {
    renderPage()
    expect(screen.getByText('Inapakia bidhaa…')).toBeInTheDocument()
  })

  it('renders product list after loading', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({ data: fakeProducts })

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Nyama ya Ng\'ombe')).toBeInTheDocument()
    })
    expect(screen.getByText('Kuku wa Kienyeji')).toBeInTheDocument()
    expect(screen.getByText('12000.00 TZS')).toBeInTheDocument()
    expect(screen.getByText('15000.00 TZS')).toBeInTheDocument()
  })

  it('renders special offer badge for products with offer', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({ data: fakeProducts })

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Ipo Kwenye Ofa')).toBeInTheDocument()
    })
    expect(screen.getByText('Kawaida')).toBeInTheDocument()
  })

  it('shows "Ongeza Bidhaa" button', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({ data: fakeProducts })

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('+ Ongeza Bidhaa')).toBeInTheDocument()
    })
  })

  it('shows empty state when no products', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({ data: [] })

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Hakuna bidhaa bado.')).toBeInTheDocument()
    })
  })

  it('shows create form when "+ Ongeza Bidhaa" is clicked', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({ data: [] })

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('+ Ongeza Bidhaa')).toBeInTheDocument()
    })

    await userEvent.click(screen.getByText('+ Ongeza Bidhaa'))

    expect(screen.getByText('Ongeza Bidhaa')).toBeInTheDocument()
    expect(screen.getByText('Chagua Picha')).toBeInTheDocument()
    expect(screen.getByText('Ofa Maalum')).toBeInTheDocument()
    expect(screen.getByText('Unda')).toBeInTheDocument()
    expect(screen.getByText('Ghairi')).toBeInTheDocument()
  })

  it('has file upload button in create form', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({ data: [] })

    renderPage()
    await userEvent.click(await screen.findByText('+ Ongeza Bidhaa'))

    expect(screen.getByText('Chagua Picha')).toBeInTheDocument()
  })

  it('creates a product via POST on form submit', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({ data: [] })
    const mockPost = vi.spyOn(api, 'post').mockResolvedValue({ data: { id: 99 } })

    renderPage()

    await userEvent.click(await screen.findByText('+ Ongeza Bidhaa'))

    const textboxes = screen.getAllByRole('textbox')
    await userEvent.type(textboxes[0], 'New Beef')

    const spinbutton = screen.getByRole('spinbutton')
    await userEvent.type(spinbutton, '30')

    await userEvent.click(screen.getByText('Unda'))

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith('/api/v1/products', {
        name: 'New Beef',
        description: '',
        price: 30,
        category: '',
        image_url: '',
        is_special_offer: false,
      })
    })
  })

  it('shows edit form with pre-filled data', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({ data: fakeProducts })

    renderPage()

    await waitFor(() => {
      expect(screen.getAllByText('Hariri').length).toBe(2)
    })

    await userEvent.click(screen.getAllByText('Hariri')[0])

    const textboxes = screen.getAllByRole('textbox')
    expect(textboxes[0]).toHaveValue('Nyama ya Ng\'ombe')
  })

  it('deletes a product after confirmation', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({ data: fakeProducts })
    const mockDelete = vi.spyOn(api, 'delete').mockResolvedValue({})
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true)

    renderPage()

    await waitFor(() => {
      expect(screen.getAllByText('Futa').length).toBeGreaterThan(0)
    })

    await userEvent.click(screen.getAllByText('Futa')[0])

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith('/api/v1/products/1')
    })

    confirmSpy.mockRestore()
  })

  it('toggles special offer status', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({ data: fakeProducts })
    const mockPut = vi.spyOn(api, 'put').mockResolvedValue({ data: {} })

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Kawaida')).toBeInTheDocument()
    })

    await userEvent.click(screen.getByText('Kawaida'))

    await waitFor(() => {
      expect(mockPut).toHaveBeenCalledWith('/api/v1/products/1', { is_special_offer: true })
    })
  })
})
