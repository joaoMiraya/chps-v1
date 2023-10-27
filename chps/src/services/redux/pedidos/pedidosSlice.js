import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth, db } from '../../firebase/firebase';
import { set, ref, get, getDatabase, push, update, remove } from 'firebase/database';
import { addDoc, collection, where, query, getDocs, orderBy, limit } from 'firebase/firestore';



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
//RECUPERA OS PEDIDOS FEITO PELO USUARIO
export const fetchPedidosFeitos = createAsyncThunk(
    'pedidos/PedidosFeitos',
    async (_, { rejectWithValue }) => {
        try {
            const user = auth.currentUser;
            const pedidosRef = collection(db, "pedidos");
            const q = query(pedidosRef, where("pedido.uid", "==", user?.uid), orderBy("pedido.data", "desc"), limit(3));
            const querySnapshot = await getDocs(q);
            let data = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                data = doc.data;
            });
            return data;
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
            //REMOVE O PEDIDO DOS PEDIDOS IMPRESSOS
            sessionStorage.removeItem("PedidosImpressos", Order.numero_pedido)
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
export const getEntregasOnCourse = (pedidos) => {
    const entregasFiltred = pedidos.filter(entrega => entrega.status === 75);
    if (entregasFiltred) {
        return entregasFiltred
    } else return false
};

//PEGA TODAS AS ENTREGAS COM O STATUS DE AGUARDANDO
export const getEntregasAwaiting = (pedidos) => {
    const entregasFiltred = pedidos.filter(pedido => pedido.status === 50);
    if (entregasFiltred) {
        return entregasFiltred
    } else return false
};

//PEGA TODAS OS PEDIDOS QUE VAI RETIRAR
export const getRetiradas = (pedidos) => {
    const pedidosFiltred = pedidos.filter(pedido => pedido.retirar === true);
    if (pedidosFiltred) {
        return pedidosFiltred
    } else return false
};

//PEGA TODAS OS PEDIDOS DAS MESAS
export const getPedidosMesa = (pedidos) => {
    const pedidosFiltred = pedidos.filter(pedido => pedido.mesa === true);
    if (pedidosFiltred) {
        return pedidosFiltred
    } else return false
};

const initialState = {
    pedidos: [],
    pedidos_impressos: sessionStorage.getItem("PedidoImpresso") ? sessionStorage.getItem("PedidoImpresso") : [],
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
        setPedidosImpressos(state, action) {
            state.pedidos_impressos = action.payload;
            sessionStorage.setItem("PedidosImpressos", action.payload)
            console.log(action.payload);
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

export const { setPedidos, setPedidosMesa, setPedidosImpressos } = pedidosSlice.actions;

export default pedidosSlice.reducer;