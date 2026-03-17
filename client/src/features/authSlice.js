import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('receipt_tracker_token') || null,
  hydrated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('receipt_tracker_token', action.payload.token);
    },
    setHydrated: (state, action) => {
      state.hydrated = action.payload;
      state.user = action.payloadUser || state.user;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('receipt_tracker_token');
    },
  },
});

export const { setCredentials, logout, setHydrated } = authSlice.actions;
export default authSlice.reducer;
