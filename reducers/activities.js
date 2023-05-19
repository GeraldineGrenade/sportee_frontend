import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {},
};

export const activitiesSlice = createSlice({
 name: 'activities',

  initialState,
 reducers: {
   allActivities: (state, action) => {
     state.value = action.payload;
   },
 },
});

export const { allActivities } = activitiesSlice.actions;
export default activitiesSlice.reducer;