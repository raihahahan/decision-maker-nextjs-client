import { UseFormReturnType } from "@mantine/form";
import { IConditionalDecisionItem } from "./conditionalDecision-types";

export function conditionalDecisionCreateUnsavedListener(
  form: UseFormReturnType<IConditionalDecisionItem>
): boolean {
  return (
    form.values.name.trim().length > 0 ||
    form.values.choices.filter((i) => i.name.trim().length > 0).length > 0 ||
    form.values.conditions.filter((i) => i.name.trim().length > 0).length > 0
  );
}
