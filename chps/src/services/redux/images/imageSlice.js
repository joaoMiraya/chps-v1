import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bgHeader: JSON.parse(localStorage.getItem('headerBgImageUrl')) || null,
  logoHeader: JSON.parse(localStorage.getItem('headerLogoUrl')) || null,
  image404: JSON.parse(localStorage.getItem('404ImageUrl')) || null,
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
    set404ImageUrl(state, action) {
      state.logoHeader = action.payload;
      localStorage.setItem('404ImageUrl', JSON.stringify(action.payload));
    },
  },
});

export const { setBgHeaderUrl, setLogoHeaderUrl, setBgHomeUrl, set404ImageUrl } = imageSlice.actions;

export default imageSlice.reducer;