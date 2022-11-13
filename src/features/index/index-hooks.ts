import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DecisionTypes, IDecision } from "../../common/types/decision-types";
import randomDecisionApi from "../randomDecision/randomDecision-api";

export default function useIndexList(type: DecisionTypes, res: IDecision[]) {
  const router = useRouter();
  const buttonHandlers = {
    onClick(item: IDecision) {
      router.push(`/${type}/${item.id}/result`);
    },
    onClickRemove(item: IDecision) {
      switch (type) {
        case "random":
          randomDecisionApi.delete(item.id as number);
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
