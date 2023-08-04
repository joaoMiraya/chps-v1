import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, addDoc } from "firebase/firestore";

import { toast } from 'react-toastify';

import { db } from "../../firebase/firebase";







export const createLanche = createAsyncThunk(
    'create/lanche',
    async ({ imagem, nome, categoria, ingredientes, valor }, { rejectWithValue }) => {
        try {
            //SALVA O LANCHE NO FIRESTORE DB
            const docRef = await addDoc(collection(db, "lanches"), {
                imagem: imagem,
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

const initialState = {
    loading: false,
    error: '',
    success: false,
};

const itemsSlice = createSlice({
    name: 'create',
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
            .addDefaultCase((state) => {
                return state;
            });
    }
});


export default itemsSlice.reducer;


