import { IDecision } from "../../common/types/decision-types";

export interface ICondition {
  id?: number;
  name: string;
  include: IInnerItem[];
  exclude: IInnerItem[];
}

export interface IInnerItem {
  id?: number;
  choiceId: number;
}
export interface IConditionalInput extends ICondition {
  value: boolean;
}

export interface IConditionalDecisionItem extends IDecision {
  conditions: ICondition[];
}
