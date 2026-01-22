// src/contexts/AuthContext.jsx
import { createContext, useReducer, useContext, useEffect } from "react";
import { loginReducer, initialState, LOGIN_ACTIONS } from "../stores/loginReducer";
import { users } from "../data/users"; // ✅ fake users

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  // 1) Khôi phục đăng nhập từ localStorage
  useEffect(() => {
    const savedLogin = localStorage.getItem("lab2_isLoggedIn");
    const savedUsername = localStorage.getItem("lab2_username");
    const savedRole = localStorage.getItem("lab2_role");

    if (savedLogin === "true" && savedUsername && savedRole) {
      dispatch({ type: LOGIN_ACTIONS.SET_USERNAME, payload: savedUsername });
      dispatch({ type: LOGIN_ACTIONS.SET_ROLE, payload: savedRole });
      dispatch({ type: LOGIN_ACTIONS.LOGIN_SUCCESS });
    }
  }, []);

  // 2) Đồng bộ state -> localStorage
  useEffect(() => {
    if (state.isLoggedIn && state.username && state.role) {
      localStorage.setItem("lab2_isLoggedIn", "true");
      localStorage.setItem("lab2_username", state.username);
      localStorage.setItem("lab2_role", state.role);
    } else if (!state.isLoggedIn) {
      localStorage.removeItem("lab2_isLoggedIn");
      localStorage.removeItem("lab2_username");
      localStorage.removeItem("lab2_role");
    }
  }, [state.isLoggedIn, state.username, state.role]);

  // ✅ 3) Login giả lập (thay cho DB)
  const login = (username, password) => {
    dispatch({ type: LOGIN_ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: LOGIN_ACTIONS.SET_ERROR, payload: "" });

    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!found) {
      dispatch({ type: LOGIN_ACTIONS.LOGIN_FAILURE, payload: "Sai tài khoản hoặc mật khẩu!" });
      return false;
    }

    dispatch({ type: LOGIN_ACTIONS.SET_USERNAME, payload: found.username });
    dispatch({ type: LOGIN_ACTIONS.SET_ROLE, payload: found.role });
    dispatch({ type: LOGIN_ACTIONS.LOGIN_SUCCESS });
    return true;
  };

  // ✅ 4) Logout chuẩn
  const logout = () => {
    dispatch({ type: LOGIN_ACTIONS.LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
