# Instrucciones de Copilot para este repositorio

## Idioma de respuesta (obligatorio)

- **Copilot debe responder siempre en español** en todas las conversaciones de este repositorio, incluso si la pregunta del usuario está en otro idioma.
- Mantener nombres técnicos, rutas y comandos tal como están en el código (por ejemplo: `npm run build`, `src/main.jsx`, `IntersectionObserver`), pero toda explicación debe ir en español.

## Comandos de build, test y lint

Usar Node 18+ (según `engines` en `package.json`).

- `npm run dev` - Inicia el servidor de desarrollo con Vite.
- `npm run build` - Ejecuta primero `scripts/bump-sw-version.js` y luego compila con Vite.
- `npm run preview` - Levanta una vista previa local del build de producción.
- `npm run post-build` - Script auxiliar que solo imprime un mensaje.
- La preparación del entorno de Copilot cloud-agent está en `.github/workflows/copilot-setup-steps.yml` (Node 20 + `npm ci` + instalación de Playwright Chromium).

Estado actual de herramientas de calidad:

- **No hay test runner configurado** en `package.json` ni archivos de pruebas en `src/`.
- **No hay script de lint** en `package.json` (existe configuración de ESLint, pero no script npm para ejecutarlo).
- Como no hay pruebas configuradas, actualmente no existe comando para correr una prueba individual.

## Arquitectura de alto nivel

- Es un portafolio SPA con React + Vite. El punto de entrada es `src/main.jsx`, donde se monta `App` y se separa comportamiento por entorno:
  - Producción: inicializa analítica (`src/utils/analytics.js`) y registra PWA (`src/utils/pwa.js`).
  - Desarrollo: desregistra service workers y limpia cachés para evitar estado obsoleto de PWA.
- `src/App.jsx` compone las secciones en orden fijo: `Encabezado` -> `Heroe` -> `SobreMi` (lazy) -> `Proyectos` -> `Contacto`.
- La navegación es por hash y por secciones:
  - El header navega con `#inicio`, `#sobre-mi`, `#proyectos`, `#contacto`.
  - Las secciones deben conservar esos `id`; si cambian, se rompe el scroll/estado activo.
- La lógica PWA está centrada en `public/sw.js`:
  - Los nombres de caché incluyen `BUILD_ID`.
  - `scripts/bump-sw-version.js` reescribe `const BUILD_ID = '...'` en cada build para forzar invalidación de caché.
- El despliegue está ajustado para Vercel (`vercel.json`):
  - Reescritura SPA de todas las rutas a `index.html`.
  - Headers explícitos para `sw.js`, `manifest.json`, archivos JS, CSS y JSON.

## Convenciones clave del código

- El código y el texto de UI están principalmente en español; mantener coherencia en nombres (`manejarX`, `seccionActiva`, `informacionContacto`, etc.).
- Los datos viven sobre todo dentro de componentes (proyectos, enlaces sociales, contenido de perfil), no en APIs externas.
- Patrón común de componentes:
  - Estado local `isVisible`
  - `IntersectionObserver`
  - Toggle de clase CSS Module (por ejemplo `styles.visible`) para animaciones de entrada
- Estrategia de estilos mixta:
  - Tokens/utilidades globales en `src/styles/variables.css` y `src/styles/globales.css`
  - CSS Modules por componente (`*.module.css`) para estilos de cada sección
- El formulario de contacto (`src/components/Contacto/Contacto.jsx`) usa EmailJS en cliente, con constantes de service/template/public key embebidas y validación inline antes del envío.
- Existen scripts de mantenimiento en `scripts/` (`compress.js`, `optimize.js`, `sitemap.js`), pero el único conectado al flujo npm principal es `bump-sw-version.js`.
