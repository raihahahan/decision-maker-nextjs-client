import { IDecision } from "../../common/types/decision-types";
import { TExtraFormConfig } from "../choiceForm/choiceForm-types";

export interface ICondition {
  id?: number;
  name: string;
  include: IInnerItem[];
  exclude: IInnerItem[];
  decisionId: number;
}

export interface IInnerItem {
  id?: number;
  choiceId: string;
}
export interface IConditionalInput extends ICondition {
  value: boolean;
}

export interface IConditionalDecisionItem extends IDecision {
  conditions: ICondition[];
}

export interface IConditionalInputItem {
  id?: number;
  conditionalInputs: IConditionalInput[];
  conditionalItemId: number;
}

export interface IExtraFormConfigCondition<T> extends TExtraFormConfig<T> {
  onAddCondition(decisionId: number): Promise<number>;
  onRemoveCondition(id: number): Promise<void>;
  onEditCondition(id: number, value: ICondition): Promise<void>;
}
