import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'processing',
  initialState: {
    errors: {},
    processState: '',
  },
  reducers: {
    setFetching: (state) => ({ ...state, processState: 'fetching' }),
    setFailed: (_state, { payload }) => ({ errors: { ...payload }, processState: 'failed' }),
    setSuccess: () => ({ errors: {}, processState: 'success' }),
  },
});

export const { actions } = slice;
export default slice.reducer;
