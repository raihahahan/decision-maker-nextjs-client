import InputLayout from "../../common/components/inputLayout";
import ChoicesForm from "../choiceForm/choiceForm-components";

export default function ConditionalDecisionContents() {
  return (
    <InputLayout type="conditional">
      <ChoicesForm onSubmit={() => alert("TODO")} />
    </InputLayout>
  );
}
