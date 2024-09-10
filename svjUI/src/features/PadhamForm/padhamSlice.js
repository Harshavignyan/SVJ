import { createSlice } from '@reduxjs/toolkit';

const padhamSlice = createSlice({
  name: 'padham',
  initialState: {
    dimensions: {},
    result: null,
  },
  reducers: {
    setDimensions: (state, action) => {
      state.dimensions = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
  },
});

export const { setDimensions, setResult } = padhamSlice.actions;
export default padhamSlice.reducer;
