import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, query, getDocs, doc, updateDoc, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from 'react-toastify';



export const createPratos = createAsyncThunk(
    'create/pratos',
    async ({ imagem, caminhoImagem, nome, classe, ingredientes, valor }, { rejectWithValue }) => {
        try {
            //SALVA O LANCHE NO FIRESTORE DB
            const docRef = await addDoc(collection(db, "pratos"), {
                imagem: imagem,
                caminhoImagem: caminhoImagem,
                nome: nome,
                classe: classe,
                ingredientes: ingredientes,
                valor: valor
            });
            toast.success(`Prato adicionado no caminho ${docRef.path} com sucesso!`)
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

export const editPratos = createAsyncThunk(
    'edit/pratos',
    async ({ id, imagem, caminhoImagem, nome, classe, ingredientes, valor }, { rejectWithValue }) => {
        try {
            const lancheRef = doc(db, "pratos", id);
            await updateDoc(lancheRef, {
                imagem: imagem,
                caminhoImagem: caminhoImagem,
                nome: nome,
                classe: classe,
                ingredientes: ingredientes,
                valor: valor
            });
            toast.success(`Prato alterado com sucesso!`);
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

export const fetchPratos = createAsyncThunk(
    'fetch/pratos',
    async (_, { rejectWithValue }) => {
        try {
            const q = query(collection(db, "pratos"), orderBy("valor", "asc"));
            const querySnapshot = await getDocs(q);
            const pratosData = [];
            querySnapshot.forEach((doc) => {
                pratosData.push({ id: doc.id, ...doc.data() });
            });
            return pratosData;
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
    pratos: []
};

const pratosSlice = createSlice({
    name: 'porcoes',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(createPratos.fulfilled, (state) => {
                state.success = true
                state.error = ''
            })
            .addCase(createPratos.rejected, (state, action) => {
                const message = "Algo deu errado"
                state.error = message;
                console.log(action.payload);
            })
            .addCase(fetchPratos.fulfilled, (state, action) => {
                state.pratos = action.payload;
                state.loading = false;
                state.error = '';
            })
            .addCase(fetchPratos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPratos.rejected, (state) => {
                state.loading = false;
                state.error = 'Falha ao carregar pratos.';
            })
            .addDefaultCase((state) => {
                return state;
            });
    }
});


export default pratosSlice.reducer;


