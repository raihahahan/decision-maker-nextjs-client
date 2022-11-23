import { useRouter } from "next/router";
import { useEffect } from "react";
import Error from "../../common/components/error";
import InputLayout from "../../common/components/inputLayout";
import { IFinalResult } from "../../common/types/decision-types";
import { IndexGetList } from "../index/index-components";
import IndexLayout from "../index/indexLayout";
import ResultContents from "../result/result-contents";
import {
  WeightedDecisionCreateForm,
  WeightedDecisionEditForm,
  WeightedInputForm,
} from "./weightedDecision-components";
import { useWeightedDecisionReducer } from "./weightedDecision-hooks";
import {
  IWeightedDecisionItem,
  IWeightedInput,
  IWeightedInputItem,
} from "./weightedDecision-types";

export default function WeightedDecisionCreateContents() {
  return (
    <InputLayout type="weighted">
      <WeightedDecisionCreateForm />
    </InputLayout>
  );
}

export function WeightedEditContents({ res }: { res: IWeightedDecisionItem }) {
  return (
    <InputLayout type="weighted">
      <WeightedDecisionEditForm presetValues={res} />
    </InputLayout>
  );
}

export function WeightedInputContents({
  res,
  weightedInput,
}: {
  res: IWeightedDecisionItem;
  weightedInput?: IWeightedInputItem;
}) {
  return <WeightedInputForm res={res} weightedInput={weightedInput} />;
}

export function WeightedResultContents({ res }: { res: IFinalResult | any }) {
  const router = useRouter();
  useEffect(() => {
    if (res == undefined || res?.status == 400) {
      router.push({ pathname: `/weighted/${router.query.id}/input` });
    }
  }, []);

  return <ResultContents data={res} type={"weighted"} />;
}

export function WeightedDecisionIndexContents({
  res,
}: {
  res: IWeightedDecisionItem[];
}) {
  const { weightedDecisionActions, weightedDecisionLocalData } =
    useWeightedDecisionReducer();
  useEffect(() => {
    weightedDecisionActions.set(res);
  }, []);

  return (
    <IndexLayout type="weighted">
      <IndexGetList res={weightedDecisionLocalData} type="weighted" />
    </IndexLayout>
  );
}
