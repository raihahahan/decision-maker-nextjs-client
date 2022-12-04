import { Checkbox, Group, Text, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useState } from "react";
import { SubmitButton } from "../../common/components/buttons";
import { IChoice } from "../../common/types/decision-types";
import { AddButton, RemoveButton } from "../choiceForm/choiceForm-components";
import { TExtraFormConfig } from "../choiceForm/choiceForm-types";
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
  useConditionalDecisionEdit,
  useConditionalDecisionSteppers,
  useConditionalInputEditForm,
  useConditionalInputForm,
  useCondtionalDecisionConditionsForm,
} from "./conditionalDecision-hooks";
import {
  IConditionalDecisionItem,
  IConditionalInput,
  IConditionalInputItem,
} from "./conditionalDecision-types";

export function ConditionalMainForm({
  activeHandlers,
  form,
  setUnsavedChanges,
  presetValues,
}: IMultiStepFormProps<IConditionalDecisionItem>) {
  const pages: IMultiStepFormItem[] = [
    {
      id: 0,
      element: (
        <ConditionsForm
          form={form.form}
          formHelpers={form.formHelpers as any}
        />
      ),
    },
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
  formHelpers,
}: {
  form: UseFormReturnType<
    IConditionalDecisionItem,
    (values: IConditionalDecisionItem) => IConditionalDecisionItem
  >;
  formHelpers: TExtraFormConfig<IConditionalDecisionItem>;
}) {
  const { siteColors } = useTheme();
  const { buttonHandlers, isPressed, finalOnEditConditionName } =
    useCondtionalDecisionConditionsForm(form, formHelpers);
  const {
    onAddCondition,
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
                  onChange={(e) => {
                    finalOnEditConditionName(e, conditionIndex, item);
                  }}
                />

                <RemoveButton
                  onClick={() => onRemoveCondition(conditionIndex)}
                  extraStyles={{
                    marginLeft: 10,
                    marginBottom: 25,
                  }}
                />
              </div>
              <h4>Good for</h4>
              {form.values.choices.map((choice, includeChoiceIndex) => {
                const refId = choice.refId as string;
                return (
                  <ConditionCheckItem
                    isPressed={isPressed(
                      conditionIndex,
                      refId,
                      "include",
                      item
                    )}
                    key={includeChoiceIndex}
                    choice={choice}
                    onChange={() =>
                      onToggleIncludeButton(conditionIndex, refId, item)
                    }
                  />
                );
              })}
              <h4>Bad for</h4>
              {form.values.choices.map((choice, excludeChoiceIndex) => {
                const refId = choice.refId as string;
                return (
                  <ConditionCheckItem
                    isPressed={isPressed(
                      conditionIndex,
                      refId,
                      "exclude",
                      item
                    )}
                    key={excludeChoiceIndex}
                    choice={choice}
                    onChange={() =>
                      onToggleExcludeButton(conditionIndex, refId, item)
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
  isPressed,
  choice,
  onChange,
}: {
  isPressed: boolean;
  choice: IChoice;
  onChange: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Checkbox
        checked={isPressed}
        onChange={onChange}
        style={{ marginRight: 10 }}
      />
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

export function ConditionalDecisionEditForm({
  res,
}: {
  res: IConditionalDecisionItem;
}) {
  const { activeHandlers, conditionalForm, setUnsavedChanges, editHandlers } =
    useConditionalDecisionEdit(res);

  return (
    <ConditionalMainForm
      activeHandlers={activeHandlers}
      form={conditionalForm}
      setUnsavedChanges={setUnsavedChanges}
      presetValues={res}
    />
  );
}

export function ConditionalInputForm({
  res,
  conditionalInput,
}: {
  res: IConditionalDecisionItem;
  conditionalInput?: IConditionalInputItem;
}) {
  let finalInput: IConditionalInput[] = conditionalInput
    ? conditionalInput.conditionalInputs
    : res?.conditions.map((item) => {
        return { ...item, value: false };
      });

  const { buttonHandlers } = conditionalInput
    ? useConditionalInputEditForm()
    : useConditionalInputForm();

  const [checkedState, setCheckedState] = useState<boolean[]>(
    finalInput.map((i) => i.value)
  );

  const [inputForm, setInputForm] = useState(finalInput);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: 10,
        maxWidth: breakpoints.lg + 100,
      }}
    >
      <>
        <h1>Conditions</h1>
        <h3>Tick the boxes for the conditions that are currently true.</h3>
        {finalInput.map((item, index) => {
          return (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Checkbox
                checked={checkedState[index]}
                onChange={() => {
                  setCheckedState((i) =>
                    i.map((j, _index) => {
                      if (_index == index) j = !j;
                      return j;
                    })
                  );
                  if (!conditionalInput) {
                    setInputForm((i) =>
                      i.map((_item, _index) => {
                        if (_index == index) {
                          return { ..._item, value: !_item.value };
                        } else return _item;
                      })
                    );
                  } else {
                    buttonHandlers.onClickCheck(item);
                  }
                }}
                style={{ marginRight: 10 }}
              />
              <Text>{item.name}</Text>
            </div>
          );
        })}
        <SubmitButton
          onClick={() => buttonHandlers.onClickSubmit(inputForm, res)}
        />
      </>
    </div>
  );
}
