import { createSlice, createSelector } from '@reduxjs/toolkit';


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: { id: '', name: '' },
    },
    reducers: {
        addUser: (state, action) => {
            state.data = action.payload; /* used action.payload to access the passed data */
        },
    },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;

export const getUserDataSelector = createSelector((state) => state.user, (user) => user.data);
