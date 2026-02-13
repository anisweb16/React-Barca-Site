import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import VentasList from './pages/VentasList'
import VentaNuevo from './pages/VentaNuevo'
import VentaEditar from './pages/VentaEditar'

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<VentasList />} />
          <Route path="/ventas/nuevo" element={<VentaNuevo />} />
          <Route path="/ventas/editar/:id" element={<VentaEditar />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
