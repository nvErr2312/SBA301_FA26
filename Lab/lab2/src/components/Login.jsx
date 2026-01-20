import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import '../styles/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    username: 'Username không được để trống',
    password: 'Password không được để trống',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let message = '';

    if (!value.trim()) {
      message =
        name === 'username'
          ? 'Username không được để trống'
          : 'Password không được để trống';
    }

    setErrors((prev) => ({
      ...prev,
      [name]: message,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (errors.username || errors.password) return;

    if (username === 'admin' && password === '123456') {
      localStorage.setItem('lab2_isLoggedIn', 'true');
      localStorage.setItem('lab2_username', username);
      navigate('/');
      window.location.reload();
    } else {
      setError('Sai username hoặc password');
      setPassword('');
      validateField('password', '');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Đăng Nhập</h1>

        {error && <div className="error-message text-danger">{error}</div>}

        <Form noValidate onSubmit={handleLogin}>
          {/* Username */}
          <Form.Group className="form-group">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              placeholder="Vui lòng nhập tên đăng nhập"
              isInvalid={!!errors.username}
              onChange={(e) => {
                setUsername(e.target.value);
                validateField('username', e.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password */}
          <Form.Group className="form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Vui lòng nhập mật khẩu"
              isInvalid={!!errors.password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateField('password', e.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="form-buttons">
            <Button type="submit" className="btn-login">
              Login
            </Button>
            <Button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
