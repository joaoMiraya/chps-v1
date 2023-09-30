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
    pedidos_entrega: [],
    pedidos_mesa: []
};

const pedidosSlice = createSlice({
    name: "pedidosSlice",
    initialState,
    reducers: {
        setPedidosEntrega(state, action) {
            state.pedidos_entrega = action.payload;
            set(ref(database, 'pedidos-andamento/' + 'pedidos-entrega'), {
                pedido: action.payload
            });
        },
        setPedidosMesa(state, action) {
            state.pedidos_mesa = action.payload;
            set(ref(database, 'pedidos-andamento/' + 'pedidos-mesa'), {
                pedido: action.payload
            });
        }
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

export const { setPedidosEntrega, setPedidosMesa } = pedidosSlice.actions;

export default pedidosSlice.reducer;