import { UseFormReturnType } from "@mantine/form";
import { DebouncedFunc } from "lodash";
import { ChangeEvent } from "react";
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

export interface useWeightedInputReturnType {
  weightedInputForm: UseFormReturnType<
    IWeightedInput[],
    (values: IWeightedInput[]) => IWeightedInput[]
  >;
  onSubmit: () => Promise<void>;
  onChangeSlider: (
    e: number,
    outIndex: number,
    index: number,
    criteria: ICriteria
  ) => void;
}

export interface useCriteriaFormReturnType {
  addCriteria: () => Promise<void>;
  removeCriteria: (id: number, itemID?: number) => void;
  onEditCriteriaName: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  onEditCriteriaWeight: (e: number, index: number) => void;
}

export interface useWeightedFormSteppersReturnType {
  rightButtonType: "submit" | "button";
  rightButtonDisabled: boolean;
  leftButtonDisabled: boolean;
  onClickRightButton: () => Promise<void>;
  onClickLeftButton: () => void;
}
