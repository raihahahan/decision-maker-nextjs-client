import { useForm } from "@mantine/form";
import { useState } from "react";
import { Decision } from "../../common/types/decision-types";

export default function useChoiceForm() {
  const [formVal, setFormVal] = useState<Decision>({
    name: "",
    choices: [
      {
        id: 0,
        name: "",
      },
    ],
  });

  const form = useForm<Decision>({
    initialValues: {
      name: "",
      choices: [
        {
          id: 0,
          name: "",
        },
      ],
    },
    validate: {
      name: (val) => (val.length > 0 ? null : "Invalid decision name."),
      choices: (val) =>
        val.length <= 1
          ? "Please provide more than 1 choices"
          : val.filter((i) => i.name.length == 0).length > 0
          ? "Make sure that all choices are filled."
          : null,
    },
  });

  const ChoiceInput = {
    setName(q: string) {
      setFormVal((prev) => {
        return { ...prev, name: q };
      });
    },

    setChoice(id: number, q: string) {
      setFormVal((prev) => {
        return {
          ...prev,
          choices: prev.choices.map((i) => {
            if (i.id == id) {
              return { ...i, name: q };
            } else return i;
          }),
        };
      });
    },
    addChoice() {
      setFormVal((prev) => {
        return {
          ...prev,
          choices: [...prev.choices, { id: prev.choices.length, name: "" }],
        };
      });
    },
    removeChoice(id: number) {
      setFormVal((prev) => {
        return { ...prev, choices: prev.choices.filter((i) => i.id != id) };
      });
    },
  };

  return {
    form,
    formSetters: { formVal, setFormVal },
    ChoiceInput,
  };
}
