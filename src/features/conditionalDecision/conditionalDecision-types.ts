import { Decision } from "../../common/types/decision-types";

export interface Condition {
  innerItem: {
    choiceId: number;
  };
}

export interface ConditionalInput extends Condition {
  value: boolean;
}

export interface ConditionalDecisionItem extends Decision {
  conditions: Condition[];
}
