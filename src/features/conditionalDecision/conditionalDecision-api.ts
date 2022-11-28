import DecisionDAL from "../../common/domains/DecisionDAL";
import CONSTANTS from "../../common/utils/constants";
import { API_URL } from "../../common/utils/globals";
import { IConditionalDecisionItem } from "./conditionalDecision-types";

class ConditionalDecisionAPI extends DecisionDAL<IConditionalDecisionItem> {
  constructor() {
    super(`${API_URL}/api/${CONSTANTS.CONDITIONAL.DECISION_ITEM}`);
  }
}

export default new ConditionalDecisionAPI();
