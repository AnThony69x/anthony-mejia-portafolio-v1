const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// ✅ Configuración
const DIST_PATH = path.join(__dirname, '../dist');
const COMPRESSIONS = {
  gzip: zlib.createGzip({ level: 9 }),
  br: zlib.createBrotliCompress({
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
      [zlib.constants.BROTLI_PARAM_SIZE_HINT]: fs.statSync
    }
  })
};

const EXTENSIONS_TO_COMPRESS = ['.html', '.css', '.js', '.json', '.svg', '.ico'];

console.log('🗜️  Iniciando compresión de archivos para AnThony69x Portfolio...\n');

// ✅ Función para comprimir archivos
const compressFile = (filePath, compression, extension) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(`${filePath}.${extension}`);
    const compressStream = compression === 'gzip' 
      ? zlib.createGzip({ level: 9 })
      : zlib.createBrotliCompress({
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11
          }
        });

    readStream
      .pipe(compressStream)
      .pipe(writeStream)
      .on('finish', () => {
        const originalSize = fs.statSync(filePath).size;
        const compressedSize = fs.statSync(`${filePath}.${extension}`).size;
        const ratio = ((1 - compressedSize / originalSize) * 100).toFixed(1);
        
        console.log(`✅ ${path.basename(filePath)} → ${extension.toUpperCase()}: ${originalSize}B → ${compressedSize}B (${ratio}% reducción)`);
        resolve();
      })
      .on('error', reject);
  });
};

// ✅ Función recursiva para recorrer directorios
const compressDirectory = async (dirPath) => {
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await compressDirectory(filePath);
    } else if (EXTENSIONS_TO_COMPRESS.includes(path.extname(file))) {
      try {
        // Comprimir con Gzip
        await compressFile(filePath, 'gzip', 'gz');
        // Comprimir con Brotli
        await compressFile(filePath, 'br', 'br');
      } catch (error) {
        console.error(`❌ Error comprimiendo ${filePath}:`, error.message);
      }
    }
  }
};

// ✅ Función principal
const main = async () => {
  try {
    if (!fs.existsSync(DIST_PATH)) {
      console.log('❌ Directorio dist/ no encontrado. Ejecuta "npm run build" primero.');
      process.exit(1);
    }

    console.log(`📁 Comprimiendo archivos en: ${DIST_PATH}\n`);
    
    const startTime = Date.now();
    await compressDirectory(DIST_PATH);
    const endTime = Date.now();
    
    console.log(`\n🎉 Compresión completada en ${endTime - startTime}ms`);
    console.log('📊 Archivos .gz y .br generados para mejor performance');
    console.log('🚀 Portfolio de AnThony69x listo para producción!');
    
  } catch (error) {
    console.error('❌ Error durante la compresión:', error);
    process.exit(1);
  }
};

main();