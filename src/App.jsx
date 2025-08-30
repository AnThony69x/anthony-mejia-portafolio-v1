import React, { Suspense, lazy } from 'react'
import Encabezado from './components/Encabezado/Encabezado'
import Heroe from './components/Heroe/Heroe'
import './styles/globales.css'
import Proyectos from './components/Proyectos/Proyectos'

// ✅ Lazy loading solo para SobreMi
const SobreMi = lazy(() => import('./components/SobreMi/SobreMi'))

// ✅ Loading component simple
const Loading = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    background: 'transparent'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid #1e293b',
      borderTop: '4px solid #3b82f6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
  </div>
)

function App() {
  return (
    <div className="App" style={{ width: '100%', minHeight: '100vh', margin: 0, padding: 0 }}>
      <Encabezado />
      <Heroe />
      
      {/* ✅ SobreMi con Suspense */}
      <Suspense fallback={<Loading />}>
        <SobreMi />
      </Suspense>
      <Proyectos />

      {/* AGREGADO: Sección Contacto */}
      <section 
        id="contacto"
        style={{ 
          padding: '6rem 2rem', 
          textAlign: 'center',
          background: '#0f172a',
          width: '100%',
          minHeight: '80vh'
        }}
      >
        <h2 style={{ 
          color: '#ef4444', 
          marginBottom: '2rem',
          fontSize: 'clamp(2rem, 5vw, 3rem)'
        }}>
          📧 Contacto
        </h2>
        <p style={{color: '#94a3b8', fontSize: '1.2rem'}}>
          Sección en desarrollo...
        </p>
      </section>
    </div>
  )
}

export default App