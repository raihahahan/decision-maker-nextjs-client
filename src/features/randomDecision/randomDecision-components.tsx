import { DecisionTitle } from "../../common/components/branding";
import { IDecision } from "../../common/types/decision-types";
import ChoicesForm from "../choiceForm/choiceForm-components";
import RandomDecisionAPI from "./randomDecision-api";

export function RandomDecisionTitle() {
  return <DecisionTitle title="Random Decision" />;
}

export function RandomDecisionForm() {
  return (
    <ChoicesForm
      onSubmit={async (value: IDecision) =>
        await RandomDecisionAPI.onSubmit(value)
      }
    />
  );
}
