import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import { userLogin } from './users/authSlice';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: userLogin,
            },
            serializableCheck: false,
        }),

})