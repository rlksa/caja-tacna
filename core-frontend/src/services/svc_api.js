import axios from 'axios'

const api = axios.create({
  baseURL: 'https://core-backend-qu9z.onrender.com',
  headers: { 'Content-Type': 'application/json' },
})

export const TOKEN_KEY = 'core_token'

// Request interceptor → agrega Authorization y fix Content-Type para login
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // ✅ FIX: si el body es URLSearchParams (login), usa form-urlencoded
  if (config.data instanceof URLSearchParams) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  return config
})

// Response interceptor → ante 401, limpia sesión y redirige
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem('core_user')
      if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
        window.location.href = '/'
      }
    }
    return Promise.reject(error)
  },
)

export default api