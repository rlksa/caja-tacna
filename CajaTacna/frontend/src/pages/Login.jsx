import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [form, setForm] = useState({ usuario: '', clave: '' });
  const [tab, setTab] = useState('personas');
  const navigate = useNavigate();

  const isEmpresarial = tab === 'empresarial';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: form.usuario, clave: form.clave })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', data.usuario);
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      // Si el backend no está disponible, usa modo demo
      if (form.usuario && form.clave) {
        localStorage.setItem('user', form.usuario);
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="login-full-bg">
      <div className="login-container-card">

        <div className="login-tabs">
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

        <div className="login-body">
          <div className="login-logo-central">
            <img
              src={isEmpresarial ? "/images/logo_caja_tacna_azul.png" : "/images/logo_caja_tacna.png"}
              alt="Caja Tacna"
            />
          </div>

          <p className="welcome-text">Te damos la bienvenida</p>
          <p className="affiliate-text">
            ¿Eres nuevo?{' '}
            <a
              href="#"
              className={isEmpresarial ? 'text-blue' : 'text-red'}
              onClick={(e) => { e.preventDefault(); navigate('/afiliate'); }}
            >
              Afíliate aquí.
            </a>
          </p>

          <form onSubmit={handleSubmit} className="form-main">
            <div className="input-field">
              <input type="text" name="usuario" placeholder="Número de tarjeta" onChange={handleChange} />
              <span className="eye-icon">👁️</span>
            </div>

            <div className="checkbox-row">
              <input type="checkbox" id="recordar-t" />
              <label htmlFor="recordar-t">Recordar tarjeta</label>
            </div>

            <div className="input-field select-input">
              <select className="doc-type">
                <option>DNI</option>
                <option>RUC</option>
                <option>CE</option>
              </select>
              <input type="text" name="clave" placeholder="Número de documento" onChange={handleChange} />
              <span className="eye-icon">👁️</span>
            </div>

            <div className="checkbox-row">
              <input type="checkbox" id="recordar-d" />
              <label htmlFor="recordar-d">Recordar documento</label>
            </div>

            <button type="submit" className={`btn-ingresar ${isEmpresarial ? 'btn-blue' : 'btn-red'}`}>
              Ingresar
            </button>
          </form>

          <div className="login-help-icons">
            <div className="help-box">
              <p className={isEmpresarial ? 'text-blue' : 'text-red'}>Requerimientos</p>
              <span className="help-emoji">📝</span>
            </div>
            <div className="help-box">
              <p className={isEmpresarial ? 'text-blue' : 'text-red'}>Libro de Reclamaciones</p>
              <span className="help-emoji">📖</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}