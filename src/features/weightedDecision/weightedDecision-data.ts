import { InitialValidate, InitialValues } from "../choiceForm/choiceForm-data";
import { IStepperItem } from "../multiStepForm/multiStepForm-types";
import { ICriteria, IWeightedDecisionItem } from "./weightedDecision-types";

export const initialWeightedValues: IWeightedDecisionItem = {
  ...InitialValues,
  criteriaList: [
    {
      name: "Price",
      weight: 23,
    },
    { name: "Convenience", weight: 23 },
  ],
};

export const initialWeightedValidate = {
  ...InitialValidate,
};

export class Criteria implements ICriteria {
  name = "";
  id: number | undefined = undefined;
  weight = 0;
  decisionId: number | undefined = undefined;
  value = 20;

  constructor(
    name?: string,
    id?: number,
    decisionId?: number,
    weight?: number,
    value?: number
  ) {
    this.name = name ?? "";
    this.id = id;
    this.decisionId = decisionId;
    this.weight = weight ?? 0;
    this.value = value ?? 20;
  }

  get() {
    return this.name;
  }

  set(value: string, weight: number) {
    this.name = value;
    this.weight = weight;
  }
}

export const weightedStepperData: IStepperItem[] = [
  {
    id: 0,
    display: "Step 1: Create decision and choices",
    label: "Choices",
    description: "Create decision and choices",
  },
  {
    id: 1,
    display:
      "Create criteria that affect your decision making (hint: 0 [least important] - 100 [most important])",
    label: "Criteria",
    description: "Create criteria that affect your decision making",
  },
];
