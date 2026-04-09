import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';
import demographicDataFor2024 from '../data/demographicDataFor2024';

export const demographicsSlice = createSlice({
  name: 'demographics',
  initialState: demographicDataFor2024["900"],
  reducers: {
    setData: (_state, action) => {
      return action.payload
    },
  },
});

export const { setData } = demographicsSlice.actions;
export const selectDemographics = (state: RootState) => state.demographics;
export default demographicsSlice.reducer;
