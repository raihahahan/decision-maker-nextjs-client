import {
  IDecision,
  IFinalResult,
  IWeightedResult,
} from "../../common/types/decision-types";
import { IRandomDecisionItem } from "./randomDecision-types";
import axios from "axios";
import { API_URL } from "../../common/utils/globals";
import DAL from "../../common/domains/DAL";

class RandomDecisionAPI extends DAL<IRandomDecisionItem> {
  https = require("https");
  agent = new this.https.Agent({
    rejectUnauthorized: false,
  });

  public async get(): Promise<IRandomDecisionItem[]> {
    try {
      const res = await axios.get(`${API_URL}/api/RandomDecisionItems`);
      return res.data as IRandomDecisionItem[];
    } catch (error) {
      // alert(error);
      return [];
    }
  }

  public async getById(id: number): Promise<IRandomDecisionItem> {
    try {
      const res = await fetch(`${API_URL}/api/RandomDecisionItems/${id}`, {
        method: "GET",
        mode: "cors",
        agent: this.agent,
      } as any);
      const jsonData: IRandomDecisionItem = await res.json();
      return jsonData;
    } catch (error) {
      return { name: JSON.stringify(error), choices: [] };
    }
  }

  public async put(id: number, value: IDecision): Promise<void> {
    try {
      await axios.put(`${API_URL}/api/RandomDecisionItems/${id}`, value);
    } catch (error) {
      alert(error);
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
      // alert(error);
      return { name: JSON.stringify(error), choices: [] };
    }
  }

  public async decide(id: number): Promise<IFinalResult> {
    try {
      const res = await fetch(
        `${API_URL}/api/RandomDecisionItems/${id}/decide`,
        { method: "POST", mode: "cors", agent: this.agent } as any
      );
      const jsonData: IFinalResult = await res.json();
      return jsonData;
    } catch (error) {
      // alert(error);
      return { decisionName: "", weightedResults: [], type: "error" };
    }
  }
}

export default new RandomDecisionAPI();
