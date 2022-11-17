import Error from "../../common/components/error";
import InputLayout from "../../common/components/inputLayout";
import { IFinalResult } from "../../common/types/decision-types";
import { IndexGetList } from "../index/index-components";
import IndexLayout from "../index/indexLayout";
import ResultContents from "../result/result-contents";
import {
  WeightedDecisionForm,
  WeightedInputForm,
} from "./weightedDecision-components";
import { IWeightedDecisionItem } from "./weightedDecision-types";

export default function WeightedDecisionCreateContents() {
  return (
    <InputLayout type="weighted">
      <WeightedDecisionForm />
    </InputLayout>
  );
}

export function WeightedEditContents({ res }: { res: IWeightedDecisionItem }) {
  return (
    <InputLayout type="weighted">
      <WeightedDecisionForm presetValues={res} />
    </InputLayout>
  );
}

export function WeightedInputContents({ res }: { res: IWeightedDecisionItem }) {
  return <WeightedInputForm res={res} />;
}

export function WeightedResultContents({ res }: { res: IFinalResult }) {
  if (res == undefined) return <Error />;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ResultContents data={res} type={"weighted"} />
      <br />
    </div>
  );
}

export function WeightedDecisionIndexContents({
  res,
}: {
  res: IWeightedDecisionItem[];
}) {
  return (
    <IndexLayout type="weighted">
      <IndexGetList res={res} type="weighted" />
    </IndexLayout>
  );
}
