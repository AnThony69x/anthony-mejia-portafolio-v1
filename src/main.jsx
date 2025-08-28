import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ✅ Importar utilidades (solo las líneas necesarias)
import { registrarSW, configurarInstalacion, desregistrarSW } from './utils/pwa.js'
import { inicializarAnalytics, trackPerformance } from './utils/analytics.js'

// ✅ Inicializar PWA y Analytics solo en producción
if (import.meta.env.PROD) {
  inicializarAnalytics()
  trackPerformance()
  registrarSW()
  configurarInstalacion()
} else {
  console.log('🚧 Development mode: Service Worker disabled')
  // Limpiar Service Workers existentes en desarrollo
  desregistrarSW().then(result => {
    if (result) {
      console.log('✅ Service Worker cleanup completed for development')
    }
  })
}

// ✅ Ocultar loading screen cuando React esté listo
setTimeout(() => {
  if (window.hideLoadingScreen) {
    window.hideLoadingScreen()
  }
}, 500)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)