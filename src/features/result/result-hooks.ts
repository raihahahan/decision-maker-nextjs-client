import { useRouter } from "next/router";
import { DecisionTypes } from "../../common/types/decision-types";

export default function useResult() {
  const router = useRouter();
  const onClickEdit = () =>
    router.push({ pathname: `/edit/${router.query.type}/${router.query.id}` });
  const onClickCreateNew = () =>
    router.push({ pathname: `/${router.query.type}` });
  return { onClickEdit, onClickCreateNew };
}
