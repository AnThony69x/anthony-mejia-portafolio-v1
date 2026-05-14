import React from "react";
import { FaReact } from "react-icons/fa";
import { MdOutlineWavingHand } from "react-icons/md";
import { SiPostgresql } from "react-icons/si";
import { SiNestjs } from "react-icons/si";
import { SiPython } from "react-icons/si";
import EnlacesSociales from "../EnlacesSociales/EnlacesSociales";
import styles from "./Heroe.module.css";

const Heroe = () => {
  // Estadísticas rápidas
  const estadisticasRapidas = [
    { valor: "2+", etiqueta: "Años", subetiqueta: "Experiencia" },
    { valor: "JavaScript", etiqueta: "Lenguaje", subetiqueta: "Principal" },
    { valor: "10+", etiqueta: "Proyectos", subetiqueta: "Totales" },
  ];

  // Iconos flotantes de tecnologías 
  const iconosFlotantes = [
    { icono: <FaReact />, posicion: { top: "15%", left: "10%" } },
    { icono: <SiNestjs />, posicion: { top: "10%", right: "15%" } },
    { icono: <SiPython />, posicion: { bottom: "25%", right: "10%" } },
    { icono: <SiPostgresql />, posicion: { bottom: "20%", left: "8%" } },
  ];

  return (
    <section className={styles.heroe} id="inicio">
      <div className={styles.container}>
        <div className={styles.contenido}>
          {/* Lado izquierdo - Información personal */}
          <div className={styles.ladoTexto}>
            <div className={styles.saludoContainer}>
              <h1 className={styles.saludo}>
                <span className={styles.saludoTexto}>Anthony Axel Mejia Ordoñez</span>
                <MdOutlineWavingHand className={styles.saludoIcono} aria-hidden />
              </h1>
              <div className={styles.lineaDecorariva}></div>
            </div>

            <h2 className={styles.titulo}>Estudiante de Ingeniería de Software</h2>

            <h3 className={styles.subtitulo}>
              <span className={styles.subtituloParte}>Full Stack Developer</span>
              <span className={styles.subtituloSep} aria-hidden="true">
                {" "}
                <span className={styles.subtituloAmp}>&</span>{" "}
              </span>
              <span className={styles.subtituloParte}>Data Scientist</span>
            </h3>

            <p className={styles.descripcion}>
              Diseño y desarrollo productos web{" "} <strong>Full Stack</strong> con interfaces limpias,
              buen rendimiento y experiencias de usuario cuidadas. Como{" "}
              <strong>Data Scientist</strong>, también trabajo con datos análisis,
              visualización y modelos para convertir información en decisiones y
              productos más útiles.
            </p>

            <div className={styles.seccionSocial}>
              <EnlacesSociales embedHero />
            </div>

            <div className={styles.botonesAccion}>
              <a 
                href="/CV_Anthony_Mejia.pdf"
                download
                className={`${styles.boton} ${styles.botonPrimario}`}
              >
                Descargar mi CV
              </a>
              <a
                href="#contacto" className={`${styles.boton} ${styles.botonSecundario}`}
              >
                Contáctame
              </a>
            </div>
          </div>

          {/* Lado derecho - Imagen de perfil */}
          <div className={styles.ladoImagen}>
            <div className={styles.imagenWrapper}>
              <div className={styles.imagenContainer}> 
                <img
                  src="/foto-perfil3.jpg"
                  alt="Foto de perfil de AnThony69x - Ingeniería de Software"
                  className={styles.fotoPerfil}
                />
                <div className={styles.bordeAnimado}></div>
              </div>

              {/* Iconos flotantes decorativos (opcional) */}
              {iconosFlotantes.map((item, index) => (
                <div key={index} className={styles.iconoFlotante} style={item.posicion}>
                  {item.icono}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Elementos de fondo decorativos */}
      <div className={styles.fondoDecorativo}>
        <div className={styles.circuloGradiente1}></div>
        <div className={styles.circuloGradiente2}></div>
        <div className={styles.circuloGradiente3}></div>
      </div>
    </section>
  );
};

export default Heroe;