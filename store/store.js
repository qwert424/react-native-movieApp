import { configureStore } from '@reduxjs/toolkit'
import movieSlice from './movieSlice';
import addressSlice from './addressSlice';
import historySlice from './historySlice';
import loadingSlice from './loadingSlice';

export const store = configureStore({
    reducer: {
        address: addressSlice,
        movie: movieSlice,
        history: historySlice,
        loading: loadingSlice,
    },
})