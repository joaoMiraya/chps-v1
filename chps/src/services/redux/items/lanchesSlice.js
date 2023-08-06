import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, query, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from 'react-toastify';



export const createLanche = createAsyncThunk(
    'create/lanches',
    async ({ imagem, caminhoImagem, nome, categoria, ingredientes, valor }, { rejectWithValue }) => {
        try {
            //SALVA O LANCHE NO FIRESTORE DB
            const docRef = await addDoc(collection(db, "lanches"), {
                imagem: imagem,
                caminhoImagem: caminhoImagem,
                nome: nome,
                categoria: categoria,
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

export const editLanche = createAsyncThunk(
    'edit/lanches',
    async ({ id, imagem, caminhoImagem, nome, categoria, ingredientes, valor }, { rejectWithValue }) => {
        try {
            const lancheRef = doc(db, "lanches", id);
            await updateDoc(lancheRef, {
                imagem: imagem,
                caminhoImagem: caminhoImagem,
                nome: nome,
                categoria: categoria,
                ingredientes: ingredientes,
                valor: valor
            });
            toast.success(`Lanche alterado com sucesso!`);
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

export const fetchLanches = createAsyncThunk(
    'fetch/lanches',
    async (_, { rejectWithValue }) => {
        try {
            const q = query(collection(db, "lanches"));
            const querySnapshot = await getDocs(q);
            const lanchesData = [];
            querySnapshot.forEach((doc) => {
                lanchesData.push({ id: doc.id, ...doc.data() });
            });
            return lanchesData;
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
    lanches: []
};

const lanchesSlice = createSlice({
    name: 'lanches',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(createLanche.fulfilled, (state) => {
                state.success = true
                state.error = ''
            })
            .addCase(createLanche.rejected, (state, action) => {
                const message = "Algo deu errado"
                state.error = message;
                console.log(action.payload);
            })
            .addCase(fetchLanches.fulfilled, (state, action) => {
                state.lanches = action.payload;
                state.loading = false;
                state.error = '';
            })
            .addCase(fetchLanches.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLanches.rejected, (state) => {
                state.loading = false;
                state.error = 'Falha ao carregar lanches.';
            })
            .addDefaultCase((state) => {
                return state;
            });
    }
});


export default lanchesSlice.reducer;


