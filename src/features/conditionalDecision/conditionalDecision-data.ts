import { InitialValidate, InitialValues } from "../choiceForm/choiceForm-data";
import { IConditionalDecisionItem } from "./conditionalDecision-types";

export const initialConditionalValues: IConditionalDecisionItem = {
  ...InitialValues,
  conditions: [],
};

export const initialConditionalValidate = {
  ...InitialValidate,
};
