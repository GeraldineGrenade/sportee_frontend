import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {},
};

export const userSlice = createSlice({
 name: 'user',

  initialState,
 reducers: {
   signIn: (state, action) => {
     state.value = action.payload;
   },
   SignOut: (state) => {
    state.value = {}
  },
 },
});

export const { signIn, SignOut } = userSlice.actions;
export default userSlice.reducer;