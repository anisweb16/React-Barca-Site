import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Badge, InputGroup, FormControl } from 'react-bootstrap'
import { getVentas, eliminarVenta } from '../services/ventasService'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'

function VentasList() {
  const [ventas, setVentas] = useState([])
  const [ventasFiltradas, setVentasFiltradas] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null)

  function cargarVentas() {
    getVentas()
      .then(data => {
        setVentas(data)
        setVentasFiltradas(data)
      })
      .catch(err => setError(err.message))
  }

  useEffect(() => {
    cargarVentas()
  }, [])

  // 🔍 FILTRADO GLOBAL (toutes les colonnes)
  useEffect(() => {
    const texto = busqueda.toLowerCase()

    const filtradas = ventas.filter(v =>
      Object.values(v)
        .join(' ')
        .toLowerCase()
        .includes(texto)
    )

    setVentasFiltradas(filtradas)
  }, [busqueda, ventas])

  function confirmarEliminar(venta) {
    setVentaSeleccionada(venta)
    setShowModal(true)
  }

  async function eliminarConfirmado() {
    try {
      await eliminarVenta(ventaSeleccionada.id)
      setShowModal(false)
      setVentaSeleccionada(null)
      cargarVentas()
    } catch {
      alert('Error al eliminar venta')
    }
  }

  function estadoBadge(estado) {
    switch (estado) {
      case 'PAGADO':
        return <Badge bg="success">PAGADO</Badge>
      case 'RESERVADO':
        return <Badge bg="warning" text="dark">RESERVADO</Badge>
      case 'CANCELADO':
        return <Badge bg="danger">CANCELADO</Badge>
      default:
        return <Badge bg="secondary">{estado}</Badge>
    }
  }

  if (error) return <p className="text-danger">{error}</p>

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Ventas registradas – Camp Nou</h2>

        <Button variant="outline-primary" onClick={cargarVentas}>
          Recargar
        </Button>
      </div>

      {/* 🔍 BARRE DE RECHERCHE */}
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <i className="bi bi-search"></i>
        </InputGroup.Text>
        <FormControl
          placeholder="Buscar por cliente, partido, sector, estado..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </InputGroup>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Partido</th>
            <th>Fecha</th>
            <th>Sector</th>
            <th>Asiento</th>
            <th>Precio</th>
            <th>Cant.</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {ventasFiltradas.length === 0 && (
            <tr>
              <td colSpan="10" className="text-center text-muted">
                No hay resultados
              </td>
            </tr>
          )}

          {ventasFiltradas.map(v => (
            <tr key={v.id}>
              <td>{v.nombre_cliente} {v.apellido_cliente}</td>
              <td>{v.partido}</td>
              <td>{v.fecha_partido}</td>
              <td>{v.sector}</td>
              <td>{v.asiento}</td>
              <td>{v.precio} €</td>
              <td>{v.cantidad}</td>
              <td>{estadoBadge(v.estado)}</td>
              <td>
                <Link
                  to={`/ventas/editar/${v.id}`}
                  className="btn btn-sm btn-warning me-2"
                >
                  <i className="bi bi-pencil-square"></i>
                </Link>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => confirmarEliminar(v)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmDeleteModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={eliminarConfirmado}
        venta={ventaSeleccionada}
      />
    </div>
  )
}

export default VentasList
