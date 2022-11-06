import { useRouter } from "next/router";
import { IDecision, pushQuery } from "../../common/types/decision-types";
import randomDecisionApi from "./randomDecision-api";

export default function useRandomDecision() {
  const router = useRouter();

  const onSubmit = async (value: IDecision) => {
    try {
      value.createdAt = new Date().toISOString();
      value.updatedAt = new Date().toISOString();
      const postResponse = await randomDecisionApi.post(value);
      const ID = postResponse.id;
      router.push({
        pathname: `/result/random/${ID}`,
        query: {
          data: JSON.stringify({
            dec: value.name,
            id: ID,
          } as pushQuery["query"]["data"]),
        },
      });
    } catch (error) {
      alert(error);
    }
  };

  return { onSubmit };
}
