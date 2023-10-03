import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { database } from '../../firebase/firebase';
import { set, ref, get, getDatabase, push, onValue, child } from 'firebase/database';


//RECUPERA OS PEDIDOS EM ANDAMENTO
export const fetchPedidosAndamento = createAsyncThunk(
    'app/fetchPedidosAndamento',
    async (_, { rejectWithValue }) => {
      try {
        const db = getDatabase();
        const dbRef = ref(db, 'pedidos-entregas');
  
        const snapshot = await get(dbRef); // Usamos await para esperar a consulta
  
        const pedidos = [];
  
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          pedidos.push(childData);
        });
  
        return pedidos;
      } catch (error) {
        console.error(error.message);
        return rejectWithValue(error.message);
      }
    }
  );


const initialState = {
    entregas: [],
    pedidos_entrega: [],
    pedidos_mesa: []
};

const pedidosSlice = createSlice({
    name: "pedidosSlice",
    initialState,
    reducers: {
        setPedidosEntrega(state, action) {
            state.pedidos_entrega = action.payload;
            const db = getDatabase();
            const orderListRef = ref(db, 'pedidos-entregas');
            const newOrderRef = push(orderListRef);
            console.log(action.payload);
            set(newOrderRef, {
                ...action.payload
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
            .addCase(fetchPedidosAndamento.fulfilled, (state, action) => {
                state.entregas = action.payload;
            })
            .addCase(fetchPedidosAndamento.rejected, (action) => {
                console.error(action.error);
            });
    },
});

export const { setPedidosEntrega, setPedidosMesa } = pedidosSlice.actions;

export default pedidosSlice.reducer;