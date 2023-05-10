import { configureStore } from "@reduxjs/toolkit";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

import scoreReducer from "./scoreSlice";

const reduxStateSyncConfig = {};
const middlewares = [createStateSyncMiddleware(reduxStateSyncConfig)];

export const store = configureStore({
  reducer: {
    score: scoreReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middlewares);
  },
});

initMessageListener(store);
