const fs = require('fs');
const path = require('path');

// ✅ Configuración de optimización
const DIST_PATH = path.join(__dirname, '../dist');
const INDEX_PATH = path.join(DIST_PATH, 'index.html');

console.log('⚡ Optimizando build para AnThony69x Portafolio...\n');

// ✅ Meta tags SEO optimizados
const SEO_META_TAGS = `
  <!-- SEO Meta Tags - AnThony69x Portafolio -->
  <meta name="description" content="Anthony Mejia (AnThony69x) - Desarrollador Full Stack especializado en React, Laravel, Vue.js y tecnologías modernas. Portafolio profesional con proyectos destacados.">
  <meta name="keywords" content="Anthony Mejia, AnThony69x, desarrollador full stack, React, Laravel, Vue.js, JavaScript, PHP, portafolio, developer, programador">
  <meta name="author" content="Anthony Mejia (AnThony69x)">
  <meta name="robots" content="index, follow">
  <meta name="language" content="Spanish">
  <meta name="revisit-after" content="7 days">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://anthony69x-portafolio.vercel.app/">
  <meta property="og:title" content="AnThony69x - Desarrollador Full Stack Portafolio">
  <meta property="og:description" content="Portafolio profesional de Anthony Mejia - Desarrollador Full Stack especializado en tecnologías modernas">
  <meta property="og:image" content="https://anthony69x-portafolio.vercel.app/foto-perfil.jpg">
  <meta property="og:image:alt" content="Anthony Mejia - Desarrollador Full Stack">
  <meta property="og:site_name" content="AnThony69x Portafolio">
  <meta property="og:locale" content="es_ES">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://anthony69x-portafolio.vercel.app/">
  <meta property="twitter:title" content="AnThony69x - Desarrollador Full Stack">
  <meta property="twitter:description" content="Portafolio profesional de Anthony Mejia - Desarrollador Full Stack">
  <meta property="twitter:image" content="https://anthony69x-portafolio.vercel.app/foto-perfil.jpg">
  <meta property="twitter:image:alt" content="Anthony Mejia - Developer Portafolio">
  
  <!-- Additional SEO -->
  <link rel="canonical" href="https://anthony69x-portafolio.vercel.app/">
  <meta name="theme-color" content="#3b82f6">
  <meta name="msapplication-TileColor" content="#0f172a">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="AnThony69x">
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Anthony Mejia",
    "alternateName": "AnThony69x",
    "description": "Desarrollador Full Stack especializado en React, Laravel y tecnologías modernas",
    "url": "https://anthony69x-portafolio.vercel.app",
    "image": "https://anthony69x-portafolio.vercel.app/foto-perfil.jpg",
    "sameAs": [
      "https://github.com/AnThony69x",
      "https://www.linkedin.com/in/anthony69x"
    ],
    "jobTitle": "Full Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "knowsAbout": ["React", "Laravel", "Vue.js", "JavaScript", "PHP", "Node.js", "MySQL", "MongoDB"],
    "nationality": {
      "@type": "Country",
      "name": "Colombia"
    }
  }
  </script>`;

// ✅ Inyectar meta tags en index.html
const optimizeHTML = () => {
  if (!fs.existsSync(INDEX_PATH)) {
    console.log('❌ index.html no encontrado en dist/');
    return;
  }

  let html = fs.readFileSync(INDEX_PATH, 'utf8');
  
  // Inyectar meta tags después de <head>
  html = html.replace(
    /<head>/i,
    `<head>${SEO_META_TAGS}`
  );

  // Optimizar título si no está personalizado
  if (html.includes('<title>Vite + React</title>')) {
    html = html.replace(
      '<title>Vite + React</title>',
      '<title>AnThony69x - Desarrollador Full Stack | Portafolio Profesional</title>'
    );
  }

  fs.writeFileSync(INDEX_PATH, html, 'utf8');
  console.log('✅ Meta tags SEO inyectados en index.html');
};

// ✅ Generar archivo de performance hints
const generatePerformanceHints = () => {
  const hints = {
    "AnThony69x Portafolio - Performance Report": {
      "generated": new Date().toISOString(),
      "optimizations": {
        "compression": "Gzip + Brotli habilitado",
        "lazy_loading": "React.lazy() implementado",
        "service_worker": "PWA caching activo",
        "meta_tags": "SEO optimizado",
        "fonts": "Google Fonts preloaded"
      },
      "recommendations": [
        "Implementar lazy loading para imágenes",
        "Optimizar foto-perfil.jpg (WebP format)",
        "Considerar CDN para assets estáticos",
        "Implementar critical CSS inlining"
      ],
      "metrics_targets": {
        "FCP": "< 2.5s",
        "LCP": "< 4.0s", 
        "CLS": "< 0.25",
        "FID": "< 300ms"
      }
    }
  };

  const hintsPath = path.join(DIST_PATH, 'performance-hints.json');
  fs.writeFileSync(hintsPath, JSON.stringify(hints, null, 2), 'utf8');
  console.log('✅ Performance hints generado');
};

// ✅ Función principal
const main = () => {
  try {
    if (!fs.existsSync(DIST_PATH)) {
      console.log('❌ Directorio dist/ no encontrado. Ejecuta "npm run build" primero.');
      process.exit(1);
    }

    console.log(`📁 Optimizando build en: ${DIST_PATH}\n`);

    // Optimizaciones
    optimizeHTML();
    generatePerformanceHints();

    console.log('\n🎉 Optimización completada!');
    console.log('📊 SEO y performance mejorados');
    console.log('🚀 Portafolio de AnThony69x listo para deploy!');

  } catch (error) {
    console.error('❌ Error durante optimización:', error);
    process.exit(1);
  }
};

main();