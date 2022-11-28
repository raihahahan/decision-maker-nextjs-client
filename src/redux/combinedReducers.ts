import { combineReducers } from "@reduxjs/toolkit";
import conditionalDecisionReducer from "../features/conditionalDecision/conditionalDecision-slice";
import randomDecisionReducer from "../features/randomDecision/randomDecision-slice";
import themeReducer from "../features/theme/theme-slice";
import weightedDecisionReducer from "../features/weightedDecision/weightedDecision-slice";

const decisionReducer = combineReducers({
  randomDecision: randomDecisionReducer,
  weightedDecision: weightedDecisionReducer,
  conditionalDecision: conditionalDecisionReducer,
});

export const rootReducer = combineReducers({
  theme: themeReducer,
  decision: decisionReducer,
});
