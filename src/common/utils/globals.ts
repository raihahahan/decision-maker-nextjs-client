import { ButtonProps } from "@mantine/core";
import { DecisionTypes } from "../types/decision-types";

export const API_URL = "https://localhost:7239";

export type DecisionTypeItemsType = {
  name: DecisionTypes;
  displayName: string;
  color: ButtonProps["color"];
  description: string;
};

export const DecisionTypeItems: DecisionTypeItemsType[] = [
  {
    name: "random",
    displayName: "Random",
    color: "cyan",
    description:
      "Provide a list of choices. This will randomly pick one choice as the final decision.",
  },
  {
    name: "conditional",
    displayName: "Conditional",
    color: "blue",
    description:
      "From a list of choices, provide a list of binary conditions affecting your decision.",
  },
  {
    name: "weighted",
    displayName: "Weighted",
    color: "violet",
    description:
      "Given a list of choices, provide criteria affecting your decision making (both positively and negatively). The tool will return a ranked list of choices based on the provided criteria.",
  },
];
