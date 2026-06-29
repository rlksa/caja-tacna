import api from './svc_api.js'

/**
 * POST /auth/login
 * @param {import('../types/auth.types.js').LoginIn} credenciales
 * @returns {Promise<import('../types/auth.types.js').TokenOut>}
 */
export async function login(credenciales) {
  // 📝 Convertimos el JSON tradicional a formato x-www-form-urlencoded
  const params = new URLSearchParams()
  
  // FastAPI espera 'username' (aquí va tu DNI) y 'password'
  params.append('username', credenciales.dni || credenciales.username) 
  params.append('password', credenciales.password)

  // Mandamos los parámetros con la cabecera correcta
  const { data } = await api.post('/auth/login', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  
  return data
}