import InputLayout from "../../common/components/inputLayout";
import ChoicesForm from "../choiceForm/choiceForm-components";

export default function WeightedDecisionContents() {
  return (
    <InputLayout type="weighted">
      <ChoicesForm onSubmit={() => alert("TODO")} />
    </InputLayout>
  );
}
