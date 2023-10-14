import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebase';
import { set, ref, get, getDatabase, push, update, remove } from 'firebase/database';
import { addDoc, collection, where } from 'firebase/firestore';


//RECUPERA OS PEDIDOS EM ANDAMENTO
export const fetchPedidosAndamento = createAsyncThunk(
    'pedidos/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const db = getDatabase();
            const dbRef = ref(db, 'pedidos-andamento');
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
            const dbRef = ref(db, `pedidos-andamento/${key}`);
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

//ALTERA O STATUS DO PEDIDO PARA À CAMINHO (50 -> 75)
export const setOnCourse = createAsyncThunk(
    'pedidos/onCourse',
    async ({ Key, Order, Motoboy }, { rejectWithValue }) => {
        try {
            const db = getDatabase();
            const dbRef = ref(db, `pedidos-andamento/${Key}`);
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

//REMOVE A ENTREGA DE A CAMINHO (75 -> 50)
export const removeOnCourse = createAsyncThunk(
    'pedidos/removeOnCourse',
    async ({ Key, Order }, { rejectWithValue }) => {
        try {
            const db = getDatabase();
            const dbRef = ref(db, `pedidos-andamento/${Key}`);
            const { status, motoboy, ...rest } = Order;
            const updates = {
                ...rest,
                status: 50,
            }
            return update(dbRef, updates)
        } catch (error) {
            console.error(error.message);
            return rejectWithValue(error.message);
        }

    }
);

//PEGA TODAS AS ENTREGAS COM O STATUS DE EM ENTREGA
export const getEntregasOnCourse = (entregas) => {
    const entregasFiltred = entregas.filter(entrega => entrega.status === 75);
    return entregasFiltred
};

//PEGA TODAS AS ENTREGAS COM O STATUS DE AGUARDANDO
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
            const dbRef = ref(db, `pedidos-andamento/${Key}`);
            return remove(dbRef);
        } catch (error) {
            console.error(error.message);
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    pedidos: [],
    pedidos_entrega: [],
    };

const pedidosSlice = createSlice({
    name: "pedidosSlice",
    initialState,
    reducers: {
        setPedidos(state, action) {
            state.pedidos_entrega = action.payload;
            const db = getDatabase();
            const orderListRef = ref(db, 'pedidos-andamento');
            const newOrderRef = push(orderListRef);
            set(newOrderRef, {
                ...action.payload
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPedidosAndamento.fulfilled, (state, action) => {
                state.pedidos = action.payload;
            })
            .addCase(fetchPedidosAndamento.rejected, (action) => {
                console.error(action.error);
            });
    },
});

export const { setPedidos, setPedidosMesa } = pedidosSlice.actions;

export default pedidosSlice.reducer;