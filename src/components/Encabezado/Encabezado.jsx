import React, { useState, useEffect } from 'react'
import {
  FaCode,
  FaBars,
  FaTimes,
  FaHome,
  FaLaptopCode,
  FaBriefcase,
  FaEnvelope,
} from 'react-icons/fa'
import { useSmoothScroll } from '../../context/SmoothScrollContext.jsx'
import { gsap } from '../../gsap/registerGSAP'
import styles from './Encabezado.module.css'

/** Fuera del componente: referencia estable para el scroll-spy */
const NAV_SECCIONES = [
  {
    nombre: 'Inicio',
    Icon: FaHome,
    href: '#inicio',
    id: 'inicio',
    color: '#3b82f6',
  },
  {
    nombre: 'Sobre mí',
    Icon: FaLaptopCode,
    href: '#sobre-mi',
    id: 'sobre-mi',
    color: '#10b981',
  },
  {
    nombre: 'Proyectos',
    Icon: FaBriefcase,
    href: '#proyectos',
    id: 'proyectos',
    color: '#f59e0b',
  },
  {
    nombre: 'Contacto',
    Icon: FaEnvelope,
    href: '#contacto',
    id: 'contacto',
    color: '#ef4444',
  },
]

const Encabezado = () => {
  const { scrollToAnchor, smoother } = useSmoothScroll()
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [scrolleado, setScrolleado] = useState(false)
  const [seccionActiva, setSeccionActiva] = useState('inicio')

  /**
   * Scroll-spy por línea en viewport (no por “centro de sección”).
   * Con Proyectos muy alto, IntersectionObserver mantenía el foco en Proyectos
   * y el salto a Contacto no se sentía fluido.
   * Con ScrollSmoother, window.scroll a veces no dispara eventos cada frame;
   * gsap.ticker mantiene el color alineado al scroll suavizado.
   */
  useEffect(() => {
    const lineaActivacionPx = () =>
      Math.min(160, Math.max(96, Math.round(window.innerHeight * 0.26)))

    const actualizar = () => {
      const offset =
        window.scrollY ??
        window.pageYOffset ??
        document.documentElement.scrollTop ??
        0

      setScrolleado(offset > 50)

      const altura =
        document.documentElement.scrollHeight - window.innerHeight
      const progreso = altura > 0 ? (offset / altura) * 100 : 0
      const barraProgreso = document.querySelector(`.${styles.scrollProgress}`)
      if (barraProgreso) {
        barraProgreso.style.width = `${Math.min(progreso, 100)}%`
      }

      const linea = lineaActivacionPx()
      let seccionActual = NAV_SECCIONES[0].id

      for (const nav of NAV_SECCIONES) {
        const elemento = document.getElementById(nav.id)
        if (!elemento) continue
        const { top } = elemento.getBoundingClientRect()
        if (top <= linea) seccionActual = nav.id
      }

      setSeccionActiva((prev) =>
        prev !== seccionActual ? seccionActual : prev
      )
    }

    window.addEventListener('scroll', actualizar, { passive: true })
    actualizar()

    let quitarTicker = () => {}
    if (smoother) {
      gsap.ticker.add(actualizar)
      quitarTicker = () => gsap.ticker.remove(actualizar)
    }

    return () => {
      window.removeEventListener('scroll', actualizar)
      quitarTicker()
    }
  }, [smoother])

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto)
  }

  const cerrarMenu = () => {
    setMenuAbierto(false)
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && menuAbierto) {
        setMenuAbierto(false)
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [menuAbierto])

  const obtenerColorActivo = () => {
    const seccion = NAV_SECCIONES.find((nav) => nav.id === seccionActiva)
    return seccion ? seccion.color : '#3b82f6'
  }

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const indicador = document.getElementById('debug-seccion-activa')
      if (indicador) {
        indicador.textContent = `Sección activa: ${seccionActiva}`
        indicador.style.background = obtenerColorActivo()
      }
    }
  }, [seccionActiva])

  const manejarClickNavegacion = (e, href) => {
    e.preventDefault()
    cerrarMenu()

    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      setSeccionActiva(targetId)
      scrollToAnchor(href, false)
    }
  }

  return (
    <>
      <header
        className={`${styles.header} ${scrolleado ? styles.scrolleado : ''}`}
        style={{
          '--color-activo': obtenerColorActivo(),
        }}
      >
        <div className={styles.container}>
          <a
            href="#inicio"
            className={styles.logo}
            onClick={(e) => manejarClickNavegacion(e, '#inicio')}
          >
            <FaCode className={styles.logoIcon} />
            <span className={styles.logoTexto}>Mi Portafolio</span>
          </a>

          <nav className={`${styles.nav} ${menuAbierto ? styles.navAbierto : ''}`}>
            {NAV_SECCIONES.map((item) => {
              const Icon = item.Icon
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`${styles.navItem} ${seccionActiva === item.id ? styles.activo : ''}`}
                  onClick={(e) => manejarClickNavegacion(e, item.href)}
                  data-color={item.id}
                  style={{
                    '--item-color': item.color,
                  }}
                >
                  <span className={styles.icono} aria-hidden>
                    <Icon />
                  </span>
                  <span className={styles.texto}>{item.nombre}</span>
                </a>
              )
            })}
          </nav>

          <button
            className={styles.menuToggle}
            onClick={toggleMenu}
            aria-label="Abrir/Cerrar menú de navegación"
            aria-expanded={menuAbierto}
          >
            {menuAbierto ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div
          className={styles.scrollProgress}
          style={{
            background: `linear-gradient(90deg, ${obtenerColorActivo()}, ${obtenerColorActivo()}99)`,
          }}
        />
      </header>
      {menuAbierto && (
        <div
          className={styles.overlay}
          onClick={cerrarMenu}
          aria-hidden="true"
        />
      )}
    </>
  )
}

export default Encabezado
