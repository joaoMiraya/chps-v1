import { combineReducers } from 'redux';
import appSlice from './app-state/appSlice';
import imageReducer from './images/imageSlice';
import authSlice from './users/authSlice';
import authRegister from './users//registerSlice';


const rootReducer = combineReducers({
    appState: appSlice,
    images: imageReducer,
    auth: authSlice,
    register: authRegister,
})


export default rootReducer;

