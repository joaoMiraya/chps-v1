import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import thunk from 'redux-thunk';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk,
            serializableCheck: false,

        }),

})