import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Role = "ADMIN" | "PATIENT";

type AuthState = {
  role: Role;
  isAuthenticated: boolean;
  accessToken: string | null;
};

const initialState: AuthState = {
  role: "PATIENT",
  isAuthenticated: false,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.role = "ADMIN";
      state.isAuthenticated = true;
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.role = "PATIENT";
      state.isAuthenticated = false;
      state.accessToken = null;
    },
    enterAsPatient: (state) => {
      state.role = "PATIENT";
      state.isAuthenticated = false;
      state.accessToken = null;
    },
  },
});

export const { enterAsPatient, login, logout } = authSlice.actions;
export default authSlice.reducer;
