import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { setIsLogged } from '../redux/users/authSlice';
import { store } from '../redux/store';




const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    'display': 'popup'
});

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

//FUNÇÃO RESPONSAVEL POR VERIFICAR A AUTENTICAÇÃO DO USUARIO
const verifyAuth = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const { email, displayName, accessToken } = auth.currentUser;
            const userCred = { token: accessToken, email: email, name: displayName }
            localStorage.setItem("User", JSON.stringify(userCred));
            store.dispatch(setIsLogged()); // Despacha a ação para atualizar o estado
        } else {
            localStorage.removeItem("User");
        }
    });
};
verifyAuth();


export { app, storage, db, auth, firebaseConfig, googleProvider };