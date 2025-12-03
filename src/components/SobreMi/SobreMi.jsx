import React, { useState, useRef, useEffect } from 'react';
import { 
  FaUser, FaHeart, FaCode, FaReact, FaNodeJs,
  FaLaravel, FaPython, FaDatabase, FaMobile, FaDesktop,
  FaGraduationCap, FaCertificate, FaAward, FaBullseye, // FaTarget no existe, usa FaBullseye
  FaFigma,
  FaVuejs
} from 'react-icons/fa';
import { 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiBootstrap,
  SiMysql, SiAngular, SiGit, SiFirebase, SiTailwindcss,
  SiPostgresql,
  SiNestjs,
  SiSupabase
} from 'react-icons/si';
import styles from './SobreMi.module.css';

const SobreMi = () => {
  const [tarjetaActiva, setTarjetaActiva] = useState(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Detectar visibilidad de la sección
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Datos principales sobre mí
  const informacionPrincipal = [
    {
      titulo: "¿Quién Soy?",
      icono: <FaUser />,
      contenido: "Soy Anthony Mejía, Estudiante de Ingeniería de Software y Desarrollador Web altamente motivado con sólidos conocimientos en desarrollo de software y diseño de interfaces web.",
      color: "#3b82f6"
    },
    {
      titulo: "Mi Objetivo",
      icono: <FaBullseye />,
      contenido: "Mi objetivo es seguir aprendiendo y aplicar mis conocimientos actuales para ganar experiencia en diversas áreas como Front-end y Back-end. Me apasiona crear soluciones elegantes para problemas complejos.",
      color: "#10b981"
    },
    {
      titulo: "Mi Perfil",
      icono: <FaHeart />,
      contenido: "Me caracterizo por mi capacidad para adaptarme rápidamente a nuevos entornos de trabajo y tecnologías, mi atención al detalle y mi compromiso con la entrega de productos de alta calidad.",
      color: "#f59e0b"
    }
  ];

  // Habilidades técnicas principales
const habilidadesPrincipales = [
    { nombre: "React", icono: <FaReact />, color: "#61DAFB" },     // Azul React
    { nombre: "Laravel", icono: <FaLaravel />, color: "#FF2D20" }, // Rojo Laravel
    { nombre: "Vue", icono: <FaVuejs />, color: "#41B883" },      // Verde oficial Vue
    { nombre: "Node.js", icono: <FaNodeJs />, color: "#339933" },  // Verde Node
    { nombre: "Supabase", icono: <SiSupabase />, color: "#3ECF8E" }, // Verde Supabase
    { nombre: "Postgres", icono: <SiPostgresql />, color: "#336791" }, // Azul PostgreSQL
    { nombre: "Git", icono: <SiGit />, color: "#F05032" },         // Naranja Git
    { nombre: "NestJS", icono: <SiNestjs />, color: "#E0234E" },   // Rojo NestJS
    { nombre: "Tailwind", icono: <SiTailwindcss />, color: "#06B6D4" }, // Azul Tailwind
    { nombre: "Figma", icono: <FaFigma />, color: "#F24E1E" },     // Naranja Figma
];


  // Datos adicionales sobre experiencia
  const datosExperiencia = [
    {
      numero: "2+",
      descripcion: "Años de experiencia",
      icono: <FaCode />
    },
    {
      numero: "10+",
      descripcion: "Proyectos completados",
      icono: <FaDesktop />
    },
    {
      numero: "5+",
      descripcion: "Tecnologías dominadas",
      icono: <FaMobile />
    },
    {
      numero: "",
      descripcion: "Título universitario",
      icono: <FaGraduationCap />
    }
  ];

  return (
    <section 
      className={`${styles.sobreMi} ${isVisible ? styles.visible : ''}`}
      id="sobre-mi"
      ref={sectionRef}
    >
      <div className={styles.container}>
        
        {/* Encabezado de la sección */}
        <div className={styles.encabezado}>
          <h2 className={styles.titulo}>
            Sobre Mí
          </h2>
          <div className={styles.lineaDecorativa}></div>
        </div>

        {/* Información principal en cards */}
        <div className={styles.gridPrincipal}>
          {informacionPrincipal.map((info, index) => (
            <div
              key={index}
              className={`${styles.tarjetaPrincipal} ${
                tarjetaActiva === index ? styles.activa : ''
              }`}
              style={{ 
                '--tarjeta-color': info.color,
                animationDelay: `${index * 0.2}s`
              }}
              onMouseEnter={() => setTarjetaActiva(index)}
              onMouseLeave={() => setTarjetaActiva(null)}
            >
              <div className={styles.iconoTarjeta}>
                {info.icono}
              </div>
              <h3 className={styles.tituloTarjeta}>
                {info.titulo}
              </h3>
              <p className={styles.contenidoTarjeta}>
                {info.contenido}
              </p>
              
              {/* Efecto de brillo */}
              <div className={styles.efectoBrillo}></div>
            </div>
          ))}
        </div>

        {/* Sección de habilidades técnicas */}
        <div className={styles.seccionHabilidades}>
          <h3 className={styles.tituloHabilidades}>
            Mis Habilidades Técnicas
          </h3>
          <div className={styles.lineaSubDecorativa}></div>
          
          <div className={styles.gridHabilidades}>
            {habilidadesPrincipales.map((habilidad, index) => (
              <div
                key={habilidad.nombre}
                className={styles.habilidadItem}
                style={{ 
                  '--habilidad-color': habilidad.color,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className={styles.habilidadIcono}>
                  {habilidad.icono}
                </div>
                <span className={styles.habilidadNombre}>
                  {habilidad.nombre}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Estadísticas de experiencia */}
        <div className={styles.seccionEstadisticas}>
          <div className={styles.gridEstadisticas}>
            {datosExperiencia.map((dato, index) => (
              <div
                key={index}
                className={styles.estadisticaItem}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={styles.estadisticaIcono}>
                  {dato.icono}
                </div>
                <div className={styles.estadisticaNumero}>
                  {dato.numero}
                </div>
                <div className={styles.estadisticaTexto}>
                  {dato.descripcion}
                </div>
              </div>
            ))}
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
  );
};

export default SobreMi;