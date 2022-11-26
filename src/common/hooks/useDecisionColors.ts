import { useMantineTheme } from "@mantine/core";
import { DecisionTypes } from "../types/decision-types";
import { DecisionTypeItems } from "../utils/globals";

export default function useDecisionColors(type: DecisionTypes) {
  const mantineColors = useMantineTheme().colors;
  const elementColor =
    mantineColors[
      DecisionTypeItems.find((i) => i.type == type)?.color ?? "blue"
    ][6];

  return { elementColor };
}
