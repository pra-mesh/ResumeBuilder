import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import resumeReducer from "@/slices/resumeSlice";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "resume-persist",
  storage,
  version: 1,
  //TODO: stateReconciler
};
const persistResume = persistReducer(persistConfig, resumeReducer);
//Important: use error handling on thunk
export const store = configureStore({
  reducer: { resume: persistResume },
  //[x]: Could you please explain about middleware sir
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REGISTER, PAUSE, PURGE, REHYDRATE, PERSIST],
      },
    }),
  devTools: import.meta.env.VITE_DEV ? { trace: true, traceLimit: 25 } : false,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
