import { IDecision } from "../../common/types/decision-types";
import { TExtraFormConfig } from "../choiceForm/choiceForm-types";

export interface ICriteria {
  id?: number;
  name: string;
  weight: number;
  decisionId?: number; // Foreign key references decision
}

export interface ICriteriaInput extends ICriteria {
  inputId?: number; // Foreign key references weightedInput
  criteriaId?: number;
  value: number;
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

export interface IExtraFormConfig<T, C> extends TExtraFormConfig<T> {
  onAddCriteria(decisionId: number): Promise<number>;
  onRemoveCriteria(id: number): Promise<void>;
  onEditCriteria(id: number, value: C, isEditSlider?: boolean): Promise<void>;
  onSubmitEdit(value: any): Promise<void>;
}
