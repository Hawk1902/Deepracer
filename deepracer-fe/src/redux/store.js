import {
  configureStore,
} from "@reduxjs/toolkit";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

import appReducer from "./appSlice";

const reduxStateSyncConfig = {};
const middlewares = [createStateSyncMiddleware(reduxStateSyncConfig)];

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middlewares);
  },
});

initMessageListener(store);
