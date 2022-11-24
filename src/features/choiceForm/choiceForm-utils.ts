import { UseFormReturnType } from "@mantine/form";
import { IDecision } from "../../common/types/decision-types";

export function formUnsaveChangesListener<T extends IDecision>(
  form: UseFormReturnType<T, (values: T) => T>
): boolean {
  return (
    form.values.name.trim().length > 0 ||
    form.values.choices.filter((i) => i.name.trim().length > 0).length > 0
  );
}
