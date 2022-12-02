import { ButtonProps } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDecisionGenerics from "../../common/hooks/useDecisionGenerics";
import usePreventExitForm from "../../common/hooks/usePreventExitForm";
import {
  IChoice,
  IDecision,
  IDecisionReducer,
  IUseDecisionReducer,
} from "../../common/types/decision-types";
import { AppDispatch } from "../../redux/store";
import useChoiceForm from "../choiceForm/choiceForm-hooks";
import { useFormSteppersParams } from "../multiStepForm/multiStepForm-types";
import {
  initialConditionalValidate,
  initialConditionalValues,
} from "./conditionalDecision-data";
import {
  addConditionalDecision,
  removeConditionalDecision,
  selectConditionalDecision,
  setConditionalDecision,
  updateConditionalDecision,
} from "./conditionalDecision-slice";
import {
  ICondition,
  IConditionalDecisionItem,
  IConditionalInput,
  IConditionalInputItem,
  IExtraFormConfigCondition,
  IInnerItem,
  IInnerItemExclude,
  IInnerItemInclude,
} from "./conditionalDecision-types";
import { conditionalDecisionCreateUnsavedListener } from "./conditionalDecision-utils";
import {
  conditionalChoiceApi,
  conditionalConditionsApi,
  conditionalExcludeApi,
  conditionalIncludeApi,
  conditionalInputItemsApi,
  conditionalInputsApi,
} from "./conditionalDecision-api";
import { Choice } from "../../common/domains/domains";
import { debounce } from "lodash";

export function useConditionalDecisionReducer(): IUseDecisionReducer {
  const dispatch = useDispatch<AppDispatch>();
  const conditionalDecisionLocalData = useSelector(selectConditionalDecision);

  const conditionalDecisionActions: IDecisionReducer<IConditionalDecisionItem> =
    {
      set(data: IConditionalDecisionItem[]) {
        dispatch(setConditionalDecision(data));
      },
      add(data: IConditionalDecisionItem) {
        dispatch(addConditionalDecision(data));
      },
      update(id: number, data: IConditionalDecisionItem) {
        dispatch(updateConditionalDecision({ id, data }));
      },
      remove(id: number) {
        dispatch(removeConditionalDecision(id));
      },
    };

  return {
    decisionLocalData: conditionalDecisionLocalData,
    decisionActions: conditionalDecisionActions,
  };
}

//========================================//

export function useConditionalDecisionSteppers(
  params: useFormSteppersParams<IConditionalDecisionItem>
) {
  const [active, setActive, form, id, TOTAL, setUnsavedChanges] = params;
  const router = useRouter();

  const { decisionActions, decisionApi } = useDecisionGenerics("conditional");

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
      ? form.values.conditions.filter((i) => i.name.trim().length > 0).length ==
        0
      : false;

  const onClickRightButton = async () => {
    if (active >= TOTAL - 1) {
      setUnsavedChanges(false);
      form.values.choices = form.values.choices.map((c) => {
        if (c?.id) delete c.id;
        return c;
      });
      form.values.conditions = form.values.conditions.map((i) => {
        if (i?.id) delete i.id;
        return i;
      });

      if (id == -1) {
        form.values.createdAt = new Date().toISOString();
        form.values.updatedAt = new Date().toISOString();
        const res = await decisionApi?.post(form.values as any);

        decisionActions.add(form.values);
        const _id = res?.id;
        router.push({ pathname: `/conditional/${_id}/input` });
      } else {
        router.push({ pathname: `/conditional/${id}/input` });
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

//========================================//

export function useConditionalDecisionCreate() {
  const [active, setActive] = useState(0);
  const conditionalForm = useChoiceForm<IConditionalDecisionItem>(
    initialConditionalValues,
    initialConditionalValidate
  );
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  useEffect(() => {
    setUnsavedChanges(
      conditionalDecisionCreateUnsavedListener(conditionalForm.form)
    );
  }, [conditionalForm.form.values, active]);

  usePreventExitForm(unsavedChanges);

  return {
    activeHandlers: { active, setActive },
    conditionalForm,
    setUnsavedChanges,
  };
}

//========================================//

export function useConditionalDecisionEdit(res: IConditionalDecisionItem) {
  const [active, setActive] = useState(0);
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  const editHandlers: IExtraFormConfigCondition<IConditionalDecisionItem> = {
    async onEditName(
      decisionId: number,
      name: string,
      curr: IConditionalDecisionItem
    ) {
      curr.name = name;
      curr.updatedAt = new Date().toISOString();
      await decisionApi.put<IConditionalDecisionItem>(decisionId, curr);
    },
    async onAddChoice(decisionId: number) {
      const newChoice = new Choice("", undefined, decisionId);
      const res = await conditionalChoiceApi.post(newChoice);
      return res;
    },

    async onRemoveChoice(id: number) {
      await conditionalChoiceApi.delete(id);
    },

    async onEditChoice(id: number, value: IChoice) {
      await conditionalChoiceApi.put(id, value);
    },

    async onSubmitEdit(value: IDecision) {
      value.updatedAt = new Date().toISOString();
      const id = value.id;
      await decisionApi.put(id as number, value);
      decisionActions.update(id as number, value);
      router.push({
        pathname: `/conditional/${id}/result`,
      });
    },

    async onEditCondition(id: number, value: ICondition) {
      await conditionalConditionsApi.put(id, value);
      await conditionalInputsApi.put(id, {
        ...value,
        foreignId: res.id,
      } as IConditionalInput);
    },
    async onRemoveCondition(id: number) {
      await conditionalConditionsApi.delete(id);
      await conditionalInputsApi.delete(id);
    },
    async onAddCondition(decisionId: number) {
      const newCondition = {
        decisionId,
        name: "",
        include: [],
        exclude: [],
      } as ICondition;
      const _res = await conditionalConditionsApi.post(newCondition);

      await conditionalInputsApi.post({
        ...newCondition,
        value: false,
        foreignId: res.id,
        id: _res.id,
      } as IConditionalInput);
      return _res?.id as number;
    },
  };

  const conditionalForm = useChoiceForm<IConditionalDecisionItem>(
    res,
    initialConditionalValidate,
    setUnsavedChanges,
    editHandlers
  );

  conditionalForm.formHelpers = {
    ...conditionalForm.formHelpers,
    onEditCondition: editHandlers.onEditCondition,
    onRemoveCondition: editHandlers.onRemoveCondition,
    onAddCondition: editHandlers.onAddCondition,
  } as any;

  const { decisionActions, decisionApi } = useDecisionGenerics("conditional");

  const router = useRouter();

  useEffect(() => {
    setUnsavedChanges(
      conditionalDecisionCreateUnsavedListener(conditionalForm.form)
    );
  }, [conditionalForm.form.values, active]);

  usePreventExitForm(unsavedChanges);

  return {
    activeHandlers: { active, setActive },
    conditionalForm,
    setUnsavedChanges,
    editHandlers,
  };
}

//========================================//

export function useCondtionalDecisionConditionsForm(
  form: UseFormReturnType<
    IConditionalDecisionItem,
    (values: IConditionalDecisionItem) => IConditionalDecisionItem
  >,
  formHelpers: IExtraFormConfigCondition<IConditionalDecisionItem>
) {
  const router = useRouter();
  const decisionId = router.query.id as string;
  const isEdit = typeof decisionId == "string";

  const isPressed = (
    conditionIndex: number,
    refId: string,
    type: "include" | "exclude",
    conditionItem: ICondition
  ): boolean => {
    if (isEdit) {
      return conditionItem[type].find((i) => i.choiceId == refId) != undefined;
    } else
      return (
        form.values.conditions[conditionIndex][type].find(
          (i) => i.choiceId == refId
        ) != undefined
      );
  };

  const toggleOn = async (
    conditionIndex: number,
    refId: string,
    type: "include" | "exclude",
    conditionItem: ICondition
  ) => {
    const opposite = type == "include" ? "exclude" : "include";

    if (isEdit) {
      if (type == "include") {
        const newInclude: IInnerItemInclude = {
          choiceId: refId,
          conditionId: conditionItem.id as number,
          type: "include",
          conditionIdInclude: conditionItem.id as number,
        };
        const res = await conditionalIncludeApi.post(newInclude);
        form.insertListItem(`conditions.${conditionIndex}.${type}`, {
          ...newInclude,
          id: res.id,
        });
      } else {
        const newExclude: IInnerItemExclude = {
          choiceId: refId,
          conditionId: conditionItem.id as number,
          type: "exclude",
          conditionIdExclude: conditionItem.id as number,
        };
        const res = await conditionalExcludeApi.post(newExclude);
        form.insertListItem(`conditions.${conditionIndex}.${type}`, {
          ...newExclude,
          id: res.id,
        });
      }
    } else {
      form.insertListItem(`conditions.${conditionIndex}.${type}`, {
        choiceId: refId,
        type,
      } as IInnerItem);
    }

    if (isPressed(conditionIndex, refId, opposite, conditionItem)) {
      toggleOff(conditionIndex, refId, opposite, conditionItem);
    }
  };

  const toggleOff = (
    conditionIndex: number,
    refId: string,
    type: "include" | "exclude",
    conditionItem: ICondition
  ) => {
    const indexToRemove = form.values.conditions[conditionIndex][
      type
    ].findIndex((i) => i.choiceId == refId);
    const itemToRemoveID = form.values.conditions[conditionIndex][type].find(
      (i) => i.choiceId == refId
    )?.id;
    if (indexToRemove != -1)
      form.removeListItem(
        `conditions.${conditionIndex}.${type}`,
        indexToRemove
      );
    if (isEdit) {
      if (type == "include") {
        conditionalIncludeApi.delete(itemToRemoveID as number);
      } else {
        conditionalExcludeApi.delete(itemToRemoveID as number);
      }
    }
  };

  const buttonHandlers = {
    async onAddCondition() {
      if (isEdit) {
        const res = await formHelpers?.onAddCondition(+decisionId);
        form.insertListItem("conditions", {
          name: "",
          include: [],
          exclude: [],
          decisionId: +decisionId,
          id: res as number,
        } as ICondition);
      } else {
        form.insertListItem("conditions", {
          name: "",
          include: [],
          exclude: [],
          decisionId: -1,
        } as ICondition);
      }
    },
    onEditConditionName(
      e: ChangeEvent<HTMLInputElement>,
      conditionIndex: number,
      item: ICondition
    ) {
      if (isEdit) {
        const id = item?.id;
        const newCondition: ICondition = { ...item, name: e.target.value };

        formHelpers.onEditCondition(id as number, newCondition);
      }
    },
    onRemoveCondition(conditionIndex: number) {
      if (isEdit) {
        const id = form.values.conditions[conditionIndex].id;
        formHelpers.onRemoveCondition(id as number);
      }
      form.removeListItem("conditions", conditionIndex);
    },
    async onToggleIncludeButton(
      conditionIndex: number,
      refId: string,
      conditionItem: ICondition
    ) {
      if (isPressed(conditionIndex, refId, "include", conditionItem)) {
        toggleOff(conditionIndex, refId, "include", conditionItem);
      } else {
        toggleOn(conditionIndex, refId, "include", conditionItem);
      }
    },
    async onToggleExcludeButton(
      conditionIndex: number,
      refId: string,
      conditionItem: ICondition
    ) {
      if (isPressed(conditionIndex, refId, "exclude", conditionItem)) {
        toggleOff(conditionIndex, refId, "exclude", conditionItem);
      } else {
        toggleOn(conditionIndex, refId, "exclude", conditionItem);
      }
    },
  };

  const debouncedEditConditionName = useCallback(
    debounce(buttonHandlers.onEditConditionName, 300),
    []
  );

  const finalOnEditConditionName = (
    e: ChangeEvent<HTMLInputElement>,
    conditionIndex: number,
    item: ICondition
  ) => {
    debouncedEditConditionName(e, conditionIndex, item);
    form.setFieldValue(`conditions.${conditionIndex}.name`, e.target.value);
  };

  return { buttonHandlers, isPressed, finalOnEditConditionName };
}

//========================================//

export function useConditionalInputForm() {
  const router = useRouter();
  const buttonHandlers = {
    onClickCheck(item: IConditionalInput) {
      // TODO
      item.value = !item.value;
    },
    async onClickSubmit(
      finalInput: IConditionalInput[],
      conditionalItems: IConditionalDecisionItem
    ) {
      const id = conditionalItems.id as number;
      const conditionalInputItem: IConditionalInputItem = {
        conditionalItemId: id,
        conditionalInputs: finalInput,
      };
      conditionalInputItem.conditionalInputs.forEach((i) => {
        i.include.forEach((inc) => {
          delete inc.id;
        });
        i.exclude.forEach((exc) => {
          delete exc.id;
        });
      });

      await conditionalInputItemsApi.post(conditionalInputItem);
      router.push({ pathname: `/conditional/${id}/result` });
    },
  };

  return { buttonHandlers };
}

//========================================//

export function useConditionalInputEditForm() {
  const router = useRouter();
  const buttonHandlers = {
    onClickCheck(condItem: IConditionalInput) {
      condItem.value = !condItem.value;

      conditionalInputsApi.put(condItem.id as number, condItem);
    },
    async onClickSubmit(
      finalInput: IConditionalInput[],
      conditionalItems: IConditionalDecisionItem
    ) {
      const id = conditionalItems.id;
      router.push({ pathname: `/conditional/${id}/result` });
    },
  };

  return { buttonHandlers };
}
