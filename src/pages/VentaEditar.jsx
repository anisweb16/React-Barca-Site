import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { getVentaById, actualizarVenta } from '../services/ventasService'

function VentaEditar() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState(null)
  const [original, setOriginal] = useState(null)
  const [errores, setErrores] = useState([])

  useEffect(() => {
    getVentaById(id)
      .then(data => { setFormData(data); setOriginal(data) })
      .catch(err => setErrores([err.message]))
  }, [id])

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  function hayCambios() {
    return JSON.stringify(formData) !== JSON.stringify(original)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrores([])

    if (!hayCambios()) {
      setErrores(['No hay cambios que guardar'])
      return
    }

    const payload = {
      ...formData,
      precio: formData.precio === '' ? null : Number(formData.precio),
      cantidad: Number(formData.cantidad ?? formData.cant ?? 1),
    }

    try {
      await actualizarVenta(id, payload)
      navigate('/')
    } catch (error) {
      if (error.detail) setErrores(error.detail.map(e => e.msg))
      else setErrores(['Error al actualizar venta'])
    }
  }

  if (!formData) return <p>Cargando venta...</p>

  return (
    <div>
      <h2>Editar venta #{id}</h2>

      {errores.length > 0 && (
        <Alert variant="danger">
          <ul className="mb-0">
            {errores.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Nombre</label>
            <input className="form-control" name="nombre" value={formData.nombre ?? ''} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Apellido</label>
            <input className="form-control" name="apellido" value={formData.apellido ?? ''} onChange={handleChange} />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={formData.email ?? ''} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Teléfono</label>
            <input className="form-control" name="telefono" value={formData.telefono ?? ''} onChange={handleChange} />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Partido</label>
            <input className="form-control" name="partido" value={formData.partido ?? ''} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Fecha</label>
            <input type="date" className="form-control" name="fecha" value={formData.fecha ?? ''} onChange={handleChange} />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Sector</label>
            <input className="form-control" name="sector" value={formData.sector ?? ''} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Asiento</label>
            <input className="form-control" name="asiento" value={formData.asiento ?? ''} onChange={handleChange} />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Precio (€)</label>
            <input type="number" step="0.01" className="form-control" name="precio" value={formData.precio ?? ''} onChange={handleChange} />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Cantidad</label>
            <input type="number" min="1" className="form-control" name="cantidad" value={formData.cantidad ?? formData.cant ?? 1} onChange={handleChange} />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Estado</label>
            <input className="form-control" name="estado" value={formData.estado ?? ''} onChange={handleChange} />
          </div>
        </div>

        <button className="btn btn-primary">Guardar cambios</button>
      </form>
    </div>
  )
}

export default VentaEditar
