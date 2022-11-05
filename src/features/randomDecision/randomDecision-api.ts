import { IChoice, IDecision } from "../../common/types/decision-types";
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
      alert(error + " error get");
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
      alert(error + " error post");
      return { name: "", choices: [] };
    }
  }

  public async decide(id: number): Promise<IChoice> {
    try {
      const res = await axios.post(
        `${API_URL}/api/RandomDecisionItems/${id}/decide`
      );
      return res.data as IChoice;
    } catch (error) {
      alert(error + " error decide");
      return { name: "", id: -1 };
    }
  }
}

export default new RandomDecisionAPI();
