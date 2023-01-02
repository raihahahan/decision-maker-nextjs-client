import { NextPageContext } from "next";
import Error from "../../../common/components/error";
import { WeightedEditContents } from "../../../features/weightedDecision/weightedDecision-contents";
import { IWeightedDecisionItem } from "../../../features/weightedDecision/weightedDecision-types";
import weightedDeicisonApi from "../../../features/weightedDecision/weightedDeicison-api";

export default function WeightedIndexPage({
  res,
}: {
  res: IWeightedDecisionItem;
}) {
  if (res == null) return <Error />;
  return <WeightedEditContents res={res} />;
}

export async function getServerSideProps(context: NextPageContext) {
  const id: string = context.query.id as string;
  const res = await weightedDeicisonApi.getById(+id);
  if (!res) return { props: { res: null }}
  return {
    props: {
      res,
    }, // will be passed to the page component as props
  };
}
