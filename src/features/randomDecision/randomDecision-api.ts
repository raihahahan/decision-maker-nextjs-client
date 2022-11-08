import { IRandomDecisionItem } from "./randomDecision-types";
import { API_URL } from "../../common/utils/globals";
import DAL from "../../common/domains/DAL";

class RandomDecisionAPI extends DAL<IRandomDecisionItem> {
  constructor() {
    super(`${API_URL}/api/RandomDecisionItems`);
  }
}

export default new RandomDecisionAPI();
