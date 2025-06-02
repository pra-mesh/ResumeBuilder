import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from "redux-persist";

import resumeReducer from "@/slices/resumeSlice";
import { userReducer } from "@/slices/userSlice";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"; //NOTES Mange the state tracking level to deep level. It prevents infinite loop
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  resumes: resumeReducer,
  users: userReducer,
  //... other reducers
});

const persistConfig = {
  key: "resume-persist",
  storage,
  version: 1,
  whitelist: ["resumes", "users"],
  stateReconciler: autoMergeLevel2,
};
//NOTES we need to avoid collision in store as both api data and local storage data are present
//provides data from store/state
export const store = configureStore({
  reducer: persistReducer<any>(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REGISTER, PAUSE, PURGE, REHYDRATE, PERSIST],
      },
    }),
  devTools: import.meta.env.VITE_DEV ? { trace: true, traceLimit: 25 } : false,
});
//provides data from local storage
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
