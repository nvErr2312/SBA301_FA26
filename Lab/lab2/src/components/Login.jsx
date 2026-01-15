import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    
    // Validate username
    if (!username.trim()) {
      setUsernameError('Username không được để trống');
      isValid = false;
    } else {
      setUsernameError('');
    }
    
    // Validate password
    if (!password.trim()) {
      setPasswordError('Password không được để trống');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setUsernameError('');
    setPasswordError('');

    // Validate form using useState
    if (!validateForm()) {
      return;
    }

    // Check credentials
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

  const handleCancel = () => {
    navigate('/');
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (usernameError) {
      setUsernameError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) {
      setPasswordError('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Đăng Nhập</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Vui lòng nhập tên đăng nhập "
              value={username}
              onChange={handleUsernameChange}
            />
            {usernameError && <div className="error-message">{usernameError}</div>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Vui lòng nhập mật khẩu"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <div className="error-message">{passwordError}</div>}
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn-login">Login</button>
            <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
