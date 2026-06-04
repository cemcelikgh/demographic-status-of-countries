import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';
import demographicDataFor2026 from '../../data/demographicDataFor2026';

export const demographicsSlice = createSlice({
  name: 'demographics',
  initialState: demographicDataFor2026["900"],
  reducers: {
    setData: (_state, action) => action.payload,
  },
});

export const { setData } = demographicsSlice.actions;
export const selectDemographics = (state: RootState) => state.demographics;
export default demographicsSlice.reducer;
