import { useRouter } from "next/router";
import { useState } from "react";
import { DecisionTypes, IDecision } from "../../common/types/decision-types";
import randomDecisionApi from "../randomDecision/randomDecision-api";
import { useRandomDecisionReducer } from "../randomDecision/randomDecision-hooks";
import { useWeightedDecisionReducer } from "../weightedDecision/weightedDecision-hooks";
import weightedDeicisonApi from "../weightedDecision/weightedDeicison-api";

export default function useIndexList(type: DecisionTypes, res: IDecision[]) {
  const [selected, setSelected] = useState<IDecision[]>([]);
  const router = useRouter();
  const { randomDecisionActions } = useRandomDecisionReducer();
  const { weightedDecisionActions, weightedDecisionLocalData } =
    useWeightedDecisionReducer();

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
    onClickMasterRemove() {
      if (selected.length <= 0) {
        alert("Please select at least 1 item.");
        return;
      }
      selected.forEach((item) => {
        weightedDeicisonApi.delete(item.id as number);
        weightedDecisionActions.remove(item.id as number);
      });
      setSelected([]);
    },
    onClickEdit(item: IDecision) {
      router.push(`/${type}/${item.id}/edit`);
    },
    onClickAdd() {
      router.push(`/${type}/create`);
    },
  };

  const tableHandlers = {
    onSelectTop() {
      if (selected.length == res.length) {
        setSelected([]);
      } else {
        setSelected(res);
      }
    },
    onSelect(item: IDecision) {
      if (selected.find((i) => i.id == item.id)) {
        setSelected((i) => i.filter((_item) => _item.id != item.id));
      } else {
        setSelected((i) => [...i, item]);
      }
    },
  };

  const checkBoxChecked = (element: IDecision): boolean =>
    selected.find((i) => i.id == element.id) != undefined;

  return {
    buttonHandlers,
    tableHandlers,
    selectedHandlers: { selected, setSelected },
    checkBoxChecked,
  };
}
