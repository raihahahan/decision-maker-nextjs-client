import { useRouter } from "next/router";
import { useEffect } from "react";
import InputLayout from "../../common/components/inputLayout";
import useDecisionGenerics from "../../common/hooks/useDecisionGenerics";
import { IFinalResult } from "../../common/types/decision-types";
import { IndexGetList } from "../index/index-components";
import IndexLayout from "../index/indexLayout";
import ResultContents from "../result/result-contents";
import {
  ConditionalDecisionCreateForm,
  ConditionalDecisionEditForm,
  ConditionalInputForm,
} from "./conditionalDecision-components";
import {
  IConditionalDecisionItem,
  IConditionalInputItem,
} from "./conditionalDecision-types";

export default function ConditionalDecisionCreateContents() {
  return (
    <InputLayout type="conditional">
      <ConditionalDecisionCreateForm />
    </InputLayout>
  );
}

export function ConditionalInputContents({
  res,
  conditionalInput,
}: {
  res: IConditionalDecisionItem;
  conditionalInput?: IConditionalInputItem;
}) {
  return <ConditionalInputForm res={res} conditionalInput={conditionalInput} />;
}

export function ConditionalDecisionIndexContents({
  res,
}: {
  res: IConditionalDecisionItem[];
}) {
  const { decisionActions, decisionLocalData } =
    useDecisionGenerics("conditional");

  useEffect(() => {
    decisionActions.set(res);
  }, []);

  return (
    <IndexLayout type="conditional">
      <IndexGetList res={decisionLocalData} type="conditional" />
    </IndexLayout>
  );
}

export function ConditionalDecisionResultContents({
  res,
}: {
  res: IFinalResult | any;
}) {
  const router = useRouter();
  useEffect(() => {
    if (res == undefined || res?.status == 400) {
      router.push({ pathname: `/conditional/${router.query.id}/input` });
    }
  }, []);

  return <ResultContents data={res} type="conditional" />;
}

export function ConditionalDecisionEditContents({
  res,
}: {
  res: IConditionalDecisionItem;
}) {
  return (
    <InputLayout type="conditional">
      <ConditionalDecisionEditForm res={res} />
    </InputLayout>
  );
}
