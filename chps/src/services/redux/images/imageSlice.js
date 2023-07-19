import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  bgHeader: JSON.parse(localStorage.getItem('headerBgImageUrl')) || null,
  logoHeader: JSON.parse(localStorage.getItem('headerLogoUrl')) || null,
  bgHome: JSON.parse(localStorage.getItem('homeBgUrl')) || null,
};


const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setBgHeaderUrl(state, action) {
      state.bgHeader = action.payload;
      localStorage.setItem('headerBgImageUrl', JSON.stringify(action.payload));
    },
    setLogoHeaderUrl(state, action) {
      state.logoHeader = action.payload;
      localStorage.setItem('headerLogoUrl', JSON.stringify(action.payload));
    },
    setBgHomeUrl(state, action) {
      state.bgHome = action.payload;
      localStorage.setItem('bgHomeUrl', JSON.stringify(action.payload));
    },
  },
});

export const { setBgHeaderUrl, setLogoHeaderUrl, setBgHomeUrl } = imageSlice.actions;

export default imageSlice.reducer;