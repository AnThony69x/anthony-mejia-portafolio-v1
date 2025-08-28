const CACHE_NAME = 'anthony-portfolio-v1.2';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Archivos críticos para cachear
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/vite.svg',
  '/foto-perfil.jpg',
  '/cv-anthony69x.pdf',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

// Archivos que siempre deben venir de la red
const NETWORK_ONLY = [
  '/api/',
  'https://api.github.com/',
  'https://wa.me/',
  'https://www.linkedin.com/',
  'https://www.instagram.com/'
];

// ✅ Instalar SW y cachear recursos críticos
self.addEventListener('install', event => {
  console.log('SW: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('SW: Caching static files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('SW: Installation complete');
        return self.skipWaiting();
      })
      .catch(err => console.log('SW: Installation failed', err))
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
  );
});

// ✅ Estrategia de fetch inteligente
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Network only para APIs externas
  if (NETWORK_ONLY.some(pattern => request.url.includes(pattern))) {
    event.respondWith(fetch(request));
    return;
  }

  // Estrategia Cache First para recursos estáticos
  if (request.destination === 'image' || 
      request.destination === 'font' || 
      request.destination === 'style' ||
      request.url.includes('.css') ||
      request.url.includes('.js') ||
      request.url.includes('foto-perfil.jpg')) {
    
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            console.log('SW: Serving from cache:', request.url);
            return response;
          }
          
          return fetch(request)
            .then(response => {
              // Solo cachear respuestas exitosas
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(DYNAMIC_CACHE)
                  .then(cache => cache.put(request, responseClone));
              }
              return response;
            });
        })
        .catch(() => {
          // Fallback para imágenes
          if (request.destination === 'image') {
            return new Response('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="#3b82f6"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>', 
              { headers: { 'Content-Type': 'image/svg+xml' } });
          }
        })
    );
    return;
  }

  // Estrategia Network First para HTML
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE)
            .then(cache => cache.put(request, responseClone));
        }
        return response;
      })
      .catch(() => {
        return caches.match(request)
          .then(response => {
            return response || caches.match('/');
          });
      })
  );
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