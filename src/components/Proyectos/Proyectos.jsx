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
  githubUrl: "https://github.com/AnThony69x/PrediRuta",
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
  githubUrl: "https://github.com/AnThony69x/EduIa-Visualizacion",
  liveUrl: "https://edu-ia-visualizacion.vercel.app/",
  destacado: true
},
{
  id: 4,
  titulo: "Sabor Foráneo - App de Recetas",
  descripcion: "Aplicación móvil de recetas ecuatorianas e internacionales con autenticación segura, gestión de usuarios, favoritos sincronizados y panel administrativo, utilizando Firebase como backend completo.",
  imagen: "/proyecto8.jpg",
  tecnologias: ["Kotlin", "Jetpack Compose", "Firebase", "Firestore", "Firebase Auth", "Firebase Storage", "Material3"],
  categoria: "mobile",
  githubUrl: "https://github.com/AnThony69x/SaborForaneo",
  liveUrl: "",
  destacado: true
},
{
  id: 5,
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
  id: 6,
  titulo: "Corredor Ecológico - App de Observación de Aves",
  descripcion: "Aplicación móvil desarrollada en Flutter para la observación de aves y gestión de tours ecológicos, con geolocalización en tiempo real, captura de fotos y sonidos, estadísticas de observaciones y soporte offline mediante Supabase como backend.",
  imagen: "/proyecto9.jpg",
  tecnologias: ["Flutter", "Dart", "Supabase", "Riverpod", "Hive", "GoRouter"],
  categoria: "mobile",
  githubUrl: "https://github.com/AnThony69x/app_corredor_ecologico",
  liveUrl: "",
  destacado: false
},
{
  id: 7,
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
  id: 8,
  titulo: "Academia Online",
  descripcion: "Plataforma completa de cursos en línea con sistema de suscripciones, dashboards avanzados, certificados automáticos y gestión integral para estudiantes, instructores y administradores.",
  imagen: "/proyecto1.jpg",
  tecnologias: ["React", "TypeScript", "Supabase", "Edge Functions", "Stripe", "PostgreSQL", "Tailwind"],
  categoria: "fullstack",
  githubUrl: "https://github.com/AnThony69x/arquitectura-learn-pro",
  liveUrl: "https://arquitectura-learn-pro.vercel.app/",
  destacado: false
},
{
  id: 9,
  titulo: "WatchHub",
  descripcion: "Plataforma de streaming moderna con autenticación avanzada (2FA), gestión de suscripciones, sistema de pagos y catálogo personalizado, ofreciendo una experiencia completa tipo Netflix con enfoque en seguridad y escalabilidad.",
  imagen: "/proyecto7.jpg",
  tecnologias: ["React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind", "Vite", "shadcn/ui"],
  categoria: "fullstack",
  githubUrl: "https://github.com/CarlosJChileS/ModeladoWatchub",
  liveUrl: "https://watchhub-demo.vercel.app",
  destacado: false
},
{
  id: 10,
  titulo: "MediCost-IA",
  descripcion:"Sistema de gestión de costos de medicamentos con IA para recomendaciones precisas y análisis de precios en tiempo real, integrando APIs y fuentes de datos confiables para ofrecer información actualizada y herramientas de optimización de gastos médicos.",
  imagen: "/proyecto10.jpg",
  tecnologias: ["React","Vite","Python", "FastAPI", "PostgreSQL", "Docker", "Linux", "Git", "GitHub"],
  categoria: "frontend",
  githubUrl: "https://github.com/AnThony69x/MediCost-AI",
  liveUrl: "https://medi-cost-ai-uma3.vercel.app/",
  destacado: false
},
{
  id: 11,
  titulo:"Spotify Data Visualizer - Setup",
  descripcion:"Visualizador de datos de Spotify con autenticación, exploración de canciones, gráficos de popularidad y análisis de géneros musicales, utilizando la API de Spotify y React para una experiencia interactiva y educativa.",
  imagen: "/proyecto11.jpg",
  tecnologias: ["React","Vite","Python", "FastAPI", "PostgreSQL", "Docker", "Linux", "Git", "GitHub"],
  categoria: "data-visualization",
  githubUrl: "https://github.com/AnThony69x/data-visualizacion-seaborn",
  destacado: false
}
  ];

  // Filtros de categorías
  const categorias = [
    { id: "todos", label: "Todos", count: proyectos.length },
    { id: "fullstack", label: "Full Stack", count: proyectos.filter(p => p.categoria === "fullstack").length },
    { id: "mobile", label: "Mobile", count: proyectos.filter(p => p.categoria === "mobile").length },
    { id: "frontend", label: "Frontend", count: proyectos.filter(p => p.categoria === "frontend").length },
    { id: "backend", label: "Backend", count: proyectos.filter(p => p.categoria === "backend").length },
    { id: "data-visualization", label: "Data Visualization", count: proyectos.filter(p => p.categoria === "data-visualization").length },
  ];

// Función para obtener el icono de la tecnología
const obtenerIconoTech = (tech) => {
  const coloresTech = {
    "React": "#61DAFB",
    "Node.js": "#68A063",
    "MongoDB": "#47A248",
    "PostgreSQL": "#336791",
    "Tailwind": "#06B6D4",
    "TailwindCSS": "#06B6D4",
    "Next.js": "#F8FAFC",
    "JavaScript": "#F7DF1E",
    "HTML": "#E34F26",
    "CSS": "#1572B6",
    "Vue": "#42B883",
    "Vite": "#646CFF",
    "Express.js": "#8FA3B0",
    "Supabase": "#3ECF8E",
    "SQLite": "#0F80CC",
    "TypeORM": "#E83524",
    "FastAPI": "#009688",
    "Python": "#3776AB",
    "TensorFlow": "#FF6F00",
    "Docker": "#2496ED",
    "D3.js": "#F68E56",
    "GSAP": "#88CE02",
    "ScrollTrigger": "#84CC16",
    "Lenis": "#38BDF8",
    "Kotlin": "#7F52FF",
    "Jetpack Compose": "#4285F4",
    "Firebase": "#FFCA28",
    "Firestore": "#FFA000",
    "Firebase Auth": "#FB8C00",
    "Firebase Storage": "#F57C00",
    "Material3": "#6750A4",
    "Flutter": "#02569B",
    "Dart": "#0175C2",
    "Riverpod": "#4E7FFF",
    "Hive": "#F9A826",
    "GoRouter": "#00ADD8",
    "TypeScript": "#3178C6",
    "Edge Functions": "#22C55E",
    "Stripe": "#635BFF",
    "shadcn/ui": "#E2E8F0"
  };

  const iconos = {
    "React": <FaReact style={{ color: coloresTech["React"] }} />,
    "Node.js": <FaNodeJs style={{ color: coloresTech["Node.js"] }} />,
    "MongoDB": <SiMongodb style={{ color: coloresTech["MongoDB"] }} />,
    "PostgreSQL": <SiPostgresql style={{ color: coloresTech["PostgreSQL"] }} />,
    "Tailwind": <SiTailwindcss style={{ color: coloresTech["Tailwind"] }} />,
    "TailwindCSS": <SiTailwindcss style={{ color: coloresTech["TailwindCSS"] }} />,
    "Next.js": <SiNextdotjs style={{ color: coloresTech["Next.js"] }} />,
    "JavaScript": <FaJs style={{ color: coloresTech["JavaScript"] }} />,
    "HTML": <FaHtml5 style={{ color: coloresTech["HTML"] }} />,
    "CSS": <FaCss3Alt style={{ color: coloresTech["CSS"] }} />,
    // AGREGADOS PARA TUS PROYECTOS
    "Vue": <FaReact style={{ color: coloresTech["Vue"] }} />,
    "Vite": <SiVite style={{ color: coloresTech["Vite"] }} />,
    "Express.js": <FaNodeJs style={{ color: coloresTech["Express.js"] }} />,
    "Supabase": <FaDatabase style={{ color: coloresTech["Supabase"] }} />,
    "SQLite": <SiSqlite style={{ color: coloresTech["SQLite"] }} />,
    "TypeORM": <FaDatabase style={{ color: coloresTech["TypeORM"] }} />
  };
  return iconos[tech] || <FaDatabase style={{ color: coloresTech[tech] || "#94A3B8" }} />;
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
                  className={`${styles.imagenProyecto} ${
                    proyecto.categoria === "mobile" ? styles.imagenMobile : ""
                  }`}
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