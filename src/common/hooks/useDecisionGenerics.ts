import conditionalDecisionApi from "../../features/conditionalDecision/conditionalDecision-api";
import { useConditionalDecisionReducer } from "../../features/conditionalDecision/conditionalDecision-hooks";
import randomDecisionApi from "../../features/randomDecision/randomDecision-api";
import { useRandomDecisionReducer } from "../../features/randomDecision/randomDecision-hooks";
import { useWeightedDecisionReducer } from "../../features/weightedDecision/weightedDecision-hooks";
import weightedDeicisonApi from "../../features/weightedDecision/weightedDeicison-api";
import { DecisionTypes, IUseDecisionReducer } from "../types/decision-types";

export default function useDecisionGenerics(type: DecisionTypes) {
  const { decisionActions, decisionLocalData } =
    type == "random"
      ? useRandomDecisionReducer()
      : type == "weighted"
      ? useWeightedDecisionReducer()
      : type == "conditional"
      ? useConditionalDecisionReducer()
      : useRandomDecisionReducer();

  const decisionApi =
    type == "random"
      ? randomDecisionApi
      : type == "weighted"
      ? weightedDeicisonApi
      : type == "conditional"
      ? conditionalDecisionApi
      : randomDecisionApi;

  return { decisionApi, decisionActions, decisionLocalData };
}
