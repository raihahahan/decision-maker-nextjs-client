import { DecisionTitle } from "../../common/components/branding";
import { IDecision } from "../../common/types/decision-types";
import ChoicesForm from "../choiceForm/choiceForm-components";
import RandomDecision from "./randomDecision-api";
import useRandomDecisionForm from "./randomDecision-hooks";

export function RandomDecisionTitle() {
  return <DecisionTitle title="Random Decision" />;
}

export function RandomDecisionForm() {
  return (
    <ChoicesForm
      onSubmit={async (value: IDecision) => {
        try {
          value.createdAt = "2022-11-03T14:55:15.063Z";
          value.updatedAt = "2022-11-03T14:55:15.063Z";
          const postResponse = await RandomDecision.post(value);
          const ID = postResponse.id;
          const res = await RandomDecision.getDecide(ID as number);
          alert(JSON.stringify(res));
        } catch (error) {
          alert(error);
        }
      }}
    />
  );
}
