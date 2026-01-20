import React from 'react';
import { Form, Button } from 'react-bootstrap';
import '../../styles/login.css';
import { useLogin } from '../../hooks/useLogin';

function Login() {
  // Sử dụng custom hook useLogin từ hooks/
  const { state, errors, handleUsernameChange, handlePasswordChange, handleLogin } = useLogin();

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Đăng Nhập</h1>

        {state.error && (
          <div className="error-message text-danger">{state.error}</div>
        )}

        <Form noValidate onSubmit={handleLogin}>
          {/* Username */}
          <Form.Group className="form-group">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={state.username}
              placeholder="Vui lòng nhập tên đăng nhập"
              isInvalid={!!errors.username}
              onChange={(e) => handleUsernameChange(e.target.value)}
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
              value={state.password}
              placeholder="Vui lòng nhập mật khẩu"
              isInvalid={!!errors.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="form-buttons">
            <Button
              type="submit"
              variant="primary"
              className="btn-login"
              disabled={state.isLoading}
            >
              {state.isLoading ? 'Đang đăng nhập...' : 'Login'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="btn-cancel"
              onClick={() => window.location.href = '/'}
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
