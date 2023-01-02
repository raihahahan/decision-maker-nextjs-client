import { axios } from "../../common/api/Axios";
import DAL from "../../common/domains/DAL";
import DecisionDAL from "../../common/domains/DecisionDAL";
import { appendApi, pathCombine } from "../../common/utils/api-utils";
import CONSTANTS from "../../common/utils/constants";
import {
  IWeightedDecisionItem,
  IWeightedInputItem,
} from "./weightedDecision-types";

class WeightedDecisionAPI extends DecisionDAL<IWeightedDecisionItem> {
  constructor() {
    super(appendApi(CONSTANTS.WEIGHTED.DECISION_ITEM));
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
      const endpoint = pathCombine(false, this.decisionType);
      const res = await axios.post<any, IWeightedDecisionItem>(endpoint, input);
      return res;
    } catch (error) {
      return { name: null, choices: [] } as any;
    }
  }
}

class WeightedInputAPI extends DAL<IWeightedInputItem> {
  constructor() {
    super(appendApi(CONSTANTS.WEIGHTED.INPUT_ITEMS));
  }
}

const weightedInputApi = new WeightedInputAPI();

export default new WeightedDecisionAPI();
export {
  weightedInputApi,
};
