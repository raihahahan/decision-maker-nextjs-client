import InputLayout from "../../common/components/inputLayout";
import {
  RandomDecisionCreateForm,
  RandomDecisionEditForm,
} from "./randomDecision-components";
import { IRandomDecisionItem } from "./randomDecision-types";

export default function RandomDecisionCreateContents() {
  return (
    <InputLayout type="random">
      <RandomDecisionCreateForm />
    </InputLayout>
  );
}

export function RandomDecisionEditFormContents({
  res,
}: {
  res: IRandomDecisionItem;
}) {
  return (
    <InputLayout type="random">
      <RandomDecisionEditForm res={res} />
    </InputLayout>
  );
}
