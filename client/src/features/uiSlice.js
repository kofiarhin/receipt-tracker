import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { mobileNavOpen: false },
  reducers: {
    toggleMobileNav: (state) => {
      state.mobileNavOpen = !state.mobileNavOpen;
    },
    closeMobileNav: (state) => {
      state.mobileNavOpen = false;
    },
  },
});

export const { toggleMobileNav, closeMobileNav } = uiSlice.actions;
export default uiSlice.reducer;
