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

export type DecisionTypes = "random" | "conditional" | "weighted" | "error";
