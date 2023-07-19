
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  openMenu: false,
  changeFormHome: true,
};


const appSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setOpenMenu(state) {
      state.openMenu = true;
    },
    setCloseMenu(state) {
      state.openMenu = false;
    },
    setChangeRegister(state) {
      state.changeFormHome = false
    },
    setChangeLogin(state) {
      state.changeFormHome = true
    }

  },
});

export const { setOpenMenu, setCloseMenu, setChangeRegister, setChangeLogin } = appSlice.actions;

export default appSlice.reducer;