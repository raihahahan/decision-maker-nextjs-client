import InputLayout from "../../common/components/inputLayout";
import ChoicesForm from "../choiceForm/choiceForm-components";
import { WeightedDecisionForm } from "./weightedDecision-components";

export default function WeightedDecisionContents() {
  return (
    <InputLayout type="weighted">
      <WeightedDecisionForm />
    </InputLayout>
  );
}
