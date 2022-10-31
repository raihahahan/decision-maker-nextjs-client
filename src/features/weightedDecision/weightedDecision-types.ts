import { Decision } from "../../common/types/decision-types";

export interface Criteria {
  name: string;
  weight: number;
}

export interface CriteriaInput extends Criteria {
  value: number;
}

export interface WeightedInput {
  criteriaInput: CriteriaInput[];
  choiceId: number;
  choiceName: string;
}

export interface WeightedDecisionItem extends Decision {
  criteriaList: Criteria[];
}
