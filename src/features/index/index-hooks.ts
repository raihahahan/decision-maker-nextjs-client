import { useRouter } from "next/router";
import { DecisionTypes, IDecision } from "../../common/types/decision-types";
import randomDecisionApi from "../randomDecision/randomDecision-api";
import { useRandomDecisionReducer } from "../randomDecision/randomDecision-hooks";
import { useWeightedDecisionReducer } from "../weightedDecision/weightedDecision-hooks";
import weightedDeicisonApi from "../weightedDecision/weightedDeicison-api";

export default function useIndexList(type: DecisionTypes, res: IDecision[]) {
  const router = useRouter();
  const { randomDecisionActions } = useRandomDecisionReducer();
  const { weightedDecisionActions } = useWeightedDecisionReducer();
  const buttonHandlers = {
    onClick(item: IDecision) {
      router.push(`/${type}/${item.id}`);
    },
    onClickRemove(item: IDecision) {
      switch (type) {
        case "random":
          randomDecisionApi.delete(item.id as number);
          randomDecisionActions.remove(item.id as number);
          break;
        case "weighted":
          weightedDeicisonApi.delete(item.id as number);
          weightedDecisionActions.remove(item.id as number);
          break;
        default:
          break;
      }
    },
    onClickEdit(item: IDecision) {
      router.push(`/${type}/${item.id}/edit`);
    },
  };

  return { buttonHandlers };
}
