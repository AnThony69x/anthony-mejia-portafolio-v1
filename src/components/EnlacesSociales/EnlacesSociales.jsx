import React from 'react'
import { 
  FaGithub, 
  FaInstagram, 
  FaLinkedin,
  FaWhatsapp, 
} from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import styles from './EnlacesSociales.module.css'

const EnlacesSociales = () => {
  const enlacesSociales = [
    { 
      icono: FaGithub, 
      url: 'https://github.com/AnThony69x', 
      nombre: 'GitHub',
      color: '#333',
      descripcion: 'Mis proyectos y código'
    },
    { 
      icono: FaLinkedin, 
      url: 'https://www.linkedin.com/in/anthony-mejia-1138891a8/', 
      nombre: 'LinkedIn',
      color: '#0077b5',
      descripcion: 'Red profesional'
    },
    {
      icono:FaInstagram,
      url: 'https://www.instagram.com/thony.a_69x/',
      nombre: 'Instagram',
      color: '#e1306c',
      descripcion: 'Momentos de mi vida'
    },
    {
      icono: FaWhatsapp,
      url: 'https://wa.me/+593979062065',
      nombre: 'WhatsApp',
      color: '#25D366',
      descripcion: 'Chat en tiempo real'
    },
    { 
      icono: SiGmail, 
      url: 'mailto:anthonimejia2003@gmail.com', 
      nombre: 'Email',
      color: '#ea4335',
      descripcion: 'Contacto directo'
    },
  ]

  return (
    <div className={styles.seccionSocial}>
      <div className={styles.encabezado}>
        <span className={styles.etiquetaSocial}>Sígueme en:</span>
        <div className={styles.lineaDecorativa}></div>
      </div>
      
      <div className={styles.enlacesSociales}>
        {enlacesSociales.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target={social.url.startsWith('mailto:') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className={styles.enlaceSocial}
            style={{ 
              '--color-hover': social.color,
              '--delay-animation': `${index * 0.1}s`
            }}
            aria-label={`Visitar mi ${social.nombre}: ${social.descripcion}`}
            data-tooltip={social.descripcion}
            data-name={social.nombre}
          >
            <div className={styles.iconoWrapper}>
              <social.icono className={styles.iconoSocial} />
              <div className={styles.efectoRipple}></div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default EnlacesSociales