import React from 'react';
import { Modal } from 'react-bootstrap';

function OrchidDetailModal({
  show,
  onClose,
  image,
  name,
  description
}) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size="lg"
      dialogClassName="orchid-detail-modal"
    >
      {/* Header có nút đóng */}
      <Modal.Header closeButton>
        <Modal.Title>Orchid Detail</Modal.Title>
      </Modal.Header>

      <Modal.Body className="orchid-detail-body">
        <img
          src={image}
          alt="orchid"
          className="img-fluid rounded mb-3"
        />
        <p className="fw-bold">{name}</p>
        <p>{description}</p>
      </Modal.Body>
    </Modal>
  );
}

export default OrchidDetailModal;
