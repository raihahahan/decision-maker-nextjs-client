import { useRouter } from "next/router";
import Error from "../../common/components/error";
import InputLayout from "../../common/components/inputLayout";
import { DecisionTypes, IFinalResult } from "../../common/types/decision-types";
import { capitalizeFirstLetter } from "../../common/utils/utils";
import { RandomAskAgainButton } from "../randomDecision/randomDecision-components";
import { useGlobalMediaQuery } from "../theme/theme-hooks";
import {
  CreateNewDecisionButton,
  EditDecisionButton,
  EditInputButton,
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
  const { onClickEdit, onClickCreateNew, onClickEditInput } = useResult(type);
  const { md } = useGlobalMediaQuery();
  const router = useRouter();
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
          {type != "random" && <EditInputButton onClick={onClickEditInput} />}
        </div>
      </div>
    </InputLayout>
  );
}
