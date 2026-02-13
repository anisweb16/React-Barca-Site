import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { crearVenta } from '../services/ventasService'

const SECTORES = ['VIP', 'Gol Sud', 'Gol Nord', 'Lateral']
const ASIENTOS_POR_SECTOR = {
  VIP: ['V-01', 'V-02', 'V-03', 'V-04', 'V-05'],
  'Gol Sud': ['GS-01', 'GS-10', 'GS-15', 'GS-20'],
  'Gol Nord': ['GN-01', 'GN-10', 'GN-15', 'GN-20'],
  Lateral: ['L-01', 'L-10', 'L-15', 'L-20'],
}
const ESTADOS = ['PAGADO', 'RESERVADO', 'CANCELADO']

function VentaNuevo() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    partido: '',
    fecha: '',
    sector: '',
    asiento: '',
    precio: '',
    cantidad: 1,
    estado: 'PAGADO',
  })

  const [errores, setErrores] = useState([])

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'sector' ? { asiento: '' } : {})
    }))
  }

  // 🔥 PAYLOAD EXACT ATTENDU PAR FASTAPI (Swagger)
  async function handleSubmit(e) {
    e.preventDefault()
    setErrores([])

    const payload = {
      nombre_cliente: formData.nombre.trim(),
      apellido_cliente: formData.apellido.trim(),
      email_cliente: formData.email.trim(),
      telefono_cliente: formData.telefono || '',
      partido: formData.partido.trim(),
      fecha_partido: formData.fecha,      // YYYY-MM-DD
      sector: formData.sector,
      asiento: formData.asiento,
      precio: Number(formData.precio),
      cantidad: Number(formData.cantidad),
      estado: formData.estado
    }

    try {
      await crearVenta(payload)
      navigate('/')
    } catch (error) {
      if (error.detail) {
        setErrores(
          error.detail.map(e => `${e.loc?.[1]}: ${e.msg}`)
        )
      } else {
        setErrores(['Error inesperado'])
      }
    }
  }

  const asientos = formData.sector
    ? (ASIENTOS_POR_SECTOR[formData.sector] || [])
    : []

  return (
    <div>
      <h2>Nueva venta</h2>

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
            <input className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Apellido</label>
            <input className="form-control" name="apellido" value={formData.apellido} onChange={handleChange} required />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Teléfono</label>
            <input className="form-control" name="telefono" value={formData.telefono} onChange={handleChange} />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Partido</label>
            <input className="form-control" name="partido" value={formData.partido} onChange={handleChange} required />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Fecha</label>
            <input type="date" className="form-control" name="fecha" value={formData.fecha} onChange={handleChange} required />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Sector</label>
            <select className="form-select" name="sector" value={formData.sector} onChange={handleChange} required>
              <option value="">Selecciona sector</option>
              {SECTORES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Asiento</label>
            <select className="form-select" name="asiento" value={formData.asiento} onChange={handleChange} disabled={!formData.sector} required>
              <option value="">Selecciona asiento</option>
              {asientos.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Precio (€)</label>
            <input type="number" min="0" step="0.01" className="form-control" name="precio" value={formData.precio} onChange={handleChange} required />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Cantidad</label>
            <input type="number" min="1" className="form-control" name="cantidad" value={formData.cantidad} onChange={handleChange} required />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Estado</label>
            <select className="form-select" name="estado" value={formData.estado} onChange={handleChange}>
              {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>

        </div>

        <button className="btn btn-primary">
          Guardar venta
        </button>
      </form>
    </div>
  )
}

export default VentaNuevo
