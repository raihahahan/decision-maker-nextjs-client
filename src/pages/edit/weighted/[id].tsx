import { NextPageContext } from "next";
import { useEffect } from "react";
import Error from "../../../common/components/error";
import { IDecision } from "../../../common/types/decision-types";
import EditContents from "../../../features/edit/edit-contents";
import { WeightedEditContents } from "../../../features/weightedDecision/weightedDecision-contents";
import { IWeightedDecisionItem } from "../../../features/weightedDecision/weightedDecision-types";
import weightedDeicisonApi from "../../../features/weightedDecision/weightedDeicison-api";

export default function WeightedEditPage({
  res,
}: {
  res: IWeightedDecisionItem;
}) {
  if (!res.choices) return <Error />;
  return <WeightedEditContents res={res} />;
}

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  if (query != undefined && query.id) {
    const id: number = +query.id;
    const res = await weightedDeicisonApi.getById(id);
    return { props: { res } };
  } else return { props: { res: { name: "error", choices: [] } as IDecision } };
};
