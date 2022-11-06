import { IDecision } from "../../common/types/decision-types";
import ChoicesForm from "../choiceForm/choiceForm-components";
import useEdit from "./edit-hooks";

export default function EditContents({ res }: { res: IDecision }) {
  const { onSubmit } = useEdit();
  return (
    <div>
      <h1>Edit</h1>
      <ChoicesForm
        onSubmit={async (value: IDecision) => await onSubmit(value)}
        presetData={res}
        showBackButton
      />
    </div>
  );
}
