import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const banners = [
  { img: '/images/banner1.jpg.png' },
  { img: '/images/banner2.jpg.png' },
  { img: '/images/banner3.jpg.png' },
  { img: '/images/banner4.jpg.png' },
  { img: '/images/banner5.jpg.png' },
]

export default function Home() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent(prev => (prev - 1 + banners.length) % banners.length)
  const next = () => setCurrent(prev => (prev + 1) % banners.length)

  return (
    <div className="home-page">
      <div className="top-bar">
        <div className="top-bar-inner">
          <div className="top-bar-left">
            <a href="#">📍 Encuéntranos</a>
            <a href="#">📞 Central Telefónica: (052) 583658</a>
          </div>
          <div className="top-bar-right">
           <button onClick={() => window.location.href = 'http://localhost:5174/login'} className="btn-cuenta">
  Abre tu cuenta aquí
</button>
          </div>
        </div>
      </div>

      <nav className="home-navbar">
        <div className="navbar-inner">
          <div className="logo-box">
            <span className="logo-icon">🏦</span>
            <div className="logo-text">
              <span className="logo-main">CAJA</span>
              <span className="logo-main">TACNA</span>
              <span className="logo-sub">Queremos Contigo</span>
            </div>
          </div>
          <div className="navbar-search">
            <input type="text" placeholder="Buscar..." />
          </div>
          <button className="btn-internet" onClick={() => window.location.href = 'http://localhost:5174/login'}>
  🖥️ Tu Caja por Internet
</button>
        </div>

        <div className="navbar-menu">
          <div className="menu-inner">
            <a href="#">INICIO</a>
            <a href="#">NOSOTROS</a>
            <a href="#">CRÉDITOS ▾</a>
            <a href="#">AHORROS ▾</a>
            <a href="#">SERVICIOS ▾</a>
            <a href="#">CANALES DE ATENCIÓN ▾</a>
            <a href="#">NUESTRAS AGENCIAS ▾</a>
            <a href="#">CAMPAÑAS</a>
          </div>
        </div>
      </nav>

      <div className="carrusel">
        {banners.map((b, i) => (
          <div
            key={i}
            className={`carrusel-slide ${i === current ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${b.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
        <button className="carrusel-btn left" onClick={prev}>❮</button>
        <button className="carrusel-btn right" onClick={next}>❯</button>
        <div className="carrusel-dots">
          {banners.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>

      <div className="home-columns">
        <div className="col-card">
          <div className="col-img-container">
            <img src="/images/creditos.jpg.png" alt="Créditos" className="col-img" />
            <div className="col-overlay-box">
              <a href="#"><span className="red-arrow-icon">➔</span> Credipyme</a>
              <a href="#"><span className="red-arrow-icon">➔</span> Crédito Hipotecario</a>
              <a href="#"><span className="red-arrow-icon">➔</span> Crédito Personal</a>
            </div>
          </div>
          <div className="col-footer rojo">Créditos</div>
        </div>

        <div className="col-card">
          <div className="col-img-container">
            <img src="/images/ahorros.jpg.png" alt="Ahorros" className="col-img" />
            <div className="col-overlay-box">
              <a href="#"><span className="red-arrow-icon">➔</span> Ahorro Futuro</a>
              <a href="#"><span className="red-arrow-icon">➔</span> Ahorro Sueldo</a>
              <a href="#"><span className="red-arrow-icon">➔</span> Depósito a plazo fijo</a>
            </div>
          </div>
          <div className="col-footer rojo">Ahorros</div>
        </div>

        <div className="col-card">
          <div className="col-img-container">
            <img src="/images/canales.jpg.png" alt="Canales" className="col-img" />
            <div className="col-overlay-box">
              <a href="#"><span className="red-arrow-icon">➔</span> Caja Tacna App</a>
              <a href="#"><span className="red-arrow-icon">➔</span> Tu Caja por Internet</a>
              <a href="#"><span className="red-arrow-icon">➔</span> CMAC Móvil</a>
            </div>
          </div>
          <div className="col-footer rojo">Canales Digitales</div>
        </div>
      </div>

      <div className="main-services-wrapper">
        <div className="services-grid">
          <div className="service-column">
            <div className="trapezoid-red">
              <img src="/images/vivienda.jpg.png" alt="Vivienda" className="trap-icon" />
            </div>
            <h3 className="service-title">OBTÉN TU VIVIENDA</h3>
            <ul className="service-list">
              <li><span className="red-arrow">➤</span> Hipotecario - CrediHogar</li>
              <li><span className="red-arrow">➤</span> Hipotecario - Mi Vivienda</li>
              <li><span className="red-arrow">➤</span> Hipotecario - Casa Plus</li>
              <li><span className="red-arrow">➤</span> Complementario Techo Propio</li>
            </ul>
          </div>

          <div className="service-column">
            <div className="trapezoid-red">
              <img src="/images/ahorro-sueldo.jpg.png" alt="Ahorro Sueldo" className="trap-icon" />
            </div>
            <h3 className="service-title">AHORRO SUELDO</h3>
            <ul className="service-list">
              <li><span className="red-arrow">➤</span> Recibe una increíble "Tasa de Bienvenida"</li>
              <li><span className="red-arrow">➤</span> Accede al servicio de Adelanto de Sueldo</li>
              <li><span className="red-arrow">➤</span> Cubre pequeños gastos e imprevistos</li>
            </ul>
          </div>

          <div className="service-column">
            <div className="trapezoid-red">
              <img src="/images/servicios.jpg.png" alt="Más Servicios" className="trap-icon" />
            </div>
            <h3 className="service-title">MÁS SERVICIOS</h3>
            <ul className="service-list">
              <li><span className="red-arrow">➤</span> Transferencias interbancarias</li>
              <li><span className="red-arrow">➤</span> Giros y pagos de servicios</li>
              <li><span className="red-arrow">➤</span> Operaciones internacionales</li>
              <li><span className="red-arrow">➤</span> Constancias de no adeudo</li>
            </ul>
          </div>

          <div className="service-column app-column">
            <div className="trapezoid-red label-com">
              <img src="/images/comunicado.jpg.png" alt="Comunicado" className="trap-icon" />
              <span className="label-text">COMUNICADOS</span>
            </div>
            <div className="apps-container-box">
              <div className="app-header-logo">
                <span className="app-brand">CAJA TACNA <strong>APP</strong></span>
              </div>
              <button className="btn-haz-clic">HAZ CLIC AQUÍ</button>
              <div className="store-images">
                <img src="/images/google-play.jpg.jpeg" alt="Google Play" />
                <img src="/images/app-store.jpg.jpeg" alt="App Store" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="security-banner">
        <div className="security-container">
          <div className="security-alert">
            <div className="alert-icon-box">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="alert-info">
              <h4>¿Perdiste o sustrajeron tu tarjeta?</h4>
              <p>Comunícate al Contact Center: <strong>(052) 583658</strong></p>
              <p><strong>Opción 0:</strong> anulación por pérdida o robo</p>
              <p><strong>Opción 1:</strong> bloqueo de cuenta</p>
            </div>
          </div>

          <div className="security-tips">
            <h4>Para tu seguridad</h4>
            <p>Conoce medidas de prevención contra robo de información y delitos cibernéticos.</p>
            <a href="#" className="btn-ver-mas">VER MÁS +</a>
          </div>
        </div>
      </section>

      <footer className="main-footer-white">
        <div className="footer-grid-container">
          <div className="footer-column-info">
            <h5 className="footer-heading">CONTÁCTANOS</h5>
            <div className="contact-center-display">
              <i className="fa-solid fa-headset"></i>
              <div>
                <span className="contact-label-red">Contact Center</span>
                <span className="contact-phone-big">(52) 583658</span>
              </div>
            </div>
          </div>

          <div className="footer-column-info">
            <h5 className="footer-heading">INFORMACIÓN DE INTERÉS</h5>
            <ul className="footer-link-list">
              <li>Nosotros</li>
              <li>Transparencia</li>
              <li>Registro de proveedores</li>
              <li>Correo web</li>
            </ul>
          </div>

          <div className="footer-column-info">
            <h5 className="footer-heading">ATENCIÓN AL CLIENTE</h5>
            <ul className="footer-link-list">
              <li>Centro de Ayuda</li>
              <li>Libro de reclamaciones</li>
              <li>Sistema de procesos</li>
            </ul>
          </div>
        </div>
      </footer>

      <footer className="footer-bottom-black">
        <div className="footer-black-container">
          <div className="footer-black-col brand-info">
            <div className="brand-footer">
              <span className="brand-icon">🏢</span>
              <span className="brand-name-red">CAJA TACNA</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}