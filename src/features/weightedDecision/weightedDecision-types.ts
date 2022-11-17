import { IDecision } from "../../common/types/decision-types";

export interface ICriteria {
  id?: number;
  name: string;
  weight: number;
  decisionId?: number; // Foreign key references decision
}

export interface ICriteriaInput extends ICriteria {
  value: number;
  inputId?: number; // Foreign key references weightedInput
}

export interface IWeightedInput {
  id?: number;
  criteriaInput: ICriteriaInput[];
  choiceId: number;
  choiceName: string;
  foreignId?: number; // Foreign key references weightedInputItem
}

export interface IWeightedInputItem {
  id?: number;
  weightedItemId: number;
  weightedInputs: IWeightedInput[];
}

export interface IWeightedDecisionItem extends IDecision {
  criteriaList: ICriteria[];
}
