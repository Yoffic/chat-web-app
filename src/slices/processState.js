import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'processing',
  initialState: false,
  reducers: {
    setProcessing: () => true,
    resetProcessing: () => false,
  },
});

export const { actions } = slice;
export default slice.reducer;
