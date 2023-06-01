import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scores: [],
  modelName: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setScores: (state, action) => {
      state.scores = action.payload;
    },
    updateModelName: (state, action) => {
      state.modelName = action.payload;
    }
  },
});

export default appSlice.reducer;
