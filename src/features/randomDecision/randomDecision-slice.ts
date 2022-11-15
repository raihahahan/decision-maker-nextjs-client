import { createSlice } from "@reduxjs/toolkit";
import { TDecisionReducerState } from "../../common/types/decision-types";
import { IRandomDecisionItem } from "./randomDecision-types";

export const randomDecisionSlice = createSlice({
  name: "randomDecision",
  initialState: [] as IRandomDecisionItem[],
  reducers: {
    setRandomDecision: (
      state: IRandomDecisionItem[],
      action: { payload: IRandomDecisionItem[] }
    ) => {
      return action.payload;
    },
    addRandomDecision: (
      state: IRandomDecisionItem[],
      action: { payload: IRandomDecisionItem }
    ) => {
      return [...state, action.payload];
    },
    updateRandomDecision: (
      state: IRandomDecisionItem[],
      action: { payload: { id: number; data: IRandomDecisionItem } }
    ) => {
      return state.map((item) => {
        if (item?.id && item.id == action.payload.id) {
          return action.payload.data;
        } else return item;
      });
    },
    removeRandomDecision: (
      state: IRandomDecisionItem[],
      action: { payload: number }
    ) => {
      return state.filter((item) => item?.id != action.payload);
    },
  },
});

export const {
  setRandomDecision,
  addRandomDecision,
  updateRandomDecision,
  removeRandomDecision,
} = randomDecisionSlice.actions;
export const selectRandomDecision = (
  state: TDecisionReducerState
): IRandomDecisionItem[] => state.decision.randomDecision;
const randomDecisionReducer = randomDecisionSlice.reducer;
export default randomDecisionReducer;
