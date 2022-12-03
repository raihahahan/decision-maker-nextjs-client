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
import { IRandomDecisionItem } from "./randomDecision-types";

export function RandomDecisionTitle() {
  return <DecisionTitle title="Random Decision" />;
}

export function RandomDecisionCreateForm() {
  const [unsavedChanges, setUnsavedChanges] = useState(true);
  usePreventExitForm(unsavedChanges);
  const { createHandlers } = useRandomDecision();
  const randomForm = useChoiceForm<IDecision>(
    InitialValues,
    InitialValidate,
    setUnsavedChanges
  );
  return (
    <ChoicesForm
      useChoiceForm={randomForm}
      onSubmit={createHandlers.onSubmitCreate}
    />
  );
}

export function RandomDecisionEditForm({ res }: { res: IRandomDecisionItem }) {
  const { editHandlers } = useRandomDecision();
  const presetData: IRandomDecisionItem = {
    id: res.id,
    name: res.name,
    choices: res.choices,
    createdAt: res.createdAt,
    updatedAt: res.updatedAt,
  };
  const [unsavedChanges, setUnsavedChanges] = useState(true);
  usePreventExitForm(unsavedChanges);

  const randomEditForm = useChoiceForm<IDecision>(
    presetData,
    InitialValidate,
    setUnsavedChanges,
    editHandlers
  );

  return (
    <ChoicesForm
      showBackButton
      useChoiceForm={randomEditForm}
      onSubmit={editHandlers.onSubmitEdit}
      presetData={presetData}
    />
  );
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
