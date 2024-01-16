import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/user';
import { roomReducer } from './slices/room';


export const store = configureStore({
    reducer: {
        user: userReducer,
        room: roomReducer
    }
});
