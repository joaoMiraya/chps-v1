import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { database } from '../../firebase/firebase';
import { set, ref, get } from 'firebase/database';

export const fetchWaitTime = createAsyncThunk(
    'app/fetchWaitTime',
    async (_, { rejectWithValue }) => {
        try {
            const tempoEntregaRef = ref(database, 'app-config/tempo-entrega');
            const tempoRetirarRef = ref(database, 'app-config/tempo-retirar');
            const [tempoEntregaSnapshot, tempoRetirarSnapshot] = await Promise.all([
                get(tempoEntregaRef),
                get(tempoRetirarRef),
            ]);
            const tempoEntregaData = tempoEntregaSnapshot.val();
            const tempoRetirarData = tempoRetirarSnapshot.val();
            return { tempo_entrega: tempoEntregaData, tempo_retirar: tempoRetirarData };
        } catch (error) {
            console.error(error.message);
            return rejectWithValue(error.message);
        }
    }
);


const initialState = {
    tempoEntregar: [],
    tempoRetirar: [],
    appOnline: false,
};

const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        setTempoEntrega(state, action) {
            state.tempoEntregar = action.payload;
            set(ref(database, 'app-config/' + 'tempo-entrega'), {
                tempo_entrega: action.payload
            });
        },
        setTempoRetirar(state, action) {
            state.tempoRetirar = action.payload;
            set(ref(database, 'app-config/' + 'tempo-retirar'), {
                tempo_retirar: action.payload
            });
        },
        setAppOnline(state, action) {
            state.appOnline = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWaitTime.fulfilled, (state, action) => {
                state.tempoEntregar = action.payload.tempo_entrega.tempo_entrega;
                state.tempoRetirar = action.payload.tempo_retirar.tempo_retirar;
            })
            .addCase(fetchWaitTime.rejected, (action) => {
                console.error(action.error);
            });
    },
});

export const { setTempoEntrega, setTempoRetirar, setAppOnline } = appSlice.actions;

export default appSlice.reducer;