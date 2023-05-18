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
      console.log("safsa: ", state.score);
      state.scores = [...state.scores, action.payload];
    },
  },
});

export const { addScore } = scoreSlice.actions;

export default withReduxStateSync(scoreSlice.reducer);
