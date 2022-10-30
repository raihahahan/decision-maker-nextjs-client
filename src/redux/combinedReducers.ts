import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/theme-slice";

export const rootReducer = combineReducers({
  theme: themeReducer,
});
