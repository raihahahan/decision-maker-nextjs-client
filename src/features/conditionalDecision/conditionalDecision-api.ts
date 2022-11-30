import DAL from "../../common/domains/DAL";
import DecisionDAL from "../../common/domains/DecisionDAL";
import { IChoice } from "../../common/types/decision-types";
import CONSTANTS from "../../common/utils/constants";
import { API_URL } from "../../common/utils/globals";
import {
  IConditionalDecisionItem,
  IConditionalInput,
  IConditionalInputItem,
} from "./conditionalDecision-types";

class ConditionalDecisionAPI extends DecisionDAL<IConditionalDecisionItem> {
  constructor() {
    super(`${API_URL}/api/${CONSTANTS.CONDITIONAL.DECISION_ITEM}`);
  }
}

class ConditionalChoiceAPI extends DAL<IChoice> {
  constructor() {
    super(`${API_URL}/api/${CONSTANTS.CONDITIONAL.CHOICES}`);
  }
}

class ConditionalInputItemsAPI extends DAL<IConditionalInputItem> {
  constructor() {
    super(`${API_URL}/api/${CONSTANTS.CONDITIONAL.INPUT_ITEMS}`);
  }
}

class ConditionalInputsAPI extends DAL<IConditionalInput> {
  constructor() {
    super(`${API_URL}/api/${CONSTANTS.CONDITIONAL.INPUTS}`);
  }
}

const conditionalChoiceApi = new ConditionalChoiceAPI();
const conditionalInputItemsApi = new ConditionalInputItemsAPI();
const conditionalInputsApi = new ConditionalInputsAPI();

export default new ConditionalDecisionAPI();
export { conditionalChoiceApi, conditionalInputItemsApi, conditionalInputsApi };
