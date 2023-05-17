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
     state.value.sports.splice(sportIndex, 1, sport);
   },
   removeSport: (state, action) => {
    state.value.sports = state.value.sports.filter(e => e.name !== action.payload)
  },
   removeAllSports: (state) => {
    state.value.sports = []
  },
  addHabit: (state, action) => {
     state.value.habits.push(action.payload);
   },
   removeHabit: (state, action) => {
    state.value.habits = state.value.habits.filter(e => e !== action.payload)
  },
  removeAllHabits: (state) => {
    state.value.habits = []
  },
   selectLevel: (state, action) => {
    state.value.level = action.payload;
  },
 },
});

export const { addSport, removeSport, removeAllSports,addHabit, removeHabit, removeAllHabits, selectLevel } = preferencesSlice.actions;
export default preferencesSlice.reducer;