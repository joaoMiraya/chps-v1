import { combineReducers } from 'redux';
import imageReducer from './images/imageSlice';
import relativeImageReducer from './images/relativeImageSLice';
import authSlice from './users/authSlice';
import authRegister from './users//registerSlice';
import lanchesSlice from './items/lanchesSlice';
import pizzasSlice from './items/pizzasSlice';
import cartSlice from './cart/cartSlice';
import acrescimosSlice from './items/acrescimosSlice';

const rootReducer = combineReducers({
    images: imageReducer,
    relativeImages: relativeImageReducer,
    auth: authSlice,
    register: authRegister,
    cart: cartSlice,
    lanches: lanchesSlice,
    acrescimos: acrescimosSlice,
    pizzas: pizzasSlice,
})


export default rootReducer;

