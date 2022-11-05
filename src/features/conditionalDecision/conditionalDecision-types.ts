import { IDecision } from "../../common/types/decision-types";

export interface ICondition {
  id?: number;
  innerItem: {
    id?: number;
    choiceId: number;
  };
}

export interface IConditionalInput extends ICondition {
  value: boolean;
}

export interface IConditionalDecisionItem extends IDecision {
  conditions: ICondition[];
}
