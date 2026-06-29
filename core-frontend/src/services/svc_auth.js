import api from './svc_api.js'
export async function login(credenciales) {
  const { data } = await api.post('/auth/login', {
    numerodni: credenciales.dni || credenciales.numerodni,
    password: credenciales.password,
  })
  return data
}
