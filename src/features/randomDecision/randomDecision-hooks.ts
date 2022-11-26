import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Choice } from "../../common/domains/domains";
import {
  IChoice,
  IDecision,
  IDecisionReducer,
  pushQuery,
} from "../../common/types/decision-types";
import { AppDispatch } from "../../redux/store";
import { TExtraFormConfig } from "../choiceForm/choiceForm-types";
import randomDecisionApi, { randomChoiceApi } from "./randomDecision-api";
import {
  addRandomDecision,
  removeRandomDecision,
  selectRandomDecision,
  setRandomDecision,
  updateRandomDecision,
} from "./randomDecision-slice";
import { IRandomDecisionItem } from "./randomDecision-types";

export default function useRandomDecision() {
  const router = useRouter();
  const { randomDecisionLocalData, randomDecisionActions } =
    useRandomDecisionReducer();

  const createHandlers = {
    async onSubmitCreate(value: IDecision) {
      try {
        value.createdAt = new Date().toISOString();
        value.updatedAt = new Date().toISOString();
        const postResponse = await randomDecisionApi.post(value);
        randomDecisionActions.add(value);

        const ID = postResponse.id;
        router.push({
          pathname: `/random/${ID}/result`,
        });
      } catch (error) {
        alert(error);
      }
    },
  };

  const editHandlers: TExtraFormConfig<IDecision> = {
    async onEditName(
      decisionId: number,
      name: string,
      curr: IRandomDecisionItem
    ) {
      curr.name = name;
      curr.updatedAt = new Date().toISOString();
      await randomDecisionApi.put(decisionId, curr);
    },
    async onAddChoice(decisionId: number) {
      const newChoice = new Choice("", undefined, decisionId);
      const res = await randomChoiceApi.post(newChoice);
      return res.id as number;
    },

    async onRemoveChoice(id: number) {
      await randomChoiceApi.delete(id);
    },

    async onEditChoice(id: number, value: IChoice) {
      await randomChoiceApi.put(id, value);
    },

    async onSubmitEdit(value: IDecision) {
      value.updatedAt = new Date().toISOString();
      const id = value.id;
      await randomDecisionApi.put(id as number, value);
      randomDecisionActions.update(id as number, value);
      router.push({
        pathname: `/random/${id}/result`,
      });
    },
  };

  return { createHandlers, editHandlers };
}

export function useRandomDecisionReducer() {
  const dispatch = useDispatch<AppDispatch>();
  const randomDecisionLocalData = useSelector(selectRandomDecision);

  const randomDecisionActions: IDecisionReducer<IRandomDecisionItem> = {
    set(data: IRandomDecisionItem[]) {
      dispatch(setRandomDecision(data));
    },
    add(data: IRandomDecisionItem) {
      dispatch(addRandomDecision(data));
    },
    update(id: number, data: IRandomDecisionItem) {
      dispatch(updateRandomDecision({ id, data }));
    },
    remove(id: number) {
      dispatch(removeRandomDecision(id));
    },
  };

  return { randomDecisionLocalData, randomDecisionActions };
}
