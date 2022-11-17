import { ButtonProps } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { useRouter } from "next/router";
import React from "react";
import {
  ICriteria,
  ICriteriaInput,
  IWeightedDecisionItem,
  IWeightedInput,
  IWeightedInputItem,
} from "./weightedDecision-types";
import weightedDeicisonApi, { weightedInputApi } from "./weightedDeicison-api";

export function useWeightedInput(
  weightedItems: IWeightedDecisionItem,
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>
) {
  const router = useRouter();

  let initialValues: IWeightedInput[] = weightedItems.choices.map((c) => {
    const choiceId = c.id as number;
    const choiceName = c.name;
    const criteriaInput: ICriteriaInput[] = weightedItems.criteriaList.map(
      (criteria) => {
        return { ...criteria, value: 20 };
      }
    );
    return { choiceId, choiceName, criteriaInput };
  });

  const weightedInputForm = useForm<IWeightedInput[]>({ initialValues });

  const onChangeSlider = (
    e: number,
    item: IWeightedInput,
    c: ICriteriaInput
  ) => {
    weightedInputForm.setValues([
      ...initialValues,
      {
        ...item,
        criteriaInput: [...item.criteriaInput, { ...c, value: e }],
      },
    ]);
  };

  const onSubmit = async () => {
    const weightedInputItem: IWeightedInputItem = {
      weightedItemId: weightedItems.id as number,
      weightedInputs: weightedInputForm.values,
    };
    setUnsavedChanges(false);
    weightedInputItem.weightedInputs = weightedInputItem.weightedInputs.map(
      (i) => {
        i.criteriaInput = i.criteriaInput.map((c) => {
          if (c.id) delete c.id;
          return c;
        });
        return i;
      }
    );
    if (false) {
      // TODO for edit
      await weightedInputApi.put(weightedItems.id as number, weightedInputItem);
    } else {
      await weightedInputApi.post(weightedInputItem);
    }

    router.push({
      pathname: `/weighted/${weightedItems.id}/result`,
    });
  };

  return { weightedInputForm, onSubmit, onChangeSlider };
}

export function useCriteriaForm(
  form: UseFormReturnType<
    IWeightedDecisionItem,
    (values: IWeightedDecisionItem) => IWeightedDecisionItem
  >
) {
  const addCriteria = () => {
    if (form.values.criteriaList.length < 100) {
      form.insertListItem("criteriaList", {
        id: form.values.criteriaList.length,
        name: "",
      } as ICriteria);
    } else {
      alert("Maximum 100 criteria");
    }
  };
  const removeCriteria = (id: number) => {
    form.removeListItem("criteriaList", id);
  };

  return { addCriteria, removeCriteria };
}

export function useWeightedFormSteppers(
  active: number,
  setActive: React.Dispatch<React.SetStateAction<number>>,
  form: UseFormReturnType<
    IWeightedDecisionItem,
    (values: IWeightedDecisionItem) => IWeightedDecisionItem
  >,
  id: number,
  TOTAL: number,
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>
) {
  const router = useRouter();

  const nextStep = () =>
    setActive((current) => (current < TOTAL + 1 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const rightButtonDisabled =
    active == 0
      ? form.values.choices.filter((i) => i.name.trim().length == 0).length >
          0 ||
        form.values.name.trim().length <= 0 ||
        form.values.choices.length <= 1
      : active >= 1
      ? form.values.criteriaList.filter((i) => i.name.trim().length > 0)
          .length == 0
      : false;

  const onClickRightButton = async () => {
    if (active >= TOTAL - 1) {
      setUnsavedChanges(false);
      form.values.choices = form.values.choices.map((c) => {
        if (c?.id) delete c.id;
        return c;
      });
      form.values.criteriaList = form.values.criteriaList.map((i) => {
        if (i?.id) delete i.id;
        return i;
      });
      if (id == -1) {
        const res = await weightedDeicisonApi.post(form.values);
        const _id = res.id;
        router.push({ pathname: `/weighted/${_id}/input` });
      } else {
        await weightedDeicisonApi.put(id, form.values);
        router.push({ pathname: `weighted/${id}/input` });
      }
    } else {
      nextStep();
    }
  };

  const onClickLeftButton = prevStep;

  const rightButtonType: ButtonProps["type"] =
    active >= TOTAL - 1 ? "submit" : "button";

  const leftButtonDisabled = active <= 0;

  return {
    rightButtonType,
    rightButtonDisabled,
    leftButtonDisabled,
    onClickRightButton,
    onClickLeftButton,
  };
}
