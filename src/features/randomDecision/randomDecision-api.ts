import { IRandomDecisionItem } from "./randomDecision-types";
import DecisionDAL from "../../common/domains/DecisionDAL";
import CONSTANTS from "../../common/utils/constants";
import { appendApi } from "../../common/utils/api-utils";

class RandomDecisionAPI extends DecisionDAL<IRandomDecisionItem> {
  constructor() {
    super(appendApi(CONSTANTS.RANDOM.DECISION_ITEM));
  }
}

export default new RandomDecisionAPI();
