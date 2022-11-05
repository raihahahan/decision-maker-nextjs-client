import { useRouter } from "next/router";
import { IDecision } from "../../common/types/decision-types";
import randomDecisionApi from "./randomDecision-api";

export default function useRandomDecision() {
  const router = useRouter();

  const onSubmit = async (value: IDecision) => {
    try {
      value.createdAt = new Date().toISOString();
      value.updatedAt = new Date().toISOString();
      const postResponse = await randomDecisionApi.post(value);
      const ID = postResponse.id;
      const res = await randomDecisionApi.decide(ID as number);
      router.push({
        pathname: "/result",
        query: { data: JSON.stringify({ res, type: "random" }) },
      });
    } catch (error) {
      alert(error);
    }
  };

  return { onSubmit };
}
