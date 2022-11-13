import { ButtonProps } from "@mantine/core";
import { routes } from "../../features/site/site-types";
import { DecisionTypes } from "../types/decision-types";

export const API_URL = "https://localhost:7239";

export type DecisionTypeItemsType = {
  name: routes;
  displayName: string;
  color: ButtonProps["color"];
  description: string;
};

export const DecisionTypeItems: DecisionTypeItemsType[] = [
  {
    name: "/random/create",
    displayName: "Random",
    color: "cyan",
    description:
      "Provide a list of choices. This will randomly pick one choice as the final decision.",
  },
  {
    name: "/conditional/create",
    displayName: "Conditional",
    color: "blue",
    description:
      "From a list of choices, provide a list of binary conditions affecting your decision.",
  },
  {
    name: "/weighted/create",
    displayName: "Weighted",
    color: "violet",
    description:
      "Given a list of choices, provide criteria affecting your decision making (both positively and negatively). The tool will return a ranked list of choices based on the provided criteria.",
  },
];
