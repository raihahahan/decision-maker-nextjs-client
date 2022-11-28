import { useDispatch, useSelector } from "react-redux";
import {
  IDecisionReducer,
  IUseDecisionReducer,
} from "../../common/types/decision-types";
import { AppDispatch } from "../../redux/store";
import {
  addConditionalDecision,
  removeConditionalDecision,
  selectConditionalDecision,
  setConditionalDecision,
  updateConditionalDecision,
} from "./conditionalDecision-slice";
import { IConditionalDecisionItem } from "./conditionalDecision-types";

export function useConditionalDecisionReducer(): IUseDecisionReducer {
  const dispatch = useDispatch<AppDispatch>();
  const conditionalDecisionLocalData = useSelector(selectConditionalDecision);

  const conditionalDecisionActions: IDecisionReducer<IConditionalDecisionItem> =
    {
      set(data: IConditionalDecisionItem[]) {
        dispatch(setConditionalDecision(data));
      },
      add(data: IConditionalDecisionItem) {
        dispatch(addConditionalDecision(data));
      },
      update(id: number, data: IConditionalDecisionItem) {
        dispatch(updateConditionalDecision({ id, data }));
      },
      remove(id: number) {
        dispatch(removeConditionalDecision(id));
      },
    };

  return {
    decisionLocalData: conditionalDecisionLocalData,
    decisionActions: conditionalDecisionActions,
  };
}
