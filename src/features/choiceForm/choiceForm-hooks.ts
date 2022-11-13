import { useForm } from "@mantine/form";
import { FormValidateInput } from "@mantine/form/lib/types";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { IDecision } from "../../common/types/decision-types";
import { TExtraFormConfig } from "./choiceForm-types";

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
