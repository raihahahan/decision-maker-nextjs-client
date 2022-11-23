import { ButtonProps } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { debounce, DebouncedFunc } from "lodash";
import { useRouter } from "next/router";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Choice } from "../../common/domains/domains";
import usePreventExitForm from "../../common/hooks/usePreventExitForm";
import { IChoice, IDecisionReducer } from "../../common/types/decision-types";
import { AppDispatch } from "../../redux/store";
import useChoiceForm from "../choiceForm/choiceForm-hooks";
import {
  Criteria,
  initialWeightedValidate,
  initialWeightedValues,
} from "./weightedDecision-data";
import {
  addWeightedDecision,
  removeWeightedDecision,
  selectWeightedDecision,
  setWeightedDecision,
  updateWeightedDecision,
} from "./weightedDecision-slice";
import {
  ICriteria,
  ICriteriaInput,
  IExtraFormConfig,
  IWeightedDecisionItem,
  IWeightedInput,
  IWeightedInputItem,
} from "./weightedDecision-types";
import weightedDeicisonApi, {
  weightedChoiceApi,
  weightedCriteriaApi,
  weightedCriteriaInputApi,
  weightedInputApi,
  weightedInputsApi,
} from "./weightedDeicison-api";

export function useWeightedInput(
  weightedItems: IWeightedDecisionItem,
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>,
  weightedInput?: IWeightedInputItem
) {
  const router = useRouter();
  const isEdit = weightedInput != undefined && weightedInput != null;

  let initialValues: IWeightedInput[];

  if (isEdit) {
    weightedInput.weightedInputs = weightedInput.weightedInputs.map((item) => {
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
    initialValues = weightedInput.weightedInputs;
  } else {
    initialValues = weightedItems.choices.map((c) => {
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

  let weightedInputForm = useForm<IWeightedInput[]>({ initialValues }),
    onSubmit: () => Promise<void>,
    onChangeSlider: (
      e: number,
      outIndex: number,
      index: number,
      criteria: ICriteria
    ) => Promise<void> = async (
      e: number,
      outIndex: number,
      index: number,
      criteria: ICriteria
    ) => {
      weightedInputForm.setFieldValue(
        `${outIndex}.criteriaInput.${index}.value`,
        e
      );
    },
    putSlider: DebouncedFunc<
      (
        e: number,
        criteria: ICriteria,
        criteriaInput: ICriteriaInput
      ) => Promise<void>
    > = debounce(async () => {
      return;
    }, 300);

  if (isEdit) {
    const onSubmit = async () => {
      setUnsavedChanges(false);

      router.push({
        pathname: `/weighted/${weightedItems.id}/result`,
      });
    };
    putSlider = debounce(
      async (e: number, criteria: ICriteria, criteriaInput: ICriteriaInput) => {
        await weightedCriteriaInputApi.put(criteriaInput.id as number, {
          ...criteriaInput,
          value: e,
        });
      },
      300
    );
    return { weightedInputForm, onSubmit, onChangeSlider, putSlider };
  } else {
    onSubmit = async () => {
      const weightedInputItem: IWeightedInputItem = {
        weightedItemId: weightedItems.id as number,
        weightedInputs: weightedInputForm.values,
      };
      setUnsavedChanges(false);
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

      await weightedInputApi.post(weightedInputItem);
      router.push({
        pathname: `/weighted/${weightedItems.id}/result`,
      });
    };

    return { weightedInputForm, onSubmit, onChangeSlider, putSlider };
  }
}

// ====================================================== //

export function useCriteriaForm(
  form: UseFormReturnType<
    IWeightedDecisionItem,
    (values: IWeightedDecisionItem) => IWeightedDecisionItem
  >,
  extraFormHelpers?: IExtraFormConfig<IWeightedDecisionItem, ICriteria>
) {
  const router = useRouter();
  const decisionId = router.query.id as string;
  const isEdit = typeof decisionId == "string";
  const addCriteria = async () => {
    if (form.values.criteriaList.length < 100) {
      if (isEdit && extraFormHelpers && extraFormHelpers.onAddCriteria) {
        const res = await extraFormHelpers.onAddCriteria(+decisionId);
        form.insertListItem("criteriaList", {
          id: res,
          name: "",
        } as ICriteria);
      } else {
        form.insertListItem("criteriaList", {
          id: form.values.criteriaList.length,
          name: "",
        } as ICriteria);
      }
    } else {
      alert("Maximum 100 criteria");
    }
  };
  const removeCriteria = (id: number, itemID?: number) => {
    form.removeListItem("criteriaList", id);

    if (isEdit) {
      extraFormHelpers?.onRemoveCriteria(itemID as number);
    }
  };

  const editCriteriaName = (
    e: ChangeEvent<HTMLInputElement>,
    weight: number,
    itemID: number,
    index: number
  ) => {
    if (isEdit) {
      extraFormHelpers?.onEditCriteria(
        itemID,
        new Criteria(e.target.value, itemID, +decisionId, weight)
      );
    } else return;
  };
  const debouncedEditCriteriaName = useCallback(
    debounce(editCriteriaName, 300),
    []
  );
  const finalOnChangeCriteriaName = (
    e: ChangeEvent<HTMLInputElement>,
    weight: number,
    index: number,
    itemID: number
  ) => {
    debouncedEditCriteriaName(e, weight, itemID, index);
    form.setFieldValue(`criteriaList.${index}.name`, e.target.value as string);
  };

  const editSliderValue = (
    e: number,
    name: string,
    itemID: number,
    index: number
  ) => {
    if (isEdit) {
      extraFormHelpers?.onEditCriteria(
        itemID,
        new Criteria(name, itemID, +decisionId, e)
      );
    } else return;
  };
  const debouncedEditCriteriaWeight = useCallback(
    debounce(editSliderValue, 400),
    []
  );
  const finalOnChangeCriteriaWeight = (
    e: number,
    name: string,
    index: number,
    itemID: number
  ) => {
    debouncedEditCriteriaWeight(e, name, itemID, index);
    form.setFieldValue(`criteriaList.${index}.weight`, e);
  };

  return {
    addCriteria,
    removeCriteria,
    finalOnChangeCriteriaName,
    finalOnChangeCriteriaWeight,
  };
}

// ====================================================== //

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
  const { weightedDecisionActions } = useWeightedDecisionReducer();
  const { editHandlers } = useWeightedDecisionEdit();

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
        weightedDecisionActions.add(form.values);
        const _id = res.id;
        router.push({ pathname: `/weighted/${_id}/input` });
      } else {
        editHandlers.onSubmitEdit(form.values);
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

export function useWeightedDecisionCreate() {
  const [active, setActive] = useState(0);
  const weightedForm = useChoiceForm<IWeightedDecisionItem>(
    initialWeightedValues,
    initialWeightedValidate
  );
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  useEffect(() => {
    setUnsavedChanges(
      weightedForm.form.values.name.trim().length > 0 ||
        weightedForm.form.values.choices.filter((i) => i.name.trim().length > 0)
          .length > 0
    );
  }, [weightedForm.form.values, active]);

  usePreventExitForm(unsavedChanges);

  return {
    activeHandlers: { active, setActive },
    weightedForm,
    setUnsavedChanges,
  };
}

// ====================================================== //

export function useWeightedDecisionEdit(presetValues?: IWeightedDecisionItem) {
  const { weightedDecisionActions, weightedDecisionLocalData } =
    useWeightedDecisionReducer();
  const router = useRouter();
  const editHandlers: IExtraFormConfig<IWeightedDecisionItem, ICriteria> = {
    async onEditName(
      decisionId: number,
      name: string,
      curr: IWeightedDecisionItem
    ) {
      curr.name = name;
      await weightedDeicisonApi.put(decisionId, curr);
    },
    async onAddChoice(decisionId: number) {
      const newChoice = new Choice("", undefined, decisionId);
      const res = await weightedChoiceApi.post(newChoice);
      const weightedInputItems = await weightedInputApi.getById(
        presetValues?.id as number
      );

      let criteriaInputToAdd =
        weightedInputItems.weightedInputs[0]?.criteriaInput.map((i) => {
          if (i?.id) delete i.id;
          return i;
        });
      await weightedInputsApi.post({
        choiceId: res.id as number,
        choiceName: newChoice.name,
        criteriaInput: criteriaInputToAdd,
        foreignId: presetValues?.id,
      });

      return res.id as number;
    },
    async onRemoveChoice(id: number) {
      await weightedChoiceApi.delete(id);
      await weightedInputsApi.delete(id); // delete by choice id
    },
    async onEditChoice(id: number, value: IChoice) {
      await weightedChoiceApi.put(id, value);
    },

    async onAddCriteria(decisionId: number) {
      const weightedInputItems = await weightedInputApi.getById(
        presetValues?.id as number
      );

      const newCriteria = new Criteria("", undefined, decisionId, 0);
      const res = await weightedCriteriaApi.post(newCriteria);
      weightedInputItems.weightedInputs.forEach(async (element) => {
        await weightedCriteriaInputApi.post({
          ...newCriteria,
          criteriaId: res.id,
          inputId: element.id,
          decisionId: -1,
          value: 20,
        });
      });
      return res.id as number;
    },
    async onRemoveCriteria(id: number) {
      await weightedCriteriaApi.delete(id);
      await weightedCriteriaInputApi.delete(id);
    },
    async onEditCriteria(id: number, value: ICriteria, isEditSlider?: boolean) {
      await weightedCriteriaApi.put(id, value);
      if (presetValues) {
        await weightedCriteriaInputApi.editCriteriaName(id, {
          ...value,
          value: 23,
          criteriaId: id,
        });
      }
    },
    async onSubmitEdit(value: IWeightedDecisionItem) {
      const id = value.id;
      router.push({ pathname: `/weighted/${id}/input` });
    },
  };

  const [active, setActive] = useState(0);
  const weightedForm = useChoiceForm<IWeightedDecisionItem>(
    presetValues ?? initialWeightedValues,
    initialWeightedValidate,
    undefined,
    editHandlers
  );

  weightedForm.formHelpers = {
    ...weightedForm.formHelpers,
    onAddCriteria: editHandlers.onAddCriteria,
    onRemoveCriteria: editHandlers.onRemoveCriteria,
    onEditCriteria: editHandlers.onEditCriteria,
    onSubmitEdit: editHandlers.onSubmitEdit,
  } as any;

  const [unsavedChanges, setUnsavedChanges] = useState(true);

  useEffect(() => {
    setUnsavedChanges(
      weightedForm.form.values.name.trim().length > 0 ||
        weightedForm.form.values.choices.filter((i) => i.name.trim().length > 0)
          .length > 0
    );
  }, [weightedForm.form.values, active]);

  usePreventExitForm(unsavedChanges);

  return {
    editHandlers,
    activeHandlers: { active, setActive },
    weightedForm,
    setUnsavedChanges,
  };
}

// ====================================================== //

export function useWeightedDecisionReducer() {
  const dispatch = useDispatch<AppDispatch>();
  const weightedDecisionLocalData = useSelector(selectWeightedDecision);

  const weightedDecisionActions: IDecisionReducer<IWeightedDecisionItem> = {
    set(data: IWeightedDecisionItem[]) {
      dispatch(setWeightedDecision(data));
    },
    add(data: IWeightedDecisionItem) {
      dispatch(addWeightedDecision(data));
    },
    update(id: number, data: IWeightedDecisionItem) {
      dispatch(updateWeightedDecision({ id, data }));
    },
    remove(id: number) {
      dispatch(removeWeightedDecision(id));
    },
  };

  return { weightedDecisionLocalData, weightedDecisionActions };
}
