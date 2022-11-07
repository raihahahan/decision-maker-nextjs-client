import { ButtonProps } from "@mantine/core";
import { DecisionTypes } from "../types/decision-types";

export const API_URL = "https://localhost:7239";

export const DecisionTypeItems: {
  name: DecisionTypes;
  displayName: string;
  color: ButtonProps["color"];
}[] = [
  {
    name: "random",
    displayName: "Random",
    color: "cyan",
  },
  {
    name: "conditional",
    displayName: "Conditional",
    color: "blue",
  },
  {
    name: "weighted",
    displayName: "Weighted",
    color: "violet",
  },
];
