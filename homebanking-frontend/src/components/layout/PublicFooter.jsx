import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react'
import Logo from '../ui/Logo.jsx'

const COLS = [
  {
    title: 'Productos',
    links: ['Cuenta de Ahorros', 'Ahorro Sueldo', 'Crédito Personal', 'Credipyme', 'CrediHogar'],
  },
  {
    title: 'Caja Tacna',
    links: ['Nosotros', 'Trabaja con nosotros', 'Memoria anual', 'Sostenibilidad', 'Sala de prensa'],
  },
  {
    title: 'Ayuda',
    links: ['Centro de ayuda', 'Ubícanos', 'Reclamos', 'Transparencia', 'Tasas y tarifas'],
  },
]

export default function PublicFooter() {
  return (
    <footer className="lp-footer" id="footer">
      <div className="lp-footer-inner">
        <div className="lp-footer-brand">
          <Logo size={40} variant="light" subtitle="BANCA DIGITAL" />
          <p>Tu caja municipal digital. Operaciones 100% en línea, seguras y a tu alcance desde cualquier lugar del Perú.</p>
          <div className="lp-social">
            <a href="#footer" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#footer" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#footer" aria-label="Twitter"><Twitter size={18} /></a>
          </div>
        </div>

        {COLS.map((c) => (
          <div className="lp-footer-col" key={c.title}>
            <h4>{c.title}</h4>
            <ul>
              {c.links.map((l) => (
                <li key={l}><a href="#footer">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lp-footer-col">
          <h4>Contacto</h4>
          <ul className="lp-contact">
            <li><Phone size={15} /> Central: (052) 583658</li>
            <li><Mail size={15} /> contacto@cmactacna.com.pe</li>
            <li><MapPin size={15} /> Av. San Martín 576, Tacna</li>
          </ul>
        </div>
      </div>

      <div className="hb-franja-top" />
      <div className="lp-footer-legal">
        © {new Date().getFullYear()} Caja Municipal de Ahorro y Crédito de Tacna — Supervisada por la SBS.
      </div>
    </footer>
  )
}