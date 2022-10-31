import { Decision } from "../../common/types/decision-types";

export interface Condition {
  id?: number;
  innerItem: {
    id?: number;
    choiceId: number;
  };
}

export interface ConditionalInput extends Condition {
  value: boolean;
}

export interface ConditionalDecisionItem extends Decision {
  conditions: Condition[];
}
