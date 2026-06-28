import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Afiliate.css'

export default function Afiliate() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('personas')
  const [form, setForm] = useState({ tarjeta: '', docTipo: 'DNI', documento: '', clave: '' })

  const isEmpresarial = tab === 'empresarial'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('¡Afiliación exitosa! Ya puedes ingresar.')
    navigate('/login')
  }

  return (
    <div className="afiliate-bg">
      <div className="afiliate-card">

        <div className="afiliate-logo">
          <img src="/images/logo_caja_tacna.png" alt="Caja Tacna" />
        </div>

        <div className="afiliate-tabs">
          <button
            className={`tab-btn ${tab === 'personas' ? 'active-personas' : ''}`}
            onClick={() => setTab('personas')}
          >
            Personas
          </button>
          <button
            className={`tab-btn ${tab === 'empresarial' ? 'active-empresarial' : ''}`}
            onClick={() => setTab('empresarial')}
          >
            Empresarial
          </button>
        </div>

        <div className="afiliate-body">
          <h2>¡Hola!</h2>
          <p>Afíliate ingresando tus datos</p>

          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="text"
                name="tarjeta"
                placeholder="Número de tarjeta"
                onChange={handleChange}
              />
              <span>👁️</span>
            </div>

            <div className="input-field">
              <select name="docTipo" onChange={handleChange}>
                <option>DNI</option>
                <option>RUC</option>
                <option>CE</option>
              </select>
              <input
                type="text"
                name="documento"
                placeholder="Número de documento"
                onChange={handleChange}
              />
              <span>👁️</span>
            </div>

            <div className="input-field">
              <span className="lock-icon">🔒</span>
              <input
                type="password"
                name="clave"
                placeholder="Clave tarjeta"
                onChange={handleChange}
              />
              <span>👁️</span>
            </div>

            <div className="afiliate-info">
              <span>ℹ️</span>
              <p>Si te encuentras afiliado a través de Caja Tacna APP, no es necesario realizar una nueva afiliación.</p>
            </div>

            <button
              type="submit"
              className={`btn-ingresar ${isEmpresarial ? 'btn-blue' : 'btn-red'}`}
            >
              Continuar
            </button>
          </form>

          <div className="ya-afiliado">
            <button
              className={isEmpresarial ? 'text-blue' : 'text-red'}
              onClick={() => navigate('/login')}
            >
              Ya estoy afiliado
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}