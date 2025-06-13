import { combineReducers, configureStore, Action } from "@reduxjs/toolkit";
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
import {
  initialState as resumeInitialState,
  ResumeState,
} from "@/types/resume";
import { resumeReducer } from "@/slices/resumes/resumeSlice";
import {
  initialState as userInitialState,
  userReducer,
} from "@/slices/userSlice";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"; //NOTES Mange the state tracking level to deep level. It prevents infinite loop
import storage from "redux-persist/lib/storage";
import createTransform from "redux-persist/es/createTransform";

const initialState: RootState = {
  resumes: resumeInitialState,
  users: userInitialState,
};

// Action type for resetting the state
const RESET_STATE = "RESET_STATE";

const appReducer = combineReducers({
  resumes: resumeReducer,
  users: userReducer,
  //... other reducers
});
const rootReducer = (state: any, action: Action) => {
  if (action.type === RESET_STATE) {
    return initialState; // Reset state to initial values
  }
  return appReducer(state, action);
};

const resumesTransform = createTransform(
  (inboundState: ResumeState) => ({
    resumesDrafts: inboundState.resumesDrafts, // Persist only resumesDrafts
  }),
  (outboundState: Partial<ResumeState>, originalState: ResumeState | any) => ({
    ...originalState, // Keep other properties
    resumesDrafts: outboundState.resumesDrafts, // Restore resumesDrafts
  }),
  { whitelist: ["resumes"] } // Apply only to resumes slice
);

const persistConfig = {
  key: "resume-persist",
  storage,
  version: 1,
  whitelist: ["resumes"], //["resumes", "users"],
  blacklist: ["loading", "error", "searchValue", "filteredResume"],
  transforms: [resumesTransform],
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
export const resetState = () => ({ type: RESET_STATE });

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
