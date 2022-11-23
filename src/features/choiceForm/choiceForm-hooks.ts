import { useForm } from "@mantine/form";
import { FormValidateInput, UseFormReturnType } from "@mantine/form/lib/types";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import React, { ChangeEvent, useCallback, useEffect } from "react";
import { Choice } from "../../common/domains/domains";
import { IDecision } from "../../common/types/decision-types";
import { TExtraFormConfig, TFormHelpers } from "./choiceForm-types";

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
      setUnsavedChanges(
        form.values.name.trim().length > 0 ||
          form.values.choices.filter((i) => i.name.trim().length > 0).length > 0
      );
    }
  }, [form.values]);

  const formHelpers = {
    editName(name: string) {
      form.setFieldValue("name", name as any);
      extraFormConfig?.onEditName(+decisionId, name, initialValues as any);
    },
    removeChoice(id: number, itemID?: number) {
      form.removeListItem("choices", id);
      extraFormConfig?.onRemoveChoice(itemID as number);
    },
    async addChoice() {
      if (form.values.choices.length < 100) {
        const changedID = await extraFormConfig?.onAddChoice(+decisionId);
        form.insertListItem("choices", {
          id: changedID ?? form.values.choices.length,
          name: "",
        });
      } else {
        alert("Maximum 100 choices");
      }
    },
    editChoice(id: number, value: T) {
      extraFormConfig?.onEditChoice(id, value);
    },
    decide() {
      form.values.choices = form.values.choices.filter(
        (i) => i.name.trim() != ""
      );

      if (form.validateField("choices").hasError) {
        alert(form.validateField("choices").error);
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
  form: UseFormReturnType<T, (values: T) => T>,
  index: number,
  decisionID?: number,
  itemID?: number
) {
  const editHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (typeof itemID == "number") {
      formHelpers.editChoice(
        itemID as any,
        new Choice(e.target.value, itemID, decisionID)
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
