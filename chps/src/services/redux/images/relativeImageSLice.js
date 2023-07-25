import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    imageCarousel1: JSON.parse(localStorage.getItem('imageCarousel1')) || null,
    imageCarousel2: JSON.parse(localStorage.getItem('imageCarousel2')) || null,
    imageCarousel3: JSON.parse(localStorage.getItem('imageCarousel3')) || null,
};

const relativeImageSlice = createSlice({
    name: "relativeImages",
    initialState,
    reducers: {
        setimageCarousel1(state, action) {
            state.imageCarousel1 = action.payload;
            localStorage.setItem('imageCarousel1', JSON.stringify(action.payload));
        },
        setimageCarousel2(state, action) {
            state.imageCarousel2 = action.payload;
            localStorage.setItem('imageCarousel2', JSON.stringify(action.payload));
        },
        setimageCarousel3(state, action) {
            state.imageCarousel3 = action.payload;
            localStorage.setItem('imageCarousel3', JSON.stringify(action.payload));
        },
    },
});

export const { setimageCarousel1, setimageCarousel2, setimageCarousel3 } = relativeImageSlice.actions;

export default relativeImageSlice.reducer;