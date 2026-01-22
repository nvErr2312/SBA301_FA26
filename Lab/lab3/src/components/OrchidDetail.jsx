import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { getOrchidById } from "../api/orchidAPI";
import "../styles/orchid-detail.css";

function OrchidDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        const data = await getOrchidById(id); // ✅ dùng đúng 1 hàm này
        setOrchid(data);
      } catch (err) {
        console.error("Load detail failed:", err);
        setOrchid(null);
      } finally {
        setLoading(false);
      }
    }

    loadDetail();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <h4>Đang tải chi tiết hoa lan...</h4>
      </Container>
    );
  }

  // Not found
  if (!orchid) {
    return (
      <Container className="text-center mt-5">
        <h2>Hoa lan không tìm thấy!</h2>
        <Button variant="success" onClick={() => navigate("/")}>
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
          <img
            src={`/${orchid.image}`}
            alt={orchid.orchidName}
            className="img-fluid rounded"
          />
        </div>

        {/* Info */}
        <div className="detail-info">
          <h1>{orchid.orchidName}</h1>
          <p className="detail-category">{orchid.category}</p>

          <p className="detail-price">
            Giá: <strong>{Number(orchid.price ?? 0).toLocaleString()} VND</strong>
          </p>

          <div className="detail-description">
            <h4>Mô Tả</h4>
            <p>{orchid.description}</p>
          </div>

          {orchid.isSpecial && (
            <div className="alert alert-info">🌟 Đây là hoa lan đặc biệt</div>
          )}

          <Button
            variant="success"
            size="lg"
            onClick={() => navigate("/")}
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
