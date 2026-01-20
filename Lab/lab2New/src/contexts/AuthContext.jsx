// contexts/AuthContext.jsx
import { createContext, useReducer, useContext, useEffect } from 'react';
import { loginReducer, initialState, LOGIN_ACTIONS } from '../stores/loginReducer';

// 1. Tạo Context
export const AuthContext = createContext();

// 2. Tạo Provider Component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  // 3. Đọc localStorage khi component mount để khôi phục state
  useEffect(() => {
    const savedLogin = localStorage.getItem('lab2_isLoggedIn');
    const savedUsername = localStorage.getItem('lab2_username');
    
    if (savedLogin === 'true' && savedUsername) {
      // Khôi phục state từ localStorage
      dispatch({ 
        type: LOGIN_ACTIONS.SET_USERNAME, 
        payload: savedUsername 
      });
      dispatch({ 
        type: LOGIN_ACTIONS.LOGIN_SUCCESS 
      });
    }
  }, []);

  // 4. Đồng bộ state.isLoggedIn với localStorage
  useEffect(() => {
    if (state.isLoggedIn && state.username) {
      // Khi login thành công, lưu vào localStorage
      localStorage.setItem('lab2_isLoggedIn', 'true');
      localStorage.setItem('lab2_username', state.username);
    } else if (!state.isLoggedIn && state.username === '' && state.password === '') {
      // Khi logout (reset form), xóa localStorage
      localStorage.removeItem('lab2_isLoggedIn');
      localStorage.removeItem('lab2_username');
    }
  }, [state.isLoggedIn, state.username, state.password]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

// 5. Custom hook để dùng dễ hơn
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

