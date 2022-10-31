export interface Decision {
  id?: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  choices: Choice[];
}

export interface Choice {
  id?: number;
  name: string;
}

export interface WeightedResult {
  id?: number;
  choiceId: number;
  totalWeight: number;
  name: string;
}
