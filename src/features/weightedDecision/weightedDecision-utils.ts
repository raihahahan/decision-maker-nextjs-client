import { UseFormReturnType } from "@mantine/form";
import {
  ICriteriaInput,
  IWeightedDecisionItem,
  IWeightedInput,
  IWeightedInputItem,
} from "./weightedDecision-types";

export function modifyWeightedInputs(
  weightedInput: IWeightedInputItem,
  weightedItems: IWeightedDecisionItem
): IWeightedInput[] {
  return weightedInput.weightedInputs.map((item) => {
    const choiceName = weightedItems.choices.find(
      (i) => i.id == item.choiceId
    )?.name;
    const criteriaInput = item.criteriaInput.map((input) => {
      const criteriaName = weightedItems.criteriaList.find(
        (i) => i.id == input.criteriaId
      )?.name;
      return {
        ...input,
        name: criteriaName as string,
      };
    });
    return {
      ...item,
      choiceName: choiceName as string,
      criteriaInput: criteriaInput,
    };
  });
}

export function weightedItemsToWeightedInput(
  weightedItems: IWeightedDecisionItem
): IWeightedInput[] {
  return weightedItems.choices.map((c) => {
    const choiceId = c.id as number;
    const choiceName = c.name;
    const criteriaInput: ICriteriaInput[] = weightedItems.criteriaList.map(
      (criteria) => {
        return { ...criteria, value: 20 };
      }
    );
    return { choiceId, choiceName, criteriaInput };
  });
}

export function createWeightedInputItem(
  weightedItems: IWeightedDecisionItem,
  weightedInputForm: UseFormReturnType<
    IWeightedInput[],
    (values: IWeightedInput[]) => IWeightedInput[]
  >
): IWeightedInputItem {
  const weightedInputItem: IWeightedInputItem = {
    weightedItemId: weightedItems.id as number,
    weightedInputs: weightedInputForm.values,
  };

  weightedInputItem.weightedInputs = weightedInputItem.weightedInputs.map(
    (i) => {
      i.criteriaInput = i.criteriaInput.map((c, index) => {
        if (c.id) delete c.id;
        c.decisionId = -1;
        c.criteriaId = weightedItems.criteriaList[index].id;
        return c;
      });
      return i;
    }
  );
  return weightedInputItem;
}

export function weightedDecisionCreateUnsavedListener(
  form: UseFormReturnType<IWeightedDecisionItem>
): boolean {
  return (
    form.values.name.trim().length > 0 ||
    form.values.choices.filter((i) => i.name.trim().length > 0).length > 0 ||
    form.values.criteriaList.filter((i) => i.name.trim().length > 0).length > 0
  );
}
