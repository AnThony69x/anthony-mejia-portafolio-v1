const fs = require('fs');
const path = require('path');

// ✅ Configuración del sitemap
const DOMAIN = 'https://anthony69x-portfolio.vercel.app'; // Cambia por tu dominio
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');
const ROBOTS_PATH = path.join(__dirname, '../public/robots.txt');

// ✅ URLs de tu portafolio
const URLS = [
  {
    loc: '/',
    lastmod: '2025-08-28',
    changefreq: 'weekly',
    priority: '1.0',
    title: 'AnThony69x - Desarrollador Full Stack Portafolio'
  },
  {
    loc: '/#sobre-mi',
    lastmod: '2025-08-28',
    changefreq: 'monthly',
    priority: '0.8',
    title: 'Sobre Mí - Anthony Mejia'
  },
  {
    loc: '/#proyectos',
    lastmod: '2025-08-28',
    changefreq: 'weekly',
    priority: '0.9',
    title: 'Proyectos - Portafolio AnThony69x'
  },
  {
    loc: '/#contacto',
    lastmod: '2025-08-28',
    changefreq: 'monthly',
    priority: '0.7',
    title: 'Contacto - Anthony Mejia Developer'
  }
];

console.log('🗺️  Generando sitemap.xml para AnThony69x Portafolio...\n');

// ✅ Generar XML del sitemap
const generateSitemap = () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  URLS.forEach(url => {
    xml += `  <url>
    <loc>${DOMAIN}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>
`;
  });

  xml += `</urlset>`;
  return xml;
};

// ✅ Generar robots.txt
const generateRobots = () => {
  return `# AnThony69x Portafolio - Robots.txt
# Generated: ${new Date().toISOString()}

User-agent: *
Allow: /

# Sitemap
Sitemap: ${DOMAIN}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

# Block unwanted crawlers (optional)
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

# Host (optional - for better SEO)
Host: ${DOMAIN}
`;
};

// ✅ Función principal
const main = () => {
  try {
    // Generar sitemap.xml
    const sitemapXML = generateSitemap();
    fs.writeFileSync(OUTPUT_PATH, sitemapXML, 'utf8');
    console.log(`✅ sitemap.xml generado: ${OUTPUT_PATH}`);
    
    // Generar robots.txt
    const robotsTXT = generateRobots();
    fs.writeFileSync(ROBOTS_PATH, robotsTXT, 'utf8');
    console.log(`✅ robots.txt generado: ${ROBOTS_PATH}`);
    
    // Mostrar estadísticas
    console.log('\n📊 Estadísticas:');
    console.log(`📄 URLs en sitemap: ${URLS.length}`);
    console.log(`🌐 Dominio: ${DOMAIN}`);
    console.log(`📅 Última actualización: 2025-08-28`)la;
    
    console.log('\n🎉 SEO files generados correctamente!');
    console.log('🚀 Tu portafolio está optimizado para buscadores');
    
  } catch (error) {
    console.error('❌ Error generando archivos SEO:', error);
    process.exit(1);
  }
};

main();