import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth, db } from "../../firebase/firebase";
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { deleteUser, getAuth } from 'firebase/auth';

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

export const getMotoboys = createAsyncThunk(
    'users/motoboys',
    async (_, { rejectWithValue }) => {
        let motoboys = [];
        try {
            const usersRef = collection(db, "usuarios");
            const q = query(usersRef, where("role", "==", "motoboy"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                motoboys.push(doc.data());

            });
            return motoboys
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);

//PEGAR O USUARIO ATUAL NO FIRESTORE
export const getUser = async () => {
    const { uid } = auth.currentUser;
    
    let user = [];
    const usersRef = collection(db, "usuarios");
    const q = query(usersRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        user = doc.data();
    });
    return user
};

export const setUserRole = createAsyncThunk(
    'users/role',
    async ({ role, id }, { rejectWithValue }) => {
        try {
            const userRef = doc(db, 'usuarios', id);
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
//REPONSAVEL POR DEFINIR O USUARIO COMO ADMIN NO FIRESTORE
export const setUserAdmin = createAsyncThunk(
    'users/adm',
    async (id, { rejectWithValue }) => {
        try {
            const userRef = doc(db, 'usuarios', id);
            await setDoc(userRef, {
                admin: true,
            }, { merge: true });
            toast.dark(`Usuario definido como administrador`)
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
        const auth = getAuth();
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
    motoboys: [],
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
            .addCase(getMotoboys.fulfilled, (state, action) => {
                state.motoboys = action.payload
            })
            .addCase(getMotoboys.rejected, (state, action) => {
                state.error = action.payload
                console.log(action.payload);
            })
            .addCase(addEndress.fulfilled, (state) => {
                state.success = true
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
