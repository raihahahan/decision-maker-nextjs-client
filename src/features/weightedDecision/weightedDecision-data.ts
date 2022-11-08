import { InitialValidate, InitialValues } from "../choiceForm/choiceForm-data";
import {
  IWeightedDecisionItem,
  IWeightedInput,
} from "./weightedDecision-types";

export const initialWeightedValues: IWeightedDecisionItem = {
  ...InitialValues,
  criteriaList: [
    {
      name: "Price",
      weight: 46,
    },
    { name: "Convenience", weight: 23 },
  ],
};

export const initialWeightedValidate = {
  ...InitialValidate,
};
