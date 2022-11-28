import { IConditionalDecisionItem } from "../../features/conditionalDecision/conditionalDecision-types";
import { IRandomDecisionItem } from "../../features/randomDecision/randomDecision-types";
import { IWeightedDecisionItem } from "../../features/weightedDecision/weightedDecision-types";

export interface IDecision {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  choices: IChoice[];
}

export interface IChoice {
  id?: number;
  name: string;
  decisionId?: number;
}

export interface IWeightedResult {
  id?: number;
  choiceId: number;
  totalWeight: number;
  name: string;
}

export interface IFinalResult {
  weightedResults: IWeightedResult[];
  decisionName: string;
  type: DecisionTypes;
}

export type pushQuery = {
  query: {
    data: { dec: string; id: number };
  };
};

export interface IDecisionReducer<T extends IDecision> {
  set(data: T[]): void;
  add(data: T): void;
  update(id: number, data: T): void;
  remove(id: number): void;
}

export type TDecisionReducerState = {
  decision: {
    randomDecision: IRandomDecisionItem[];
    weightedDecision: IWeightedDecisionItem[];
    conditionalDecision: IConditionalDecisionItem[];
  };
};

export type DecisionTypes = "random" | "conditional" | "weighted" | "error";

export interface IUseDecisionReducer {
  decisionLocalData: IDecision[];
  decisionActions: IDecisionReducer<IDecision>;
}
