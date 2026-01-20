import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import ConfirmModal from './ConfirmModal';
import '../styles/contact.css';

function Contact() {
  // Lưu dữ liệu form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);

  // Lưu lỗi của từng field
  const [errors, setErrors] = useState({});
  
  // Theo dõi field nào đã user chạm vào
  const [touched, setTouched] = useState({});
  
  // Hiển thị modal
  const [showModal, setShowModal] = useState(false);

  // ==================== HÀM KIỂM TRA TÊN ====================
  const validateName = (name) => {
    if (!name.trim()) return 'Không được để trống';
    if (!/^[a-zA-ZÀ-ỿ\s]+$/.test(name)) return 'Chỉ được chứa chữ cái';
    return ''; // Không lỗi
  };

  // ==================== HÀM KIỂM TRA SĐT ====================
  const validatePhone = (phone) => {
    if (!phone) return 'Không được để trống';
    if (!/^[0-9]{10}$/.test(phone)) return 'Phải là 10 chữ số';
    return '';
  };

  // ==================== HÀM KIỂM TRA EMAIL ====================
  const validateEmail = (email) => {
    if (!email) return 'Không được để trống';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email không hợp lệ';
    return '';
  };

  // ==================== HÀM KIỂM TRA THỎA THUẬN ====================
  const validateAgree = (agree) => {
    if (!agree) return 'Vui lòng đồng ý';
    return '';
  };

  // ==================== KHI USER NHẬP DỮ LIỆU ====================
  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    
    // Nếu user đã rời khỏi field này rồi, thì kiểm tra lỗi ngay
    if (touched.firstName) {
      setErrors(prev => ({...prev, firstName: validateName(value)}));
    }
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    
    if (touched.lastName) {
      setErrors(prev => ({...prev, lastName: validateName(value)}));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    
    if (touched.phone) {
      setErrors(prev => ({...prev, phone: validatePhone(value)}));
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (touched.email) {
      setErrors(prev => ({...prev, email: validateEmail(value)}));
    }
  };

  const handleAgreeChange = (e) => {
    const value = e.target.checked;
    setAgree(value);
    
    if (touched.agree) {
      setErrors(prev => ({...prev, agree: validateAgree(value)}));
    }
  };

  // ==================== KHI USER RỜI KHỎI FIELD ====================
  const handleFirstNameBlur = () => {
    setTouched(prev => ({...prev, firstName: true}));
    setErrors(prev => ({...prev, firstName: validateName(firstName)}));
  };

  const handleLastNameBlur = () => {
    setTouched(prev => ({...prev, lastName: true}));
    setErrors(prev => ({...prev, lastName: validateName(lastName)}));
  };

  const handlePhoneBlur = () => {
    setTouched(prev => ({...prev, phone: true}));
    setErrors(prev => ({...prev, phone: validatePhone(phone)}));
  };

  const handleEmailBlur = () => {
    setTouched(prev => ({...prev, email: true}));
    setErrors(prev => ({...prev, email: validateEmail(email)}));
  };

  const handleAgreeBlur = () => {
    setTouched(prev => ({...prev, agree: true}));
    setErrors(prev => ({...prev, agree: validateAgree(agree)}));
  };

  // ==================== KHI SUBMIT ====================
  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra tất cả field
    const firstNameError = validateName(firstName);
    const lastNameError = validateName(lastName);
    const phoneError = validatePhone(phone);
    const emailError = validateEmail(email);
    const agreeError = validateAgree(agree);

    // Lưu lỗi vào state
    setErrors({
      firstName: firstNameError,
      lastName: lastNameError,
      phone: phoneError,
      email: emailError,
      agree: agreeError
    });

    // Đánh dấu tất cả field đã chạm
    setTouched({
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
      agree: true
    });

    // Nếu không lỗi → hiển thị modal
    if (!firstNameError && !lastNameError && !phoneError && !emailError && !agreeError) {
      setShowModal(true);
    }
  };

  // ==================== RESET FORM ====================
  const handleCloseModal = () => {
    setShowModal(false);
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setAgree(false);
    setErrors({});
    setTouched({});
  };

  // Tạo nội dung modal
  const modalBody = (
    <div className="card p-3">
      <h5 className="mb-3 text-center">Thông Tin Liên Hệ</h5>
      
      <div className="mb-2">
        <strong>Tên:</strong>
        <p className="ms-2">{firstName} {lastName}</p>
      </div>

      <div className="mb-2">
        <strong>Số Điện Thoại:</strong>
        <p className="ms-2">{phone}</p>
      </div>

      <div className="mb-2">
        <strong>Email:</strong>
        <p className="ms-2">{email}</p>
      </div>
    </div>
  );

  return (
    <div className="contact-container">
      <Container>
        {/* Header */}
        <div className="contact-header">
          <h1>Liên Hệ Với Chúng Tôi</h1>
          <p>Hãy để lại thông tin để chúng tôi liên lạc với bạn</p>
        </div>

        {/* Form */}
        <div className="contact-form-section">
          <h3>Điền Thông Tin Liên Hệ</h3>

          <Form noValidate validated={Object.keys(touched).length > 0} onSubmit={handleSubmit}>
            {/* First Name & Last Name */}
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  onBlur={handleFirstNameBlur}
                  isInvalid={!!errors.firstName && touched.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Họ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập họ"
                  value={lastName}
                  onChange={handleLastNameChange}
                  onBlur={handleLastNameBlur}
                  isInvalid={!!errors.lastName && touched.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Phone & Email */}
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Số Điện Thoại</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  value={phone}
                  onChange={handlePhoneChange}
                  onBlur={handlePhoneBlur}
                  maxLength="10"
                  isInvalid={!!errors.phone && touched.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  isInvalid={!!errors.email && touched.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Checkbox */}
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="agreeCheckbox"
                label="Tôi đồng ý với điều khoản sử dụng"
                checked={agree}
                onChange={handleAgreeChange}
                onBlur={handleAgreeBlur}
                isInvalid={!!errors.agree && touched.agree}
                feedback={errors.agree}
                feedbackType="invalid"
              />
            </Form.Group>

            {/* Submit */}
            <Button variant="success" size="lg" type="submit" className="w-100">
              Gửi
            </Button>
          </Form>
        </div>
      </Container>

      {/* Modal */}
      <ConfirmModal
        show={showModal}
        handleClose={handleCloseModal}
        title="Xác Nhận Thông Tin"
        body={modalBody}
        onConfirm={handleCloseModal}
      />
    </div>
  );
}

export default Contact;