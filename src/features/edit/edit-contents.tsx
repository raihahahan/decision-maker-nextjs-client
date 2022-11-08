import { useEffect, useState } from "react";
import usePreventExitForm from "../../common/hooks/usePreventExitForm";
import { IDecision } from "../../common/types/decision-types";
import ChoicesForm from "../choiceForm/choiceForm-components";
import useChoiceForm from "../choiceForm/choiceForm-hooks";
import useEdit from "./edit-hooks";

export default function EditContents<T extends IDecision>({ res }: { res: T }) {
  const { onSubmit, validate } = useEdit();
  const [unsavedChanges, setUnsavedChanges] = useState(true);
  usePreventExitForm(unsavedChanges);
  const editForm = useChoiceForm<T>(res, validate as any);

  return (
    <div>
      <h1>Edit</h1>
      <ChoicesForm
        useChoiceForm={editForm}
        onSubmit={async (value: IDecision) => {
          setUnsavedChanges(false);
          await onSubmit(value);
        }}
        presetData={res}
        showBackButton
      />
    </div>
  );
}
