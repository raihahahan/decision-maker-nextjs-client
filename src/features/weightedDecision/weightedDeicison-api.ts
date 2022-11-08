import DAL from "../../common/domains/DAL";
import { API_URL } from "../../common/utils/globals";
import { IWeightedDecisionItem } from "./weightedDecision-types";

class WeightedDecisionAPI extends DAL<IWeightedDecisionItem> {
  constructor() {
    super(`${API_URL}/api/WeightedDecisionItems`);
  }
}

export default new WeightedDecisionAPI();
