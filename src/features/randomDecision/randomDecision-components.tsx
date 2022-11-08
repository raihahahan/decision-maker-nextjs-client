import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { DecisionTitle } from "../../common/components/branding";
import usePreventExitForm from "../../common/hooks/usePreventExitForm";
import { IDecision } from "../../common/types/decision-types";
import ChoicesForm from "../choiceForm/choiceForm-components";
import { InitialValidate, InitialValues } from "../choiceForm/choiceForm-data";
import useChoiceForm from "../choiceForm/choiceForm-hooks";
import useRandomDecision from "./randomDecision-hooks";

export function RandomDecisionTitle() {
  return <DecisionTitle title="Random Decision" />;
}

export function RandomDecisionForm() {
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  usePreventExitForm(unsavedChanges);
  const { onSubmit } = useRandomDecision();
  const randomForm = useChoiceForm<IDecision>(
    InitialValues,
    InitialValidate,
    setUnsavedChanges
  );
  return <ChoicesForm useChoiceForm={randomForm} onSubmit={onSubmit} />;
}

export function RandomAskAgainButton() {
  const router = useRouter();
  return (
    <Button
      color="green"
      size="lg"
      style={{ alignSelf: "center", margin: 10 }}
      onClick={() => router.reload()}
    >
      Ask again
    </Button>
  );
}
