import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: [],
};

export const activitiesSlice = createSlice({
 name: 'activities',

  initialState,
 reducers: {
   addAllActivities: (state, action) => {
     state.value = action.payload;
   },
 },
});

export const { addAllActivities } = activitiesSlice.actions;
export default activitiesSlice.reducer;