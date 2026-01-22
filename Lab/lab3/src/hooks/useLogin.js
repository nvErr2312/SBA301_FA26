import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LOGIN_ACTIONS } from "../stores/loginReducer";

export function useLogin() {
  const { state, dispatch, login } = useAuth();
  const navigate = useNavigate();

  // ❗ Giữ errors để Form.Control.Feedback dùng
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  // ===== realtime validate =====
  const handleUsernameChange = (value) => {
    dispatch({ type: LOGIN_ACTIONS.SET_USERNAME, payload: value });

    setErrors((prev) => ({
      ...prev,
      username: value.trim() ? "" : "Username không được để trống",
    }));
  };

  const handlePasswordChange = (value) => {
    dispatch({ type: LOGIN_ACTIONS.SET_PASSWORD, payload: value });

    setErrors((prev) => ({
      ...prev,
      password: value.trim() ? "" : "Password không được để trống",
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // ===== validate khi submit =====
    const newErrors = {
      username: state.username.trim() ? "" : "Username không được để trống",
      password: state.password.trim() ? "" : "Password không được để trống",
    };

    setErrors(newErrors);

    if (newErrors.username || newErrors.password) return;

    // ===== login thật =====
    const ok = login(state.username.trim(), state.password);

    if (ok) {
      navigate("/", { replace: true });
    }
  };

  return {
    state,
    errors,
    handleUsernameChange,
    handlePasswordChange,
    handleLogin,
  };
}
