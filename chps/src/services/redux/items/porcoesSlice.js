import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, query, getDocs, doc, updateDoc, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from 'react-toastify';



export const createPorcoes = createAsyncThunk(
    'create/porcoes',
    async ({ imagem, caminhoImagem, nome, classe, ingredientes, valorM, valorI }, { rejectWithValue }) => {
        try {
            //SALVA O LANCHE NO FIRESTORE DB
            const docRef = await addDoc(collection(db, "porcoes"), {
                imagem: imagem,
                caminhoImagem: caminhoImagem,
                nome: nome,
                classe: classe,
                ingredientes: ingredientes,
                valorM: valorM,
                valorI: valorI
            });
            toast.success(`Porção adicionado no caminho ${docRef.path} com sucesso!`)
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

export const editPorcoes = createAsyncThunk(
    'edit/porcao',
    async ({ id, imagem, caminhoImagem, nome, classe, ingredientes, valorM, valorI }, { rejectWithValue }) => {
        try {
            const lancheRef = doc(db, "porcoes", id);
            await updateDoc(lancheRef, {
                imagem: imagem,
                caminhoImagem: caminhoImagem,
                nome: nome,
                classe: classe,
                ingredientes: ingredientes,
                valorM: valorM,
                valorI: valorI
            });
            toast.success(`Porção alterada com sucesso!`);
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

export const fetchPorcoes = createAsyncThunk(
    'fetch/porcao',
    async (_, { rejectWithValue }) => {
        try {
            const q = query(collection(db, "porcoes"), orderBy("valorI", "asc"));
            const querySnapshot = await getDocs(q);
            const porcoesData = [];
            querySnapshot.forEach((doc) => {
                porcoesData.push({ id: doc.id, ...doc.data() });
            });
            return porcoesData;
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
    porcoes: []
};

const porcoesSlice = createSlice({
    name: 'porcoes',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(createPorcoes.fulfilled, (state) => {
                state.success = true
                state.error = ''
            })
            .addCase(createPorcoes.rejected, (state, action) => {
                const message = "Algo deu errado"
                state.error = message;
                console.log(action.payload);
            })
            .addCase(fetchPorcoes.fulfilled, (state, action) => {
                state.porcoes = action.payload;
                state.loading = false;
                state.error = '';
            })
            .addCase(fetchPorcoes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPorcoes.rejected, (state) => {
                state.loading = false;
                state.error = 'Falha ao carregar pratos.';
            })
            .addDefaultCase((state) => {
                return state;
            });
    }
});


export default porcoesSlice.reducer;


