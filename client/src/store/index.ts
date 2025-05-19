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
import { userReducer } from "@/slices/userSlice";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"; //NOTES Mange the state tracking level to deep level. It prevents infinite loop

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "resume-persist",
  storage,
  version: 1,
  //[ ] Typing error
  stateReconciler: autoMergeLevel2,
};
const persistResume = persistReducer<ReturnType<typeof resumeReducer>>(
  persistConfig,
  resumeReducer
);

export const store = configureStore({
  reducer: { resume: persistResume, users: userReducer },
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
