import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {sports : [null, null, null, null], habits: [], level : ''},
};

export const preferencesSlice = createSlice({
 name: 'preferences',

  initialState,
 reducers: {
   addSport: (state, action) => {
    const {sportIndex, sport} = action.payload
    console.log('action payload -----', action.payload)
     state.value.sports.splice(sportIndex, 1, sport);
   },
   removeSport: (state, action) => {
    state.value.sports = state.value.sports.filter(e => e.name !== action.payload)
  },
   removeAllSports: (state) => {
    state.value.sports = []
  },
 },
});

export const { addSport, removeSport, removeAllSports } = preferencesSlice.actions;
export default preferencesSlice.reducer;