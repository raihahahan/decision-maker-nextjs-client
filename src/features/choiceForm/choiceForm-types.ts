import { UseFormReturnType } from "@mantine/form";

export type formHelpers = {
  removeChoice(id: number): void;
  addChoice(): void;
  decide(): void;
  cancel(): void;
};

export type formHookReturnType<T> = {
  form: UseFormReturnType<T, (values: T) => T>;
  formHelpers: {
    removeChoice(id: number): void;
    addChoice(): void;
    decide(): void;
    cancel(): void;
  };
};
