import FeatureButton from "../../common/components/buttons";
import InputLayout from "../../common/components/inputLayout";
import {
  RandomDecisionForm,
  RandomDecisionTitle,
} from "./randomDecision-components";

export default function RandomDecisionContents() {
  return (
    <InputLayout type="random">
      <RandomDecisionForm />
    </InputLayout>
  );
}
