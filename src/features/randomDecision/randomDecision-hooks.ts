import { useForm } from "@mantine/form";
import { useState } from "react";
import { Choice } from "../../common/types/decision-types";

export default function useRandomDecisionForm() {
  const choicesInitialVal = {
    name: "",
    choices: [
      {
        name: "",
      },
      {
        name: "",
      },
      {
        name: "",
      },
    ],
  };

  const [formChoices, setFormChoices] = useState<Choice[]>(
    choicesInitialVal.choices
  );

  const form = useForm({
    initialValues: choicesInitialVal,
    validate: {
      name: (value: string) => (value.length > 0 ? null : "Invalid name"),
      choices: (value: Choice[]) => {
        return value.length > 0 ? null : "Input at least 2 choices.";
      },
    },
  });

  return form;
}
