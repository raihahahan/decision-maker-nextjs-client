import IndexLayout from "../index/indexLayout";
import InputLayout from "../../common/components/inputLayout";
import {
  RandomDecisionCreateForm,
  RandomDecisionEditForm,
} from "./randomDecision-components";
import { IRandomDecisionItem } from "./randomDecision-types";
import { IndexGetList } from "../index/index-components";
import { useEffect } from "react";
import { IFinalResult } from "../../common/types/decision-types";
import ResultContents from "../result/result-contents";
import useDecisionGenerics from "../../common/hooks/useDecisionGenerics";

export default function RandomDecisionCreateContents() {
  return (
    <InputLayout type="random">
      <RandomDecisionCreateForm />
    </InputLayout>
  );
}

export function RandomDecisionEditFormContents({
  res,
}: {
  res: IRandomDecisionItem;
}) {
  return (
    <InputLayout type="random">
      <RandomDecisionEditForm res={res} />
    </InputLayout>
  );
}

export function RandomDecisionResultContents({ res }: { res: IFinalResult }) {
  return <ResultContents data={res} type="random" />;
}

export function RandomDecisionIndexContents({
  res,
}: {
  res: IRandomDecisionItem[];
}) {
  const {
    decisionActions: randomDecisionActions,
    decisionLocalData: randomDecisionLocalData,
  } = useDecisionGenerics("random");
  useEffect(() => {
    randomDecisionActions.set(res);
  }, []);

  return (
    <IndexLayout type="random">
      <IndexGetList res={randomDecisionLocalData} type="random" />
    </IndexLayout>
  );
}
