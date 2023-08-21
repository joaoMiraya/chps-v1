import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

//FUNÇÃO PARA VERIFICAR SE O USUARIO É ADM
const getAdm = (email) => {
    const emailAdm = "joao@adm.com"
    if (email == emailAdm) {
        Cookies.set("isAdm", true)
        return true
    } else {
        return false
    }
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

//AUTENTICAÇÃO COM O EMAIL E SENHA
export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ Email, Password }, { rejectWithValue }) => {
        try {
            await signInWithEmailAndPassword(auth, Email, Password)
            const {  displayName, accessToken } = auth.currentUser;
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
//VERIFICA SE O USUARIO ESTA AUTENTICADO
const verifyAuth = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const { displayName, accessToken } = auth.currentUser;
            const userCred = { token: accessToken, name: displayName }
            Cookies.set("User", JSON.stringify(userCred))
        } else {
            Cookies.remove("User")
        }
    });
};
verifyAuth();

const initialState = {
    loading: false,
    isLogged: Cookies.get("User") ? true : false,
    isAdm: Cookies.get("isAdm") ? true : false,
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
            .addDefaultCase((state) => {
                return state;
            });
    }
});

export const { setIsLogged } = authSlice.actions;
export default authSlice.reducer;
