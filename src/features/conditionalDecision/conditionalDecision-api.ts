import DAL from "../../common/domains/DAL";
import DecisionDAL from "../../common/domains/DecisionDAL";
import { IChoice } from "../../common/types/decision-types";
import CONSTANTS from "../../common/utils/constants";
import { API_URL } from "../../common/utils/globals";
import {
  ICondition,
  IConditionalDecisionItem,
  IConditionalInput,
  IConditionalInputItem,
  IInnerItemExclude,
  IInnerItemInclude,
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

class ConditionalConditionsAPI extends DAL<ICondition> {
  constructor() {
    super(`${API_URL}/api/${CONSTANTS.CONDITIONAL.CONDITIONS}`);
  }
}

class ConditionalIncludeAPI extends DAL<IInnerItemInclude> {
  constructor() {
    super(`${API_URL}/api/${CONSTANTS.CONDITIONAL.INCLUDE}`);
  }
}

class ConditionalExcludeAPI extends DAL<IInnerItemExclude> {
  constructor() {
    super(`${API_URL}/api/${CONSTANTS.CONDITIONAL.EXCLUDE}`);
  }
}

const conditionalChoiceApi = new ConditionalChoiceAPI();
const conditionalInputItemsApi = new ConditionalInputItemsAPI();
const conditionalInputsApi = new ConditionalInputsAPI();
const conditionalConditionsApi = new ConditionalConditionsAPI();
const conditionalIncludeApi = new ConditionalIncludeAPI();
const conditionalExcludeApi = new ConditionalExcludeAPI();

export default new ConditionalDecisionAPI();
export {
  conditionalChoiceApi,
  conditionalInputItemsApi,
  conditionalInputsApi,
  conditionalConditionsApi,
  conditionalIncludeApi,
  conditionalExcludeApi,
};
