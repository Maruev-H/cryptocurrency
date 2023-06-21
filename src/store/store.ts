import { configureStore, combineReducers } from "@reduxjs/toolkit";
import filterSlice from "./filter";
import directionSlice from "./directions";

const rootReducer = combineReducers({
  filter: filterSlice,
  direction: directionSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
