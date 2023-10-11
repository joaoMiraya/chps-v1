import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { database, db } from '../../firebase/firebase';
import { set, ref, get, getDatabase, push, update, onValue, child, remove } from 'firebase/database';
import { addDoc, collection, where } from 'firebase/firestore';


//RECUPERA OS PEDIDOS EM ANDAMENTO
export const fetchPedidosAndamento = createAsyncThunk(
    'pedidos/fetchPedidosAndamento',
    async (_, { rejectWithValue }) => {
        try {
            const db = getDatabase();
            const dbRef = ref(db, 'pedidos-entregas');
            const snapshot = await get(dbRef);
            const pedidos = [];
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                const objData = {
                    ...childData,
                    key: childKey
                }
                pedidos.push(objData);
            });

            return pedidos;
        } catch (error) {
            console.error(error.message);
            return rejectWithValue(error.message);
        }
    }
);

//CANCELA O PEDIDO EM ANDAMENTO
export const deleteOrder = createAsyncThunk(
    'pedidos/delete',
    async (key, { rejectWithValue }) => {
        try {
            const db = getDatabase();
            const dbRef = ref(db, `pedidos-entregas/${key}`);
            return remove(dbRef);
        } catch (error) {
            console.error(error.message);
            return rejectWithValue(error.message);
        }
    }
);

//ALTERA O STATUS DO PEDIDO PARA À CAMINHO (75)
export const setOnCourse = createAsyncThunk(
    'pedidos/onCourse',
    async ({ Key, Order, Motoboy }, { rejectWithValue }) => {
        try {
            const db = getDatabase();
            const dbRef = ref(db, `pedidos-entregas/${Key}`);
            const updates = {
                ...Order[0],
                status: 75,
                motoboy: Motoboy
            }
            return update(dbRef, updates)
        } catch (error) {
            console.error(error.message);
            return rejectWithValue(error.message);
        }

    }
);
export const getEntregasOnCourse = (entregas) => {
    const entregasFiltred = entregas.filter(entrega => entrega.status === 75);
    return entregasFiltred
};
export const getEntregasAwaiting = (entregas) => {
    const entregasFiltred = entregas.filter(entrega => entrega.status === 50);
    return entregasFiltred
};

//SALVA O PEDIDO FINALIZADO EM UMA COLEÇÃO
export const submitOrder = createAsyncThunk(
    'pedidos/finalizados',
    async ({ Order, Time, Key }, { rejectWithValue }) => {
        try {
            //SALVA O PEDIDO FINALIZADO NO FIRESTORE DB
            const docRef = await addDoc(collection(db, "pedidos"), {
                pedido: Order,
                hora_finalizado: Time
            });
        }
        catch (error) {
            console.error(error.message);
            return rejectWithValue(error.message);
        }
        //REMOVE O PEDIDO DO REALTIME DATABASE
        try {
            const db = getDatabase();
            const dbRef = ref(db, `pedidos-entregas/${Key}`);
            return remove(dbRef);
        } catch (error) {
            console.error(error.message);
            return rejectWithValue(error.message);
        }
    }
);

//SALVA O CANCELAMENTO EM UMA COLEÇÃO
export const addCancelOrder = createAsyncThunk(
    'pedidos/cancelamento',
    async ({ Reason, Order, Time }, { rejectWithValue }) => {
        try {
            //SALVA O CANCELAMENTO NO FIRESTORE DB
            const docRef = await addDoc(collection(db, "cancelamentos"), {
                motivo: Reason,
                pedido: Order,
                hora_cancelamento: Time
            });
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