import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, query, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from 'react-toastify';



export const createPizza = createAsyncThunk(
    'create/pizzas',
    async ({ imagem, caminhoImagem, nome, ingredientes, valorP, valorF }, { rejectWithValue }) => {
        try {
            //SALVA A PIZZA NO FIRESTORE DB
            const docRef = await addDoc(collection(db, "pizzas"), {
                imagem: imagem,
                caminhoImagem: caminhoImagem,
                nome: nome,
                ingredientes: ingredientes,
                valorP: valorP,
                valorF: valorF
            });
            toast.success(`Pizza adicionada no caminho ${docRef.path} com sucesso!`)
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);

export const editPizza = createAsyncThunk(
    'edit/pizzas',
    async ({ id, imagem, caminhoImagem, nome, ingredientes, valorP, valorF }, { rejectWithValue }) => {
        try {
            const pizzaRef = doc(db, "pizzas", id);
            await updateDoc(pizzaRef, {
                imagem: imagem,
                caminhoImagem: caminhoImagem,
                nome: nome,
                ingredientes: ingredientes,
                valorP: valorP,
                valorF: valorF
            });
            toast.success(`Pizza alterada com sucesso!`);
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const fetchPizzas = createAsyncThunk(
    'fetch/pizzas',
    async (_, { rejectWithValue }) => {
        try {
            const q = query(collection(db, "pizzas"));
            const querySnapshot = await getDocs(q);
            const pizzasData = [];
            querySnapshot.forEach((doc) => {
                pizzasData.push({ id: doc.id, ...doc.data() });
            });
            return pizzasData;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);

const initialState = {
    loading: false,
    error: '',
    success: false,
    pizzas: []
};

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(createPizza.fulfilled, (state) => {
                state.success = true
                state.error = ''
            })
            .addCase(createPizza.rejected, (state, action) => {
                const message = "Algo deu errado"
                state.error = message;
                console.log(action.payload);
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.pizzas = action.payload;
                state.loading = false;
                state.error = '';
            })
            .addCase(fetchPizzas.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.loading = false;
                state.error = 'Falha ao carregar pizzas.';
            })
            .addDefaultCase((state) => {
                return state;
            });
    }
});


export default pizzasSlice.reducer;


