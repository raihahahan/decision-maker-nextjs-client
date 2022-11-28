import { IRandomDecisionItem } from "./randomDecision-types";
import { API_URL } from "../../common/utils/globals";
import DecisionDAL from "../../common/domains/DecisionDAL";
import { IChoice } from "../../common/types/decision-types";
import DAL from "../../common/domains/DAL";
import CONSTANTS from "../../common/utils/constants";

class RandomDecisionAPI extends DecisionDAL<IRandomDecisionItem> {
  constructor() {
    super(`${API_URL}/api/${CONSTANTS.RANDOM.DECISION_ITEM}`);
  }
}

class RandomChoiceAPI extends DAL<IChoice> {
  constructor() {
    super(`${API_URL}/api/${CONSTANTS.RANDOM.CHOICES}`);
  }
}

const randomChoiceApi = new RandomChoiceAPI();
export default new RandomDecisionAPI();
export { randomChoiceApi };
