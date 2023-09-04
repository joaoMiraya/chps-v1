import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth, db } from "../../firebase/firebase";
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const fetchUsers = createAsyncThunk(
    'users/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const q = query(collection(db, "usuarios"));
            const querySnapshot = await getDocs(q);
            const usersData = [];
            querySnapshot.forEach((doc) => {
                usersData.push({ id: doc.id, ...doc.data() });
            });
            return usersData;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);


export const setUserRole = createAsyncThunk(
    'users/waiter',
    async ({ role, id }, { rejectWithValue }) => {
        try {
            const userRef = await doc(db, 'usuarios', id);
            await setDoc(userRef, {
                role: role,
            }, { merge: true });
            toast.success(`Usuario definido como ${role}`)
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);


export const addEndress = createAsyncThunk(
    'users/endress',
    async ({ bairro, rua, numero_casa, referencia, id }, { rejectWithValue }) => {
        try {
            //SALVA AS INFORMAÇÕES NO DB DO FIRESTORE
            const userRef = await doc(db, 'usuarios', id);
            await setDoc(userRef, {
                bairro: bairro,
                rua: rua,
                numero_casa: numero_casa,
                referencia: referencia
            }, { merge: true });
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

//FUNÇÃO RESPONSÁVEL POR EXCLUIR A CONTA DO USUARIO LOGADO
export const deleteUserAccount = createAsyncThunk(
    'users/delete',
    async (_, { rejectWithValue }) => {
        const user = auth.currentUser;
        try {
            await deleteUser(user);
        } catch (error) {
            console.error(error);
            return rejectWithValue("Ocorreu um erro ao excluir a conta.");
        }
    }
);

const initialState = {
    loading: false,
    users: [],
    waiter: [],
    motoboy: [],
    error: null,
    success: false,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.payload
                console.log(action.payload);
            })
            .addCase(addEndress.fulfilled, (state, action) => {
                state.success = true
                console.log(action.payload);
            })
            .addCase(addEndress.rejected, (state, action) => {
                state.error = action.payload
                toast.error(action.payload)
                console.log(action.payload);
            })
            .addCase(deleteUserAccount.rejected, (state, action) => {
                state.error = action.payload
                toast.error("Refaça seu login para conseguir excluir sua conta");
                console.log(action.payload);
            })
            .addCase(deleteUserAccount.fulfilled, () => {
                toast.error("Conta apagada")
            })
            .addDefaultCase((state) => {
                return state;
            });
    }
});

export default usersSlice.reducer;
