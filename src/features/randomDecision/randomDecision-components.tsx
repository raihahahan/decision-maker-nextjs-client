import { DecisionTitle } from "../../common/components/branding";
import ChoicesForm from "../choiceForm/choiceForm-components";
import useRandomDecision from "./randomDecision-hooks";

export function RandomDecisionTitle() {
  return <DecisionTitle title="Random Decision" />;
}

export function RandomDecisionForm() {
  const { onSubmit } = useRandomDecision();

  return <ChoicesForm onSubmit={onSubmit} />;
}
