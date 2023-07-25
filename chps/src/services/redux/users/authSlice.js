import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";


//AUTENTICAÇÃO COM O GOOGLE --- REVISAR
export const authGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            const { displayName, email } = user;
            const userToLocalStorage = { token: token, name: displayName, email: email }
            localStorage.setItem("User", JSON.stringify(userToLocalStorage))

            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            console.log(errorCode);
            const errorMessage = error.message;
            console.log(errorMessage);
            // The email of the user's account used.
            const email = error.customData.email;
            console.log(email);
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(credential);
            // ...
        })
}

//AUTENTICAÇÃO COM O EMAIL E SENHA
export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ Email, Password }, { rejectWithValue }) => {
        try {
            await signInWithEmailAndPassword(auth, Email, Password)
            const { email, displayName, accessToken } = auth.currentUser;
            return { accessToken: accessToken, email: email, name: displayName }
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);
//Fazer botão de logout no perfil para excluir o storage do adm
const getAdm = (email) => {
    const emailAdm = "joao@adm.com"
    if (email == emailAdm) {
        localStorage.setItem("isAdm", true)
        return true
    } else {
        return false
    }
};
export const logout = () => {
    signOut(auth).then(() => {
        if (localStorage.getItem("isAdm")) {
            localStorage.removeItem("isAdm")
            localStorage.removeItem("User")
        } else {
            localStorage.removeItem("User")
        }
        window.location.reload();
    }).catch((error) => {
        alert("Ocorreu um erro" + error)
        console.log("Ocorreu um erro" + error);
    });
};

const initialState = {
    loading: false,
    isLogged: localStorage.getItem("User") ? true : false,
    isAdm: localStorage.getItem("isAdm") ? true : false,
    error: null,
    success: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLogged: (state, action) => {
            state.isLogged = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                const { email } = action.payload;
                localStorage.setItem("User", JSON.stringify(action.payload))
                state.isLogged = true
                state.isAdm = getAdm(email)
                state.error = null
                state.success = true
                console.log(action.payload);
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
