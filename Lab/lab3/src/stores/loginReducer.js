// src/stores/loginReducer.js

// Initial state
export const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false,
  role: "", // "admin" | "user"
};

// Action types
export const LOGIN_ACTIONS = {
  SET_USERNAME: "SET_USERNAME",
  SET_PASSWORD: "SET_PASSWORD",
  SET_ROLE: "SET_ROLE",

  SET_ERROR: "SET_ERROR",
  SET_LOADING: "SET_LOADING",

  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",

  RESET_FORM: "RESET_FORM", // dùng khi muốn reset hết state
  LOGOUT: "LOGOUT",         // ✅ thêm để logout chuẩn
};

// Reducer function
export const loginReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_ACTIONS.SET_USERNAME:
      return {
        ...state,
        username: action.payload,
        error: "",
      };

    case LOGIN_ACTIONS.SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
        error: "",
      };

    case LOGIN_ACTIONS.SET_ROLE:
      return {
        ...state,
        role: action.payload,
      };

    case LOGIN_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case LOGIN_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case LOGIN_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        error: "",
      };

    case LOGIN_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        role: "",
        error: action.payload,
        password: "",
      };

    case LOGIN_ACTIONS.LOGOUT:
      return {
        ...initialState,
      };

    case LOGIN_ACTIONS.RESET_FORM:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
