import { NextPageContext } from "next";
import Error from "../../../common/components/error";
import { WeightedInputContents } from "../../../features/weightedDecision/weightedDecision-contents";
import {
  IWeightedDecisionItem,
  IWeightedInput,
  IWeightedInputItem,
} from "../../../features/weightedDecision/weightedDecision-types";
import weightedDeicisonApi, {
  weightedInputApi,
} from "../../../features/weightedDecision/weightedDeicison-api";

export default function WeightedInputPage({
  res,
  weightedInput,
}: {
  res: IWeightedDecisionItem;
  weightedInput?: IWeightedInputItem;
}) {
  if (!res?.choices) return <Error />;
  return <WeightedInputContents res={res} weightedInput={weightedInput} />;
}

export async function getServerSideProps(context: NextPageContext) {
  const id: number = context.query.id ? +context.query.id : -1;
  const res = await weightedDeicisonApi.getById(id);
  let weightedInput = undefined;
  if (await weightedInputApi.exists(id)) {
    weightedInput = await weightedInputApi.getById(id);
  }

  return { props: { res, weightedInput: weightedInput ?? null } };
}
