import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Creditos.css'

const creditosData = [
  { id: 1, nombre: 'Crédito Personal', icon: '👤', tasa: '18% - 32% TEA', monto: 'Hasta S/ 30,000', plazo: '12 - 60 meses', categoria: 'consumo' },
  { id: 2, nombre: 'Credifácil', icon: '⚡', tasa: '20% - 35% TEA', monto: 'Hasta S/ 20,000', plazo: '6 - 48 meses', categoria: 'consumo' },
  { id: 3, nombre: 'Credipyme', icon: '💼', tasa: '15% - 28% TEA', monto: 'Hasta S/ 150,000', plazo: '12 - 84 meses', categoria: 'empresarial' },
  { id: 4, nombre: 'CrediHogar', icon: '🏠', tasa: '9% - 12% TEA', monto: 'Hasta S/ 500,000', plazo: '60 - 240 meses', categoria: 'hipotecario' },
  { id: 5, nombre: 'Micro Agropecuario', icon: '🌾', tasa: '22% - 30% TEA', monto: 'Hasta S/ 50,000', plazo: '12 - 36 meses', categoria: 'empresarial' },
  { id: 6, nombre: 'CrediConstruye', icon: '🔨', tasa: '14% - 22% TEA', monto: 'Hasta S/ 100,000', plazo: '24 - 120 meses', categoria: 'consumo' },
  { id: 7, nombre: 'Mi Vivienda', icon: '🏡', tasa: '9% - 11% TEA', monto: 'Hasta S/ 400,000', plazo: '120 - 240 meses', categoria: 'hipotecario' },
  { id: 8, nombre: 'Crédito Pignoraticio', icon: '💎', tasa: '12% - 20% TEA', monto: 'Hasta S/ 10,000', plazo: '1 - 12 meses', categoria: 'consumo' },
]

export default function Creditos() {
  const navigate = useNavigate()
  const [filtro, setFiltro] = useState('todos')
  const [simulador, setSimulador] = useState({ monto: 10000, plazo: 24, tasa: 20 })
  const [solicitudId, setSolicitudId] = useState(null)

  const filtrados = filtro === 'todos' ? creditosData : creditosData.filter(c => c.categoria === filtro)

  const cuotaMensual = () => {
    const r = simulador.tasa / 100 / 12
    const n = simulador.plazo
    const p = simulador.monto
    if (r === 0) return (p / n).toFixed(2)
    return (p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)).toFixed(2)
  }

  const totalPagar = () => (parseFloat(cuotaMensual()) * simulador.plazo).toFixed(2)

  const handleSolicitar = () => {
    const id = `CT-2025-${Math.floor(Math.random() * 90000) + 10000}`
    setSolicitudId(id)
  }

  return (
    <div className="cred-page">

      <nav className="dash-nav">
        <div className="dash-nav-top">
          <div className="dash-logo">
            <span className="dash-logo-icon">🏦</span>
            <div>
              <span className="dash-logo-main">CAJA TACNA</span>
              <span className="dash-logo-sub">Banca por Internet</span>
            </div>
          </div>
          <div className="dash-nav-right">
            <button className="dash-logout" onClick={() => navigate('/dashboard')}>
              ← Volver
            </button>
            <button className="dash-logout" onClick={() => {
              localStorage.removeItem('user')
              navigate('/login')
            }}>Cerrar sesión</button>
          </div>
        </div>
        <div className="dash-nav-menu">
          <a href="#" onClick={() => navigate('/dashboard')}>Inicio</a>
          <a href="#" className="active">Créditos</a>
          <a href="#">Ahorros</a>
          <a href="#">Pagos</a>
        </div>
      </nav>

      <main className="cred-main">

        {/* HERO */}
        <div className="cred-hero">
          <div>
            <h2>Nuestros Créditos</h2>
            <p>Encuentra el financiamiento ideal para tus metas personales y empresariales</p>
          </div>
          <div className="cred-hero-badge">
            <span>Aprobación</span>
            <strong>en 48 hrs</strong>
          </div>
        </div>

        {/* FILTROS */}
        <div className="cred-filtros">
          {['todos', 'consumo', 'empresarial', 'hipotecario'].map(cat => (
            <button
              key={cat}
              className={`cred-filtro-btn ${filtro === cat ? 'active' : ''}`}
              onClick={() => setFiltro(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="cred-grid">
          {filtrados.map(c => (
            <div key={c.id} className="cred-card">
              <div className="cred-icon">{c.icon}</div>
              <h4>{c.nombre}</h4>
              <div className="cred-info">
                <div className="cred-info-row">
                  <span>Tasa</span>
                  <span className="cred-tasa">{c.tasa}</span>
                </div>
                <div className="cred-info-row">
                  <span>Monto</span>
                  <span>{c.monto}</span>
                </div>
                <div className="cred-info-row">
                  <span>Plazo</span>
                  <span>{c.plazo}</span>
                </div>
              </div>
              <button className="cred-btn" onClick={handleSolicitar}>
                Solicitar crédito
              </button>
            </div>
          ))}
        </div>

        {/* CONFIRMACIÓN */}
        {solicitudId && (
          <div className="cred-ok">
            <span>✅</span>
            <div>
              <strong>¡Solicitud enviada!</strong>
              <p>Expediente: <code>{solicitudId}</code> — Un asesor se comunicará contigo pronto.</p>
            </div>
            <button onClick={() => setSolicitudId(null)}>✕</button>
          </div>
        )}

        {/* SIMULADOR */}
        <div className="cred-simulador">
          <h3 className="dash-section-title">Simulador de Cuotas</h3>
          <div className="cred-sim-card">
            <div className="cred-sim-inputs">
              <div className="cred-sim-group">
                <label>Monto del crédito</label>
                <div className="cred-sim-row">
                  <input type="range" min="1000" max="200000" step="500"
                    value={simulador.monto}
                    onChange={e => setSimulador({...simulador, monto: +e.target.value})}
                  />
                  <span>S/ {simulador.monto.toLocaleString()}</span>
                </div>
              </div>
              <div className="cred-sim-group">
                <label>Plazo (meses)</label>
                <div className="cred-sim-row">
                  <input type="range" min="6" max="240" step="6"
                    value={simulador.plazo}
                    onChange={e => setSimulador({...simulador, plazo: +e.target.value})}
                  />
                  <span>{simulador.plazo} meses</span>
                </div>
              </div>
              <div className="cred-sim-group">
                <label>Tasa de interés (TEA %)</label>
                <div className="cred-sim-row">
                  <input type="range" min="8" max="40" step="0.5"
                    value={simulador.tasa}
                    onChange={e => setSimulador({...simulador, tasa: +e.target.value})}
                  />
                  <span>{simulador.tasa}%</span>
                </div>
              </div>
            </div>

            <div className="cred-sim-results">
              <div className="cred-result-box primary">
                <span>Cuota mensual</span>
                <strong>S/ {parseFloat(cuotaMensual()).toLocaleString()}</strong>
              </div>
              <div className="cred-result-box">
                <span>Total a pagar</span>
                <strong>S/ {parseFloat(totalPagar()).toLocaleString()}</strong>
              </div>
              <div className="cred-result-box">
                <span>Intereses totales</span>
                <strong>S/ {(parseFloat(totalPagar()) - simulador.monto).toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>

      </main>

      <footer className="dash-footer">
        <p>© 2025 Caja Municipal de Ahorro y Crédito de Tacna — Supervisada por la SBS</p>
      </footer>

    </div>
  )
}