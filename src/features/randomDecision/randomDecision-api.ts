import { IRandomDecisionItem } from "./randomDecision-types";
import { API_URL } from "../../common/utils/globals";
import DecisionDAL from "../../common/domains/DecisionDAL";
import CONSTANTS from "../../common/utils/constants";

class RandomDecisionAPI extends DecisionDAL<IRandomDecisionItem> {
  constructor() {
    super(`${API_URL}/api/${CONSTANTS.RANDOM.DECISION_ITEM}`);
  }
}

export default new RandomDecisionAPI();
