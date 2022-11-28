import axios from "axios";
import DAL from "../../common/domains/DAL";
import DecisionDAL from "../../common/domains/DecisionDAL";
import { IChoice } from "../../common/types/decision-types";
import CONSTANTS from "../../common/utils/constants";
import { API_URL } from "../../common/utils/globals";
import {
  ICriteria,
  ICriteriaInput,
  IWeightedDecisionItem,
  IWeightedInput,
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
      // alert(error);
      return { name: JSON.stringify(error), choices: [] } as any;
    }
  }
}

class WeightedInputAPI extends DAL<IWeightedInputItem> {
  constructor() {
    super(`${API_URL}/api/${CONSTANTS.WEIGHTED.INPUT_ITEMS}`);
  }
}

class WeightedInputsAPI extends DAL<IWeightedInput> {
  constructor() {
    super(`${API_URL}/api/${CONSTANTS.WEIGHTED.INPUTS}`);
  }
}

class WeightedChoiceApi extends DAL<IChoice> {
  constructor() {
    super(`${API_URL}/api/${CONSTANTS.WEIGHTED.CHOICES}`);
  }
}

class WeightedCriteriaApi extends DAL<ICriteria> {
  constructor() {
    super(`${API_URL}/api/${CONSTANTS.WEIGHTED.CRITERIAS}`);
  }
}

class WeightedCriteriaInputApi extends DAL<ICriteriaInput> {
  constructor() {
    super(`${API_URL}/api/${CONSTANTS.WEIGHTED.CRITERIA_INPUTS}`);
  }

  public async editCriteriaName(
    criteriaId: number,
    criteriaInput: ICriteriaInput
  ) {
    try {
      await axios.put(`${this.route}/${criteriaId}/editName`, criteriaInput);
    } catch (error) {
      alert(error);
    }
  }
}

const weightedInputApi = new WeightedInputAPI();
const weightedInputsApi = new WeightedInputsAPI();
const weightedChoiceApi = new WeightedChoiceApi();
const weightedCriteriaApi = new WeightedCriteriaApi();
const weightedCriteriaInputApi = new WeightedCriteriaInputApi();

export default new WeightedDecisionAPI();
export {
  weightedInputApi,
  weightedInputsApi,
  weightedChoiceApi,
  weightedCriteriaApi,
  weightedCriteriaInputApi,
};
