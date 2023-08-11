import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, query, getDocs, doc, updateDoc, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from 'react-toastify';



export const createBebida = createAsyncThunk(
    'create/bebidas',
    async ({ imagem, caminhoImagem, nome, classe, categoria, valor }, { rejectWithValue }) => {
        try {
            //SALVA A BEBIDA NO FIRESTORE DB
            const docRef = await addDoc(collection(db, "bebidas"), {
                imagem: imagem,
                caminhoImagem: caminhoImagem,
                nome: nome,
                classe: classe,
                categoria: categoria,
                valor: valor
            });
            toast.success(`Bebida adicionada no caminho ${docRef.path} com sucesso!`)
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

export const editBebida = createAsyncThunk(
    'edit/bebidas',
    async ({ id, imagem, caminhoImagem, nome, classe, categoria, valor }, { rejectWithValue }) => {
        try {
            const bebidaRef = doc(db, "bebidas", id);
            await updateDoc(bebidaRef, {
                imagem: imagem,
                caminhoImagem: caminhoImagem,
                nome: nome,
                classe: classe,
                categoria: categoria,
                valor: valor
            });
            toast.success(`Bebida alterada com sucesso!`);
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

export const fetchBebidas = createAsyncThunk(
    'fetch/bebidas',
    async (_, { rejectWithValue }) => {
        try {
            const q = query(collection(db, "bebidas"), orderBy("valor", "asc"));
            const querySnapshot = await getDocs(q);
            const bebidasData = [];
            querySnapshot.forEach((doc) => {
                bebidasData.push({ id: doc.id, ...doc.data() });
            });
            return bebidasData;
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
    bebidas: []
};

const bebidasSlice = createSlice({
    name: 'bebidas',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(createBebida.fulfilled, (state) => {
                state.success = true
                state.error = ''
            })
            .addCase(createBebida.rejected, (state, action) => {
                const message = "Algo deu errado"
                state.error = message;
                console.log(action.payload);
            })
            .addCase(fetchBebidas.fulfilled, (state, action) => {
                state.bebidas = action.payload;
                state.loading = false;
                state.error = '';
            })
            .addCase(fetchBebidas.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBebidas.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addDefaultCase((state) => {
                return state;
            });
    }
});


export default bebidasSlice.reducer;


