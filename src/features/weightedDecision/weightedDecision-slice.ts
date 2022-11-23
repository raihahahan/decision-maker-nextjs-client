import { createSlice } from "@reduxjs/toolkit";
import { TDecisionReducerState } from "../../common/types/decision-types";
import { IWeightedDecisionItem } from "./weightedDecision-types";

export const weightedDecisionSlice = createSlice({
  name: "weightedDecision",
  initialState: [] as IWeightedDecisionItem[],
  reducers: {
    setWeightedDecision: (
      state: IWeightedDecisionItem[],
      action: { payload: IWeightedDecisionItem[] }
    ) => {
      return action.payload;
    },
    addWeightedDecision: (
      state: IWeightedDecisionItem[],
      action: { payload: IWeightedDecisionItem }
    ) => {
      return [...state, action.payload];
    },
    updateWeightedDecision: (
      state: IWeightedDecisionItem[],
      action: { payload: { id: number; data: IWeightedDecisionItem } }
    ) => {
      return state.map((item) => {
        if (item?.id && item.id == action.payload.id) {
          return action.payload.data;
        } else return item;
      });
    },
    removeWeightedDecision: (
      state: IWeightedDecisionItem[],
      action: { payload: number }
    ) => {
      return state.filter((item) => item?.id != action.payload);
    },
  },
});

export const {
  setWeightedDecision,
  addWeightedDecision,
  updateWeightedDecision,
  removeWeightedDecision,
} = weightedDecisionSlice.actions;
export const selectWeightedDecision = (
  state: TDecisionReducerState
): IWeightedDecisionItem[] => state.decision.weightedDecision;
const weightedDecisionReducer = weightedDecisionSlice.reducer;
export default weightedDecisionReducer;
