import { createSlice, createSelector } from '@reduxjs/toolkit';


export const roomSlice = createSlice({
	name: 'room',
	initialState: {
		roomCode: '',
	},
	reducers: {
		joinRoom: (state, action) => {
			state.roomCode = action.payload; /* used action.payload to access the passed data */
		},
	},
});

export const { joinRoom } = roomSlice.actions;

export default roomSlice.reducer;

export const getRoomDataSelector = createSelector((state) => state.room, (room) => room.roomCode);
