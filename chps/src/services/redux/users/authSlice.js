import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth, googleProvider, db } from "../../firebase/firebase";
import { GoogleAuthProvider, deleteUser, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';


//FUNÇÃO PARA VERIFICAR SE O USUARIO É ADM
const getAdm = (email) => {
    const emailAdm = import.meta.env.VITE_ADM_EMAIL;
    if (email == emailAdm) {
        Cookies.set("isAdm", true)
        return true
    } else {
        return false
    }
};

//VERIFICA SE O USUARIO ESTA AUTENTICADO
const verifyAuth = () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            getAdm(user.email);
            const { accessToken, uid } = auth.currentUser;
            const usersRef = collection(db, "usuarios");
            const q = query(usersRef, where("uid", "==", uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const userInf = doc.data();
                const userCred = { token: accessToken, name: userInf.name, email: userInf.email, tel: userInf.tel }
                //VERIFICA E SETA A FUNÇÃO DO USUARIO
                switch (userInf.role) {
                    case 'garçom':
                        Cookies.set("User", JSON.stringify(userCred), { expires: 365 });
                        Cookies.set("isWaiter", true, { expires: 365 });
                        break;
                    case 'motoboy':
                        Cookies.set("User", JSON.stringify(userCred), { expires: 365 });
                        Cookies.set("isMotoboy", true, { expires: 365 });
                        break;
                    default:
                        Cookies.set("User", JSON.stringify(userCred), { expires: 365 })
                }
            });
        } else {
            Cookies.remove("User")
            Cookies.remove("isAdm")
            Cookies.remove("isWaiter")
            Cookies.remove("isMotoboy")
        }
    });
};
verifyAuth();


//AUTENTICAÇÃO COM O EMAIL E SENHA
export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ Email, Password }, { rejectWithValue }) => {
        try {
            await signInWithEmailAndPassword(auth, Email, Password)
            const { displayName, accessToken } = auth.currentUser;
            return { accessToken: accessToken, name: displayName }
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);
//AUTENTICAÇÃO ANONIMA
export const userAnonymous = createAsyncThunk(
    'auth/anonymous',
    async (_, { rejectWithValue }) => {
        try {
            Cookies.set("UserAnonymous", true, { expires: 0.5 });
            toast.warn("Não se esqueça de se registrar para participar de promoções e plano fidelidade");
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);

//AUTENTICAÇÃO COM O GOOGLE --- REVISAR
export const authGoogle = () => {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            const { displayName } = user;
            const userInfoCookie = { token: token, name: displayName }
            Cookies.set("User", JSON.stringify(userInfoCookie))
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            alert(error)
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(credential);
            // ...
        })
};

//FUNÇÃO PARA FAZER O LOGOUT DA APP
export const logout = () => {
    signOut(auth).then(() => {
        if (Cookies.get("isAdm")) {
            Cookies.remove("isAdm")
            Cookies.remove("User")
        } else {
            Cookies.remove("User")
        }
        window.location.reload();
    }).catch((error) => {
        alert("Ocorreu um erro" + error)
        console.log("Ocorreu um erro" + error);
    });
};

//FUNÇÃO PARA ENVIAR EMAIL PARA REDEFINIR A SENHA
export const redefinePassword = createAsyncThunk(
    "redefinePassword",
    async (email) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.info("Foi enviado o link para redefinir sua senha no seu email de cadastro!")
            })
            .catch((err) => {
                toast.error("Email inserido não foi encontrado em nossa base de dados, tente criar uma conta!")
                console.log(err);
            })
    });


const initialState = {
    loading: false,
    isAnonymous: Cookies.get("UserAnonymous") ? true : false,
    isLogged: Cookies.get("User") ? true : false,
    isAdm: Cookies.get("isAdm") ? true : false,
    isWaiter: Cookies.get("isWaiter") ? true : false,
    isMotoboy: Cookies.get("isMotoboy") ? true : false,
    error: null,
    success: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLogged: (state) => {
            state.isLogged = true;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                const { email } = action.payload;
                state.isLogged = true
                state.isAdm = getAdm(email)
                state.error = null
                state.success = true
            })
            .addCase(userLogin.rejected, (state) => {
                let message = "Email ou senha inválidos"
                state.error = message
            })
            .addCase(userAnonymous.fulfilled, (state, action) => {
                state.isAnonymous = true
                state.error = null
                state.success = true
            })
            .addCase(userAnonymous.rejected, (state, action) => {
                state.error = action.payload
                console.log(action.payload);
            })
            .addDefaultCase((state) => {
                return state;
            });
    }
});

export const { setIsLogged } = authSlice.actions;
export default authSlice.reducer;
