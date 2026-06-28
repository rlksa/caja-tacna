import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [cuentas, setCuentas] = useState([])
  const [movimientos, setMovimientos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const u = localStorage.getItem('user')
    if (!u) navigate('/login')
    else {
      setUser(u)
      cargarDatos()
    }
  }, [navigate])

  const cargarDatos = async () => {
    try {
      const [resCuentas, resMovis] = await Promise.all([
        fetch('http://localhost:8080/api/cuentas'),
        fetch('http://localhost:8080/api/movimientos')
      ])
      const dataCuentas = await resCuentas.json()
      const dataMovis = await resMovis.json()
      setCuentas(dataCuentas)
      setMovimientos(dataMovis)
    } catch (error) {
      setCuentas([
        { tipo: 'Ahorro Corriente', numero: '****-4521', saldo: 3850.00 },
        { tipo: 'Cuenta CTS', numero: '****-7834', saldo: 12400.00 },
        { tipo: 'DPF Tacna', numero: '****-2291', saldo: 20000.00 },
      ])
      setMovimientos([
        { fecha: '10/05/2025', descripcion: 'Depósito en ventanilla', tipo: 'ingreso', monto: 500.00 },
        { fecha: '08/05/2025', descripcion: 'Pago servicio SEAL', tipo: 'egreso', monto: -85.50 },
        { fecha: '05/05/2025', descripcion: 'Transferencia recibida', tipo: 'ingreso', monto: 1200.00 },
        { fecha: '01/05/2025', descripcion: 'Retiro cajero automático', tipo: 'egreso', monto: -200.00 },
        { fecha: '28/04/2025', descripcion: 'Pago pensión educativa', tipo: 'egreso', monto: -350.00 },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', fontSize:'18px', color:'#c70f1b' }}>
      Cargando...
    </div>
  )

  return (
    <div className="dash-page">

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
            <span className="dash-user">👤 {user}</span>
            <button className="dash-logout" onClick={() => {
              localStorage.removeItem('user')
              navigate('/login')
            }}>Cerrar sesión</button>
          </div>
        </div>
       <div className="dash-nav-menu">
  <a href="#" onClick={() => navigate('/dashboard')}>Inicio</a>
  <a href="#" onClick={() => navigate('/dashboard')}>Mis Cuentas</a>
  <a href="#">Transferencias</a>
  <a href="#">Pagos</a>
  <a href="#" onClick={() => navigate('/creditos')}>Créditos</a>
  <a href="#">Configuración</a>
</div>
      </nav>

      <main className="dash-main">

        <div className="dash-welcome">
          <div>
            <h2>¡Bienvenido, {user}! 👋</h2>
            <p>Consulta tus cuentas y realiza operaciones de forma segura.</p>
          </div>
          <span className="dash-fecha">
            {new Date().toLocaleDateString('es-PE', {
              weekday: 'long', day: 'numeric',
              month: 'long', year: 'numeric'
            })}
          </span>
        </div>

        <div className="dash-section">
          <h3 className="dash-section-title">Accesos Rápidos</h3>
          <div className="dash-accesos">
            {[
              { icon: '💸', label: 'Transferir' },
              { icon: '📄', label: 'Estado de cuenta' },
              { icon: '📱', label: 'Recargas' },
              { icon: '🏠', label: 'Pago servicios' },
              { icon: '💳', label: 'Mis créditos' },
              { icon: '📊', label: 'Simulador' },
            ].map((a, i) => (
              <button key={i} className="dash-acceso-btn">
                <span className="acceso-icon">{a.icon}</span>
                <span>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="dash-grid">

          <div className="dash-section">
            <h3 className="dash-section-title">Mis Cuentas</h3>
            <div className="dash-cuentas">
              {cuentas.map((c, i) => (
                <div key={i} className="dash-cuenta">
                  <div className="dash-cuenta-header">
                    <span className="dash-cuenta-tipo">{c.tipo}</span>
                    <span className="dash-cuenta-num">{c.numero}</span>
                  </div>
                  <div className="dash-cuenta-saldo">
                    S/ {parseFloat(c.saldo).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="dash-cuenta-btns">
                    <button>Ver movimientos</button>
                    <button>Transferir</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dash-section">
            <h3 className="dash-section-title">Últimos Movimientos</h3>
            <div className="dash-movis">
              {movimientos.map((m, i) => (
                <div key={i} className="dash-movi">
                  <div className={`dash-movi-dot ${m.tipo}`}></div>
                  <div className="dash-movi-info">
                    <span>{m.descripcion}</span>
                    <small>{m.fecha}</small>
                  </div>
                  <span className={`dash-movi-monto ${m.tipo}`}>
                    {m.monto > 0 ? '+' : ''}S/ {parseFloat(m.monto).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="dash-section">
          <h3 className="dash-section-title">Productos para ti</h3>
          <div className="dash-productos">
            <div className="dash-producto rojo">
              <span>🏠</span>
              <h4>CrediHogar</h4>
              <p>Crédito hipotecario con las mejores tasas</p>
              <button>Solicitar →</button>
            </div>
            <div className="dash-producto oscuro">
              <span>💼</span>
              <h4>Credipyme</h4>
              <p>Impulsa tu negocio con financiamiento flexible</p>
              <button>Solicitar →</button>
            </div>
            <div className="dash-producto gris">
              <span>📈</span>
              <h4>Depósito a Plazo</h4>
              <p>Gana más con tasas de hasta 8.5% TEA anual</p>
              <button>Conocer →</button>
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