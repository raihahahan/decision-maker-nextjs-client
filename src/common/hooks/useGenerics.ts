import randomDecisionApi from "../../features/randomDecision/randomDecision-api";
import { useRandomDecisionReducer } from "../../features/randomDecision/randomDecision-hooks";
import { useWeightedDecisionReducer } from "../../features/weightedDecision/weightedDecision-hooks";
import weightedDeicisonApi from "../../features/weightedDecision/weightedDeicison-api";
import { DecisionTypes } from "../types/decision-types";

export default function useGenerics(type: DecisionTypes) {
  const { randomDecisionActions, randomDecisionLocalData } =
    useRandomDecisionReducer();
  const { weightedDecisionActions, weightedDecisionLocalData } =
    useWeightedDecisionReducer();

  const decisionApi =
    type == "random"
      ? randomDecisionApi
      : type == "weighted"
      ? weightedDeicisonApi
      : undefined;

  const decisionActions =
    type == "random"
      ? randomDecisionActions
      : type == "weighted"
      ? weightedDecisionActions
      : undefined;

  const reducerData =
    type == "random"
      ? randomDecisionLocalData
      : type == "weighted"
      ? weightedDecisionLocalData
      : undefined;

  return { decisionApi, decisionActions, reducerData };
}
