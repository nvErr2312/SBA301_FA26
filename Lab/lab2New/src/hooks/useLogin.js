// hooks/useLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ACTIONS } from '../stores/loginReducer';
import { useAuth } from '../contexts/AuthContext';

/**
 * Custom hook để quản lý logic login
 * @returns {Object} { state, errors, handleUsernameChange, handlePasswordChange, handleLogin }
 */
export function useLogin() {
  const { state, dispatch } = useAuth(); // ← Dùng từ AuthContext thay vì local state
  const navigate = useNavigate();

  // Validation errors (local state for form validation)
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  /**
   * Validate một field cụ thể
   * @param {string} name - Tên field ('username' hoặc 'password')
   * @param {string} value - Giá trị của field
   */
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

  /**
   * Xử lý khi user thay đổi username
   * @param {string} value - Giá trị username mới
   */
  const handleUsernameChange = (value) => {
    dispatch({
      type: LOGIN_ACTIONS.SET_USERNAME,
      payload: value,
    });
    validateField('username', value);
  };

  /**
   * Xử lý khi user thay đổi password
   * @param {string} value - Giá trị password mới
   */
  const handlePasswordChange = (value) => {
    dispatch({
      type: LOGIN_ACTIONS.SET_PASSWORD,
      payload: value,
    });
    validateField('password', value);
  };

  /**
   * Xử lý khi user submit form login
   * @param {Event} e - Form submit event
   */
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch({ type: LOGIN_ACTIONS.SET_ERROR, payload: '' });

    // Validate form
    if (!state.username.trim() || !state.password.trim()) {
      if (!state.username.trim()) {
        validateField('username', '');
      }
      if (!state.password.trim()) {
        validateField('password', '');
      }
      return;
    }

    // Check for validation errors
    if (errors.username || errors.password) return;

    // Start loading
    dispatch({ type: LOGIN_ACTIONS.SET_LOADING, payload: true });

    // Simulate API call
    setTimeout(() => {
      if (state.username === 'admin' && state.password === '123456') {
        // Dispatch vào AuthContext (localStorage sẽ tự động được lưu bởi AuthProvider)
        dispatch({ type: LOGIN_ACTIONS.LOGIN_SUCCESS });
        navigate('/');
      } else {
        dispatch({
          type: LOGIN_ACTIONS.LOGIN_FAILURE,
          payload: 'Sai username hoặc password',
        });
        validateField('password', '');
      }
    }, 500);
  };

  return {
    state,
    errors,
    handleUsernameChange,
    handlePasswordChange,
    handleLogin,
  };
}

