import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaDatabase,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiNextdotjs,
  SiSqlite,
  SiVite,
  SiFastapi,
  SiPython,
  SiTensorflow,
  SiDocker,
  SiD3Dotjs,
  SiKotlin,
  SiFlutter,
  SiDart,
  SiFirebase,
  SiTypescript,
  SiStripe,
  SiLinux,
  SiGit,
  SiGithub,
  SiGreensock,
  SiHive,
  SiSupabase,
  SiNumpy,
  SiPandas,
  SiMaterialdesign,
  SiJetpackcompose,
  SiServerless,
  SiShadcnui,
  SiScikitlearn,
  SiJavascript,
} from "react-icons/si";
import tecnologiasMeta from "./tecnologias.json";

const ICONOS = {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaDatabase,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiNextdotjs,
  SiSqlite,
  SiVite,
  SiFastapi,
  SiPython,
  SiTensorflow,
  SiDocker,
  SiD3Dotjs,
  SiKotlin,
  SiFlutter,
  SiDart,
  SiFirebase,
  SiTypescript,
  SiStripe,
  SiLinux,
  SiGit,
  SiGithub,
  SiGreensock,
  SiHive,
  SiSupabase,
  SiNumpy,
  SiPandas,
  SiMaterialdesign,
  SiJetpackcompose,
  SiServerless,
  SiShadcnui,
  SiScikitlearn,
  SiJavascript,
};

const COLOR_DEFECTO = "#94A3B8";

/**
 * @param {string} nombreTecnologia - Clave igual a la de `tecnologias.json`
 */
export function obtenerIconoTecnologia(nombreTecnologia) {
  const meta = tecnologiasMeta[nombreTecnologia];
  if (!meta) {
    return <FaDatabase style={{ color: COLOR_DEFECTO }} />;
  }
  const Icon = ICONOS[meta.icon];
  if (!Icon) {
    return <FaDatabase style={{ color: meta.color }} />;
  }
  return <Icon style={{ color: meta.color }} />;
}

export { tecnologiasMeta as tecnologiasCatalogo };
