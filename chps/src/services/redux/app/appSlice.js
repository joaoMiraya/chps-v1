import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { database } from '../../firebase/firebase';
import { set, ref, onValue } from 'firebase/database';

export const fetchTempoEntrega = createAsyncThunk(
    'app/fetchTempoEntrega',
    async (_, { rejectWithValue }) => {
        try {
            const tempoEntregaRef = ref(database, 'app-config/' + 'tempo-entrega');
            onValue(tempoEntregaRef, (snapshot) => {
                const data = snapshot.val();
                return data;
            });
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const initialState = {
    tempoEntregar: [],
    tempoRetirar: Cookies.get("tempoRetirar") || "15 minutos",
    appOnline: Cookies.get("appOnline") || false,
};

const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        setTempoEntrega(state, action) {
            state.tempoEntregar = action.payload;
            function setTempoEntrega() {
                set(ref(database, 'app-config/' + 'tempo-entrega'), {
                    tempo_entrega: action.payload
                });
            }
            setTempoEntrega();
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchTempoEntrega.fulfilled, (state, action) => {
                state.tempoEntregar = action.payload;
            })
            .addCase(fetchTempoEntrega.rejected, (state, action) => {
                // Lida com erros da busca do tempo de entrega, se necessário
                console.error(action.error);
            });
    },
});

export const { setTempoEntrega, setTempoRetirar, setAppOnline } = appSlice.actions;

export default appSlice.reducer;