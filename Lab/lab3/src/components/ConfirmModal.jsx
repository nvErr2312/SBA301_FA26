//ConfirmModal.jsx để chứa thông tin hộp thoại xác nhận sử dụng lại trong các component khác
//Chứa thông tin linh hoạt - body có thể là JSX bất kỳ

import React from 'react';
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';

function ConfirmModal({ show, handleClose, title, body, onConfirm }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
