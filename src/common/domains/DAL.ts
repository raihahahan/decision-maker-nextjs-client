import axios from "axios";
import { URL } from "url";
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

  public async get(params?: {
    sortorder?: string;
    pageNumber?: number;
    q?: string;
  }): Promise<T[]> {
    try {
      let url = this.route;
      let query = "";
      if (params) {
        query = "?";
        let queriesArr = [];
        for (const [k, v] of Object.entries(params)) {
          if (v != undefined) {
            queriesArr.push(k + "=" + v);
          }
        }
        query += queriesArr.join("&");
        url += query;
      }

      const res = await fetch(`${url}`, {
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
      return null as any;
    }
  }

  public async put<TVal>(id: number, value: TVal): Promise<void> {
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
      return null as any;
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${this.route}/${id}`);
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
      alert(error);
      return false;
    }
  }
}

export default DAL;
