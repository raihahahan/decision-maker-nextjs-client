import { useEffect } from "react";
import InputLayout from "../../common/components/inputLayout";
import useDecisionGenerics from "../../common/hooks/useDecisionGenerics";
import { IndexGetList } from "../index/index-components";
import IndexLayout from "../index/indexLayout";
import { ConditionalDecisionCreateForm } from "./conditionalDecision-components";
import { IConditionalDecisionItem } from "./conditionalDecision-types";

export default function ConditionalDecisionCreateContents() {
  return (
    <InputLayout type="conditional">
      <ConditionalDecisionCreateForm />
    </InputLayout>
  );
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
