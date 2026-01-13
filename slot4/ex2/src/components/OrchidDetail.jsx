import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { listOfOrchids } from '../listOfOrchid';
import '../styles/orchid-detail.css';

function OrchidDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Tìm orchid theo id
  const orchid = listOfOrchids.find(o => o.id === id);

  // Nếu không tìm thấy
  if (!orchid) {
    return (
      <Container className="text-center mt-5">
        <h2>Hoa lan không tìm thấy!</h2>
        <Button variant="success" onClick={() => navigate('/')}>
          Quay về trang chính
        </Button>
      </Container>
    );
  }

  return (
    <Container className="orchid-detail-page">
      <div className="detail-container">
        {/* Image */}
        <div className="detail-image">
          <img src={`/${orchid.image}`} alt={orchid.orchidName} className="img-fluid rounded" />
        </div>

        {/* Info */}
        <div className="detail-info">
          <h1>{orchid.orchidName}</h1>
          <p className="detail-category">{orchid.category}</p>
          <p className="detail-price">
            Giá: <strong>{orchid.price.toLocaleString()} VND</strong>
          </p>

          <div className="detail-description">
            <h4>Mô Tả</h4>
            <p>{orchid.description}</p>
          </div>

          {orchid.isSpecial && (
            <div className="alert alert-info">
              🌟 Đây là hoa lan đặc biệt
            </div>
          )}

          <Button 
            variant="success" 
            size="lg"
            onClick={() => navigate('/')}
            className="mt-3"
          >
            ← Quay lại
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default OrchidDetail;
