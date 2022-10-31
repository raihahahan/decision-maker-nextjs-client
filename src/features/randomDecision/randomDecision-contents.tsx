import FeatureButton from "../../common/components/buttons";
import {
  RandomDecisionForm,
  RandomDecisionTitle,
} from "./randomDecision-components";

export default function RandomDecisionContents() {
  return (
    <div>
      <RandomDecisionTitle />
      <RandomDecisionForm />
    </div>
  );
}
