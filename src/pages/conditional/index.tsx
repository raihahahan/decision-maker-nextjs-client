import conditionalDecisionApi from "../../features/conditionalDecision/conditionalDecision-api";
import { ConditionalDecisionIndexContents } from "../../features/conditionalDecision/conditionalDecision-contents";
import { IConditionalDecisionItem } from "../../features/conditionalDecision/conditionalDecision-types";

export default function ConditionalIndexPage({
  res,
}: {
  res: IConditionalDecisionItem[];
}) {
  return <ConditionalDecisionIndexContents res={res} />;
}

export async function getServerSideProps() {
  const res: IConditionalDecisionItem[] = await conditionalDecisionApi.get();
  return { props: { res } };
}
