import React, { useState, useRef, useEffect } from 'react'
import { 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaUser, 
  FaPaperPlane,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp
} from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import styles from './Contacto.module.css'

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  })
  
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  // Detectar visibilidad de la sección
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Información de contacto
  const informacionContacto = [
    {
      icono: <SiGmail />,
      titulo: 'Email',
      valor: 'anthonimejia2003@gmail.com',
      enlace: 'mailto:anthonimejia2003@gmail.com',
      color: '#ea4335'
    },
    {
      icono: <FaWhatsapp />,
      titulo: 'WhatsApp',
      valor: '+593 97 906 2065',
      enlace: 'https://wa.me/+593979062065',
      color: '#25D366'
    },
    {
      icono: <FaMapMarkerAlt />,
      titulo: 'Ubicación',
      valor: 'Ecuador',
      enlace: null,
      color: '#3b82f6'
    }
  ]

  // Enlaces sociales
  const enlacesSociales = [
    { 
      icono: FaGithub, 
      url: 'https://github.com/AnThony69x', 
      nombre: 'GitHub',
      color: '#333'
    },
    { 
      icono: FaLinkedin, 
      url: 'https://www.linkedin.com/in/anthony-mejia-1138891a8/', 
      nombre: 'LinkedIn',
      color: '#0077b5'
    },
    {
      icono: FaInstagram,
      url: 'https://www.instagram.com/thony.a_69x/',
      nombre: 'Instagram',
      color: '#e1306c'
    }
  ]

  // Validación del formulario
  const validarCampo = (nombre, valor) => {
    switch (nombre) {
      case 'nombre':
        if (!valor.trim()) return 'El nombre es requerido'
        if (valor.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres'
        return ''
      case 'email':
        if (!valor.trim()) return 'El email es requerido'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(valor)) return 'Por favor ingresa un email válido'
        return ''
      case 'asunto':
        if (!valor.trim()) return 'El asunto es requerido'
        if (valor.trim().length < 5) return 'El asunto debe tener al menos 5 caracteres'
        return ''
      case 'mensaje':
        if (!valor.trim()) return 'El mensaje es requerido'
        if (valor.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres'
        return ''
      default:
        return ''
    }
  }

  // Manejar cambios en el formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Validación en tiempo real
    const error = validarCampo(name, value)
    setErrores(prev => ({
      ...prev,
      [name]: error
    }))
  }

  // Manejar envío del formulario
  const manejarEnvio = async (e) => {
    e.preventDefault()
    
    // Validar todos los campos
    const nuevosErrores = {}
    Object.keys(formData).forEach(campo => {
      const error = validarCampo(campo, formData[campo])
      if (error) nuevosErrores[campo] = error
    })

    setErrores(nuevosErrores)

    // Si hay errores, no continuar
    if (Object.keys(nuevosErrores).length > 0) {
      return
    }

    setEnviando(true)

    try {
      // Simular envío del formulario (en un proyecto real, aquí iría la lógica de envío)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Crear enlace mailto con los datos del formulario
      const mailtoLink = `mailto:anthonimejia2003@gmail.com?subject=${encodeURIComponent(formData.asunto)}&body=${encodeURIComponent(
        `Nombre: ${formData.nombre}\nEmail: ${formData.email}\n\nMensaje:\n${formData.mensaje}`
      )}`
      
      // Abrir cliente de email
      window.location.href = mailtoLink
      
      // Limpiar formulario
      setFormData({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
      })
      
    } catch (error) {
      console.error('Error al enviar el formulario:', error)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="contacto"
      className={`${styles.contacto} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.container}>
        {/* Encabezado */}
        <div className={styles.encabezado}>
          <div className={styles.tagContainer}>
            <span className={styles.tag}>Conectemos</span>
          </div>
          <h2 className={styles.titulo}>
            📧 Contacto
          </h2>
          <p className={styles.descripcion}>
            ¿Tienes un proyecto en mente o quieres colaborar? ¡Me encantaría saber de ti!
          </p>
        </div>

        {/* Contenido principal */}
        <div className={styles.contenidoPrincipal}>
          {/* Formulario de contacto */}
          <div className={styles.formularioContainer}>
            <div className={styles.formularioCard}>
              <h3 className={styles.formularioTitulo}>
                <FaEnvelope className={styles.formularioIcono} />
                Envíame un mensaje
              </h3>
              
              <form onSubmit={manejarEnvio} className={styles.formulario}>
                <div className={styles.campoGrupo}>
                  <div className={styles.campo}>
                    <label htmlFor="nombre" className={styles.label}>
                      <FaUser className={styles.labelIcono} />
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={manejarCambio}
                      className={`${styles.input} ${errores.nombre ? styles.inputError : ''}`}
                      placeholder="Tu nombre completo"
                    />
                    {errores.nombre && (
                      <span className={styles.errorTexto}>{errores.nombre}</span>
                    )}
                  </div>

                  <div className={styles.campo}>
                    <label htmlFor="email" className={styles.label}>
                      <FaEnvelope className={styles.labelIcono} />
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={manejarCambio}
                      className={`${styles.input} ${errores.email ? styles.inputError : ''}`}
                      placeholder="tu@email.com"
                    />
                    {errores.email && (
                      <span className={styles.errorTexto}>{errores.email}</span>
                    )}
                  </div>
                </div>

                <div className={styles.campo}>
                  <label htmlFor="asunto" className={styles.label}>
                    Asunto *
                  </label>
                  <input
                    type="text"
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={manejarCambio}
                    className={`${styles.input} ${errores.asunto ? styles.inputError : ''}`}
                    placeholder="Asunto del mensaje"
                  />
                  {errores.asunto && (
                    <span className={styles.errorTexto}>{errores.asunto}</span>
                  )}
                </div>

                <div className={styles.campo}>
                  <label htmlFor="mensaje" className={styles.label}>
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={manejarCambio}
                    rows="5"
                    className={`${styles.textarea} ${errores.mensaje ? styles.inputError : ''}`}
                    placeholder="Cuéntame sobre tu proyecto o idea..."
                  />
                  {errores.mensaje && (
                    <span className={styles.errorTexto}>{errores.mensaje}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={enviando}
                  className={`${styles.botonEnviar} ${enviando ? styles.enviando : ''}`}
                >
                  {enviando ? (
                    <>
                      <div className={styles.spinner}></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className={styles.botonIcono} />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Información de contacto */}
          <div className={styles.infoContainer}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitulo}>
                Información de contacto
              </h3>
              
              <div className={styles.infoItems}>
                {informacionContacto.map((info, index) => (
                  <div
                    key={index}
                    className={styles.infoItem}
                    style={{ 
                      '--item-color': info.color,
                      '--animation-delay': `${index * 0.1}s`
                    }}
                  >
                    <div className={styles.infoIcono}>
                      {info.icono}
                    </div>
                    <div className={styles.infoContenido}>
                      <h4 className={styles.infoNombre}>{info.titulo}</h4>
                      {info.enlace ? (
                        <a 
                          href={info.enlace}
                          target={info.enlace.startsWith('mailto:') ? '_self' : '_blank'}
                          rel="noopener noreferrer"
                          className={styles.infoValor}
                        >
                          {info.valor}
                        </a>
                      ) : (
                        <p className={styles.infoValor}>{info.valor}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Enlaces sociales */}
              <div className={styles.socialContainer}>
                <h4 className={styles.socialTitulo}>Sígueme en:</h4>
                <div className={styles.socialLinks}>
                  {enlacesSociales.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      style={{ 
                        '--social-color': social.color,
                        '--animation-delay': `${index * 0.1}s`
                      }}
                      aria-label={`Visitar mi ${social.nombre}`}
                    >
                      <social.icono className={styles.socialIcono} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos de fondo */}
      <div className={styles.fondoDecorativo}>
        <div className={styles.circuloDecorativo1}></div>
        <div className={styles.circuloDecorativo2}></div>
        <div className={styles.circuloDecorativo3}></div>
      </div>
    </section>
  )
}

export default Contacto