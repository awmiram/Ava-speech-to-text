import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    activeTab: 'record',
    language: false,    
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    toggleLanguage: (state) => {
      state.language = !state.language;
    }
  }
});

export const { setActiveTab, toggleLanguage } = homeSlice.actions;
export default homeSlice.reducer;
