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
import appSlice from './app/appSlice';
import usersSlice from './users/usersSlice';
import pedidosSlice from './pedidos/pedidosSlice';
import mesaSlice from './mesa/mesaSlice';

const rootReducer = combineReducers({
    images: imageReducer,
    relativeImages: relativeImageReducer,
    app: appSlice,
    auth: authSlice,
    register: authRegister,
    users: usersSlice,
    cart: cartSlice,
    mesa: mesaSlice,
    pedidos: pedidosSlice,
    acrescimos: acrescimosSlice,
    bebidas: bebidasSlice,
    lanches: lanchesSlice,
    pizzas: pizzasSlice,
    pratos: pratosSlice,
    porcoes: porcoesSlice,
})


export default rootReducer;

