const CACHE_NAME = 'anthony-portfolio-v1.3';
const STATIC_CACHE = 'static-cache-v1.3';
const DYNAMIC_CACHE = 'dynamic-cache-v1.3';

// Archivos críticos para cachear
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/vite.svg',
  '/foto-perfil.jpg',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

// URLs que no deben ser cacheadas
const NETWORK_ONLY_PATTERNS = [
  '/api/',
  'chrome-extension:',
  'chrome:',
  'moz-extension:',
  'safari-extension:',
  'https://api.github.com/',
  'https://wa.me/',
  'https://www.linkedin.com/',
  'https://www.instagram.com/'
];

// Función para verificar si una URL debe ser ignorada
const shouldIgnoreRequest = (url) => {
  return NETWORK_ONLY_PATTERNS.some(pattern => url.includes(pattern));
};

// ✅ Instalar SW y cachear recursos críticos
self.addEventListener('install', event => {
  console.log('SW: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('SW: Caching static files');
        return cache.addAll(urlsToCache.filter(url => !shouldIgnoreRequest(url)));
      })
      .then(() => {
        console.log('SW: Installation complete');
        return self.skipWaiting();
      })
      .catch(err => {
        console.warn('SW: Installation failed', err);
      })
  );
});

// ✅ Activar SW y limpiar cachés viejos
self.addEventListener('activate', event => {
  console.log('SW: Activating...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('SW: Activation complete');
        return self.clients.claim();
      })
      .catch(err => {
        console.warn('SW: Activation failed', err);
      })
  );
});

// ✅ Estrategia de fetch inteligente
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Solo procesar requests GET de HTTP/HTTPS
  if (request.method !== 'GET') return;
  
  const requestUrl = request.url;
  
  // Ignorar URLs problemáticas
  if (shouldIgnoreRequest(requestUrl)) {
    console.log('SW: Ignoring request:', requestUrl);
    return;
  }

  try {
    const url = new URL(requestUrl);
    
    // Solo procesar HTTP y HTTPS
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return;
    }

    // Cache First para recursos estáticos
    if (request.destination === 'image' || 
        request.destination === 'font' || 
        request.destination === 'style' ||
        requestUrl.includes('.css') ||
        requestUrl.includes('.js') ||
        requestUrl.includes('.woff') ||
        requestUrl.includes('.woff2') ||
        requestUrl.includes('foto-perfil.jpg')) {
      
      event.respondWith(
        caches.match(request)
          .then(response => {
            if (response) {
              console.log('SW: Serving from cache:', requestUrl);
              return response;
            }
            
            return fetch(request)
              .then(response => {
                // Solo cachear respuestas exitosas
                if (response && response.status === 200) {
                  const responseClone = response.clone();
                  caches.open(DYNAMIC_CACHE)
                    .then(cache => {
                      cache.put(request, responseClone).catch(err => {
                        console.warn('SW: Cache put failed:', err.message);
                      });
                    })
                    .catch(err => {
                      console.warn('SW: Cache open failed:', err.message);
                    });
                }
                return response;
              })
              .catch(err => {
                console.warn('SW: Fetch failed:', requestUrl, err.message);
                // Fallback para imágenes
                if (request.destination === 'image') {
                  return new Response(
                    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="#3b82f6"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>', 
                    { headers: { 'Content-Type': 'image/svg+xml' } }
                  );
                }
                throw err;
              });
          })
          .catch(err => {
            console.warn('SW: Cache match failed:', err.message);
            return fetch(request);
          })
      );
      return;
    }

    // Network First para HTML y otros recursos
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then(cache => {
                cache.put(request, responseClone).catch(err => {
                  console.warn('SW: Cache put failed:', err.message);
                });
              })
              .catch(err => {
                console.warn('SW: Cache open failed:', err.message);
              });
          }
          return response;
        })
        .catch(err => {
          console.warn('SW: Network failed:', requestUrl, err.message);
          return caches.match(request)
            .then(response => response || caches.match('/'))
            .catch(err => {
              console.warn('SW: Cache fallback failed:', err.message);
              throw err;
            });
        })
    );
  } catch (error) {
    console.warn('SW: URL parsing failed:', requestUrl, error.message);
    return;
  }
});

// ✅ Manejo de mensajes desde la app
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// ✅ Sync en background (opcional)
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('SW: Background sync triggered');
  }
});