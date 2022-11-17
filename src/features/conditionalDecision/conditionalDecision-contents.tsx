import InputLayout from "../../common/components/inputLayout";
import ChoicesForm from "../choiceForm/choiceForm-components";
import useChoiceForm from "../choiceForm/choiceForm-hooks";
import {
  initialConditionalValidate,
  initialConditionalValues,
} from "./conditionalDecision-data";
import { IConditionalDecisionItem } from "./conditionalDecision-types";

export default function ConditionalDecisionCreateContents() {
  const conditionalForm = useChoiceForm<IConditionalDecisionItem>(
    initialConditionalValues,
    initialConditionalValidate
  );
  return (
    <InputLayout type="conditional">
      <ChoicesForm
        useChoiceForm={conditionalForm}
        onSubmit={() => alert("TODO")}
      />
    </InputLayout>
  );
}
