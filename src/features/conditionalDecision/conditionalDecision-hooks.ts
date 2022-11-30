import { ButtonProps } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDecisionGenerics from "../../common/hooks/useDecisionGenerics";
import usePreventExitForm from "../../common/hooks/usePreventExitForm";
import {
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
  IInnerItem,
} from "./conditionalDecision-types";
import { conditionalDecisionCreateUnsavedListener } from "./conditionalDecision-utils";
import {
  conditionalInputItemsApi,
  conditionalInputsApi,
} from "./conditionalDecision-api";

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

export function useConditionalDecisionSteppers(
  params: useFormSteppersParams<IConditionalDecisionItem>
) {
  const [active, setActive, form, id, TOTAL, setUnsavedChanges] = params;
  const router = useRouter();

  const { decisionActions, decisionApi } = useDecisionGenerics("conditional");
  const editHandlers = {};

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
        // editHandlers?.onSubmitEdit(form.values);
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

export function useCondtionalDecisionConditionsForm(
  form: UseFormReturnType<
    IConditionalDecisionItem,
    (values: IConditionalDecisionItem) => IConditionalDecisionItem
  >
) {
  const isPressed = (
    conditionIndex: number,
    refId: string,
    type: "include" | "exclude"
  ): boolean => {
    return (
      form.values.conditions[conditionIndex][type].find(
        (i) => i.choiceId == refId
      ) != undefined
    );
  };

  const toggleOn = (
    conditionIndex: number,
    refId: string,
    type: "include" | "exclude"
  ) => {
    const opposite = type == "include" ? "exclude" : "include";

    form.insertListItem(`conditions.${conditionIndex}.${type}`, {
      choiceId: refId,
    } as IInnerItem);

    if (isPressed(conditionIndex, refId, opposite)) {
      toggleOff(conditionIndex, refId, opposite);
    }
  };

  const toggleOff = (
    conditionIndex: number,
    refId: string,
    type: "include" | "exclude"
  ) => {
    const indexToRemove = form.values.conditions[conditionIndex][
      type
    ].findIndex((i) => i.choiceId == refId);
    if (indexToRemove != -1)
      form.removeListItem(
        `conditions.${conditionIndex}.${type}`,
        indexToRemove
      );
  };

  const buttonHandlers = {
    onAddCondition() {
      form.insertListItem("conditions", {
        name: "",
        include: [],
        exclude: [],
      } as ICondition);
    },
    onEditConditionName(
      e: ChangeEvent<HTMLInputElement>,
      conditionIndex: number
    ) {
      form.setFieldValue(`conditions.${conditionIndex}.name`, e.target.value);
    },
    onRemoveCondition(conditionIndex: number) {
      form.removeListItem("conditions", conditionIndex);
    },
    onToggleIncludeButton(conditionIndex: number, refId: string) {
      if (isPressed(conditionIndex, refId, "include")) {
        toggleOff(conditionIndex, refId, "include");
      } else {
        toggleOn(conditionIndex, refId, "include");
      }
    },
    onToggleExcludeButton(conditionIndex: number, refId: string) {
      if (isPressed(conditionIndex, refId, "exclude")) {
        toggleOff(conditionIndex, refId, "exclude");
      } else {
        toggleOn(conditionIndex, refId, "exclude");
      }
    },
  };

  return { buttonHandlers, isPressed };
}

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
      conditionalItems.conditions = conditionalItems.conditions.map((item) => {
        if (item.id) delete item.id;
        item.include = item.include.map((inc) => {
          if (inc?.id) delete inc.id;
          return inc;
        });
        item.exclude = item.exclude.map((exc) => {
          if (exc?.id) delete exc.id;
          return exc;
        });
        return item;
      });

      await conditionalInputItemsApi.post(conditionalInputItem);
      router.push({ pathname: `/conditional/${id}/result` });
    },
  };

  return { buttonHandlers };
}

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
