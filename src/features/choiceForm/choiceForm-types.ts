import { UseFormReturnType } from "@mantine/form";
import { IChoice } from "../../common/types/decision-types";

export type TFormHelpers = {
  removeChoice(index: number, id?: number): void;
  addChoice(): void;
  decide(): void;
  cancel(): void;
  editChoice(id: number, value: IChoice): void;
};

export type formHookReturnType<T> = {
  form: UseFormReturnType<T, (values: T) => T>;
  formHelpers: TFormHelpers;
};

export type TExtraFormConfig<T> = {
  onAddChoice(decisionId: number): Promise<number>;
  onRemoveChoice(id: number): void;
  onEditChoice(id: number, value: T): void;
  onSubmitEdit(value: T): void;
};
