import { useForm } from "@mantine/form";
import { useState } from "react";
import { IChoice } from "../../common/types/decision-types";

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

  const [formChoices, setFormChoices] = useState<IChoice[]>(
    choicesInitialVal.choices
  );

  const form = useForm({
    initialValues: choicesInitialVal,
    validate: {
      name: (value: string) => (value.length > 0 ? null : "Invalid name"),
      choices: (value: IChoice[]) => {
        return value.length > 0 ? null : "Input at least 2 choices.";
      },
    },
  });

  return form;
}
