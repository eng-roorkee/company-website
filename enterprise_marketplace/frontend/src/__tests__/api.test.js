import api from '../services/api'

describe('API client', () => {
  afterEach(() => {
    localStorage.clear()
  })

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
  })

  it('does not attach token when missing', () => {
    localStorage.removeItem('token')
    const req = api.interceptors.request.handlers[0]
    const config = req.fulfilled({ headers: {} })
    expect(config.headers.Authorization).toBeUndefined()
  })

  it('can send multipart/form-data for file upload', () => {
    const fd = new FormData()
    fd.append('file', new Blob(['test'], { type: 'image/jpeg' }), 'photo.jpg')

    const req = api.interceptors.request.handlers[0]
    const config = req.fulfilled({ headers: {}, data: fd })

    expect(config.data).toBe(fd)
    expect(config.headers.Authorization).toBeUndefined()
  })

  it('sends multipart data for upload endpoint calls', async () => {
    const fd = new FormData()
    fd.append('file', new Blob(['img'], { type: 'image/png' }), 'img.png')

    const postSpy = vi.spyOn(api, 'post').mockResolvedValue({ data: { url: '/static/uploads/img.png' } })

    const result = await api.post('/api/v1/upload', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    expect(postSpy).toHaveBeenCalledWith('/api/v1/upload', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    expect(result.data.url).toBe('/static/uploads/img.png')

    postSpy.mockRestore()
  })
})
