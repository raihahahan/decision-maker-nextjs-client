import { NextPageContext } from "next";
import conditionalDecisionApi from "../../../features/conditionalDecision/conditionalDecision-api";
import { ConditionalDecisionEditContents } from "../../../features/conditionalDecision/conditionalDecision-contents";
import { IConditionalDecisionItem } from "../../../features/conditionalDecision/conditionalDecision-types";

export default function ConditionalIndexPage({
  res,
}: {
  res: IConditionalDecisionItem;
}) {
  return <ConditionalDecisionEditContents res={res} />;
}

export async function getServerSideProps(context: NextPageContext) {
  const id = +(context.query.id as string);
  const res = await conditionalDecisionApi.getById(id);
  return { props: { res } };
}
