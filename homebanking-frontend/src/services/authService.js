import hbApi from './hb_api.js'
import { TOKEN_KEY, USER_KEY } from './hb_api.js'

export async function login(username, password) {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)

  const { data } = await hbApi.post('/auth/login', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  const token = data.access_token
  const cliente = data.cliente || {}
  const user = {
    codcliente: cliente.codcliente ?? username,
    nombre: cliente.nombre ?? username,
    pkcliente: cliente.pkcliente,
  }
  return { token, user }
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY)
  try { return raw ? JSON.parse(raw) : null } catch { return null }
}

export function saveSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}