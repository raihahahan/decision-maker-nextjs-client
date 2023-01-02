// DAL: Data Access Layer

import { makeUrlWithQueries, pathCombine } from "../utils/api-utils";
import { axios } from "../api/Axios";
import { TDALParams } from "../types/decision-types";

abstract class DAL<T> {
  /*
    Patterns:
    - API_URL/{decisionType}/{id}/{action}
    - API_URL/{decisionType}/{action}
  */

  protected decisionType: string;

  constructor(decisionType: string) {
    this.decisionType = decisionType;
  }

  public async get(params?: TDALParams): Promise<T[]> {
    try {
      let endpoint : string = pathCombine(false, this.decisionType);
      if (params) {
        endpoint = makeUrlWithQueries(endpoint, params)
      }
      const res = await axios.get<any, T[]>(endpoint);
      return res;
    } catch (error) {
      return [];
    }
  }

  public async getById(id: number): Promise<T> {
    try {
      const endpoint = pathCombine(false, this.decisionType, id.toString());
      const res = await axios.get<any, T>(endpoint);
      return res;
    } catch (error) {
      return null as any;
    }
  }

  public async put<TVal>(id: number, value: TVal): Promise<void> {
    try {
      const endpoint = pathCombine(false, this.decisionType, id.toString());
      await axios.put(endpoint, value);
    } catch (error) {
      alert(error);
    }
  }

  public async post(input: T): Promise<T> {
    try {
      const endpoint = pathCombine(false, this.decisionType);
      const res = await axios.post(endpoint, input);
      return res.data as T;
    } catch (error) {
      return null as any;
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const endpoint = pathCombine(false, this.decisionType, id.toString());
      await axios.delete(endpoint);
    } catch (error) {
      return;
    }
  }

  public async exists(id: number): Promise<boolean> {
    try {
      const res: any = await this.getById(id);
      if (!res || (res?.status as any) == 404 || (res?.status as any) == 400) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default DAL;
