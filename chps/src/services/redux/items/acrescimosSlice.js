import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, query, getDocs, doc, updateDoc, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from 'react-toastify';



export const createAcrescimo = createAsyncThunk(
    'create/acrescimos',
    async ({ nome, valor }, { rejectWithValue }) => {
        try {
            //SALVA O LANCHE NO FIRESTORE DB
            const docRef = await addDoc(collection(db, "acrescimos"), {
                nome: nome,
                valor: valor
            });
            toast.success(`Acréscimo adicionado no caminho ${docRef.path} com sucesso!`)
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

export const editAcrescimo = createAsyncThunk(
    'edit/acrescimos',
    async ({ id, nome, valor }, { rejectWithValue }) => {
        try {
            const acrescimoRef = doc(db, "acrescimos", id);
            await updateDoc(acrescimoRef, {
                nome: nome,
                valor: valor
            });
            toast.success(`Acrescimo alterado com sucesso!`);
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

export const fetchAcrescimo = createAsyncThunk(
    'fetch/acrescimos',
    async (_, { rejectWithValue }) => {
        try {
            const q = query(collection(db, "acrescimos"), orderBy("valor", "asc"));
            const querySnapshot = await getDocs(q);
            const acrescimosData = [];
            querySnapshot.forEach((doc) => {
                acrescimosData.push({ id: doc.id, ...doc.data() });
            });
            return acrescimosData;
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
    acrescimos: []
};

const acrescimosSlice = createSlice({
    name: 'acrescimos',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(createAcrescimo.fulfilled, (state) => {
                state.success = true
                state.error = ''
            })
            .addCase(createAcrescimo.rejected, (state, action) => {
                const message = "Algo deu errado"
                state.error = message;
                console.log(action.payload);
            })
            .addCase(fetchAcrescimo.fulfilled, (state, action) => {
                state.acrescimos = action.payload;
                state.loading = false;
                state.error = '';
            })
            .addCase(fetchAcrescimo.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAcrescimo.rejected, (state) => {
                state.loading = false;
                state.error = 'Falha ao carregar lanches.';
            })
            .addDefaultCase((state) => {
                return state;
            });
    }
});


export default acrescimosSlice.reducer;


