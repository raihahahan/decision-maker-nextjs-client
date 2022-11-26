import { IDecision, IFinalResult } from "../types/decision-types";
import DAL from "./DAL";
import axios from "axios";

class DecisionDAL<T extends IDecision> extends DAL<T> {
  public override async post(input: T): Promise<T> {
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

  public async decide<R>(id: number, requestBody?: R): Promise<IFinalResult> {
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

  public async totalPages(): Promise<number> {
    try {
      const res = await fetch(`${this.route}/totalPages`, {
        method: "GET",
        mode: "cors",
        agent: this.agent,
      } as any);
      return res.json();
    } catch (error) {
      return 1;
    }
  }
}

export default DecisionDAL;
