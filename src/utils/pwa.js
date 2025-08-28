// ✅ Registrar Service Worker
export const registrarSW = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' })
        .then(registration => {
          console.log('SW: Registered successfully', registration.scope);
          
          // Verificar actualizaciones
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                mostrarNotificacionActualizacion();
              }
            });
          });
        })
        .catch(error => {
          console.log('SW: Registration failed', error);
        });
    });
  }
};

// ✅ Mostrar notificación de actualización
const mostrarNotificacionActualizacion = () => {
  const confirmUpdate = confirm('🎉 Nueva versión disponible!\n\n¿Recargar para actualizar?');
  if (confirmUpdate) {
    window.location.reload();
  }
};

// ✅ Detectar si es PWA
export const esPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true;
};

// ✅ Prompt de instalación PWA
let deferredPrompt;

// ✅ FUNCIÓN QUE FALTABA - Solo añadir esta:
export const configurarInstalacion = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('PWA: Install prompt available');
    e.preventDefault();
    deferredPrompt = e;
    mostrarBotonInstalar();
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA: App installed successfully! 🎉');
    ocultarBotonInstalar();
    deferredPrompt = null;
  });
};

const mostrarBotonInstalar = () => {
  console.log('PWA: Showing install button');
  // Puedes crear un botón de instalación en el futuro
};

const ocultarBotonInstalar = () => {
  console.log('PWA: Hiding install button');
};

export const instalarPWA = async () => {
  if (!deferredPrompt) {
    console.log('PWA: Install prompt not available');
    return;
  }
  
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`PWA: Install prompt outcome: ${outcome}`);
  deferredPrompt = null;
  ocultarBotonInstalar();
};