import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  image404: JSON.parse(localStorage.getItem('404ImageUrl')) || null,
  promoImage: JSON.parse(localStorage.getItem('promoImageUrl')) || null,
  choppImage: JSON.parse(localStorage.getItem('choppImageUrl')) || null,
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    set404ImageUrl(state, action) {
      state.image404 = action.payload;
      localStorage.setItem('404ImageUrl', JSON.stringify(action.payload));
    },
    setPromoImageUrl(state, action) {
      state.promoImage = action.payload;
      localStorage.setItem('promoImageUrl', JSON.stringify(action.payload));
    },
    setChoppImageUrl(state, action) {
      state.choppImage = action.payload;
      localStorage.setItem('choppImage', JSON.stringify(action.payload));
    },
  },
});

export const { set404ImageUrl, setChoppImageUrl, setPromoImageUrl } = imageSlice.actions;

export default imageSlice.reducer;