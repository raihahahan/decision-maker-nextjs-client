import React, { useEffect, useState } from "react";
import { Stepper, Button, Group, Slider, Text, TextInput } from "@mantine/core";
import ChoicesForm, {
  AddButton,
  RemoveButton,
} from "../choiceForm/choiceForm-components";
import useChoiceForm from "../choiceForm/choiceForm-hooks";
import { UseFormReturnType } from "@mantine/form";
import { IDecision } from "../../common/types/decision-types";
import { ICriteria, IWeightedDecisionItem } from "./weightedDecision-types";
import { useRouter } from "next/router";
import useTheme from "../theme/theme-hooks";
import { breakpoints } from "../theme/theme-data";
import { InitialValues } from "../choiceForm/choiceForm-data";
import {
  initialWeightedValidate,
  initialWeightedValues,
} from "./weightedDecision-data";

export function WeightedDecisionForm() {
  const [active, setActive] = useState(0);

  const weightedForm = useChoiceForm<IWeightedDecisionItem>(
    initialWeightedValues,
    initialWeightedValidate
  );

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
      <div style={{ minHeight: "50vh" }}>
        {active == 0 ? (
          <ChoicesForm
            useChoiceForm={weightedForm}
            onSubmit={() => alert("TODO")}
            hideDecide
          />
        ) : active == 1 ? (
          <CriteriaForm form={weightedForm.form} />
        ) : active == 2 ? (
          <div>Summary</div>
        ) : (
          <div>error</div>
        )}
      </div>
      <br />
      <WeightedFormSteppers
        active={active}
        setActive={setActive}
        form={weightedForm.form}
      />
    </div>
  );
}

function CriteriaForm({
  form,
}: {
  form: UseFormReturnType<
    IWeightedDecisionItem,
    (values: IWeightedDecisionItem) => IWeightedDecisionItem
  >;
}) {
  const addCriteria = () => {
    if (form.values.criteriaList.length < 100) {
      form.insertListItem("criteriaList", {
        id: form.values.criteriaList.length,
        name: " ",
      } as ICriteria);
    } else {
      alert("Maximum 100 criteria");
    }
  };
  const removeCriteria = (id: number) => {
    form.removeListItem("criteriaList", id);
  };
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

function WeightedFormSteppers({
  active,
  setActive,
  form,
}: {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  form: UseFormReturnType<
    IWeightedDecisionItem,
    (values: IWeightedDecisionItem) => IWeightedDecisionItem
  >;
}) {
  const nextStep = () =>
    setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const { siteColors } = useTheme();
  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step
          label="First step"
          description="Create decision and choices"
          style={{ color: siteColors.text.primary }}
        >
          Step 1: Create decision and choices
        </Stepper.Step>
        <Stepper.Step
          label="Second step"
          description="Create criteria that affect your decision making"
          style={{ color: siteColors.text.primary }}
        >
          Step 2: Create criteria that affect your decision making (hint: 0
          [least important] - 100 [most important])
        </Stepper.Step>
        <Stepper.Step
          label="Third step"
          description="Give your input for each decision"
          style={{ color: siteColors.text.primary }}
        >
          Step 3: Give your input for each decision
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button
          disabled={active <= 0}
          variant="default"
          size="md"
          onClick={prevStep}
        >
          Back
        </Button>

        <Button
          type={active >= 3 ? "submit" : "button"}
          size="md"
          onClick={() => {
            active >= 3 ? alert(JSON.stringify(form.values)) : nextStep();
          }}
        >
          {active >= 3 ? "Decide" : "Next step"}
        </Button>
      </Group>
    </>
  );
}
