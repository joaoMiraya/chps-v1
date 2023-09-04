import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { toast } from 'react-toastify';

import { auth, db } from "../../firebase/firebase";


export const userRegister = createAsyncThunk(
    'register/user',
    async ({ Email, Password, Name, Tel, Date }, { rejectWithValue }) => {
        try {
            await createUserWithEmailAndPassword(auth, Email, Password)
            const { accessToken, uid } = auth.currentUser;
            //SALVA AS INFORMAÇÕES NO DB DO FIRESTORE
            const docRef = await addDoc(collection(db, "usuarios"), {
                uid: uid,
                name: Name,
                email: Email,
                tel: Tel,
                role: 'cliente',
                date_register: Date
            });
            //MANDA EMAIL DE VERIFICAÇÃO NO EMAIL DO USUARIO
            await sendEmailVerification(auth.currentUser)
                .then(() => {
                    toast.success("Registro efetuado, verifique seu email!");
                });
            return { accessToken: accessToken, tel: Tel, name: Name };

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

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(userRegister.fulfilled, (state) => {
                state.success = true
                state.error = ''

            })
            .addCase(userRegister.rejected, (state, action) => {
                const message = "Email já está cadastrado"
                state.error = message;
                toast.error(message)
                console.log(action.payload);
            })
            .addDefaultCase((state) => {
                return state;
            });
    }
});


export default registerSlice.reducer;
