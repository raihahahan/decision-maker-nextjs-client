export interface Decision {
  name: string;
  createdAt: string;
  updatedAt: string;
  choices: Choice[];
}

export interface Choice {
  name: string;
}

export interface WeightedResult {
  choiceId: number;
  totalWeight: number;
  name: string;
}
