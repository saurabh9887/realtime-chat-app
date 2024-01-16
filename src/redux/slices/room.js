import { createSlice, createSelector } from '@reduxjs/toolkit';


export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        roomCode: '',
    },
    reducers: {
        joinRoom: (state, action) => {
            state.roomCode = action.roomCode;
        }
    }
});

export const getRoomDataSelector = createSelector(
    (state) => state.room, /* return the room state from the store */
    (state) => state /* return the state as it is */
);

export const { joinRoom } = roomSlice.actions;
export default joinRoom.reducer;
