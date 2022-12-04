import { NextPageContext } from "next";
import { IFinalResult } from "../../../common/types/decision-types";
import { WeightedResultContents } from "../../../features/weightedDecision/weightedDecision-contents";
import {
  IWeightedInput,
  IWeightedInputItem,
} from "../../../features/weightedDecision/weightedDecision-types";
import weightedDeicisonApi, {
  weightedInputApi,
} from "../../../features/weightedDecision/weightedDeicison-api";

export default function WeightedResultPage({ res }: { res: IFinalResult }) {
  return <WeightedResultContents res={res} />;
}

export async function getServerSideProps(context: NextPageContext) {
  const id: string = context.query.id as string;
  const weightedInput = await weightedInputApi.getById(+id);
  const res = await weightedDeicisonApi.decide<IWeightedInput[]>(
    +id,
    weightedInput.weightedInputs
  );
  return {
    props: {
      res,
    }, // will be passed to the page component as props
  };
}
