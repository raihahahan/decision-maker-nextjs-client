import { useForm } from "@mantine/form";
import { useState } from "react";
import { IDecision } from "../../common/types/decision-types";

export default function useChoiceForm() {
  const initialValues = {
    name: "",
    choices: [
      {
        id: 0,
        name: "",
      },
      {
        id: 1,
        name: "",
      },
    ],
  };

  const form = useForm<IDecision>({
    initialValues,
    validate: {
      name: (val) => (val.length > 0 ? null : "Invalid decision name."),
      choices: (val) =>
        val.length <= 1
          ? "Please provide more than 1 choices"
          : val.length > 10
          ? "Maximum 10 choices"
          : null,
    },
  });

  const formHelpers = {
    removeChoice(id: number) {
      form.removeListItem("choices", id);
    },
    addChoice() {
      if (form.values.choices.length < 10) {
        form.insertListItem("choices", {
          id: form.values.choices.length,
          name: "",
        });
      } else {
        alert("Maximum 10 choices");
      }
    },
    decide() {
      form.values.choices = form.values.choices.filter(
        (i) => i.name.trim() != ""
      );
      if (form.values.choices.length < 2)
        form.values.choices = initialValues.choices;
      form.validateField("choices").hasError
        ? alert(form.validateField("choices").error)
        : null;
    },
  };

  return {
    form,
    formHelpers,
  };
}
