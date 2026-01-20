import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import ConfirmModal from './ConfirmModal';
import '../styles/contact.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = { username: '', password: '' };
    let isValid = true;

    if (!username.trim()) {
      newErrors.username = 'Username không được để trống';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password không được để trống';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    if (username === 'admin' && password === '123456') {
      localStorage.setItem('lab2_isLoggedIn', 'true');
      localStorage.setItem('lab2_username', username);
      navigate('/');
      window.location.reload();
    } else {
      setError('Sai username hoặc password');
      setPassword('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Đăng Nhập</h1>

        {error && <div className="text-danger mb-3">{error}</div>}

        <Form onSubmit={handleLogin} noValidate>
          {/* Username */}
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Vui lòng nhập tên đăng nhập"
              value={username}
              isInvalid={!!errors.username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors({ ...errors, username: '' });
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Vui lòng nhập mật khẩu"
              value={password}
              isInvalid={!!errors.password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: '' });
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit" variant="primary">
              Login
            </Button>
            <Button variant="secondary" onClick={() => navigate('/')}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
