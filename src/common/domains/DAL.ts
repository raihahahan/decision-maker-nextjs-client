import { IDecision, IFinalResult } from "../types/decision-types";
import axios from "axios";
import { API_URL } from "../utils/globals";
// DAL: Data Access Layer

abstract class DAL<T> {
  protected https = require("https");
  protected agent = new this.https.Agent({
    rejectUnauthorized: false,
  });
  protected route: string = "";

  constructor(route: string) {
    this.route = route;
  }

  public async get(): Promise<T[]> {
    try {
      const res = await fetch(`${this.route}`, {
        method: "GET",
        mode: "cors",
        agent: this.agent,
      } as any);

      const jsonData: T[] = await res.json();
      return jsonData;
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
      return { name: JSON.stringify(error), choices: [] } as any;
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
      const res = await axios.post(`${this.route}`, input);
      return res.data as T;
    } catch (error) {
      // alert(error);
      return { name: JSON.stringify(error), choices: [] } as any;
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${this.route}/${id}`);
    } catch (error) {
      return;
    }
  }
}

export default DAL;
