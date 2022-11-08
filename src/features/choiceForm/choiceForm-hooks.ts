import { useForm } from "@mantine/form";
import { FormValidateInput } from "@mantine/form/lib/types";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { IDecision } from "../../common/types/decision-types";

export default function useChoiceForm<T extends IDecision>(
  initialValues: T,
  validate: FormValidateInput<T>,
  setUnsavedChanges?: React.Dispatch<React.SetStateAction<boolean>>
) {
  const router = useRouter();
  const form = useForm<T>({
    initialValues,
    validate,
  });

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
    removeChoice(id: number) {
      form.removeListItem("choices", id);
    },
    addChoice() {
      if (form.values.choices.length < 100) {
        form.insertListItem("choices", {
          id: form.values.choices.length,
          name: "",
        });
      } else {
        alert("Maximum 100 choices");
      }
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
