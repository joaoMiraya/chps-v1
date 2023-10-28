import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, query, getDocs, doc, updateDoc, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from 'react-toastify';



export const createPromo = createAsyncThunk(
    'create/promo',
    async ({ imagem, caminhoImagem, nome, categoria, classe, ingredientes, valor }, { rejectWithValue }) => {
        try {
            //SALVA O LANCHE NO FIRESTORE DB
            const docRef = await addDoc(collection(db, "lanches"), {
                imagem: imagem,
                caminhoImagem: caminhoImagem,
                nome: nome,
                categoria: categoria,
                classe: classe,
                ingredientes: ingredientes,
                valor: valor
            });
            toast.success(`Lanche adicionado no caminho ${docRef.path} com sucesso!`)
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


export const fetchPromo = createAsyncThunk(
    'fetch/promo',
    async (_, { rejectWithValue }) => {
        try {
            const q = query(collection(db, "promo"));
            const querySnapshot = await getDocs(q);
            const promoData = [];
            querySnapshot.forEach((doc) => {
                promoData.push({ id: doc.id, ...doc.data() });
            });
            return promoData;
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
    promo: []
};

const promoSlice = createSlice({
    name: 'promo',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(createPromo.fulfilled, (state) => {
                state.success = true
                state.error = ''
            })
            .addCase(createPromo.rejected, (state, action) => {
                const message = "Algo deu errado"
                state.error = message;
                console.log(action.payload);
            })
            .addCase(fetchPromo.fulfilled, (state, action) => {
                state.promo = action.payload;
                state.loading = false;
                state.error = '';
            })
            .addCase(fetchPromo.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPromo.rejected, (state) => {
                state.loading = false;
                state.error = 'Falha ao carregar pomoções.';
            })
            .addDefaultCase((state) => {
                return state;
            });
    }
});


export default promoSlice.reducer;


