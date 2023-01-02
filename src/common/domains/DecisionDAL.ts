import { IDecision, IFinalResult } from "../types/decision-types";
import DAL from "./DAL";
import { axios } from "../api/Axios";
import { pathCombine } from "../utils/api-utils";
import CONSTANTS from "../utils/constants";

class DecisionDAL<T extends IDecision> extends DAL<T> {
  public override async post(input: T): Promise<T> {
    try {
      delete input?.id;
      for (let item of input.choices) {
        delete item?.id;
      }
      const endpoint = pathCombine(false, this.decisionType);
      const res = await axios.post<any, T>(endpoint, input);
      return res;
    } catch (error) {
      return { name: null, choices: [] } as any;
    }
  }

  public async decide<R>(id: number, requestBody?: R): Promise<IFinalResult> {
    try {
      const endpoint = pathCombine(false, this.decisionType, id.toString(), CONSTANTS.ACTION_METHODS.DECIDE);
      const res = await axios.post<any, IFinalResult>(endpoint, requestBody ?? undefined);
      return res;
    } catch (error) {
      return {
        decisionName: "",
        weightedResults: [],
        type: "error",
      };
    }
  }

  public async totalPages(): Promise<number> {
    try {
      const endpoint = pathCombine(false, this.decisionType, CONSTANTS.ACTION_METHODS.TOTAL_PAGES);
      const res = await axios.get<any, number>(endpoint);
      return res;
    } catch (error) {
      return 1;
    }
  }
}

export default DecisionDAL;
