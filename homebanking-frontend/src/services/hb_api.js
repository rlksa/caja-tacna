import axios from 'axios'

export const TOKEN_KEY = 'hb_token'
export const USER_KEY = 'hb_user'

const baseURL = import.meta.env.VITE_BASE_URL || import.meta.env.VITE_BACKEND_URL || 'https://homebanking-backend-q6fe.onrender.com'

const hbApi = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
})

// --- Request: inyecta el Bearer token y respeta Content-Type del login ---
hbApi.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }

  // ✅ FIX: si el body es URLSearchParams (ej. login), usa form-urlencoded
  if (config.data instanceof URLSearchParams) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  return config
})

// --- Response: ante 401 limpia la sesión y redirige a /login ---
hbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    if (status === 401) {
      const enLogin = window.location.pathname.startsWith('/login')
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
      if (!enLogin) {
        window.location.assign('/login')
      }
    }
    return Promise.reject(error)
  },
)

export default hbApi