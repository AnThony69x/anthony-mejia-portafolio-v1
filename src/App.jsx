import React from 'react'
import Encabezado from './components/Encabezado/Encabezado'
import Heroe from './components/Heroe/Heroe'
import SobreMi from './components/SobreMi/SobreMi'
import './styles/globales.css'

function App() {
  return (
    <div className="App" style={{ width: '100%', minHeight: '100vh', margin: 0, padding: 0 }}>
      <Encabezado />
      <Heroe />
      <SobreMi />

      {/* AGREGADO: Sección Proyectos */}
      <section 
        id="proyectos" 
        style={{ 
          padding: '6rem 2rem', 
          textAlign: 'center',
          background: '#1e293b',
          width: '100%',
          minHeight: '80vh'
        }}
      >
        <h2 style={{ 
          color: '#f59e0b', 
          marginBottom: '2rem',
          fontSize: 'clamp(2rem, 5vw, 3rem)'
        }}>
          💼 Proyectos
        </h2>
        <p style={{color: '#94a3b8', fontSize: '1.2rem'}}>
          Sección en desarrollo...
        </p>
      </section>

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