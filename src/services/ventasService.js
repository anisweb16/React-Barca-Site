import { API_URL } from '../config'

export async function getVentas() {
  const response = await fetch(`${API_URL}/api/ventas`)
  if (!response.ok) throw new Error('Error al obtener ventas')
  return await response.json()
}

export async function crearVenta(venta) {
  const response = await fetch(`${API_URL}/api/ventas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(venta)
  })

  if (response.status === 422) {
    const errorData = await response.json()
    throw errorData
  }
  if (!response.ok) throw new Error('Error al crear venta')

  return await response.json()
}

export async function getVentaById(id) {
  const response = await fetch(`${API_URL}/api/ventas/${id}`)

  if (response.status === 404) throw new Error('Venta no encontrada')
  if (!response.ok) throw new Error('Error al cargar venta')

  return await response.json()
}

export async function actualizarVenta(id, venta) {
  const response = await fetch(`${API_URL}/api/ventas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(venta)
  })

  if (response.status === 422) {
    const errorData = await response.json()
    throw errorData
  }
  if (!response.ok) throw new Error('Error al actualizar venta')

  return await response.json()
}

export async function eliminarVenta(id) {
  const response = await fetch(`${API_URL}/api/ventas/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error('Error al eliminar venta')
}
