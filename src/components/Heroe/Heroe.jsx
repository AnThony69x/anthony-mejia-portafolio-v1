import React from "react";
import { FaReact, FaJs, FaLaravel } from "react-icons/fa";
import { MdOutlineWavingHand } from "react-icons/md";
import { SiPostgresql } from "react-icons/si";
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
    { icono: <FaLaravel />, posicion: { top: "10%", right: "15%" } },
    { icono: <FaJs />, posicion: { bottom: "25%", right: "10%" } },
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
                Hola, soy Anthony Mejia
                <MdOutlineWavingHand className={styles.saludoIcono} aria-hidden />
              </h1>
              <div className={styles.lineaDecorariva}></div>
            </div>

            <h2 className={styles.titulo}>Estudiante de Ingeniería de Software</h2>

            <p className={styles.descripcion}>
              Creo aplicaciones web modernas y responsivas con interfaces limpias y
              experiencias de usuario fluidas, combinando diseño y código para crear
              experiencias que se sientan intuitivas, rápidas y agradables de usar.
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