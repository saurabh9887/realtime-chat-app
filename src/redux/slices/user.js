import { createSlice, createSelector } from '@reduxjs/toolkit';


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: '',
        name: '',
    },
    reducers: {
        addUser: (state, action) => {
            state.id = Date.now().toString();
            state.name = action.name;
        }
    }
});

export const getUserDataSelector = createSelector(
    (state) => state.user, /* return the user state from the store */
    (state) => state /* return the state as it is */
);

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
