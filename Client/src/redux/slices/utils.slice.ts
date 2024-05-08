import { createSlice } from '@reduxjs/toolkit';

const utilSLice = createSlice({
  name: 'utils',
  initialState: {
    muiChakraTheme: {
      muiIndex: 0,
    },
  },
  reducers: {
    setMuiChakraTheme: (state, action) => {
      state.muiChakraTheme = action.payload;
    },
    setMuiIndex: (state, action) => {
      state.muiChakraTheme.muiIndex = action.payload;
    },
  },
});

export const { setMuiChakraTheme, setMuiIndex } = utilSLice.actions;
export default utilSLice.reducer;
