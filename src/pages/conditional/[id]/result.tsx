import { NextPageContext } from "next";
import { IFinalResult } from "../../../common/types/decision-types";
import conditionalDecisionApi, {
  conditionalInputItemsApi,
} from "../../../features/conditionalDecision/conditionalDecision-api";
import { ConditionalDecisionResultContents } from "../../../features/conditionalDecision/conditionalDecision-contents";
import { IConditionalInput } from "../../../features/conditionalDecision/conditionalDecision-types";

export default function ConditionalResultPage({
  res,
}: {
  res: IFinalResult[];
}) {
  return <ConditionalDecisionResultContents res={res} />;
}

export async function getServerSideProps(context: NextPageContext) {
  const id: string = context.query.id as string;
  const conditionalInputItem = await conditionalInputItemsApi.getById(+id);

  const conditionalInput = conditionalInputItem.conditionalInputs;

  const res = await conditionalDecisionApi.decide<IConditionalInput[]>(
    +id,
    conditionalInput
  );

  return { props: { res } };
}
