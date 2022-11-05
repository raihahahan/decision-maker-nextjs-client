import { IDecision } from "../../common/types/decision-types";

export interface ICriteria {
  id?: number;
  name: string;
  weight: number;
}

export interface ICriteriaInput extends ICriteria {
  value: number;
}

export interface IWeightedInput {
  id?: number;
  criteriaInput: ICriteriaInput[];
  choiceId: number;
  choiceName: string;
}

export interface IWeightedDecisionItem extends IDecision {
  criteriaList: ICriteria[];
}
