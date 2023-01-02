import { NextPageContext } from "next";
import { IFinalResult } from "../../../common/types/decision-types";
import { WeightedResultContents } from "../../../features/weightedDecision/weightedDecision-contents";
import {
  IWeightedInput,
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
  if (weightedInput == null) {
    return  {
      props: { res: null }
    }
  }
  const res = await weightedDeicisonApi.decide<IWeightedInput[]>(
    +id,
    weightedInput.weightedInputs
  );
  return {
    props: {
      res,
    },
  };
}
