import { ParsedUrlQuery } from "querystring";
import { IWeightedResult } from "../../common/types/decision-types";
import { ResultList } from "./result-components";
import useResult from "./result-hooks";

export default function ResultContents({ query }: { query: ParsedUrlQuery }) {
  const { weightedResult, decisionName } = useResult(query);
  return <ResultList resultData={weightedResult} decisionName={decisionName} />;
}
