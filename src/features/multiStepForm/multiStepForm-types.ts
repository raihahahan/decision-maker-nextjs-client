import { UseFormReturnType } from "@mantine/form";
import React from "react";
import { DecisionTypes, IDecision } from "../../common/types/decision-types";
import { formHookReturnType } from "../choiceForm/choiceForm-types";

export interface IGenericMultiStepFormProps<T extends IDecision>
  extends IMultiStepFormProps<T> {
  stepperData: IStepperItem[];
  type: DecisionTypes;
  pages: IMultiStepFormItem[];
  useMultiFormStepper: TUseMultiFormStepperReturnType;
}

export interface IMultiStepFormItem {
  element: JSX.Element;
  id: number;
}

export interface IStepperItem {
  id: number;
  display: string;
  label: string;
  description: string;
}

export type TFormStepperButtonHandlers = {
  disabled: { leftButtonDisabled: boolean; rightButtonDisabled: boolean };
  onClick: { onClickLeftButton: () => void; onClickRightButton: () => void };
  rightButtonType: "button" | "submit" | "reset";
};

export type TFormStepperActiveHandlers = {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
};

export type TFormSteppersProps = {
  buttonHandlers: TFormStepperButtonHandlers;
  activeHandlers: TFormStepperActiveHandlers;
  stepperData: IStepperItem[];
};

export interface IMultiStepFormProps<T extends IDecision> {
  activeHandlers: {
    active: number;
    setActive: React.Dispatch<React.SetStateAction<number>>;
  };
  form: formHookReturnType<T>;
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
  presetValues?: T;
}

export interface IFormStepperProps<T extends IDecision> {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  form: UseFormReturnType<T, (values: T) => T>;
  id: number;
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IGenericMultiStepFormProps<T extends IDecision>
  extends IMultiStepFormProps<T> {
  stepperData: IStepperItem[];
}

export type TUseMultiFormStepperReturnType = {
  rightButtonType: "button" | "submit";
  rightButtonDisabled: boolean;
  leftButtonDisabled: boolean;
  onClickRightButton: () => Promise<void>;
  onClickLeftButton: () => void;
};

export type useFormSteppersParams<T> = [
  active: number,
  setActive: React.Dispatch<React.SetStateAction<number>>,
  form: UseFormReturnType<T, (values: T) => T>,
  id: number,
  TOTAL: number,
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>
];
