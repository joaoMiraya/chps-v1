import { combineReducers } from 'redux';
import imageReducer from './images/imageSlice';
import relativeImageReducer from './images/relativeImageSLice';
import authSlice from './users/authSlice';
import authRegister from './users//registerSlice';


const rootReducer = combineReducers({
    images: imageReducer,
    relativeImages: relativeImageReducer,
    auth: authSlice,
    register: authRegister,
})


export default rootReducer;

