import { TDALParams } from "../types/decision-types";

export function makeUrlWithQueries(url: string, params: TDALParams) : string {
    let query = "?";
    let queriesArr = [];
    for (const [k, v] of Object.entries(params)) {
      if (v != undefined) {
        queriesArr.push(k + "=" + v);
      }
    }
    query += queriesArr.join("&");
    url += query;

    return url;
  }

  export function pathCombine(appendStart: boolean, ...pathItems: string[]) : string {
    const joined = pathItems.join("/");
    return appendStart ? "/" + joined : joined;
  }

  export function appendApi(url: string) : string {
    return pathCombine(false, "api", url);
  }