import Error from "../../common/components/error";
import InputLayout from "../../common/components/inputLayout";
import {
  DecisionTypes,
  IFinalResult,
  IWeightedResult,
} from "../../common/types/decision-types";
import { capitalizeFirstLetter } from "../../common/utils/utils";
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
  if (data.type == "error" || !data || !data?.weightedResults) return <Error />;
  const { weightedResults, decisionName } = data;
  const { onClickEdit, onClickCreateNew } = useResult(type);
  const { sm, md } = useGlobalMediaQuery();
  return (
    <InputLayout type={type}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: 20,
          width: "90vw",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          <b>Decision Name:</b> {decisionName}
        </h2>
        <h2>{capitalizeFirstLetter(type)} choice:</h2>
        <Result data={weightedResults[0]} type={type} />
        <br />
        <h2>Ranked choice:</h2>
        <ResultList resultData={weightedResults} type={type} />
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
    </InputLayout>
  );
}
