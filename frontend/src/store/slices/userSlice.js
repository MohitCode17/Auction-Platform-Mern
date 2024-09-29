import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    leaderboard: [],
  },

  reducers: {
    // REGISTER USER REDUCERS
    registerRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    clearAllErrors(state, action) {
      state.user = state.user;
      state.isAuthenticated = state.isAuthenticated;
      state.leaderboard = state.leaderboard;
      state.loading = false;
    },
  },
});

// BACKEND URL:-
const BACKEND_URL = "http://localhost:8000/api/v1/user";

// REGISTER REQUEST
export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());

  try {
    const res = await axios.post(`${BACKEND_URL}/register`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(userSlice.actions.registerSuccess(res.data));
    toast.success(res.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.registerFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

// LOGIN REQUEST
export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());

  try {
    const res = await axios.post(`${BACKEND_URL}/login`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(userSlice.actions.loginSuccess(res.data));
    toast.success(res.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export default userSlice.reducer;
