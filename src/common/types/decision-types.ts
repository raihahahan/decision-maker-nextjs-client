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
}

export interface IWeightedResult {
  id?: number;
  choiceId: number;
  totalWeight: number;
  name: string;
}

export type pushQuery = {
  query: {
    data: { dec: string; id: number };
  };
};
