import { NextPageContext } from "next";
import { useEffect } from "react";
import Error from "../../../common/components/error";
import { WeightedInputContents } from "../../../features/weightedDecision/weightedDecision-contents";
import { IWeightedDecisionItem } from "../../../features/weightedDecision/weightedDecision-types";
import weightedDeicisonApi from "../../../features/weightedDecision/weightedDeicison-api";

export default function WeightedInputPage({
  res,
}: {
  res: IWeightedDecisionItem;
  id: number;
}) {
  if (!res?.choices) return <Error />;
  return <WeightedInputContents res={res} />;
}

export async function getServerSideProps(context: NextPageContext) {
  const id: number = context.query.id ? +context.query.id : -1;
  const res = await weightedDeicisonApi.getById(id);
  return { props: { res } };
}
