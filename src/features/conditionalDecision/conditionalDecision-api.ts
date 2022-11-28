import DAL from "../../common/domains/DAL";
import DecisionDAL from "../../common/domains/DecisionDAL";
import { IChoice } from "../../common/types/decision-types";
import CONSTANTS from "../../common/utils/constants";
import { API_URL } from "../../common/utils/globals";
import { IConditionalDecisionItem } from "./conditionalDecision-types";

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

const conditionalChoiceApi = new ConditionalChoiceAPI();

export default new ConditionalDecisionAPI();
export { conditionalChoiceApi };
