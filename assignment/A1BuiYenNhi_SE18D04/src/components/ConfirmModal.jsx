/**
 * ConfirmModal – hộp thoại xác nhận dùng chung (xóa, xác nhận thao tác…).
 * Có thể tái sử dụng trong AccountManagement, CategoryManagement, NewsManagement, v.v.
 * body có thể là chuỗi hoặc JSX.
 */
import { Modal, Button } from 'react-bootstrap'

function ConfirmModal({
  show,
  handleClose,
  title,
  body,
  onConfirm,
  confirmLabel = 'Xác nhận',
  confirmVariant = 'primary',
}) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant={confirmVariant} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal
