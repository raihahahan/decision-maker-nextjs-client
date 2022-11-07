import { useRouter } from "next/router";
import { DecisionTypes, IDecision } from "../../common/types/decision-types";
import { InitialValidate } from "../choiceForm/choiceForm-data";
import { initialConditionalValidate } from "../conditionalDecision/conditionalDecision-data";
import randomDecisionApi from "../randomDecision/randomDecision-api";
import { initialWeightedValidate } from "../weightedDecision/weightedDecision-data";

export default function useEdit() {
  const router = useRouter();
  const id: number = router.query && router.query.id ? +router.query.id : -1;
  const onSubmit = async (value: IDecision) => {
    try {
      await randomDecisionApi.put(id, value);
      router.push({
        pathname: `/result/random/${id}`,
      });
    } catch (error) {
      alert(error);
    }
  };
  const type: DecisionTypes =
    router.query && router.query.type
      ? (router.query.type as DecisionTypes)
      : ("error" as DecisionTypes);

  const validate =
    type == "random"
      ? InitialValidate
      : type == "weighted"
      ? initialWeightedValidate
      : type == "conditional"
      ? initialConditionalValidate
      : InitialValidate;

  return { onSubmit, validate };
}
