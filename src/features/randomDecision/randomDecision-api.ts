import { IDecision, IWeightedResult } from "../../common/types/decision-types";
import { IRandomDecisionItem } from "./randomDecision-types";
import axios from "axios";
import { API_URL } from "../../common/utils/globals";
import DAL from "../../common/domains/DAL";

class RandomDecisionAPI extends DAL<IRandomDecisionItem> {
  public async get(): Promise<IRandomDecisionItem[]> {
    try {
      const res = await axios.get(`${API_URL}/api/RandomDecisionItems`);
      return res.data as IRandomDecisionItem[];
    } catch (error) {
      alert(error);
      return [];
    }
  }

  public async post(input: IDecision): Promise<IDecision> {
    try {
      delete input?.id;
      for (let item of input.choices) {
        delete item?.id;
      }
      const res = await axios.post(`${API_URL}/api/RandomDecisionItems`, input);
      return res.data as IDecision;
    } catch (error) {
      alert(error);
      return { name: "", choices: [] };
    }
  }

  public async decide(id: number): Promise<IWeightedResult[]> {
    try {
      const res = await axios.post(
        `${API_URL}/api/RandomDecisionItems/${id}/decide`
      );
      return res.data as IWeightedResult[];
    } catch (error) {
      alert(error);
      return [];
    }
  }
}

export default new RandomDecisionAPI();
