import { combineReducers } from 'redux';
import imageReducer from './images/imageSlice';
import relativeImageReducer from './images/relativeImageSLice';
import authSlice from './users/authSlice';
import authRegister from './users//registerSlice';
import lanchesSlice from './items/lanchesSlice';
import pizzasSlice from './items/pizzasSlice';
import cartSlice from './cart/cartSlice';
import acrescimosSlice from './items/acrescimosSlice';
import bebidasSlice from './items/bebidasSlice';
import pratosSlice from './items/pratosSlice';
import porcoesSlice from './items/porcoesSlice';

const rootReducer = combineReducers({
    images: imageReducer,
    relativeImages: relativeImageReducer,
    auth: authSlice,
    register: authRegister,
    cart: cartSlice,
    acrescimos: acrescimosSlice,
    bebidas: bebidasSlice,
    lanches: lanchesSlice,
    pizzas: pizzasSlice,
    pratos: pratosSlice,
    porcoes: porcoesSlice,
})


export default rootReducer;

