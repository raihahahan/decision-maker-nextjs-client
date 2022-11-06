import { useRouter } from "next/router";
import { IDecision } from "../../common/types/decision-types";
import randomDecisionApi from "../randomDecision/randomDecision-api";

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
  return { onSubmit };
}
