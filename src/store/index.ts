import { configureStore } from '@reduxjs/toolkit';
import commonReducer from './slice/commonSlice'; // Import your slice here

export const store = configureStore({
    reducer: {
        common: commonReducer, // Add reducers here
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
