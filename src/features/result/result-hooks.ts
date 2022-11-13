import { useRouter } from "next/router";
import { DecisionTypes } from "../../common/types/decision-types";

export default function useResult(type: DecisionTypes) {
  const router = useRouter();
  const onClickEdit = () =>
    router.push({ pathname: `/${type}/${router.query.id}/edit` });
  const onClickCreateNew = () => router.push({ pathname: `/${type}/create` });
  return { onClickEdit, onClickCreateNew };
}
