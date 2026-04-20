import React, { useState } from "react";
import { 
  FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, 
  FaHtml5, FaCss3Alt, FaJs, FaDatabase, FaPlay,
} from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiPostgresql, SiNextdotjs, SiSqlite, SiVite } from "react-icons/si";
import styles from "./Proyectos.module.css";

const Proyectos = () => {
  const [filtroActivo, setFiltroActivo] = useState("todos");

  // Datos de proyectos
  const proyectos = [
{
  id: 1,
  titulo: "PrediRuta",
  descripcion: "Sistema web inteligente que predice la congestión vehicular y recomienda rutas óptimas en tiempo real mediante modelos de Machine Learning, integrando mapas interactivos y arquitectura basada en microservicios.",
  imagen: "/proyecto3.jpg",
  tecnologias: ["Next.js", "TailwindCSS", "FastAPI", "Python", "TensorFlow", "Supabase", "PostgreSQL", "Docker"],
  categoria: "fullstack",
  githubUrl: "https://github.com/AnThony69x/PrediRuta.git",
  liveUrl: "https://predi-ruta.vercel.app/",
  destacado: true
},
{
  id: 2,
  titulo: "Geotípico - Plataforma de Restaurantes",
  descripcion: "Aplicación web avanzada para descubrimiento y gestión de restaurantes con geolocalización precisa, sistema de reservas, reseñas de usuarios y mapas interactivos.",
  imagen: "/proyecto5.jpg",
  tecnologias: ["Next.js", "MongoDB", "Tailwind", "JavaScript"],
  categoria: "fullstack",
  githubUrl: "https://github.com/AnThony69x/Geotipico-Restaurantes",
  liveUrl: "https://geotipico.vercel.app/",
  destacado: true
},
{
  id: 3,
  titulo: "EduIA – Data Storytelling",
  descripcion: "Experiencia interactiva que transforma datos sobre el uso de IA en estudiantes en una narrativa visual inmersiva, combinando gráficos dinámicos, animaciones cinematográficas y storytelling basado en datos reales.",
  imagen: "/proyecto2.jpg",
  tecnologias: ["React", "Vite", "D3.js", "GSAP", "ScrollTrigger", "Lenis", "CSS"],
  categoria: "frontend",
  githubUrl: "https://github.com/AnThony69x/EduIa-Visualizacion.git",
  liveUrl: "https://edu-ia-visualizacion.vercel.app/",
  destacado: true
},
{
  id: 4,
  titulo: "TaskFlow - Gestión de Tareas",
  descripcion: "Aplicación completa de gestión de tareas con funcionalidades avanzadas: drag & drop intuitivo, categorías personalizables, filtros inteligentes y sincronización en tiempo real entre dispositivos.",
  imagen: "/proyecto4.jpg",
  tecnologias: ["Vue", "Vite", "Express.js", "Supabase"],
  categoria: "fullstack",
  githubUrl: "https://github.com/AnThony69x/GestionTareas",
  liveUrl: "https://gestion-tareas-rose.vercel.app/",
  destacado: false
},
{
  id: 5,
  titulo: "API REST Enterprise",
  descripcion: "API robusta y escalable con arquitectura empresarial: autenticación JWT segura, documentación Swagger automática, sistema de roles granular y manejo avanzado de errores.",
  imagen: "/proyecto6.jpg",
  tecnologias: ["Next.js", "SQLite", "JavaScript", "TypeORM"],
  categoria: "backend",
  githubUrl: "https://github.com/AnThony69x/Api-Rest",
  liveUrl: null,
  destacado: false
},
{
  id: 6,
  titulo: "Academia Online",
  descripcion: "Plataforma completa de cursos en línea con sistema de suscripciones, dashboards avanzados, certificados automáticos y gestión integral para estudiantes, instructores y administradores.",
  imagen: "/proyecto1.jpg",
  tecnologias: ["React", "TypeScript", "Supabase", "Edge Functions", "Stripe", "PostgreSQL", "Tailwind"],
  categoria: "fullstack",
  githubUrl: "https://github.com/AnThony69x/arquitectura-learn-pro.git",
  liveUrl: "https://arquitectura-learn-pro.vercel.app/",
  destacado: false
},
{
  id: 7,
  titulo: "WatchHub",
  descripcion: "Plataforma de streaming moderna con autenticación avanzada (2FA), gestión de suscripciones, sistema de pagos y catálogo personalizado, ofreciendo una experiencia completa tipo Netflix con enfoque en seguridad y escalabilidad.",
  imagen: "/proyecto7.jpg",
  tecnologias: ["React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind", "Vite", "shadcn/ui"],
  categoria: "fullstack",
  githubUrl: "https://github.com/CarlosJChileS/ModeladoWatchub",
  liveUrl: "https://watchhub-demo.vercel.app",
  destacado: false
},
  ];

  // Filtros de categorías
  const categorias = [
    { id: "todos", label: "Todos", count: proyectos.length },
    { id: "fullstack", label: "Full Stack", count: proyectos.filter(p => p.categoria === "fullstack").length },
    { id: "frontend", label: "Frontend", count: proyectos.filter(p => p.categoria === "frontend").length },
    { id: "backend", label: "Backend", count: proyectos.filter(p => p.categoria === "backend").length }
  ];

// Función para obtener el icono de la tecnología
const obtenerIconoTech = (tech) => {
  const iconos = {
    "React": <FaReact />,
    "Node.js": <FaNodeJs />,
    "MongoDB": <SiMongodb />,
    "PostgreSQL": <SiPostgresql />,
    "Tailwind": <SiTailwindcss />,
    "Next.js": <SiNextdotjs />,
    "JavaScript": <FaJs />,
    "HTML": <FaHtml5 />,
    "CSS": <FaCss3Alt />,
    // AGREGADOS PARA TUS PROYECTOS
    "Vue": <FaReact style={{color: "#4FC08D"}} />, 
    "Vite": <SiVite />,
    "Express.js": <FaNodeJs style={{color: "#68A063"}} />,
    "Supabase": <FaDatabase style={{color: "#3ECF8E"}} />,
    "SQLite": <SiSqlite />,
    "TypeORM": <FaDatabase style={{color: "#E83524"}} />
  };
  return iconos[tech] || <FaDatabase />;
};

  // Filtrar proyectos
  const proyectosFiltrados = filtroActivo === "todos" 
    ? proyectos 
    : proyectos.filter(proyecto => proyecto.categoria === filtroActivo);

  return (
    <section className={styles.proyectos} id="proyectos">
      <div className={styles.container}>
        
        {/* Header de la sección */}
        <div className={styles.header}>
          <div className={styles.encabezado}>
            <h2 className={styles.titulo}>
              Mis Proyectos
              <span className={styles.emoji}>🚀</span>
            </h2>
            <div className={styles.lineaDecorativa}></div>
          </div>
          
          <p className={styles.descripcion}>
            Una colección de proyectos que demuestran mis habilidades en desarrollo web, 
            desde aplicaciones frontend hasta sistemas full-stack completos.
          </p>

          {/* Filtros de categorías */}
          <div className={styles.filtros}>
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => setFiltroActivo(categoria.id)}
                className={`${styles.filtro} ${
                  filtroActivo === categoria.id ? styles.filtroActivo : ""
                }`}
              >
                {categoria.label}
                <span className={styles.contador}>{categoria.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid de proyectos */}
        <div className={styles.gridProyectos}>
          {proyectosFiltrados.map((proyecto, index) => (
            <div 
              key={proyecto.id}
              className={`${styles.proyectoCard} ${
                proyecto.destacado ? styles.destacado : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              
              {/* Imagen del proyecto */}
              <div className={styles.imagenContainer}>
                <img 
                  src={proyecto.imagen} 
                  alt={`Captura de pantalla del proyecto ${proyecto.titulo}`}
                  className={styles.imagenProyecto}
                  loading="lazy"
                />
                <div className={styles.overlay}>
                  <div className={styles.botonesOverlay}>
                    <a
                      href={proyecto.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.botonOverlay}
                      aria-label="Ver código en GitHub"
                    >
                      <FaGithub />
                    </a>
                    {proyecto.liveUrl && (
                      <a
                        href={proyecto.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.botonOverlay}
                        aria-label="Ver proyecto en vivo"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                </div>
                
                {proyecto.destacado && (
                  <div className={styles.badgeDestacado}>
                    ⭐ Destacado
                  </div>
                )}
              </div>

              {/* Contenido del proyecto */}
              <div className={styles.contenidoCard}>
                <h3 className={styles.tituloProyecto}>{proyecto.titulo}</h3>
                <p className={styles.descripcionProyecto}>{proyecto.descripcion}</p>

                {/* Tecnologías usadas */}
                <div className={styles.tecnologias}>
                  {proyecto.tecnologias.map((tech, techIndex) => (
                    <div key={techIndex} className={styles.techBadge}>
                      <span className={styles.techIcono}>
                        {obtenerIconoTech(tech)}
                      </span>
                      <span className={styles.techNombre}>{tech}</span>
                    </div>
                  ))}
                </div>

                {/* Enlaces del proyecto */}
                <div className={styles.enlaces}>
                  <a
                    href={proyecto.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.enlace} ${styles.enlaceSecundario}`}
                  >
                    <FaGithub />
                    Código
                  </a>
                  {proyecto.liveUrl && (
                    <a
                      href={proyecto.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.enlace} ${styles.enlacePrimario}`}
                    >
                      <FaPlay />
                      Ver Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Elementos decorativos de fondo */}
      <div className={styles.fondoDecorativo}>
        <div className={styles.circuloGradiente1}></div>
        <div className={styles.circuloGradiente2}></div>
      </div>
    </section>
  );
};

export default Proyectos;