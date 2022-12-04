import { ButtonProps } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDecisionGenerics from "../../common/hooks/useDecisionGenerics";
import usePreventExitForm from "../../common/hooks/usePreventExitForm";
import {
  IDecisionReducer,
  IUseDecisionReducer,
} from "../../common/types/decision-types";
import { AppDispatch } from "../../redux/store";
import useChoiceForm from "../choiceForm/choiceForm-hooks";
import { TExtraFormConfig } from "../choiceForm/choiceForm-types";
import {
  TUseMultiFormStepperReturnType,
  useFormSteppersParams,
} from "../multiStepForm/multiStepForm-types";
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
  IWeightedDecisionItem,
  IWeightedInput,
  IWeightedInputItem,
  useCriteriaFormReturnType,
  useWeightedInputReturnType,
} from "./weightedDecision-types";
import {
  createWeightedInputItem,
  weightedDecisionCreateUnsavedListener,
  weightedItemsToWeightedInput,
} from "./weightedDecision-utils";
import weightedDeicisonApi, {
  weightedCriteriaInputApi,
  weightedInputApi,
} from "./weightedDeicison-api";

/* Hooks in this file:
  1. useWeightedInput: logic for /weighted/{id}/input
  2. useWeightedEditInput: logic for editting /weighted/{id}/input
  3. useCriteriaForm: logic for criteria section of /weighted/create OR /weighted/{id} for edit
  4. useWeightedDecisionCreate: logic for /weighted/create
  5. useWeightedDecisionEdit: logic for /weighted/{id}
  6. useWeightedFormSteppers: logic for form stepper component in /weighted/create OR weighted/{id}
*/

export function useWeightedEditInput(
  weightedItems: IWeightedDecisionItem,
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>,
  weightedInput: IWeightedInputItem
): useWeightedInputReturnType {
  const router = useRouter();

  // initialise other variables and methods
  const initialValues = weightedInput.weightedInputs;

  const weightedInputForm = useForm<IWeightedInput[]>({ initialValues });

  const onSubmit = async () => {
    setUnsavedChanges(false);
    router.push({
      pathname: `/weighted/${weightedItems.id}/result`,
    });
  };

  const onChangeSlider = async (
    e: number,
    outIndex: number,
    index: number,
    criteria: ICriteria
  ) => {
    weightedInputForm.setFieldValue(
      `${outIndex}.criteriaInput.${index}.value`,
      e
    );
  };

  const putSlider = debounce(
    async (e: number, criteria: ICriteria, criteriaInput: ICriteriaInput) => {
      await weightedCriteriaInputApi.put(criteriaInput.id as number, {
        ...criteriaInput,
        value: e,
      });
    },
    300
  );

  return { weightedInputForm, onSubmit, onChangeSlider, putSlider };
}

export function useWeightedInput(
  weightedItems: IWeightedDecisionItem,
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>
): useWeightedInputReturnType {
  const router = useRouter();

  // initialise initialValues
  const initialValues = weightedItemsToWeightedInput(weightedItems);

  // declare other variables
  const weightedInputForm = useForm<IWeightedInput[]>({ initialValues });

  const onSubmit = async () => {
    setUnsavedChanges(false);
    const weightedInputItem = createWeightedInputItem(
      weightedItems,
      weightedInputForm
    );

    await weightedInputApi.post(weightedInputItem);
    router.push({
      pathname: `/weighted/${weightedItems.id}/result`,
    });
  };

  const onChangeSlider = async (
    e: number,
    outIndex: number,
    index: number,
    criteria: ICriteria
  ) => {
    weightedInputForm.setFieldValue(
      `${outIndex}.criteriaInput.${index}.value`,
      e
    );
  };

  const putSlider = debounce(async () => {
    return;
  }, 300);

  return { weightedInputForm, onSubmit, onChangeSlider, putSlider };
}

// ====================================================== //

export function useCriteriaForm(
  form: UseFormReturnType<
    IWeightedDecisionItem,
    (values: IWeightedDecisionItem) => IWeightedDecisionItem
  >
): useCriteriaFormReturnType {
  // declare variables
  const router = useRouter();
  const decisionId = router.query.id as string;
  const isEdit = typeof decisionId == "string";

  // methods

  // 1. Add criteria
  const addCriteria = async () => {
    if (form.values.criteriaList.length < 100) {
      form.insertListItem("criteriaList", {
        id: 0,
        name: "",
        weight: 20,
      } as ICriteria);
    } else {
      alert("Maximum 100 criteria");
    }
  };

  // 2. Remove criteria
  const removeCriteria = (id: number, itemID?: number) => {
    form.removeListItem("criteriaList", id);
  };

  // 3. Edit criteria name
  const onEditCriteriaName = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    form.setFieldValue(`criteriaList.${index}.name`, e.target.value as string);
  };

  // 4. edit criteria weight
  const onEditCriteriaWeight = (e: number, index: number) => {
    form.setFieldValue(`criteriaList.${index}.weight`, e);
  };

  return {
    addCriteria,
    removeCriteria,
    onEditCriteriaName,
    onEditCriteriaWeight,
  };
}

// ====================================================== //

export function useWeightedFormSteppers(
  params: useFormSteppersParams<IWeightedDecisionItem>
): TUseMultiFormStepperReturnType {
  const [active, setActive, form, id, TOTAL, setUnsavedChanges] = params;

  const router = useRouter();
  const { decisionActions: weightedDecisionActions } =
    useDecisionGenerics("weighted");
  const { editHandlers } = useWeightedDecisionEdit();

  const nextStep = () => {
    setActive((current) => (current < TOTAL + 1 ? current + 1 : current));
  };

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

      if (id == -1) {
        form.values.choices = form.values.choices.map((c) => {
          if (c?.id) delete c.id;
          return c;
        });
        form.values.criteriaList = form.values.criteriaList.map((i) => {
          if (i?.id) delete i.id;
          return i;
        });
        form.values.createdAt = new Date().toISOString();
        form.values.updatedAt = new Date().toISOString();
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
    setUnsavedChanges(weightedDecisionCreateUnsavedListener(weightedForm.form));
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
  const router = useRouter();
  const editHandlers: TExtraFormConfig<IWeightedDecisionItem> = {
    async onSubmitEdit(value: IWeightedDecisionItem) {
      const id = value.id;
      value.updatedAt = new Date().toISOString();
      await weightedDeicisonApi.put(id as number, value);
      router.push({ pathname: `/weighted/${id}/input` });
    },
  };

  const [active, setActive] = useState(0);
  const weightedForm = useChoiceForm<IWeightedDecisionItem>(
    presetValues ?? initialWeightedValues,
    initialWeightedValidate,
    undefined
  );

  weightedForm.formHelpers = {
    ...weightedForm.formHelpers,
    onSubmitEdit: editHandlers.onSubmitEdit,
  } as any;

  const [unsavedChanges, setUnsavedChanges] = useState(true);

  usePreventExitForm(false);

  return {
    editHandlers,
    activeHandlers: { active, setActive },
    weightedForm,
    setUnsavedChanges,
  };
}

// ====================================================== //

export function useWeightedDecisionReducer(): IUseDecisionReducer {
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

  return {
    decisionLocalData: weightedDecisionLocalData,
    decisionActions: weightedDecisionActions,
  };
}

// ====================================================== //
export function useWeightedInputPagination() {
  const [active, setActive] = useState<number>(1);

  const pageHandlers = {
    onClickPage(e: number) {
      setActive(e);
    },
  };

  return { activeHandlers: { active, setActive }, pageHandlers };
}
