import { useRouter } from "next/router";
import { DecisionTypes } from "../../common/types/decision-types";

export default function useResult(type: DecisionTypes) {
  const router = useRouter();
  const onClickEdit = () =>
    router.push({ pathname: `/${type}/${router.query.id}` });
  const onClickCreateNew = () => router.push({ pathname: `/${type}/create` });
  const onClickEditInput = () =>
    router.push({ pathname: `/weighted/${router.query.id}/input` });
  return { onClickEdit, onClickCreateNew, onClickEditInput };
}
