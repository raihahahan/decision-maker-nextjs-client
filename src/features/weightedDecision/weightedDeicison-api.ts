import DAL from "../../common/domains/DAL";
import DecisionDAL from "../../common/domains/DecisionDAL";
import { API_URL } from "../../common/utils/globals";
import {
  IWeightedDecisionItem,
  IWeightedInputItem,
} from "./weightedDecision-types";

class WeightedDecisionAPI extends DecisionDAL<IWeightedDecisionItem> {
  constructor() {
    super(`${API_URL}/api/WeightedDecisionItems`);
  }
}

class WeightedInputAPI extends DAL<IWeightedInputItem> {
  constructor() {
    super(`${API_URL}/api/WeightedInputItems`);
  }
}

const weightedInputApi = new WeightedInputAPI();

export default new WeightedDecisionAPI();
export { weightedInputApi };
