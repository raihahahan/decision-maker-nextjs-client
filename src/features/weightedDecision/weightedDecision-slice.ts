import { createSlice } from "@reduxjs/toolkit";
import { IWeightedInput } from "./weightedDecision-types";

export const weightedInputSlice = createSlice({
  name: "weightedInput",
  initialState: [] as IWeightedInput[],
  reducers: {
    setWeightedInput: (
      state: IWeightedInput[],
      action: { payload: IWeightedInput[] }
    ) => {
      return action.payload;
    },
  },
});

export const { setWeightedInput } = weightedInputSlice.actions;
export const selectWeightedInput = (state: {
  weightedInput: IWeightedInput[];
}): IWeightedInput[] => state.weightedInput;
const weightedInputReducer = weightedInputSlice.reducer;
export default weightedInputReducer;
