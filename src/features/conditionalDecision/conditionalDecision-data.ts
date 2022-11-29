import { InitialValidate, InitialValues } from "../choiceForm/choiceForm-data";
import { IStepperItem } from "../multiStepForm/multiStepForm-types";
import { IConditionalDecisionItem } from "./conditionalDecision-types";

export const initialConditionalValues: IConditionalDecisionItem = {
  ...InitialValues,
  conditions: [],
};

export const initialConditionalValidate = {
  ...InitialValidate,
};

export const conditionalStepperData: IStepperItem[] = [
  {
    id: 0,
    display: "Step 1: Create decision and choices",
    label: "Choices",
    description: "Create decision and choices",
  },
  {
    id: 1,
    display: "Create conditions that affect your decision making.",
    label: "Conditions",
    description: "Create conditions that affect your decision making.",
  },
];
