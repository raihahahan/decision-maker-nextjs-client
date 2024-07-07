import { ButtonProps } from "@mantine/core";
import { routes } from "../../features/site/site-types";
import { DecisionTypes } from "../types/decision-types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type DecisionTypeItemsType = {
  name: routes;
  displayName: string;
  color: ButtonProps["color"];
  description: string[];
  imgSrc?: string;
  type: DecisionTypes;
};

export const DecisionTypeItems: DecisionTypeItemsType[] = [
  {
    name: "/random/create",
    displayName: "Random",
    color: "cyan",
    description: [
      "Give a decision name.",
      "Provide a list of choices.",
      "Random Decision maker will choose a decision randomly.",
    ],
    imgSrc: "/images/random-decision-index-card.png",
    type: "random",
  },
  {
    name: "/weighted/create",
    displayName: "Weighted",
    color: "violet",
    description: [
      "Give a decision name.",
      "Provide a list of choices.",
      "Provide a list of criteria affecting your decision making.",
      "For each choice, rate the decision based on the given criteria.",
    ],
    imgSrc: "/images/weighted-decision-index-card.png",
    type: "weighted",
  },
  {
    name: "/conditional/create",
    displayName: "Conditional",
    color: "blue",
    description: [
      "Give a decision name.",
      "Provide a list of choices.",
      "Provide a list of boolean conditions (true or false) affecting your decision making.",
      "Choose the value of the conditions.",
    ],
    imgSrc: "/images/conditional-decision-index-card.png",
    type: "conditional",
  },
];
