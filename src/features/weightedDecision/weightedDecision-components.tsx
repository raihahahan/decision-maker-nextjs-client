import React, { useEffect, useState } from "react";
import { Stepper, Button, Group, Slider, Text, TextInput } from "@mantine/core";
import ChoicesForm, {
  AddButton,
  RemoveButton,
} from "../choiceForm/choiceForm-components";
import useChoiceForm from "../choiceForm/choiceForm-hooks";
import { UseFormReturnType } from "@mantine/form";
import { IWeightedDecisionItem } from "./weightedDecision-types";
import { useRouter } from "next/router";
import useTheme from "../theme/theme-hooks";
import { breakpoints } from "../theme/theme-data";
import {
  initialWeightedValidate,
  initialWeightedValues,
} from "./weightedDecision-data";
import {
  useCriteriaForm,
  useWeightedFormSteppers,
  useWeightedInput,
} from "./weightedDecision-hooks";
import { formHookReturnType } from "../choiceForm/choiceForm-types";
import usePreventExitForm from "../../common/hooks/usePreventExitForm";

const TOTAL = 2;

export function WeightedDecisionForm({
  presetValues,
}: {
  presetValues?: IWeightedDecisionItem;
}) {
  const [active, setActive] = useState(0);
  const init = presetValues ?? initialWeightedValues;
  const weightedForm = useChoiceForm<IWeightedDecisionItem>(
    init,
    initialWeightedValidate
  );
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  useEffect(() => {
    setUnsavedChanges(
      weightedForm.form.values.name.trim().length > 0 ||
        weightedForm.form.values.choices.filter((i) => i.name.trim().length > 0)
          .length > 0
    );
  }, [weightedForm.form.values, active]);

  usePreventExitForm(unsavedChanges);

  return (
    <div
      style={{
        padding: 20,
        width: "90vw",
        maxWidth: breakpoints.sm + 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CurrentPage active={active} weightedForm={weightedForm} />
      <br />
      <WeightedFormSteppers
        active={active}
        setActive={setActive}
        form={weightedForm.form}
        id={presetValues && presetValues.id ? presetValues.id : -1}
        setUnsavedChanges={setUnsavedChanges}
      />
    </div>
  );
}

export function CurrentPage({
  active,
  weightedForm,
}: {
  active: number;
  weightedForm: formHookReturnType<IWeightedDecisionItem>;
}) {
  return (
    <div style={{ minHeight: "50vh" }}>
      {active == 0 ? (
        <ChoicesForm
          useChoiceForm={weightedForm}
          onSubmit={() => alert("TODO")}
          hideDecide
        />
      ) : active == 1 ? (
        <CriteriaForm form={weightedForm.form} />
      ) : (
        <div>error</div>
      )}
    </div>
  );
}

export function CriteriaForm({
  form,
}: {
  form: UseFormReturnType<
    IWeightedDecisionItem,
    (values: IWeightedDecisionItem) => IWeightedDecisionItem
  >;
}) {
  const { addCriteria, removeCriteria } = useCriteriaForm(form);
  const { siteColors } = useTheme();
  return (
    <div
      style={{ width: "90vw", maxWidth: breakpoints.sm + 10, marginBottom: 20 }}
    >
      <h2>Criteria</h2>
      <form>
        {form.values.criteriaList.map((item, index) => {
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
                  labelProps={{
                    style: { color: siteColors.text.primary },
                  }}
                  style={{ width: "80vw", marginBottom: 20 }}
                  size="lg"
                  withAsterisk
                  type="text"
                  label={`Criteria ${index + 1}`}
                  {...form.getInputProps(`criteriaList.${index}.name`)}
                />
                <RemoveButton
                  onClick={() => removeCriteria(index)}
                  extraStyles={{
                    marginLeft: 10,
                    marginBottom: 25,
                  }}
                />
              </div>
              <Slider
                style={{ margin: 20 }}
                onChange={(e) =>
                  form.setFieldValue(`criteriaList.${index}.weight`, e)
                }
                marks={[
                  { value: 20, label: "20%" },
                  { value: 50, label: "50%" },
                  { value: 80, label: "80%" },
                ]}
                {...form.getInputProps(`criteriaList.${index}.weight`)}
              />
              <br />
            </div>
          );
        })}
        <Group position="apart" mt="md">
          <AddButton onClick={addCriteria} />
        </Group>
      </form>
    </div>
  );
}

export function WeightedInputForm({ res }: { res: IWeightedDecisionItem }) {
  const [unsavedChanges, setUnsavedChanges] = useState(true);
  const {
    weightedInputForm: form,
    onSubmit,
    onChangeSlider,
  } = useWeightedInput(res, setUnsavedChanges);

  usePreventExitForm(unsavedChanges);

  return (
    <div>
      {form.values.map((item, outIndex) => {
        return (
          <div>
            <h3>{item.choiceName}</h3>
            {item.criteriaInput.map((c, index) => {
              return (
                <div>
                  <Text>{c.name}</Text>
                  <Slider
                    style={{ margin: 20, width: "50vw" }}
                    onChange={onChangeSlider}
                    marks={[
                      { value: 20, label: "20%" },
                      { value: 50, label: "50%" },
                      { value: 80, label: "80%" },
                    ]}
                    {...form.getInputProps(
                      `${outIndex}.criteriaInput.${index}.value`
                    )}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
      <Button type="submit" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
}

function WeightedFormSteppers({
  active,
  setActive,
  form,
  id,
  setUnsavedChanges,
}: {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  form: UseFormReturnType<
    IWeightedDecisionItem,
    (values: IWeightedDecisionItem) => IWeightedDecisionItem
  >;
  id: number;
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    rightButtonType,
    rightButtonDisabled,
    leftButtonDisabled,
    onClickRightButton,
    onClickLeftButton,
  } = useWeightedFormSteppers(
    active,
    setActive,
    form,
    id,
    TOTAL,
    setUnsavedChanges
  );
  const { siteColors } = useTheme();

  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step
          disabled
          label="First step"
          description="Create decision and choices"
          style={{ color: siteColors.text.primary }}
        >
          Step 1: Create decision and choices
        </Stepper.Step>
        <Stepper.Step
          disabled
          label="Second step"
          description="Create criteria that affect your decision making"
          style={{ color: siteColors.text.primary }}
        >
          Step 2: Create criteria that affect your decision making (hint: 0
          [least important] - 100 [most important])
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button
          disabled={leftButtonDisabled}
          variant="default"
          size="md"
          onClick={onClickLeftButton}
        >
          Back
        </Button>

        <Button
          disabled={rightButtonDisabled}
          type={rightButtonType}
          size="md"
          onClick={onClickRightButton}
        >
          Next step
        </Button>
      </Group>
    </>
  );
}
