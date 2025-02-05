import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';
import demographicsOfWorld2024 from '../data/demographicsOfWorld2024';

export const demographicsSlice = createSlice({
  name: 'demographics',
  initialState: demographicsOfWorld2024,
  reducers: {
    setData: (_state, action) => {
      return action.payload
    }
  }
})

export const { setData } = demographicsSlice.actions;

export const selectDemographics = (state: RootState) => state.demographics;

export default demographicsSlice.reducer;
