import { ButtonProps } from "@mantine/core";
import { routes } from "../../features/site/site-types";

export const API_URL = "https://localhost:7239";

export type DecisionTypeItemsType = {
  name: routes;
  displayName: string;
  color: ButtonProps["color"];
  description: string[];
  imgSrc?: string;
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
  },
];
