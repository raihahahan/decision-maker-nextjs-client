import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Error from "../../common/components/error";
import InputLayout from "../../common/components/inputLayout";
import { IFinalResult } from "../../common/types/decision-types";
import ChoicesForm from "../choiceForm/choiceForm-components";
import ResultContents from "../result/result-contents";
import {
  WeightedDecisionForm,
  WeightedInputForm,
} from "./weightedDecision-components";
import { selectWeightedInput } from "./weightedDecision-slice";
import { IWeightedDecisionItem } from "./weightedDecision-types";
import weightedDeicisonApi from "./weightedDeicison-api";

export default function WeightedDecisionContents() {
  return (
    <InputLayout type="weighted">
      <WeightedDecisionForm isEdit={false} />
    </InputLayout>
  );
}

export function WeightedEditContents({ res }: { res: IWeightedDecisionItem }) {
  return (
    <InputLayout type="weighted">
      <WeightedDecisionForm presetValues={res} isEdit={true} />
    </InputLayout>
  );
}

export function WeightedInputContents({ res }: { res: IWeightedDecisionItem }) {
  return <WeightedInputForm res={res} />;
}

export function WeightedResultContents({ id }: { id: number }) {
  if (id == -1) return <Error />;

  const weightedInput = useSelector(selectWeightedInput);
  const [loading, setLoading] = useState(true);
  const [res, setRes] = useState<IFinalResult>({
    decisionName: "",
    weightedResults: [],
    type: "error",
  });

  useEffect(() => {
    weightedDeicisonApi
      .decide(id, weightedInput)
      .then((val) => setRes(val))
      .then(() => setLoading(false));
  }, []);

  if (loading || res == undefined || res.weightedResults == undefined)
    return <h2>Loading...</h2>;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ResultContents data={res} type={"weighted"} />
      <br />
    </div>
  );
}
