import { UseFormReturnType } from "@mantine/form";
import { IChoice, IDecision } from "../../common/types/decision-types";

export type TFormHelpers = {
  editName(name: string): void;
  removeChoice(index: number, id?: number): void;
  addChoice(): void;
  decide(): void;
  cancel(): void;
  editChoice(id: number, value: IChoice, index: number): void;
};

export type formHookReturnType<T extends IDecision> = {
  form: UseFormReturnType<T, (values: T) => T>;
  formHelpers: TFormHelpers;
};

export type TExtraFormConfig<T> = {
  onEditName(decisionId: number, name: string, curr: T): Promise<void>;
  onAddChoice(decisionId: number): Promise<IChoice>;
  onRemoveChoice(id: number): Promise<void>;
  onEditChoice(id: number, value: T): Promise<void>;
  onSubmitEdit(value: T): Promise<void> | undefined;
};
