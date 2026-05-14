import React, { useState, useEffect } from 'react'
import { FaCode, FaBars, FaTimes } from 'react-icons/fa'
import { useSmoothScroll } from '../../context/SmoothScrollContext.jsx'
import styles from './Encabezado.module.css'

const Encabezado = () => {
  const { scrollToAnchor } = useSmoothScroll()
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [scrolleado, setScrolleado] = useState(false)
  const [seccionActiva, setSeccionActiva] = useState('inicio')

  const elementosNav = [
    { 
      nombre: 'Inicio', 
      icono: '🏠', // AGREGADO: icono que faltaba
      href: '#inicio', 
      id: 'inicio',
      color: '#3b82f6' // Azul
    },
    { 
      nombre: 'Sobre mí',
      icono: '👨‍💻', // AGREGADO: icono que faltaba
      href: '#sobre-mi',
      id: 'sobre-mi',
      color: '#10b981' // Verde
    },
    { 
      nombre: 'Proyectos', 
      icono: '💼', // AGREGADO: icono que faltaba
      href: '#proyectos', 
      id: 'proyectos',
      color: '#f59e0b' // Amarillo
    },
    { 
      nombre: 'Contacto', 
      icono: '📧', // AGREGADO: icono que faltaba
      href: '#contacto', 
      id: 'contacto',
      color: '#ef4444' // Rojo
    }
  ]

  // Detectar scroll para cambiar apariencia del header y detectar sección activa
  useEffect(() => {
    const manejarScroll = () => {
      const offset = window.scrollY
      setScrolleado(offset > 50)
      
      // AGREGADO: Actualizar barra de progreso
      const altura = document.documentElement.scrollHeight - window.innerHeight
      const progreso = (offset / altura) * 100
      const barraProgreso = document.querySelector(`.${styles.scrollProgress}`)
      if (barraProgreso) {
        barraProgreso.style.width = `${Math.min(progreso, 100)}%`
      }

      // AGREGADO: Función de respaldo para detectar sección activa por scroll
      detectarSeccionActivaPorScroll()
    }

    // Función de respaldo para detectar sección activa
    const detectarSeccionActivaPorScroll = () => {
      const headerHeight = 100 // Altura del header
      const scrollPosition = window.scrollY + headerHeight

      let seccionActual = 'inicio'

      for (const nav of elementosNav) {
        const elemento = document.getElementById(nav.id)
        if (elemento) {
          const rect = elemento.getBoundingClientRect()
          const elementTop = window.scrollY + rect.top
          
          if (scrollPosition >= elementTop - 100) { // 100px de margen
            seccionActual = nav.id
          }
        }
      }

      setSeccionActiva((prev) => (prev !== seccionActual ? seccionActual : prev))
    }

    window.addEventListener('scroll', manejarScroll, { passive: true })
    manejarScroll()

    return () => window.removeEventListener('scroll', manejarScroll)
  }, [])

  // CORREGIDO: Detectar sección activa con configuración mejorada
  useEffect(() => {
    const opciones = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Zona del 20% superior e inferior
      threshold: [0, 0.25, 0.5, 0.75, 1] // Múltiples puntos de detección
    }

    const observador = new IntersectionObserver((entries) => {
      const seccionesVisibles = entries.filter(entry => entry.isIntersecting)
      
      if (seccionesVisibles.length > 0) {
        // Ordenar por posición en la página (de arriba hacia abajo)
        seccionesVisibles.sort((a, b) => {
          const rectA = a.target.getBoundingClientRect()
          const rectB = b.target.getBoundingClientRect()
          return rectA.top - rectB.top
        })

        // Si hay múltiples secciones visibles, tomar la que está más centrada
        let mejorSeccion = seccionesVisibles[0]
        let mejorDistancia = Infinity

        seccionesVisibles.forEach(entry => {
          const rect = entry.target.getBoundingClientRect()
          const centro = rect.top + rect.height / 2
          const centroVentana = window.innerHeight / 2
          const distancia = Math.abs(centro - centroVentana)
          
          if (distancia < mejorDistancia) {
            mejorDistancia = distancia
            mejorSeccion = entry
          }
        })

        const seccionId = mejorSeccion.target.id
        
        if (seccionId && elementosNav.some(nav => nav.id === seccionId)) {
          setSeccionActiva(seccionId)
        }
      }
    }, opciones)

    // Función para inicializar el observador
    const inicializarObservador = () => {
      const secciones = elementosNav.map(nav => document.getElementById(nav.id)).filter(Boolean)      
      if (secciones.length === elementosNav.length) {
        secciones.forEach(seccion => {
          observador.observe(seccion)
        })
        return true
      }
      return false
    }

    // Intentar inicializar inmediatamente
    if (!inicializarObservador()) {
      // Si no se encuentran todas las secciones, esperar un poco más
      const timer = setTimeout(() => {
        inicializarObservador()
      }, 500)
      
      return () => {
        clearTimeout(timer)
        observador.disconnect()
      }
    }

    return () => {
      observador.disconnect()
    }
  }, []) // Dependencias vacías para ejecutar solo una vez

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto)
  }

  const cerrarMenu = () => {
    setMenuAbierto(false)
  }

  // Cerrar menú con Escape
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && menuAbierto) {
        setMenuAbierto(false)
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [menuAbierto])

  // Obtener el color de la sección activa
  const obtenerColorActivo = () => {
    const seccion = elementosNav.find(nav => nav.id === seccionActiva)
    return seccion ? seccion.color : '#3b82f6'
  }

  // DEBUG: Mostrar sección activa (solo para desarrollo)
  useEffect(() => {
    
    // Mostrar indicador visual temporal (solo para debug)
    if (process.env.NODE_ENV === 'development') {
      const indicador = document.getElementById('debug-seccion-activa')
      if (indicador) {
        indicador.textContent = `Sección activa: ${seccionActiva}`
        indicador.style.background = obtenerColorActivo()
      }
    }
  }, [seccionActiva])

  // Manejar clic en navegación con scroll suave
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
          '--color-activo': obtenerColorActivo()
        }}
      >
        <div className={styles.container}>
          {/* Logo */}
          <a 
            href="#inicio" 
            className={styles.logo} 
            onClick={(e) => manejarClickNavegacion(e, '#inicio')}
          >
            <FaCode className={styles.logoIcon} />
            <span className={styles.logoTexto}>Mi Portafolio</span>
          </a>

          {/* Navegación desktop */}
          <nav className={`${styles.nav} ${menuAbierto ? styles.navAbierto : ''}`}>
            {elementosNav.map((item, index) => (
              <a 
                key={item.id}
                href={item.href}
                className={`${styles.navItem} ${seccionActiva === item.id ? styles.activo : ''}`}
                onClick={(e) => manejarClickNavegacion(e, item.href)}
                data-color={item.id} // AGREGADO: atributo data-color
                style={{
                  '--item-color': item.color
                }}
              >
                <span className={styles.icono}>{item.icono}</span>
                <span className={styles.texto}>{item.nombre}</span>
              </a>
            ))}
          </nav>

          {/* Botón menú móvil */}
          <button 
            className={styles.menuToggle}
            onClick={toggleMenu}
            aria-label="Abrir/Cerrar menú de navegación"
            aria-expanded={menuAbierto}
          >
            {menuAbierto ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Barra de progreso de scroll */}
        <div 
          className={styles.scrollProgress}
          style={{
            background: `linear-gradient(90deg, ${obtenerColorActivo()}, ${obtenerColorActivo()}99)`
          }}
        ></div>
      </header>
      {/* Overlay para cerrar menú en móvil */}
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