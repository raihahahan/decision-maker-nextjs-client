import { useRouter } from "next/router";
import { Choice } from "../../common/domains/domains";
import {
  IChoice,
  IDecision,
  pushQuery,
} from "../../common/types/decision-types";
import { TExtraFormConfig } from "../choiceForm/choiceForm-types";
import randomDecisionApi, { randomChoiceApi } from "./randomDecision-api";

export default function useRandomDecision() {
  const router = useRouter();

  const createHandlers = {
    async onSubmitCreate(value: IDecision) {
      try {
        value.createdAt = new Date().toISOString();
        value.updatedAt = new Date().toISOString();
        const postResponse = await randomDecisionApi.post(value);
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
      router.push({
        pathname: `/random/${id}/result`,
      });
    },
  };

  return { createHandlers, editHandlers };
}
