import { Button, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import {
  DecisionTypes,
  IFinalResult,
  IWeightedResult,
} from "../../common/types/decision-types";
import { RandomAskAgainButton } from "../randomDecision/randomDecision-components";
import { useGlobalMediaQuery } from "../theme/theme-hooks";
import {
  CreateNewDecisionButton,
  EditDecisionButton,
  Result,
  ResultList,
} from "./result-components";
import useResult from "./result-hooks";

export default function ResultContents({
  data,
  type,
}: {
  data: IFinalResult;
  type: DecisionTypes;
}) {
  const { weightedResults, decisionName } = data;
  const { onClickEdit, onClickCreateNew } = useResult();
  const { sm, md } = useGlobalMediaQuery();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 20,
        width: "90vw",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        <b>Decision Name:</b> {decisionName}
      </h1>
      <h2>Random choice:</h2>
      <Result data={weightedResults[0]} />
      <br />
      <h2>Ranked choice:</h2>
      <ResultList resultData={weightedResults} />
      <div
        style={{
          display: "flex",
          flexDirection: md ? "column" : "row",
          margin: 10,
        }}
      >
        <EditDecisionButton onClick={onClickEdit} />
        <CreateNewDecisionButton onClick={onClickCreateNew} />
        {type == "random" && <RandomAskAgainButton />}
      </div>
    </div>
  );
}
