import axios from "axios";
import DAL from "../../common/domains/DAL";
import DecisionDAL from "../../common/domains/DecisionDAL";
import CONSTANTS from "../../common/utils/constants";
import { API_URL } from "../../common/utils/globals";
import {
  IWeightedDecisionItem,
  IWeightedInputItem,
} from "./weightedDecision-types";

class WeightedDecisionAPI extends DecisionDAL<IWeightedDecisionItem> {
  constructor() {
    super(`${API_URL}/api/${CONSTANTS.WEIGHTED.DECISION_ITEM}`);
  }

  public override async post(
    input: IWeightedDecisionItem
  ): Promise<IWeightedDecisionItem> {
    try {
      delete input?.id;
      for (let item of input.choices) {
        delete item?.id;
      }
      for (let item of input.criteriaList) {
        delete item?.id;
      }
      const res = await axios.post(`${this.route}`, input);
      return res.data as IWeightedDecisionItem;
    } catch (error) {
      return { name: JSON.stringify(error), choices: [] } as any;
    }
  }
}

class WeightedInputAPI extends DAL<IWeightedInputItem> {
  constructor() {
    super(`${API_URL}/api/${CONSTANTS.WEIGHTED.INPUT_ITEMS}`);
  }
}

const weightedInputApi = new WeightedInputAPI();

export default new WeightedDecisionAPI();
export {
  weightedInputApi,
};
