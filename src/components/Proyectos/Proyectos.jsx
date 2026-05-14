import React, { useState, useEffect } from "react";
import { MdOutlineRocketLaunch } from "react-icons/md";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaPlay,
  FaStar,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { obtenerIconoTecnologia } from "../../data/tecnologiasIconos";
import styles from "./Proyectos.module.css";

const PROYECTOS_INICIALES = 4;

function proyectoEnCategoria(proyecto, categoriaId) {
  const c = proyecto.categoria;
  if (Array.isArray(c)) return c.includes(categoriaId);
  return c === categoriaId;
}

const Proyectos = () => {
  const [filtroActivo, setFiltroActivo] = useState("todos");
  const [verMasProyectos, setVerMasProyectos] = useState(false);

  useEffect(() => {
    setVerMasProyectos(false);
  }, [filtroActivo]);

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
  categoria: ["frontend", "data-visualization"],
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
  tecnologias: ["React","Vite","Python", "FastAPI", "PostgreSQL", "Linux", "Git", "GitHub"],
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
  tecnologias: ["React","Vite","Python", "FastAPI", "Linux"],
  categoria: "data-visualization",
  githubUrl: "https://github.com/AnThony69x/data-visualizacion-seaborn",
  destacado: false
}
  ];

  // Filtros de categorías
  const categorias = [
    { id: "todos", label: "Todos", count: proyectos.length },
    {
      id: "fullstack",
      label: "Full Stack",
      count: proyectos.filter((p) => proyectoEnCategoria(p, "fullstack")).length,
    },
    {
      id: "mobile",
      label: "Mobile",
      count: proyectos.filter((p) => proyectoEnCategoria(p, "mobile")).length,
    },
    {
      id: "frontend",
      label: "Frontend",
      count: proyectos.filter((p) => proyectoEnCategoria(p, "frontend")).length,
    },
    {
      id: "backend",
      label: "Backend",
      count: proyectos.filter((p) => proyectoEnCategoria(p, "backend")).length,
    },
    {
      id: "data-visualization",
      label: "Data Visualization",
      count: proyectos.filter((p) =>
        proyectoEnCategoria(p, "data-visualization")
      ).length,
    },
  ];

  // Filtrar proyectos
  const proyectosFiltrados =
    filtroActivo === "todos"
      ? proyectos
      : proyectos.filter((p) => proyectoEnCategoria(p, filtroActivo));

  const proyectosPrimeros = proyectosFiltrados.slice(0, PROYECTOS_INICIALES);
  const proyectosRestantes = proyectosFiltrados.slice(PROYECTOS_INICIALES);
  const hayMasProyectos = proyectosRestantes.length > 0;

  const renderTarjetaProyecto = (proyecto, index) => (
    <div
      key={proyecto.id}
      className={`${styles.proyectoCard} ${
        proyecto.destacado ? styles.destacado : ""
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
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
            <FaStar className={styles.badgeDestacadoIcono} aria-hidden />
            <span>Destacado</span>
          </div>
        )}
      </div>

      <div className={styles.contenidoCard}>
        <h3 className={styles.tituloProyecto}>{proyecto.titulo}</h3>
        <p className={styles.descripcionProyecto}>{proyecto.descripcion}</p>

        <div className={styles.tecnologias}>
          {proyecto.tecnologias.map((tech, techIndex) => (
            <div key={techIndex} className={styles.techBadge}>
              <span className={styles.techIcono}>
                {obtenerIconoTecnologia(tech)}
              </span>
              <span className={styles.techNombre}>{tech}</span>
            </div>
          ))}
        </div>

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
  );

  return (
    <section className={styles.proyectos} id="proyectos">
      <div className={styles.container}>
        
        {/* Header de la sección */}
        <div className={styles.header}>
          <div className={styles.encabezado}>
            <h2 className={styles.titulo}>
              Mis Proyectos
              <MdOutlineRocketLaunch className={styles.tituloIcono} aria-hidden />
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

        {/* Grid de proyectos: primeros 4 + desplegable */}
        <div
          className={`${styles.gridProyectos} ${
            hayMasProyectos ? styles.gridProyectosConMas : ""
          }`}
        >
          {proyectosPrimeros.map((proyecto, index) =>
            renderTarjetaProyecto(proyecto, index)
          )}
        </div>

        {hayMasProyectos && (
          <div className={styles.verMasZona}>
            <button
              type="button"
              className={styles.verMasToggle}
              aria-expanded={verMasProyectos}
              aria-controls="proyectos-grid-extra"
              id="proyectos-ver-mas-btn"
              onClick={() => setVerMasProyectos((v) => !v)}
            >
              {verMasProyectos ? (
                <>
                  <FaChevronUp aria-hidden />
                  Mostrar menos
                </>
              ) : (
                <>
                  <FaChevronDown aria-hidden />
                  {proyectosRestantes.length === 1
                    ? "Ver 1 proyecto más"
                    : `Ver ${proyectosRestantes.length} proyectos más`}
                </>
              )}
            </button>

            {verMasProyectos && (
              <div
                id="proyectos-grid-extra"
                className={styles.gridProyectosExtra}
                role="region"
                aria-labelledby="proyectos-ver-mas-btn"
              >
                {proyectosRestantes.map((proyecto, index) =>
                  renderTarjetaProyecto(
                    proyecto,
                    proyectosPrimeros.length + index
                  )
                )}
              </div>
            )}
          </div>
        )}
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