import { WeightedDecisionIndexContents } from "../../features/weightedDecision/weightedDecision-contents";
import { IWeightedDecisionItem } from "../../features/weightedDecision/weightedDecision-types";
import weightedDeicisonApi from "../../features/weightedDecision/weightedDeicison-api";

export default function WeightedIndexPage({
  res,
}: {
  res: IWeightedDecisionItem[];
}) {
  return <WeightedDecisionIndexContents res={res} />;
}

export async function getServerSideProps() {
  const res = await weightedDeicisonApi.get();
  return { props: { res } };
}
