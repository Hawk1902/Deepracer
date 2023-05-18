import {
  applyMiddleware,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  createStateSyncMiddleware,
  initStateWithPrevTab,
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
    // return applyMiddleware(createStateSyncMiddleware(reduxStateSyncConfig));
  },
});

initMessageListener(store);
// initStateWithPrevTab(store);
