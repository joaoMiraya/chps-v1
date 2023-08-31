import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    tempoEntregar: Cookies.get("tempoEntregar") || "15 minutos",
    tempoRetirar: Cookies.get("tempoRetirar") || "15 minutos",
    appOnline: Cookies.get("appOnline") || false,
};

const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        setTempoEntrega(state, action) {
            state.tempoEntregar = action.payload;
            Cookies.set('tempoEntregar', action.payload, { expires: 1 });
        },
        setTempoRetirar(state, action) {
            state.tempoRetirar = action.payload;
            Cookies.set('tempoRetirar', action.payload, { expires: 1 });
        },
        setAppOnline(state, action) {
            state.appOnline = action.payload;
            Cookies.set('appOnline', action.payload, { expires: 1 });
        },
    },
});

export const { setTempoEntrega, setTempoRetirar, setAppOnline } = appSlice.actions;

export default appSlice.reducer;