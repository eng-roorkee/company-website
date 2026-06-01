import api from '../services/api'

describe('API client', () => {
  it('exports an axios instance', () => {
    expect(api).toBeDefined()
    expect(api.defaults.baseURL).toBe('http://localhost:8000')
  })

  it('has JSON content type header', () => {
    expect(api.defaults.headers['Content-Type']).toBe('application/json')
  })

  it('attaches token from localStorage', () => {
    localStorage.setItem('token', 'test-token-123')
    const req = api.interceptors.request.handlers[0]
    const config = req.fulfilled({ headers: {} })
    expect(config.headers.Authorization).toBe('Bearer test-token-123')
    localStorage.removeItem('token')
  })

  it('does not attach token when missing', () => {
    localStorage.removeItem('token')
    const req = api.interceptors.request.handlers[0]
    const config = req.fulfilled({ headers: {} })
    expect(config.headers.Authorization).toBeUndefined()
  })
})
