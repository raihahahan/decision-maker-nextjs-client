import Error from "../../common/components/error";
import { WeightedDecisionIndexContents } from "../../features/weightedDecision/weightedDecision-contents";
import { IWeightedDecisionItem } from "../../features/weightedDecision/weightedDecision-types";
import weightedDeicisonApi from "../../features/weightedDecision/weightedDeicison-api";

export default function WeightedIndexPage({
  res,
}: {
  res: IWeightedDecisionItem[];
}) {
  if (res == null) return <Error />;
  return <WeightedDecisionIndexContents res={res} />;
}

export async function getServerSideProps() {
  const res = await weightedDeicisonApi.get();
  if (res == undefined || res == null) return { props: { res: null } }
  return { props: { res } };
}
