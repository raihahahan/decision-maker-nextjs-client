import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { IWeightedResult, pushQuery } from "../../common/types/decision-types";
import randomDecisionApi from "../randomDecision/randomDecision-api";

export default function useResult(query: ParsedUrlQuery) {
  const [weightedResult, setWeightedResult] = useState<IWeightedResult[]>([]);
  const queryData: pushQuery["query"]["data"] = JSON.parse(
    query.data as string
  );
  const id = queryData.id;
  const decisionName = queryData.dec;

  useEffect(() => {
    randomDecisionApi.decide(id).then((val) => setWeightedResult(val));
  }, []);

  return { weightedResult, decisionName };
}
