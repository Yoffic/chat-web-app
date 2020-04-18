import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'errors',
  initialState: {},
  reducers: {
    addError: (state, { payload }) => ({ ...state, ...payload }),
    resetErrors: () => ({}),
  },
});

export const { actions } = slice;
export default slice.reducer;
