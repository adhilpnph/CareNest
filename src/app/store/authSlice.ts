import { createSlice } from "@reduxjs/toolkit";

export type Role = "ADMIN" | "PATIENT";

type AuthState = {
  role: Role;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  role: "PATIENT",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.role = "ADMIN";
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.role = "PATIENT";
      state.isAuthenticated = false;
    },
    enterAsPatient: (state) => {
      state.role = "PATIENT";
      state.isAuthenticated = false;
    },
  },
});

export const { enterAsPatient, login, logout } = authSlice.actions;
export default authSlice.reducer;
