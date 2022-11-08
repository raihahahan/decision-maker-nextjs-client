import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/theme-slice";
import weightedInputReducer from "../features/weightedDecision/weightedDecision-slice";

export const rootReducer = combineReducers({
  theme: themeReducer,
  weightedInput: weightedInputReducer,
});
