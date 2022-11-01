export interface Decision {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  name: string;
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
