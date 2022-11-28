import { createSlice } from "@reduxjs/toolkit";
import { TDecisionReducerState } from "../../common/types/decision-types";
import { IConditionalDecisionItem } from "./conditionalDecision-types";

export const conditionalDecisionSlice = createSlice({
  name: "conditionalDecision",
  initialState: [] as IConditionalDecisionItem[],
  reducers: {
    setConditionalDecision: (
      state: IConditionalDecisionItem[],
      action: { payload: IConditionalDecisionItem[] }
    ) => {
      return action.payload;
    },
    addConditionalDecision: (
      state: IConditionalDecisionItem[],
      action: { payload: IConditionalDecisionItem }
    ) => {
      return [...state, action.payload];
    },
    updateConditionalDecision: (
      state: IConditionalDecisionItem[],
      action: { payload: { id: number; data: IConditionalDecisionItem } }
    ) => {
      return state.map((item) => {
        if (item?.id && item.id == action.payload.id) {
          return action.payload.data;
        } else return item;
      });
    },
    removeConditionalDecision: (
      state: IConditionalDecisionItem[],
      action: { payload: number }
    ) => {
      return state.filter((item) => item?.id != action.payload);
    },
  },
});

export const {
  setConditionalDecision,
  addConditionalDecision,
  updateConditionalDecision,
  removeConditionalDecision,
} = conditionalDecisionSlice.actions;
export const selectConditionalDecision = (
  state: TDecisionReducerState
): IConditionalDecisionItem[] => state.decision.conditionalDecision;
const conditionalDecisionReducer = conditionalDecisionSlice.reducer;
export default conditionalDecisionReducer;
