import { useForm } from "@mantine/form";
import { FormValidateInput, UseFormReturnType } from "@mantine/form/lib/types";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import React, { ChangeEvent, useCallback, useEffect } from "react";
import { Choice } from "../../common/domains/domains";
import { IDecision } from "../../common/types/decision-types";
import { TExtraFormConfig, TFormHelpers } from "./choiceForm-types";
import { formUnsaveChangesListener } from "./choiceForm-utils";
import { v4 as uuidv4 } from "uuid";

export default function useChoiceForm<T extends IDecision>(
  initialValues: T,
  validate: FormValidateInput<T>,
  setUnsavedChanges?: React.Dispatch<React.SetStateAction<boolean>>,
  extraFormConfig?: TExtraFormConfig<T>
) {
  // extraFormConfig is for choice form edit
  const router = useRouter();
  const form = useForm<T>({
    initialValues,
    validate,
  });
  const decisionId = router.query.id as string;

  useEffect(() => {
    form.setValues(initialValues);
  }, []);

  useEffect(() => {
    if (setUnsavedChanges) {
      setUnsavedChanges(formUnsaveChangesListener(form));
    }
  }, [form.values]);

  const formHelpers = {
    editName(name: string) {
      form.setFieldValue("name", name as any);
      extraFormConfig?.onEditName(+decisionId, name, initialValues as any);
    },
    removeChoice(id: number, itemID?: number) {
      debounce(() => form.removeListItem("choices", id), 300)();
      extraFormConfig?.onRemoveChoice(itemID as number);
    },
    async addChoice() {
      if (form.values.choices.length < 100) {
        const newChoice = await extraFormConfig?.onAddChoice(+decisionId);

        form.insertListItem("choices", newChoice);
      } else {
        alert("Maximum 100 choices");
      }
    },
    editChoice(id: number, value: T, index: number) {
      form.setFieldValue(`choices.${index}.name`, value.name as any);
      extraFormConfig?.onEditChoice(id, value);
    },
    decide() {
      if (form.validateField("choices").hasError) {
        alert(form.validateField("choices").error);
      } else {
        form.values.choices = form.values.choices.filter(
          (i) => i.name.trim() != ""
        );
      }
      if (setUnsavedChanges) setUnsavedChanges(false);
    },
    cancel() {
      router.back();
    },
  };

  return {
    form,
    formHelpers,
  };
}

export function useChoiceInput<T>(
  formHelpers: TFormHelpers,
  form: UseFormReturnType<IDecision, (values: IDecision) => IDecision>,
  index: number,
  decisionID?: number,
  itemID?: number
) {
  const editHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (typeof itemID == "number") {
      const currChoice = form.values.choices.find((i) => i.id == itemID);
      formHelpers.editChoice(
        itemID as any,
        { ...currChoice, name: e.target.value },
        index
      );
    } else return;
  };
  const debouncedEdit = useCallback(debounce(editHandler, 300), []);
  const finalOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedEdit(e);
    form.setFieldValue(`choices.${index}.name`, e.target.value as any);
  };

  return { finalOnChange };
}

export function useDecisionInput<T>(
  formHelpers: TFormHelpers,
  form: UseFormReturnType<T, (values: T) => T>,
  decisionID?: number
) {
  const editHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (typeof decisionID == "number") {
      formHelpers.editName(e.target.value);
    } else return;
  };
  const debouncedEdit = useCallback(debounce(editHandler, 300), []);
  const finalOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedEdit(e);
    form.setFieldValue("name", e.target.value as any);
  };

  return { finalOnChange };
}
