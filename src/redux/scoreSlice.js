import { createSlice } from "@reduxjs/toolkit";

import { withReduxStateSync } from "redux-state-sync";

const initialState = {
  scores: [],
};

export const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    addScore: (state, action) => {
      state.scores = [...state.scores, action.payload];
      state.scores.sort((a, b) => Number(a.time) - Number(b.time));
    },
  },
});

export const { addScore } = scoreSlice.actions;

export default withReduxStateSync(scoreSlice.reducer);
