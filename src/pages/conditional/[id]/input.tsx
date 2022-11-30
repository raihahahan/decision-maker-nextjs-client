import { NextPageContext } from "next";
import conditionalDecisionApi, {
  conditionalInputItemsApi,
} from "../../../features/conditionalDecision/conditionalDecision-api";
import { ConditionalInputContents } from "../../../features/conditionalDecision/conditionalDecision-contents";
import {
  IConditionalDecisionItem,
  IConditionalInputItem,
} from "../../../features/conditionalDecision/conditionalDecision-types";

export default function ConditionalInputPage({
  res,
  conditionalInput,
}: {
  res: IConditionalDecisionItem;
  conditionalInput?: IConditionalInputItem;
}) {
  return (
    <ConditionalInputContents res={res} conditionalInput={conditionalInput} />
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const id: number = context.query.id ? +context.query.id : -1;
  const res = await conditionalDecisionApi.getById(id);
  let conditionalInput = undefined;
  if (await conditionalInputItemsApi.exists(id)) {
    conditionalInput = await conditionalInputItemsApi.getById(id);
  }

  return { props: { res, conditionalInput: conditionalInput ?? null } };
}
