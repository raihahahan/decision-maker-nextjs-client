import DAL from "../../common/domains/DAL";
import DecisionDAL from "../../common/domains/DecisionDAL";
import { IChoice } from "../../common/types/decision-types";
import { appendApi } from "../../common/utils/api-utils";
import CONSTANTS from "../../common/utils/constants";
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
    super(appendApi(CONSTANTS.CONDITIONAL.DECISION_ITEM));
  }
}

class ConditionalChoiceAPI extends DAL<IChoice> {
  constructor() {
    super(appendApi(CONSTANTS.CONDITIONAL.CHOICES));
  }
}

class ConditionalInputItemsAPI extends DAL<IConditionalInputItem> {
  constructor() {
    super(appendApi(CONSTANTS.CONDITIONAL.INPUT_ITEMS));
  }
}

class ConditionalInputsAPI extends DAL<IConditionalInput> {
  constructor() {
    super(appendApi(CONSTANTS.CONDITIONAL.INPUTS));
  }
}

class ConditionalConditionsAPI extends DAL<ICondition> {
  constructor() {
    super(appendApi(CONSTANTS.CONDITIONAL.CONDITIONS));
  }
}

class ConditionalIncludeAPI extends DAL<IInnerItemInclude> {
  constructor() {
    super(appendApi(CONSTANTS.CONDITIONAL.INCLUDE));
  }
}

class ConditionalExcludeAPI extends DAL<IInnerItemExclude> {
  constructor() {
    super(appendApi(CONSTANTS.CONDITIONAL.EXCLUDE));
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
