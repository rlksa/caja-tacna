/**
 * Login del CLIENTE (Banca por Internet de Banco Andino, no del personal).
 * Backend: POST /auth/login (Formato x-www-form-urlencoded requerido)
 * -> { access_token, token_type, expires_in_min, cliente: { codcliente, nombre, pkcliente } }
 * Devuelve { token, user } ya normalizado.
 */
export async function login(username, password) {
  // 📝 Convertimos los parámetros a formato Form Data para ganarle al 422
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)

  // Enviamos la petición con la cabecera correcta
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