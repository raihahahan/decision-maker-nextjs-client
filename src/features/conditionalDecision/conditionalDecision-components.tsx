import { Checkbox, Group, Text, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IChoice } from "../../common/types/decision-types";
import { AddButton, RemoveButton } from "../choiceForm/choiceForm-components";
import MultiStepForm from "../multiStepForm/multiStepForm-components";
import {
  IMultiStepFormItem,
  IMultiStepFormProps,
} from "../multiStepForm/multiStepForm-types";
import { breakpoints } from "../theme/theme-data";
import useTheme from "../theme/theme-hooks";
import { conditionalStepperData } from "./conditionalDecision-data";
import {
  useConditionalDecisionCreate,
  useConditionalDecisionSteppers,
  useCondtionalDecisionConditionsForm,
} from "./conditionalDecision-hooks";
import { IConditionalDecisionItem } from "./conditionalDecision-types";

export function ConditionalMainForm({
  activeHandlers,
  form,
  setUnsavedChanges,
  presetValues,
}: IMultiStepFormProps<IConditionalDecisionItem>) {
  const pages: IMultiStepFormItem[] = [
    { id: 0, element: <ConditionsForm form={form.form} /> },
  ];

  const useMultiFormStepper = useConditionalDecisionSteppers([
    activeHandlers.active,
    activeHandlers.setActive,
    form.form as any,
    presetValues && presetValues.id ? presetValues.id : -1,
    pages.length + 1,
    setUnsavedChanges,
  ]);

  return (
    <MultiStepForm
      activeHandlers={activeHandlers}
      form={form}
      setUnsavedChanges={setUnsavedChanges}
      presetValues={presetValues}
      stepperData={conditionalStepperData}
      type="conditional"
      pages={pages}
      useMultiFormStepper={useMultiFormStepper}
    />
  );
}

export function ConditionsForm({
  form,
}: {
  form: UseFormReturnType<
    IConditionalDecisionItem,
    (values: IConditionalDecisionItem) => IConditionalDecisionItem
  >;
}) {
  const { siteColors } = useTheme();
  const { buttonHandlers } = useCondtionalDecisionConditionsForm(form);
  const {
    onAddCondition,
    onEditConditionName,
    onRemoveCondition,
    onToggleExcludeButton,
    onToggleIncludeButton,
  } = buttonHandlers;

  return (
    <div
      style={{ width: "90vw", maxWidth: breakpoints.sm + 10, marginBottom: 20 }}
    >
      <h2>Conditions</h2>
      <form>
        {form.values.conditions.map((item, conditionIndex) => {
          return (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  key={item.id}
                  labelProps={{
                    style: { color: siteColors.text.primary },
                  }}
                  style={{ width: "80vw", marginBottom: 20 }}
                  size="lg"
                  withAsterisk
                  type="text"
                  label={`Condition ${conditionIndex + 1}`}
                  value={item.name}
                  onChange={(e) => onEditConditionName(e, conditionIndex)}
                />

                <RemoveButton
                  onClick={() => onRemoveCondition(conditionIndex)}
                  extraStyles={{
                    marginLeft: 10,
                    marginBottom: 25,
                  }}
                />
              </div>
              <h4>Include</h4>
              {form.values.choices.map((choice, includeChoiceIndex) => {
                return (
                  <ConditionCheckItem
                    key={includeChoiceIndex}
                    choice={choice}
                    onChange={() =>
                      onToggleIncludeButton(conditionIndex, includeChoiceIndex)
                    }
                  />
                );
              })}
              <h4>Exclude</h4>
              {form.values.choices.map((choice, excludeChoiceIndex) => {
                return (
                  <ConditionCheckItem
                    key={excludeChoiceIndex}
                    choice={choice}
                    onChange={() =>
                      onToggleExcludeButton(conditionIndex, excludeChoiceIndex)
                    }
                  />
                );
              })}

              <br />
            </div>
          );
        })}
        <Group position="apart" mt="md">
          <AddButton onClick={onAddCondition} />
        </Group>
      </form>
    </div>
  );
}

function ConditionCheckItem({
  choice,
  onChange,
}: {
  choice: IChoice;
  onChange: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Checkbox onChange={onChange} style={{ marginRight: 10 }} />
      <Text>{choice.name}</Text>
    </div>
  );
}

export function ConditionalDecisionCreateForm() {
  const { activeHandlers, conditionalForm, setUnsavedChanges } =
    useConditionalDecisionCreate();
  return (
    <ConditionalMainForm
      activeHandlers={activeHandlers}
      form={conditionalForm}
      setUnsavedChanges={setUnsavedChanges}
    />
  );
}
