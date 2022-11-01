import { DecisionTitle } from "../../common/components/branding";
import ChoicesForm from "../choiceForm/choiceForm-components";
import useRandomDecisionForm from "./randomDecision-hooks";

export function RandomDecisionTitle() {
  return <DecisionTitle title="Random Decision" />;
}

export function RandomDecisionForm() {
  return <ChoicesForm />;
}
