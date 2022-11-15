import { combineReducers } from "@reduxjs/toolkit";
import randomDecisionReducer from "../features/randomDecision/randomDecision-slice";
import themeReducer from "../features/theme/theme-slice";
import weightedInputReducer from "../features/weightedDecision/weightedDecision-slice";

const decisionReducer = combineReducers({
  randomDecision: randomDecisionReducer,
});

export const rootReducer = combineReducers({
  theme: themeReducer,
  weightedInput: weightedInputReducer,
  decision: decisionReducer,
});
