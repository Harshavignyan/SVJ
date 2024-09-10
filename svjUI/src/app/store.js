import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import padhamReducer from '../features/PadhamForm/padhamSlice';
import { padhamApi } from '../services/padhamApi.service'; // Correct import here

export const store = configureStore({
    reducer: {
        padham: padhamReducer,
        [padhamApi.reducerPath]: padhamApi.reducer, // Dynamically referencing the API reducer path
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(padhamApi.middleware),
});

setupListeners(store.dispatch);
