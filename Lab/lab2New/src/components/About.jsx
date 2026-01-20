import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/about.css';

function About() {
  return (
    <div className="about-container">
      <Container>
        {/* Header */}
        <div className="about-header">
          <h1>Về Chúng Tôi</h1>
        </div>

        {/* Profile - Avatar Left, Info Right */}
        <div className="profile-section">
          <div className="profile-avatar">
            <img src="images/avatar.jpg" alt="Bui Yen Nhi" />
          </div>
          <div className="profile-info">
            <h2>Bui Yen Nhi</h2>
            <p className="profile-role">Quản Lý Tiệm Hoa Vui Vẻ</p>
            <p className="profile-brief">
              Tiệm hoa Vui Vẻ là cửa hàng chuyên bán hoa lan cao cấp với chất 
              lượng tốt nhất. Chúng tôi cung cấp các loài hoa từ khắp nơi trên 
              thế giới, mang đến lựa chọn đa dạng cho khách hàng.
            </p>
            <p className="profile-brief" style={{ marginTop: '15px' }}>
              Sứ mệnh của chúng tôi là mang lại những bông hoa tươi sáng đẹp 
              nhất, giúp khách hàng truyền tải yêu thương và sự kính cẩn.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="values-container">
          <h3>Giá Trị Cốt Lõi</h3>
          <div className="values-grid">
            <div className="value-card">
              <h4>Chất Lượng</h4>
              <p>Hoa được chọn lọc kỹ lưỡng</p>
            </div>
            <div className="value-card">
              <h4>Sáng Tạo</h4>
              <p>Thiết kế độc đáo mỗi bó</p>
            </div>
            <div className="value-card">
              <h4>Tin Tưởng</h4>
              <p>Xây dựng tín nhiệm lâu dài</p>
            </div>
            <div className="value-card">
              <h4>Dịch Vụ</h4>
              <p>Chăm sóc khách tận tâm</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="contact-section">
          <h3>Liên Hệ Chúng Tôi</h3>
          <div className="contact-info">
            <div className="contact-item">
              <strong>Email</strong>
              <p>nhibyde181014@fpt.edu.vn</p>
            </div>
            <div className="contact-item">
              <strong>Điện Thoại</strong>
              <p>0123456789</p>
            </div>
            <div className="contact-item">
              <strong>Địa Chỉ</strong>
              <p>TP. Hồ Chí Minh, Việt Nam</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default About;
