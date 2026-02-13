import { Modal, Button } from 'react-bootstrap'

function ConfirmDeleteModal({ show, onHide, onConfirm, venta }) {
  if (!venta) return null

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar eliminación</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        ¿Seguro que deseas eliminar la venta <strong>#{venta.id}</strong>?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="danger" onClick={onConfirm}>Eliminar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmDeleteModal
