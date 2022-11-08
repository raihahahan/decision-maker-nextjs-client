import { IDecision, IFinalResult } from "../types/decision-types";
import axios from "axios";
import { API_URL } from "../utils/globals";
// DAL: Data Access Layer

abstract class DAL<T extends IDecision> {
  https = require("https");
  agent = new this.https.Agent({
    rejectUnauthorized: false,
  });
  route: string = "";

  constructor(route: string) {
    this.route = route;
  }

  public async get(): Promise<T[]> {
    try {
      const res = await axios.get(`${this.route}`);
      return res.data as T[];
    } catch (error) {
      // alert(error);
      return [];
    }
  }

  public async getById(id: number): Promise<T> {
    try {
      const res = await fetch(`${this.route}/${id}`, {
        method: "GET",
        mode: "cors",
        agent: this.agent,
      } as any);
      const jsonData: T = await res.json();
      return jsonData;
    } catch (error) {
      return { name: "", choices: [] } as any;
    }
  }

  public async put(id: number, value: T): Promise<void> {
    try {
      await axios.put(`${this.route}/${id}`, value);
    } catch (error) {
      alert(error);
    }
  }

  public async post(input: T): Promise<T> {
    try {
      delete input?.id;
      for (let item of input.choices) {
        delete item?.id;
      }
      const res = await axios.post(`${this.route}`, input);
      return res.data as T;
    } catch (error) {
      // alert(error);
      return { name: JSON.stringify(error), choices: [] } as any;
    }
  }

  public async decide(id: number, requestBody?: any): Promise<IFinalResult> {
    try {
      const res = await fetch(`${this.route}/${id}/decide`, {
        method: "POST",
        mode: "cors",
        agent: this.agent,
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody ? JSON.stringify(requestBody) : undefined,
      } as any);
      const jsonData: IFinalResult = await res.json();
      return jsonData;
    } catch (error) {
      return {
        decisionName: JSON.stringify(error),
        weightedResults: [],
        type: "error",
      };
    }
  }
}

export default DAL;
